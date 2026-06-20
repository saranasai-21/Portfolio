/**
 * script.js — Sarana Sai Bagadi
 *
 * Responsibilities:
 *   1. Page fade-in on load (body starts at opacity:0 from CSS)
 *   2. Live clock in the system bar (time, date — updates every second)
 *   3. Smooth scroll with correct offset for the fixed system bar
 *   4. IntersectionObserver active link highlighting in system bar
 *   5. typing animation on landing h1
 *   6. Interactive systems console log streaming & keyboard tab navigation
 */

(function () {
  'use strict';

  /* ── Typing Animation setup ── */
  var landH1 = document.querySelector('.land-h1');
  var originalText = "I build AI systems.";
  if (landH1) {
    landH1.textContent = "";
  }


  /* ── 1. PAGE FADE-IN ──
     The body is invisible (opacity:0) until .is-loaded is added.
     Using requestAnimationFrame after window load ensures layout has
     settled before we trigger the fade — avoids a flash of unstyled content. */

  window.addEventListener('load', function () {
    requestAnimationFrame(function () {
      document.body.classList.add('is-loaded');
      setTimeout(startTyping, 400); // Trigger typing after fade-in
    });
  });

  function startTyping() {
    if (!landH1) return;
    landH1.classList.add('cursor-blink');
    var idx = 0;
    
    function typeChar() {
      if (idx < originalText.length) {
        landH1.textContent += originalText.charAt(idx);
        idx++;
        setTimeout(typeChar, 50);
      } else {
        setTimeout(function() {
          landH1.classList.remove('cursor-blink');
        }, 800);
      }
    }
    typeChar();
  }


  /* ── 2. LIVE CLOCK ──
     The IST indicator in the sysbar is a timezone label, not a live TZ offset.
     We just display local machine time, which the visitor sees in their own timezone.
     The label "IST" is accurate because Sarana is in India.

     Format: HH:MM  ·  Day, Mon DD */

  var clockTime = document.getElementById('clock-time');
  var clockDate = document.getElementById('clock-date');

  var DAYS  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function updateClock() {
    var now = new Date();
    var h   = pad(now.getHours());
    var m   = pad(now.getMinutes());
    var s   = pad(now.getSeconds());

    if (clockTime) {
      clockTime.textContent = h + ':' + m + ':' + s;
      clockTime.dateTime    = now.toISOString();
    }

    if (clockDate) {
      clockDate.textContent =
        DAYS[now.getDay()] + ', ' +
        MONTHS[now.getMonth()] + ' ' +
        now.getDate();
    }
  }

  updateClock();
  setInterval(updateClock, 1000);


  /* ── 3. SMOOTH SCROLL ──
     CSS scroll-padding-top handles most cases but has edge cases on
     older browsers and when the URL hash changes programmatically.
     This listener intercepts all [href^="#"] clicks and scrolls manually
     with the correct offset (system bar height + breathing room). */

  var BAR_H   = 40;   /* matches --bar-h in CSS */
  var PADDING = 28;   /* breathing room below the bar */

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var href   = link.getAttribute('href');
    var target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    var top = target.getBoundingClientRect().top + window.scrollY - BAR_H - PADDING;
    window.scrollTo({ top: top, behavior: 'smooth' });

    /* Update URL fragment without pushing a history entry */
    history.replaceState(null, '', href);
  });


  /* ── 3.1 ACTIVE NAV LINK HIGHLIGHTING ── */
  var sections = document.querySelectorAll('#opinion, #systems, #work, #experiments, #links');
  var navLinks = {
    opinion: document.getElementById('nav-opinion'),
    systems: document.getElementById('nav-systems'),
    work: document.getElementById('nav-work'),
    experiments: document.getElementById('nav-experiments'),
    links: document.getElementById('nav-links')
  };

  var observerOptions = {
    root: null,
    rootMargin: '-75px 0px -75% 0px',
    threshold: 0
  };

  var observer = new IntersectionObserver(function (entries) {
    var isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
    if (isAtBottom) {
      for (var key in navLinks) {
        if (navLinks[key]) {
          navLinks[key].classList.toggle('active', key === 'links');
        }
      }
      return;
    }

    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        for (var key in navLinks) {
          if (navLinks[key]) navLinks[key].classList.remove('active');
        }
        if (navLinks[id]) {
          navLinks[id].classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });

  window.addEventListener('scroll', function () {
    var isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
    if (isAtBottom) {
      for (var key in navLinks) {
        if (navLinks[key]) {
          navLinks[key].classList.toggle('active', key === 'links');
        }
      }
    }
  });


  /* ── 4. INTERACTIVE SYSTEMS CONSOLE ── */

  var SYSTEMS_DATA = {
    agentic: {
      endpoint: "POST /api/v1/analytics/query",
      tech: "LangChain · SQLite · LLaMA-3 (Groq)",
      latency: "1.48s",
      payload: {
        "natural_language_query": "Select all active customers with total transactional volume > $10,000 in Q1 2026...",
        "enforce_read_only_sandbox": true,
        "schema_context_grounding": "enabled",
        "max_execution_timeout_ms": 5000
      },
      logs: [
        { text: "POST /api/v1/analytics/query", type: "info" },
        { text: "INFO: Authenticating caller & checking payload schema validity...", type: "dim" },
        { text: "INFO: Injecting schema dictionary (6 tables, 42 fields) into agent context...", type: "dim" },
        { text: "INFO: Router agent routing query to text-to-SQL sub-agent...", type: "dim" },
        { text: "INFO: Groq LLaMA-3 generating candidate SQL query...", type: "dim" },
        { text: "SUCCESS: Generated Candidate SQL: SELECT c.id, c.name, SUM(t.amount) FROM customers c JOIN transactions t ON c.id = t.customer_id WHERE t.timestamp BETWEEN '2026-01-01' AND '2026-03-31' GROUP BY c.id HAVING SUM(t.amount) > 10000; ", type: "success" },
        { text: "INFO: Commencing Abstract Syntax Tree (AST) validation check...", type: "dim" },
        { text: "SUCCESS: AST validation passed (0 mutations detected, SELECT-only verification verified).", type: "success" },
        { text: "INFO: Spin-up read-only SQLite docker sandbox session: container_db_run_188...", type: "dim" },
        { text: "INFO: Executing query inside container_db_run_188...", type: "dim" },
        { text: "SUCCESS: Query executed. SQLite returned 14 rows. Terminating sandbox container.", type: "success" },
        { text: "INFO: Formatting results array to Pandas tabular payload...", type: "dim" },
        { text: "POST /api/v1/analytics/query - 200 OK - Latency: 1.48s", type: "info" }
      ]
    },
    cnn: {
      endpoint: "POST /api/v1/screening/classify",
      tech: "Triton Inference · ONNX INT8 · ResNet50",
      latency: "12ms",
      payload: {
        "image_uri": "s3://clinical-vault/patients/cxr_202606_9941.png",
        "pixel_resolution": [224, 224, 3],
        "explainability": {
          "grad_cam_activation_overlay": true,
          "target_class": "pneumonia"
        }
      },
      logs: [
        { text: "POST /api/v1/screening/classify", type: "info" },
        { text: "INFO: Retrieving patient scan CXR from secure S3 vault storage...", type: "dim" },
        { text: "SUCCESS: CXR stream loaded (244 KB).", type: "success" },
        { text: "INFO: Normalizing image tensor: resizing 224x224, scale 1/255.0, channel mean subtraction...", type: "dim" },
        { text: "INFO: Dispatching preprocess image tensor to Triton Inference Server edge instance...", type: "dim" },
        { text: "INFO: Triton scheduling inference request queue (queue_delay: <1ms)...", type: "dim" },
        { text: "INFO: ONNX Runtime executing quantized INT8 ResNet-50 backbone computation...", type: "dim" },
        { text: "SUCCESS: Model inference completed.", type: "success" },
        { text: "INFO: Extracting final activation maps for Grad-CAM overlay calculations...", type: "dim" },
        { text: "SUCCESS: Generated attention heatmap coordinate map.", type: "success" },
        { text: "SUCCESS: Screening score: PNEUMONIA (Probability: 0.9482). Triage flag raised.", type: "warning" },
        { text: "POST /api/v1/screening/classify - 200 OK - Latency: 12ms", type: "info" }
      ]
    },
    forecast: {
      endpoint: "POST /api/v1/grid/forecast",
      tech: "TimescaleDB · Prefect · LSTM + XGBoost",
      latency: "410ms",
      payload: {
        "grid_node_id": "india-southern-zone-4",
        "forecast_horizon_hours": 72,
        "confidence_coverage": 0.95,
        "features": ["ambient_temp", "historical_load", "humidity"]
      },
      logs: [
        { text: "POST /api/v1/grid/forecast", type: "info" },
        { text: "INFO: Querying TimescaleDB for last 30 days of historical demand & weather features...", type: "dim" },
        { text: "SUCCESS: Pulled 1,440 time steps from TimescaleDB (12.4ms).", type: "success" },
        { text: "INFO: Loading current production model registry reference from MLflow...", type: "dim" },
        { text: "SUCCESS: MLflow active model URI: runs:/ensemble_grid_load_v3_8/model", type: "success" },
        { text: "INFO: Creating temporal feature tensors (Fourier seasonality encodings, lags)...", type: "dim" },
        { text: "INFO: Executing ensemble inference (LSTM sequence forecasting + XGBoost residuals)...", type: "dim" },
        { text: "SUCCESS: Raw ensemble point forecast generated.", type: "success" },
        { text: "INFO: Computing conformal prediction intervals using calibration split nonconformity scores...", type: "dim" },
        { text: "SUCCESS: 72h prediction intervals computed with 95% guaranteed coverage bounds.", type: "success" },
        { text: "POST /api/v1/grid/forecast - 200 OK - Latency: 410ms", type: "info" }
      ]
    },
    rag: {
      endpoint: "POST /api/v1/rag/query",
      tech: "Pinecone · Redis · Cohere Rerank v3",
      latency: "78ms",
      payload: {
        "query": "How do we initialize the Feast feature store offline database with Postgres?",
        "temperature": 0.0,
        "enable_semantic_cache": true,
        "top_k_chunks": 5
      },
      logs: [
        { text: "POST /api/v1/rag/query", type: "info" },
        { text: "INFO: Computing BGE-M3 text embedding for query (latency: 12ms)...", type: "dim" },
        { text: "INFO: Checking Redis Semantic Cache (GPTCache) with cosine similarity threshold: 0.92...", type: "dim" },
        { text: "SUCCESS: Semantic cache hit! Found matching query: 'Feast postgres offline db setup' (score: 0.9412).", type: "success" },
        { text: "INFO: Fetching cached response payload from Redis hash store...", type: "dim" },
        { text: "SUCCESS: Cached answer returned (avoided LLM API call).", type: "success" },
        { text: "POST /api/v1/rag/query - 200 OK - Latency: 78ms (CACHE HIT)", type: "info" }
      ]
    },
    risk: {
      endpoint: "POST /api/v1/risk/delinquency",
      tech: "Feast Store · Redis · SHAP · XGBoost",
      latency: "24ms",
      payload: {
        "customer_account_id": "act_8841920",
        "prediction_horizon_days": 30,
        "compute_shap_explanations": true
      },
      logs: [
        { text: "POST /api/v1/risk/delinquency", type: "info" },
        { text: "INFO: Connecting to online Feast Feature Store (Redis backend)...", type: "dim" },
        { text: "SUCCESS: Feast retrieved 18 active transaction aggregator features (latency: 2.8ms).", type: "success" },
        { text: "INFO: Pre-checking covariate feature distributions against threshold drift limits...", type: "dim" },
        { text: "SUCCESS: Feature verification passed (no distribution drift alerts triggered).", type: "success" },
        { text: "INFO: Executing credit default risk classification using XGBoost ensemble...", type: "dim" },
        { text: "SUCCESS: Probability of 30-day delinquency calculated: 0.7241.", type: "warning" },
        { text: "INFO: Spawning parallelized local SHAP explainer computation...", type: "dim" },
        { text: "SUCCESS: SHAP values computed for top 5 contributing features (e.g. balance_ratio: +0.25).", type: "success" },
        { text: "SUCCESS: Classification result and feature attribution mapping serialized.", type: "success" },
        { text: "POST /api/v1/risk/delinquency - 200 OK - Latency: 24ms", type: "info" }
      ]
    }
  };

  var activeSystem = 'agentic';
  var streamTimeoutId = null;

  var consoleTabs = document.querySelectorAll('.console-tab');
  var runBtn = document.getElementById('run-btn');
  var consoleJson = document.getElementById('console-json');
  var consoleLog = document.getElementById('console-log');
  var consoleTitle = document.getElementById('console-title');
  var consoleStatusDot = document.getElementById('console-status-dot');

  var mEndpoint = document.getElementById('m-endpoint');
  var mLatency = document.getElementById('m-latency');
  var mStatus = document.getElementById('m-status');
  var mTech = document.getElementById('m-tech');

  function updateSystemUI(sysKey) {
    activeSystem = sysKey;
    var sys = SYSTEMS_DATA[sysKey];

    // Update payload display
    if (consoleJson) {
      consoleJson.textContent = JSON.stringify(sys.payload, null, 2);
    }

    // Update footer metrics
    if (mEndpoint) mEndpoint.textContent = sys.endpoint;
    if (mLatency) {
      mLatency.textContent = '—';
      mLatency.className = 'm-val';
    }
    if (mStatus) {
      mStatus.textContent = 'IDLE';
      mStatus.className = 'm-val';
    }
    if (mTech) mTech.textContent = sys.tech;

    // Reset log terminal
    if (consoleLog) {
      consoleLog.innerHTML = '<div class="log-line text-dim">// Selected system ready. Click "Execute Trace" to simulate request payload.</div>';
    }

    // Reset run button
    if (runBtn) {
      runBtn.textContent = 'Execute Trace';
      runBtn.disabled = false;
    }

    // Update Console Title
    if (consoleTitle) {
      if (sysKey === 'agentic') consoleTitle.textContent = 'SYS_TELEMETRY // agentic_sql.log';
      if (sysKey === 'cnn') consoleTitle.textContent = 'SYS_TELEMETRY // clinical_cnn.log';
      if (sysKey === 'forecast') consoleTitle.textContent = 'SYS_TELEMETRY // grid_forecast.log';
      if (sysKey === 'rag') consoleTitle.textContent = 'SYS_TELEMETRY // hybrid_rag.log';
      if (sysKey === 'risk') consoleTitle.textContent = 'SYS_TELEMETRY // credit_risk.log';
    }

    // Reset status dot
    if (consoleStatusDot) {
      consoleStatusDot.className = 'console-dot green';
    }

    // Clear any active running streams
    if (streamTimeoutId) {
      clearTimeout(streamTimeoutId);
      streamTimeoutId = null;
    }
  }

  // Bind Tab Click Events
  consoleTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      if (tab.classList.contains('active')) return;

      consoleTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      var sysKey = tab.getAttribute('data-log');
      updateSystemUI(sysKey);
    });
  });

  // Keyboard Navigation for Console Tabs
  var consoleTabsArray = Array.prototype.slice.call(consoleTabs);
  consoleTabs.forEach(function (tab, index) {
    tab.addEventListener('keydown', function (e) {
      var nextIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (index + 1) % consoleTabsArray.length;
        consoleTabsArray[nextIndex].focus();
        consoleTabsArray[nextIndex].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (index - 1 + consoleTabsArray.length) % consoleTabsArray.length;
        consoleTabsArray[nextIndex].focus();
        consoleTabsArray[nextIndex].click();
      }
    });
  });

  // Run Simulation Event
  if (runBtn) {
    runBtn.addEventListener('click', function () {
      var sys = SYSTEMS_DATA[activeSystem];
      if (!sys) return;

      // Set Running state
      runBtn.textContent = 'Running...';
      runBtn.disabled = true;
      if (mStatus) {
        mStatus.textContent = 'EXECUTING';
        mStatus.className = 'm-val green';
      }
      if (consoleStatusDot) {
        consoleStatusDot.className = 'console-dot amber blink';
      }

      if (consoleLog) {
        consoleLog.innerHTML = '';
      }

      var logLines = sys.logs;
      var currentLineIdx = 0;

      function printNextLine() {
        if (currentLineIdx >= logLines.length) {
          // Completed
          runBtn.textContent = 'Execute Trace';
          runBtn.disabled = false;
          if (mStatus) {
            mStatus.textContent = 'SUCCESS';
            mStatus.className = 'm-val green';
          }
          if (mLatency) {
            mLatency.textContent = sys.latency;
            mLatency.className = 'm-val green';
          }
          if (consoleStatusDot) {
            consoleStatusDot.className = 'console-dot green';
          }
          return;
        }

        var line = logLines[currentLineIdx];
        var lineElem = document.createElement('div');
        lineElem.className = 'log-line';
        if (line.type === 'dim') lineElem.classList.add('text-dim');
        if (line.type === 'success') lineElem.classList.add('text-success');
        if (line.type === 'warning') lineElem.classList.add('text-warning');
        if (line.type === 'info') lineElem.classList.add('text-info');
        lineElem.textContent = line.text;

        if (consoleLog) {
          consoleLog.appendChild(lineElem);
          consoleLog.scrollTop = consoleLog.scrollHeight;
        }

        currentLineIdx++;
        var delay = 120;
        if (line.text.indexOf('generating') !== -1 || line.text.indexOf('Ensemble') !== -1 || line.text.indexOf('evaluating') !== -1) {
          delay = 450;
        } else if (line.text.indexOf('SUCCESS:') !== -1) {
          delay = 200;
        }

        streamTimeoutId = setTimeout(printNextLine, delay);
      }

      printNextLine();
    });
  }

  // Initialize UI
  if (consoleTabs.length > 0) {
    updateSystemUI('agentic');
  }

}());
