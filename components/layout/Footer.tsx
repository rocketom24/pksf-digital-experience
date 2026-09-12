import Link from "next/link";
import { GROUND } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { Container } from "@/components/layout/Container";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { Rise } from "@/components/motion/Rise";
import { Stagger } from "@/components/motion/Stagger";
import {
  FacebookMark,
  GlobeMark,
  MailMark,
  PhoneMark,
  RocketMark,
  YouTubeMark,
} from "@/components/ui/Marks";
import { NAV_LINKS } from "@/components/navigation/links";
import {
  channels,
  headOffice,
  organization,
  type Channel,
  type ChannelKind,
} from "@/data/organization";
import { type ComponentType } from "react";

/**
 * The last band of the page, and the only one that is PKSF green.
 *
 * ── Why forest, when the footer used to be ink ────────────────────────────
 * The section above it — "In closing" — is ink, and an ink footer under it
 * made one undifferentiated dark run a third of a screen long: the page ended
 * without ever saying that it had. Forest is PKSF's own green and the ground
 * the vision panel used to hold, so closing on it reads as the institution
 * signing the page rather than as the page trailing off. It is also the one
 * remaining ground the homepage no longer visits, which is what makes the
 * seam legible.
 *
 * `data-ground` matters here and was missing before: the custom cursor reads
 * the nearest one to choose an ink that contrasts with what it is over, and
 * without it the wedge fell back to the parchment pairing — deep forest fill,
 * cream stroke — on a dark green ground.
 *
 * ── What it is composed of ────────────────────────────────────────────────
 * Five blocks, in the order a reader needs them: the closing address to the
 * reader and the one link that answers it; where PKSF actually is, beside a
 * map of it; every channel PKSF publishes; the page's own index; and the
 * wordmark as a sign-off, over a rule that takes you back to the top.
 *
 * ── What is PKSF's and what is ours ───────────────────────────────────────
 * Every address line, number, channel and destination below is PKSF's own,
 * off pksf.org.bd. The coordinate under the map is not — PKSF publishes no
 * coordinate — and the caption says whose it is. See `data/organization.ts`.
 */

const GROUND_NAME = "forest" as const;
const g = GROUND[GROUND_NAME];

/** The closing address, broken where it should break so each line can rise. */
const CLOSING = ["Everything here", "points back", "to PKSF itself."] as const;

/**
 * The Bangla.
 *
 * PKSF is a Bangladeshi institution publishing in two languages, and this page
 * is set in English throughout — so the footer, which is where the page says
 * who it is talking about, is the one place that should not be monolingual.
 *
 * Two different things are set in Bangla here and they carry different
 * provenance, which is why they are separated rather than listed together:
 *
 * · The two names in `organization.bangla*` are the institution's own, and
 *   they carry different marks — the short name is on pksf.org.bd, the
 *   expansion is not. `data/organization.ts` has the whole note. They go
 *   under the wordmark, where they are the same name in the other script
 *   rather than a translation of anything.
 *
 * · Everything in `BN` is **this page's own rendering** of this page's own
 *   English, and is marked as an editorial reading where it appears. PKSF
 *   does not publish an English-to-Bangla glossary of its site furniture, so
 *   inventing one and presenting it as PKSF's would be exactly the kind of
 *   quiet attribution error the provenance system exists to catch. The
 *   possessive is set `পিকেএসএফ-এর`, which is the form PKSF's own releases
 *   use.
 *
 * `lang="bn"` is on every one of them so a screen reader switches voice, and
 * the face is `--font-bangla` (Tiro Bangla) because none of the three Latin
 * faces carries Bengali at all — Bangla set in them falls back to whatever the
 * device happens to have.
 */
const BN = {
  contact: "যোগাযোগ",
  headOffice: "প্রধান কার্যালয়",
  channels: "মাধ্যম",
  sections: "বিভাগ",
  reference: "সূত্র",
  backToTop: "উপরে ফিরে যান",
  closing: "এই পাতার প্রতিটি তথ্য পিকেএসএফ-এর নিজস্ব প্রকাশনা থেকে নেওয়া।",
} as const;

