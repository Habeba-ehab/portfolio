"use client";

import { useState } from "react";
import Image from "next/image";
import { InitialsAvatar } from "./InitialsAvatar";

export function ProfilePhoto({
  src,
  alt,
  initials,
  className = "aspect-[4/5] w-full",
}: {
  src: string;
  alt: string;
  initials: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <InitialsAvatar initials={initials} />;

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="480px"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
