import Image from "next/image";

export function Wordmark({ className = "" }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Markematics"
        width={140}
        height={32}
        priority
        className="h-8 w-auto"
      />
    </span>
  );
}
