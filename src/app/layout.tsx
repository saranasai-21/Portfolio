import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarana Sai Bagadi | Software Engineer & AI Developer",
  description: "Portfolio of Sarana Sai Bagadi — building production-grade AI-powered applications, advanced RAG systems, agents, and scalable full-stack web architectures.",
  keywords: ["Sarana Sai Bagadi", "AI Developer", "Software Engineer", "Full Stack Developer", "GenAI", "LangChain", "FastAPI", "React", "Next.js", "RAG Systems"],
  authors: [{ name: "Sarana Sai Bagadi" }],
  creator: "Sarana Sai Bagadi",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bsaranasai.netlify.app/",
    title: "Sarana Sai Bagadi | Software Engineer & AI Developer",
    description: "I build AI-powered applications, RAG systems, intelligent chatbots, and scalable web applications.",
    siteName: "Sarana Sai Bagadi Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-[#f5f5f7] selection:bg-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
