import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex min-h-[80vh] items-center pt-24">
      <div>
        <p className="font-display text-8xl font-extrabold leading-none text-accent md:text-[10rem]">
          404.
        </p>
        <h1 className="mt-5 font-display text-2xl font-semibold md:text-[28px]">
          This page wandered off.
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-subtle md:text-lg">
          The link might be broken, or the page may have been moved. Let&apos;s
          get you back on track.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </div>
  );
}
