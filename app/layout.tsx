import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

/**
 * Three faces, three jobs.
 *
 * `Bricolage Grotesque` carries every display line and all interface text.
 * It is a grotesque with ink traps and flared joints, so at `text-colossal`
 * it still has a voice — the neutral grotesques go anonymous at that size.
 * The `opsz` axis is requested because the scale spans 11px to 208px.
 *
 * `Newsreader` sets the prose. Inverting the usual serif-display/sans-body
 * pairing is the point: this is an institution whose output is documents,
 * and the reading voice should sound like one.
 *
 * `IBM Plex Mono` holds everything that used to live in a paper ledger —
 * years, indices, counts, provenance labels. The digital timeline on this
 * page runs from paper ledgers to data intelligence; the mono is that
 * lineage, not decoration.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PKSF Digital Experience — An Independent Concept",
    template: "%s — PKSF Digital Experience",
  },
  description:
    "An independent editorial concept exploring the story, reach and digital transformation of Palli Karma-Sahayak Foundation (PKSF), Bangladesh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-parchment text-on-light">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
