/* Two copies of the wordmark; CSS shows the right one for the theme. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/daka-logo-navy.png" alt="Daka Marketing" className="logo-light" width={714} height={447} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/daka-logo-white.png" alt="" aria-hidden="true" className="logo-dark" width={714} height={447} />
    </span>
  );
}
