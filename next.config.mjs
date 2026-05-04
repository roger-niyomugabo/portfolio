import fs from "node:fs";

// Windows is case-insensitive but Webpack's resolver is case-sensitive.
// If `next dev` is launched from a path with non-canonical casing
// (e.g. `C:\Users\hp\desktop\...` vs the real `C:\Users\hp\Desktop\...`),
// React gets bundled twice and the client-modules manifest lookup fails
// with errors like "Cannot read properties of null (reading 'useContext')"
// or "Cannot read properties of undefined (reading 'clientModules')".
// Normalize cwd to the OS-canonical case before Next computes any paths.
try {
  const realCwd = fs.realpathSync.native
    ? fs.realpathSync.native(process.cwd())
    : fs.realpathSync(process.cwd());
  if (realCwd && realCwd !== process.cwd()) {
    process.chdir(realCwd);
  }
} catch {
  // Best-effort only; fall through to Next's default behavior.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" }
    ]
  }
};

export default nextConfig;
