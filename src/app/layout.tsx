import type { Metadata } from "next";
import { Big_Shoulders, JetBrains_Mono, Archivo } from "next/font/google";
import localFont from "next/font/local";
import { PageLoader } from "@/components/page-loader";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-display",
  weight: ["800", "900"],
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

// Real wedding brand fonts — src/fonts/wedding/, copied from
// assets/Wedding Asset Folder/Fonts/. Both are scoped to the Stage-2 screen
// only; Stage 1 keeps its own font stack untouched.
//
// (Aventalia Script and Arogant DEMO were loaded for an earlier
// bordeaux/cream Stage-2 direction that's since been replaced by this
// Hitman-poster-inspired one, which calls for no script face — dropped
// rather than left as dead weight. The .ttf files are still on disk in
// src/fonts/wedding/ if that direction comes back.)

// Title/headline face for the poster-style layout.
const weddingSerif = localFont({
  src: "../fonts/wedding/Wilmont-Regular.otf",
  variable: "--font-wedding-serif",
  weight: "400",
  style: "normal",
  display: "swap",
});

// Stage-2 body/UI face — self-hosted Roboto, every weight/italic in the
// asset pack.
const weddingSans = localFont({
  src: [
    { path: "../fonts/wedding/Roboto-Thin.ttf", weight: "100", style: "normal" },
    { path: "../fonts/wedding/Roboto-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../fonts/wedding/Roboto-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/wedding/Roboto-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../fonts/wedding/Roboto-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/wedding/Roboto-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/wedding/Roboto-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/wedding/Roboto-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../fonts/wedding/Roboto-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/wedding/Roboto-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../fonts/wedding/Roboto-Black.ttf", weight: "900", style: "normal" },
    { path: "../fonts/wedding/Roboto-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-wedding-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grand Prix — Karting à Anvers",
  description: "Journée karting Grand Prix, Indoorkarting Antwerpen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${mono.variable} ${body.variable} ${weddingSerif.variable} ${weddingSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
