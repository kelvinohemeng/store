import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

type ButtonTypes = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren & {
  className?: string;
  link: string;
  type?: ButtonTypes;
};

export const PrimaryBtn = ({
  link = "/",
  children,
  className = "",
}: ButtonProps) => {
  return (
    <Link href={link}>
      <button
        className={`flex px-1 cursor-pointer items-center gap-3 bg-white text-black rounded-full ${className}`}
      >
        <div className="py-3 pl-3">
          <p className="leading-[1] text-e-lg font-semibold tracking-tight">
            {children}
          </p>
        </div>
        <div className="bg-black h-[28px] aspect-square rounded-full grid place-items-center">
          <ArrowUpRight size={16} color="white" />
        </div>
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
        className={`flex px-1 cursor-pointer items-center gap-3 bg-black text-white rounded-full border border-white ${className}`}
      >
        <div className="py-3 pl-3">
          <p className="leading-[1] text-e-lg font-semibold tracking-tight">
            {children}
          </p>
        </div>
        <div className="bg-white h-[28px] aspect-square rounded-full grid place-items-center">
          <ArrowUpRight size={16} color="black" />
        </div>
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
        className={`flex px-1 cursor-pointer items-center gap-3 bg-transparent text-white rounded-full border border-white/30 hover:border-white/70 transition-all ${className}`}
      >
        <div className="py-3 pl-3">
          <p className="leading-[1] text-e-lg font-semibold tracking-tight">
            {children}
          </p>
        </div>
        <div className="bg-white/20 hover:bg-white/40 transition-all h-[28px] aspect-square rounded-full grid place-items-center">
          <ArrowUpRight size={16} color="white" />
        </div>
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
