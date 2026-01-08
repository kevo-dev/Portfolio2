
import React from 'react';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import StructuredData from '../components/StructuredData';

export const metadata: Metadata = {
  title: "Kev Owino | Self-taught Software Developer",
  description: "Self-taught software developer specializing in high-performance web applications and AI-driven solutions.",
};

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#030712] text-gray-100 antialiased selection:bg-indigo-500/30">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
