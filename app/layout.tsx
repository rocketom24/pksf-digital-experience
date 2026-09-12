import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Newsreader, Tiro_Bangla } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { isProductionDeployment, site, siteUrl } from "@/data/site";
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
 *
 * `Tiro Bangla` sets the Bangla. None of the three faces above carries the
 * Bengali script at all, so Bangla in them falls back to whatever the device
 * has and arrives in a fourth, unchosen voice. Tiro Bangla is a text serif,
 * which puts the Bangla in the same register as the prose rather than in the
 * display grotesque — it is the reading voice, and it is set that way.
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

const tiroBangla = Tiro_Bangla({
  variable: "--font-tiro-bangla",
  subsets: ["bengali"],
  weight: "400",
  display: "swap",
});

/**
 * What the page says about itself before anyone sees it.
 *
 * Three audiences read this and none of them read the page: a browser tab, a
 * search result, and the link preview a pasted URL turns into. The strings are
 * in `data/site.ts` so all three say the same thing, and what they say is that
 * this is an independent concept — the one claim that cannot be left to the
 * page body, because a preview is often the whole of what is seen.
 *
 * `metadataBase` is what makes the relative URLs below — and the generated ones
 * from `icon.png` and `opengraph-image.png` — resolve to absolute addresses.
 * Without it, `og:image` is a relative path that no crawler can fetch.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  /* Named as the work of whoever is presenting it, and no one else. PKSF is the
     subject of the concept, never its author or its publisher. */
  creator: "Independent concept project",
  publisher: "Independent concept project",
  category: "Design",
  openGraph: {
    type: "website",
    siteName: site.name,
    /* Not the `title` template's default: a preview card already shows the site
       name on its own line, so repeating "Independent Concept" in the heading
       reads as stutter. The qualifier is carried by the description and by the
       artwork, which states it in full. */
    title: site.name,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  /* An independent concept is a legitimate thing to index — it is a portfolio
     piece, and it says what it is. Preview deployments are the exception: they
     are the same pages on a second hostname, so they are kept out of the index
     rather than left to compete with production. */
  robots: isProductionDeployment
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} ${plexMono.variable} ${tiroBangla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-parchment text-on-light">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
