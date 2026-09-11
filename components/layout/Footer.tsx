import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { GROUND } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { NAV_LINKS } from "@/components/navigation/links";
import { organization } from "@/data/organization";

const g = GROUND.ink;

export function Footer() {
  return (
    <footer className={`${g.bg} ${g.text}`}>
      <Container className="flex flex-col gap-16 py-20 md:py-28">
        {/* The wordmark at the foot is the only place the page sets type this
            large without saying anything — it is a sign-off, not a claim. */}
        <p className="font-display text-colossal font-bold leading-[0.8] tracking-[-0.05em]">
          {organization.shortName}
        </p>

        <div className={`grid grid-cols-1 gap-10 border-t pt-10 md:grid-cols-12 ${g.border}`}>
          <div className="md:col-span-5">
            <Meta ground="ink">{organization.fullName}</Meta>
            <p className={`mt-4 max-w-sm text-body ${g.muted}`}>
              An independent, unofficial concept design project. It is not
              affiliated with, endorsed by, or representative of{" "}
              {organization.fullName} ({organization.shortName}).
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4 md:col-start-7">
            <Meta ground="ink">Sections</Meta>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="interactive"
                    className={`text-body transition-opacity duration-200 hover:opacity-100 motion-reduce:transition-none ${g.muted}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 md:col-start-11">
            <Meta ground="ink">Reference</Meta>
            <ul className="mt-4">
              <li>
                <Link
                  href="/design-system"
                  data-cursor="interactive"
                  className={`text-body transition-opacity duration-200 hover:opacity-100 motion-reduce:transition-none ${g.muted}`}
                >
                  Design system
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className={`font-mono text-meta uppercase ${g.muted}`}>
          © {new Date().getFullYear()} PKSF Digital Experience — concept project
        </p>
      </Container>
    </footer>
  );
}
