import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Crazy Tools & Games",
  description: "A centralized hub for quirky, useful, and entertaining web-based tools and mini-games.",
};

import ChaosWrapper from "@/components/ChaosWrapper";
import EasterEggListener from "@/components/EasterEggListener";
import KonamiCode from "@/components/global/KonamiCode";
import CursorTrail from "@/components/global/CursorTrail";
import VoiceNav from "@/components/global/VoiceNav";
import GlobalRunawayButton from "@/components/global/GlobalRunawayButton";

import ScreenShatter from "@/components/global/ScreenShatter";
import VandalizeCanvas from "@/components/global/VandalizeCanvas";
import Earthquake from "@/components/global/Earthquake";
import AntiGravity from "@/components/global/AntiGravity";

import AnnoyingCompanion from "@/components/global/AnnoyingCompanion";
import BossKey from "@/components/global/BossKey";
import Gamification from "@/components/global/Gamification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-white text-gray-900 min-h-screen flex flex-col selection:bg-blue-500 selection:text-white`}
      >
        <EasterEggListener />
        <KonamiCode />
        <CursorTrail />
        <VoiceNav />
        <GlobalRunawayButton />
        
        <ScreenShatter />
        <VandalizeCanvas />
        <Earthquake />
        <AntiGravity />
        
        <AnnoyingCompanion />
        <BossKey />
        <Gamification />
        
        <ChaosWrapper>
          <div className="relative z-10 flex flex-col flex-grow">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </ChaosWrapper>
      </body>
    </html>
  );
}
