import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

type ButtonTypes = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren & {
  className?: string;
  link: string;
  type?: ButtonTypes;
};

const base =
  "inline-flex items-center gap-3 cursor-pointer uppercase tracking-tight font-sans font-semibold text-e-lg leading-[1] px-5 py-3 transition-colors duration-200";

export const PrimaryBtn = ({
  link = "/",
  children,
  className = "",
}: ButtonProps) => {
  return (
    <Link href={link}>
      <button
        className={`${base} bg-ink text-paper hover:bg-ink/85 ${className}`}
      >
        {children}
        <ArrowUpRight size={18} />
      </button>
    </Link>
  );
};

export const SecondaryBtn = ({
  link = "/",
  children,
  className = "",
}: ButtonProps) => {
  return (
    <Link href={link}>
      <button
        className={`${base} bg-paper text-ink border border-ink hover:bg-studio ${className}`}
      >
        {children}
        <ArrowUpRight size={18} />
      </button>
    </Link>
  );
};

export const GhostBtn = ({
  link = "/",
  children,
  className = "",
}: ButtonProps) => {
  return (
    <Link href={link}>
      <button
        className={`${base} bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 ${className}`}
      >
        {children}
        <ArrowUpRight size={18} />
      </button>
    </Link>
  );
};

export const Button = ({ type = "primary", ...props }: ButtonProps) => {
  switch (type) {
    case "secondary":
      return <SecondaryBtn {...props} />;
    case "ghost":
      return <GhostBtn {...props} />;
    default:
      return <PrimaryBtn {...props} />;
  }
};
