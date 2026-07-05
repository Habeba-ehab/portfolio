export function InitialsAvatar({
  initials = "HE",
  className = "",
}: {
  initials?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-red/90 to-paper-dim ${className}`}
    >
      <span className="font-display text-6xl text-ink tracking-wider">
        {initials}
      </span>
    </div>
  );
}
