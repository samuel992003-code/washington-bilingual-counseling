import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Washington Bilingual Counseling | Albán Zamora, Bilingual Psychotherapist",
  description:
    "Culturally sensitive bilingual therapy in Washington DC. Albán Zamora provides individual, couples, and family counseling for the Latino community. English & Spanish.",
  keywords: [
    "bilingual therapist DC",
    "Latino counseling Washington",
    "Spanish speaking therapist",
    "terapia en español DC",
    "Albán Zamora",
    "Washington Bilingual Counseling",
  ],
  openGraph: {
    title: "Washington Bilingual Counseling | Albán Zamora",
    description:
      "Culturally sensitive bilingual therapy for the Latino community in Washington DC.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          In production, add Google Fonts link here or use next/font/google:
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300..700&display=swap" rel="stylesheet" />
        */}
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
