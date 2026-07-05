import type { Metadata } from "next";
import { Inter, Playfair_Display, Oooh_Baby } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const ooohBaby = Oooh_Baby({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habeba Ehab | Frontend Developer & Cloud/DevOps Enthusiast",
  description:
    "Portfolio of Habeba Ehab, a Computer Science graduate and frontend developer transitioning into cloud & DevOps. React, Next.js, AWS, Docker, Kubernetes, Terraform.",
  metadataBase: new URL("https://habeba-ehab.vercel.app"),
  openGraph: {
    title: "Habeba Ehab | Frontend Developer & Cloud/DevOps Enthusiast",
    description:
      "Portfolio of Habeba Ehab, a Computer Science graduate and frontend developer transitioning into cloud & DevOps.",
    type: "website",
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
      className={`${inter.variable} ${playfairDisplay.variable} ${ooohBaby.variable}`}
    >
      <body className="bg-paper text-ink font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
