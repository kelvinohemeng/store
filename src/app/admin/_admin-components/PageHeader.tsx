import { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  actions,
}: {
  eyebrow?: string;
  title: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-200">
      <div>
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 mb-1">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          {title}
        </h1>
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