/** A Bangla line, in its own face and its own language. */
function Bangla({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span lang="bn" className={`font-bangla ${className}`}>
      {children}
    </span>
  );
}

/** The label row every block in this footer opens with: rule, name, Bangla. */
function FooterLabel({ en, bn }: { en: string; bn: string }) {
  return (
    <Reveal>
      <span className="flex items-center gap-3">
        <span aria-hidden="true" className={`h-px w-8 shrink-0 ${g.rule}`} />
        <Meta ground={GROUND_NAME}>{en}</Meta>
      </span>
      <Bangla className={`mt-2 block pl-11 text-body leading-snug ${g.muted}`}>{bn}</Bangla>
    </Reveal>
  );
}

const CHANNEL_MARK: Record<ChannelKind, ComponentType<{ className?: string }>> = {
  facebook: FacebookMark,
  youtube: YouTubeMark,
  website: GlobeMark,
  email: MailMark,
  phone: PhoneMark,
};

/**
 * The disc a channel mark sits on.
 *
 * Paper, on every channel, regardless of what the glyph inside it is. Two of
 * the five are the platforms' own artwork and may not be recoloured — and
 * Facebook blue on PKSF green is 1.6:1, so the mark cannot simply be dropped
 * onto the ground either. Giving all five the same light disc is the one move
 * that keeps the brand marks correct, keeps the drawn glyphs legible, and
 * leaves the row reading as one set rather than as two. It is the same reason
 * the video thumbnails carry their YouTube badge on a ground of its own.
 *
 * 44px, which is also a comfortable touch target.
 */
function ChannelDisc({ kind }: { kind: ChannelKind }) {
  const Mark = CHANNEL_MARK[kind];
  const brand = kind === "facebook" || kind === "youtube";

  return (
    <span
      aria-hidden="true"
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-on-light transition-transform duration-300 ease-[var(--ease-editorial)] motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none"
    >
      <Mark className={brand ? "size-5" : "size-[1.15rem]"} />
    </span>
  );
}

