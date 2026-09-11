import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { organization } from "@/data/organization";

const links = [
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Impact", href: "/impact" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Digital", href: "/digital" },
  { label: "News", href: "/news" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-background">
      <Container className="flex flex-col gap-16 py-16 md:py-24">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <p className="font-display text-3xl md:text-4xl">{organization.shortName}</p>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-background/70 transition-colors hover:text-background"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-4 border-t border-background/15 pt-8 text-xs text-background/60 md:flex-row md:items-center md:justify-between">
          <p>
            This is an independent, unofficial concept design project. It is
            not affiliated with, endorsed by, or representative of the{" "}
            {organization.fullName} ({organization.shortName}).
          </p>
          <p>&copy; {new Date().getFullYear()} PKSF Digital Experience — concept project.</p>
        </div>
      </Container>
    </footer>
  );
}
