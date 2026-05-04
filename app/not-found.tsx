import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 pt-24">
      <div className="text-center">
        <p className="font-display text-7xl font-bold gradient-text md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
          This page wandered off.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-subtle md:text-base">
          The link might be broken, or the page may have been moved. Let&apos;s
          get you back on track.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </div>
  );
}
