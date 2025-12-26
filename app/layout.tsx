import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";
import PopupNotification from "@/components/PopupNotification";
import { client } from "@/sanity/lib/sanity";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

const display = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ERS Club",
  description: "Electronics & Robotics Society",
};

async function getPopup() {
  // Fetch the latest active popup
  // We fetch a bit more than needed to let the client handle the exact date logic
  // or we could filter here. For now, fetching the latest active one is good.
  const query = `*[_type == "popup" && isActive == true] | order(date desc)[0] {
    ...,
    button1,
    button2
  }`;
  const { data } = await sanityFetch({ query });
  return data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const popup = await getPopup();

  return (
    <html lang="en" >
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased circuit-bg`}
      >
        <Navbar />
        <PopupNotification popup={popup} />
        {SanityLive />
        <children}
        <Footer />
      </body>
    </html>
  );
}