/** One published channel, as a row that says what it is and where it goes. */
function ChannelRow({ name, detail, href, kind, external }: Channel) {
  return (
    <a
      href={href}
      data-cursor="interactive"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group relative flex items-center gap-4 py-3.5 ${g.text}`}
    >
      <ChannelDisc kind={kind} />

      <span className="min-w-0 flex-1">
        <span className="block font-display text-body font-medium">{name}</span>
        {/* `break-words`, not truncation: an email address and a channel name
            are both things a reader may want to read in full, and at 390 the
            column is 358px wide. */}
        <span className={`mt-0.5 block break-words font-mono text-meta ${g.muted}`}>
          {detail}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 ease-[var(--ease-editorial)] motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
      >
        →
      </span>

      {/* The row's own rule, drawn the way `Button`'s is: a permanent hairline
          with a full-strength one growing across it from the left. */}
      <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-px ${g.rule}`} />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-400 ease-[var(--ease-editorial)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />

      {external && <span className="sr-only"> — opens in a new tab</span>}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-ground={GROUND_NAME}
      className={`relative isolate overflow-x-clip ${g.bg} ${g.text}`}
    >
      {/* The change of register at the seam. The band above is ink, and two
          dark grounds meeting need the hairline to be read as two. */}
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-px ${g.rule}`} />

      {/* ── 1 — The closing address ────────────────────────────────────────
          Spector closes on a question and one link that answers it. This page
          cannot ask a reader to get in touch — it is not PKSF and nobody here
          would answer — so the closing statement is the honest version of the
          same move: it says where everything above came from, and the link
          that answers it is PKSF's own address, set at the size Spector sets
          its call to action. */}
      <Container className="pt-20 md:pt-24 lg:pt-28">
        <FooterLabel en="Contact — PKSF" bn={BN.contact} />

        {/* A `div` with an explicit heading role, not an `<h2>`: each line
            needs a block-level mask around a block-level motion element, and
            `<h2>` takes phrasing content only. Same shape as Team's ladder. */}
        <div role="heading" aria-level={2} className="mt-8 md:mt-10">
          {CLOSING.map((line, i) => (
            <Rise key={line} distance={96} delay={i * 0.08}>
              <span className="block max-w-5xl font-display text-display font-semibold">
                {line}
              </span>
            </Rise>
          ))}
        </div>

        {/* The same sentence in Bangla, under the English rather than beside
            it — the display lines are the statement and this is the statement
            repeated, not a second claim. Set at lead size in the serif Bangla
            face, which is the register the prose is in everywhere else. */}
        <Reveal delay={0.28} className="mt-6">
          {/* The Bangla is not marked here. A mono provenance block between
              the display statement and the sentence under it broke the one
              composition in this footer that has to read as a single move —
              it is filed in the colophon instead, where it covers every
              Bangla string on the page at once rather than only this one. */}
          <Bangla className={`block max-w-2xl text-lead leading-relaxed ${g.muted}`}>
            {BN.closing}
          </Bangla>
        </Reveal>

        <div className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className={`max-w-xl text-lead ${g.muted}`}>
              This is an independent concept, not a PKSF site. The institution
              keeps its own address, its own numbers and its own channels —
              every one below is PKSF&rsquo;s, taken from pksf.org.bd.
            </p>
          </Reveal>

          {/* The call to action, and the only thing at this size in the
              footer other than the wordmark. It is the address PKSF publishes
              for itself, so the strongest affordance on the page's last screen
              still points at the institution rather than at this concept. */}
          <Reveal delay={0.12} className="lg:col-span-6">
            <a
              href={`mailto:${organization.email}`}
              data-cursor="interactive"
              className="group relative inline-block max-w-full pb-3"
            >
              <span className="block break-words font-display text-headline font-semibold tracking-tight">
                {organization.email}
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-px ${g.rule}`}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
            </a>
            <ProvenanceMark
              kind="verified"
              ground={GROUND_NAME}
              note="PKSF — Contact"
              className="mt-5"
            />
          </Reveal>
        </div>
      </Container>

      {/* ── 2 — Where PKSF is, and how to reach it ─────────────────────────
          One row of three at `lg`: the address, the channels, the map.

          These were two rows and the footer was a third taller for it. Both
          were governed by one tall column and padded out with empty space
          beside it — the register beside the square, then the five channel
          rows beside two short link lists. Run as thirds they answer one
          question between them and the row is as tall as its tallest column
          instead of as tall as two of them.

          The square is what makes the arithmetic work: it is as tall as it is
          wide, so every column it gives up comes off the row twice. At a third
          of the measure it is 405px and no longer the thing setting the height.

          `gap-x-8` until `lg`: twelve columns at 834 have 786px to divide, and
          eleven 64px gutters take 704 of them. The wide gutter only arrives
          with the wide measure — and at 834 three columns is one too many, so
          the address and the channels pair off and the map takes its own row
          under them, capped rather than run to the full 786px measure.

          The columns are in document order at every width, so the tab order a
          keyboard reader gets is the order a sighted reader sees. */}
      {/* `#contact` — the navigation's Contact word addresses this row. The
          footer already was the contact register; it simply had no id. */}
      <Container id="contact" className="mt-20 scroll-mt-28 md:mt-24">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-12 lg:gap-x-16">
          <div className="md:col-span-6 lg:col-span-4">
            <FooterLabel en="Head office" bn={BN.headOffice} />

            {/* Set at title size, because on a page that publishes provenance
                for everything the address is a fact like any other and this is
                the size the page sets facts at. Not italic, not centred, and
                not shrunk into a column of small print. */}
            <address className="mt-6 not-italic">
              <span className="block max-w-sm font-display text-title font-medium">
                {/* Five lines, exactly as PKSF sets them on its contact page.
                    No country appended: the published address ends at the
                    postcode, and completing someone's address for them is
                    still editing it. */}
                {organization.headquarters.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>

              {/* Telephone and fax, kept apart. The page used to print all
                  four numbers as one run of telephone numbers; two of them
                  are the fax lines. */}
              <dl className={`mt-8 grid gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-2 ${g.border}`}>
                <div>
                  <dt>
                    <Meta ground={GROUND_NAME}>Telephone</Meta>
                  </dt>
                  <dd className="m-0 mt-3 font-mono text-body">
                    {organization.phones.map((number) => (
                      <span key={number} className="block">
                        {number}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>
                    <Meta ground={GROUND_NAME}>Fax</Meta>
                  </dt>
                  <dd className={`m-0 mt-3 font-mono text-body ${g.muted}`}>
                    {organization.fax.map((number) => (
                      <span key={number} className="block">
                        {number}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </address>

            {/* The disclaimer used to sit here, filling the empty foot of a
                short column beside a tall square. The columns are thirds now
                and there is no empty foot to fill, so it is back in the
                colophon where it belongs — and this column is no longer the
                one setting the height of the row. */}
          </div>

          {/* ── The channels ──────────────────────────────────────────────
              Second of the three, between the address and the map: the
              register says where PKSF is, this says how to reach it, and the
              map shows it. At 834 it pairs off with the address and the map
              drops below them both. */}
          <div className="md:col-span-6 lg:col-span-4">
            <FooterLabel en={`Channels — ${channels.length}`} bn={BN.channels} />

            <Stagger className={`mt-6 border-t ${g.border}`} step={0.06}>
              {channels.map((channel) => (
                <ChannelRow key={channel.kind} {...channel} />
              ))}
            </Stagger>

            <ProvenanceMark
              kind="verified"
              ground={GROUND_NAME}
              /* Worth stating rather than leaving as an absence: a reader who
                 does not find a LinkedIn or an X link here should know it is
                 because there is not one to link, not because it was missed. */
              note="the two social accounts linked from pksf.org.bd. PKSF publishes no other"
              className="mt-6 max-w-sm"
            />
          </div>

          {/* ── The map ───────────────────────────────────────────────────
              A square inset at the same radius the page gives its larger
              panels, with the ground's own hairline as its border. The frame
              is `isolate` and clips the iframe's corners, which a bare iframe
              will not do on its own.

              It is Google's map, undarkened and unfiltered. Inverting a map
              into the palette is the usual move and it inverts Google's own
              attribution with it, which is the one thing the Maps terms do not
              allow — and the light inset reads as a printed plate on this
              ground anyway, which is how the page already treats photographs.

              `loading="lazy"` is doing real work here: the footer sits some
              twenty thousand pixels down, so nothing of Google's is fetched
              until a reader has actually scrolled to the end. */}
          <Reveal delay={0.1} className="md:col-span-12 lg:col-span-4">
            {/* At `md` the map has a row to itself, and a square capped at
                380px there leaves the other half of an 834px measure empty —
                so at that one width its captions sit beside it instead of
                under it, which fills the measure and takes 150px off the
                footer. Above and below `md` the map has a column of its own
                and the captions go back under it. */}
            <div className="md:flex md:items-start md:gap-8 lg:block">
              <div
                className={`relative isolate aspect-square w-full max-w-md shrink-0 overflow-hidden rounded-2xl border bg-paper md:w-[380px] md:max-w-none lg:w-full ${g.border}`}
              >
                <iframe
                  src={headOffice.embedUrl}
                  title={`Map — ${organization.shortName} head office, ${organization.headquarters.join(", ")}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              <div className="min-w-0 md:flex-1">
            <div className="mt-6 flex max-w-md flex-wrap items-center justify-between gap-x-8 gap-y-4 md:mt-0 md:max-w-none lg:mt-6">
              <a
                href={headOffice.openUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="group relative inline-flex items-center gap-3 pb-2 font-display text-body font-medium"
              >
                Open in Google Maps
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-current opacity-30" />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-400 ease-[var(--ease-editorial)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
                <span className="sr-only"> — opens in a new tab</span>
              </a>

              <Meta ground={GROUND_NAME}>
                {headOffice.lat.toFixed(5)}° N · {headOffice.lng.toFixed(5)}° E
              </Meta>
            </div>

            {/* PKSF publishes the plot, not the coordinate. Said plainly,
                because the pin is the one thing in this footer that is not
                off a PKSF page. */}
            <ProvenanceMark
              kind="editorial"
              ground={GROUND_NAME}
              note={
                <>
                  the address is PKSF&rsquo;s; the coordinate is the{" "}
                  <a
                    href={headOffice.coordinateSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="interactive"
                    className="underline underline-offset-4"
                  >
                    {headOffice.coordinateSource}
                  </a>
                  , which carries the same plot number
                </>
              }
              className="mt-4 max-w-md"
            />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* ── 3 — The index, and the sign-off ────────────────────────────────
          The two link lists and the wordmark share one row rather than taking
          a block each. They were separate and the wordmark block was three
          hundred pixels of mostly empty measure with four letters at the left
          of it — the lists fill that measure and the row is as tall as the
          longer of them.

          At `lg` the wordmark is placed into the first six columns even though
          it is last in the document: a sign-off belongs at the end of the
          markup and at the end of the page on a phone, and nothing in that
          column is interactive, so moving it visually cannot put the tab order
          out of step with what is on screen. */}
      <Container className="mt-20 md:mt-24">
        {/* `items-start`, not `items-end`. Hanging the three columns off a
            shared baseline sounds right and is not: the two link lists are
            different lengths, so bottom-aligning them left the two-item
            Reference column floating halfway down the row with nothing above
            it. They start together instead. */}
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:items-start lg:gap-x-16">
          <nav
            aria-label="Footer"
            className="lg:col-span-3 lg:col-start-8 lg:row-start-1"
          >
            <FooterLabel en="Sections" bn={BN.sections} />

            <Stagger className="mt-6" step={0.05}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="nav"
                  className={`group flex items-baseline gap-3 py-1.5 font-display text-body transition-colors duration-200 motion-reduce:transition-none ${g.muted} hover:text-on-forest`}
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-0 shrink-0 self-center bg-current transition-[width] duration-300 ease-[var(--ease-editorial)] group-hover:w-5 group-focus-visible:w-5 motion-reduce:transition-none"
                  />
                  {link.label}
                </Link>
              ))}
            </Stagger>
          </nav>

          <div className="lg:col-span-2 lg:col-start-11 lg:row-start-1">
            <FooterLabel en="Reference" bn={BN.reference} />

            <Stagger className="mt-6" step={0.05}>
              <a
                href={organization.website}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className={`block py-1.5 font-display text-body underline-offset-4 transition-colors duration-200 hover:underline motion-reduce:transition-none ${g.muted} hover:text-on-forest`}
              >
                pksf.org.bd
                <span className="sr-only"> — opens in a new tab</span>
              </a>
              <Link
                href="/design-system"
                data-cursor="nav"
                className={`block py-1.5 font-display text-body underline-offset-4 transition-colors duration-200 hover:underline motion-reduce:transition-none ${g.muted} hover:text-on-forest`}
              >
                Design system
              </Link>
            </Stagger>
          </div>

          {/* ── The sign-off ──────────────────────────────────────────────
              The wordmark is the only place the page sets type this large
              without saying anything, and it is the last thing on it.

              `leading-[0.8]` and the negative tracking are the colossal
              token's own settings pushed one step further — at four letters
              there is no wrapping risk, and the tighter the set the more it
              reads as a mark rather than as a word.

              Under it, the institution's name in both scripts and at both
              lengths. The Bangla short name leads, because that is the one
              PKSF actually writes; the expansion follows it at prose size.
              The two marks under them are the point: one of those strings is
              on pksf.org.bd and the other is not. */}
          <div className="sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Rise distance={120}>
              <p className="font-display text-colossal font-bold leading-[0.8] tracking-[-0.05em]">
                {organization.shortName}
              </p>
            </Rise>

            <Reveal delay={0.18} className={`mt-5 border-t pt-5 ${g.border}`}>
              <p className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <Bangla className="text-title font-bold">
                  {organization.banglaShortName}
                </Bangla>
                <Bangla className={`text-lead ${g.muted}`}>
                  {organization.banglaFullName}
                </Bangla>
              </p>
              <Meta ground={GROUND_NAME} className="mt-3 block normal-case">
                {organization.fullName}
              </Meta>

              <div className="mt-5 flex flex-col gap-3">
                <ProvenanceMark
                  kind="verified"
                  ground={GROUND_NAME}
                  note={`${organization.banglaShortName} — how PKSF writes its own short name in its own Bangla releases on pksf.org.bd`}
                  className="max-w-xl"
                />
                <ProvenanceMark
                  kind="pending"
                  ground={GROUND_NAME}
                  note={`${organization.banglaFullName} — the expansion is not printed anywhere on pksf.org.bd; it is the standard Bangla name, hyphenated as PKSF hyphenates the English`}
                  className="max-w-xl"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* ── 5 — The baseline, and the way back up ──────────────────────────
          The whole strip is the control. A plain anchor to the top of the
          hero, so it works with no JavaScript, moves keyboard focus the way a
          link is supposed to, and inherits its smoothness from
          `scroll-behavior` in globals.css — which is already switched off
          under `prefers-reduced-motion`, so the preference is honoured without
          this component knowing anything about it.

          Under the pointer the rocket lifts out of its disc and the exhaust
          fires, the rule above it draws across, and the label steps up. None
          of it is load-bearing: without a single one of those the strip is
          still a labelled link to the top of the page. */}
      <Container className="mt-16 pb-10 md:mt-20 md:pb-12">
        <a
          href="#top"
          data-cursor="nav"
          className={`rocket-launch group relative flex items-center justify-between gap-6 border-t pt-8 ${g.border}`}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-current transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
          />

          <span className="transition-transform duration-400 ease-[var(--ease-editorial)] motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none">
            <span className="block font-mono text-meta uppercase">Back to the top</span>
            <Bangla className={`mt-1 block text-body leading-snug ${g.muted}`}>
              {BN.backToTop}
            </Bangla>
          </span>

          {/* The disc is deliberately large. It closes a rule that runs the
              full 1344px measure, and at 56px it read as a stray icon at the
              end of a very long line rather than as the thing the line leads
              to. It is also `overflow-hidden`, which is what lets the rocket
              travel up out of its own frame instead of drifting inside it. */}
          <span
            aria-hidden="true"
            className={`flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-colors duration-400 ease-[var(--ease-editorial)] group-hover:border-on-forest motion-reduce:transition-none md:size-24 ${g.border}`}
          >
            <RocketMark
              className="rocket h-11 w-auto transition-transform duration-500 ease-[var(--ease-editorial)] motion-safe:group-hover:-translate-y-2 motion-safe:group-focus-visible:-translate-y-2 motion-reduce:transition-none md:h-14"
              hole="var(--forest)"
            />
          </span>
        </a>

        {/* The colophon. Last and smallest: what this page actually is, what
            it is not, and — said once, here — which of the two languages on it
            the institution itself wrote. Two columns, so the disclaimer and
            the marks fill a measure that would otherwise be a stack of short
            lines down the left edge. */}
        <div className="mt-8 grid gap-x-16 gap-y-6 lg:grid-cols-12">
          <p className={`text-body lg:col-span-6 ${g.muted}`}>
            An independent, unofficial concept design project. It is not
            affiliated with, endorsed by, or representative of{" "}
            {organization.fullName} ({organization.shortName}). Every fact on
            this site is sourced from PKSF&rsquo;s own publications and is
            marked with where it came from.
          </p>

          <div className="flex flex-col gap-4 lg:col-span-5 lg:col-start-8">
            <ProvenanceMark
              kind="editorial"
              ground={GROUND_NAME}
              note="the Bangla section labels and the closing line above are this page's own rendering of its own English. The institution's own two names, under the wordmark, are marked separately"
            />
            <p className={`font-mono text-meta uppercase ${g.muted}`}>
              © {year} PKSF Digital Experience — concept project, not
              affiliated with PKSF
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
