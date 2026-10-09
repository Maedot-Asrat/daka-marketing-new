import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light" | "ghost-light";
  className?: string;
};

/** Pill button with the expanding arrow circle from the original site. */
export default function ArrowButton({ href, children, variant = "solid", className = "" }: Props) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const inner = (
    <>
      <span className="abtn__label">{children}</span>
      <span className="abtn__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </>
  );
  const cls = `abtn abtn--${variant} ${className}`;
  return external ? <a href={href} className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}
