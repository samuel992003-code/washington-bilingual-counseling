interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  children,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-5 text-warm-gray text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
