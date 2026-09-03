import Link from "next/link";

/**
 * Shared shell for full-page "nothing to show here" states — 404s and the
 * root error boundary. These render outside the storefront route group
 * (no Navigation/Footer/CartSlide), so this brings its own minimal header
 * and stays self-contained rather than leaving the visitor on an unstyled
 * <div> with no way back.
 */
export default function StatusPage({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="border-b border-ink/15 px-5 py-4 md:px-8">
        <Link href="/home">
          <h2 className="font-display text-2xl uppercase tracking-tight text-ink md:text-3xl">
            OM — K
          </h2>
        </Link>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-24 text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="font-display uppercase tracking-tight text-e-11xl leading-[95%] md:text-e-14xl">
          {title}
        </h1>
        <p className="max-w-md font-body text-ink/60">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {action ?? (
            <Link
              href="/home"
              className="border border-ink bg-ink px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-paper hover:bg-ink/85"
            >
              Return home
            </Link>
          )}
          <Link
            href="/products"
            className="border border-ink px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Shop all products
          </Link>
        </div>
      </div>
    </div>
  );
}
