/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Next.js treats this project directory as the root when tracing files
  // This avoids warnings about multiple lockfiles in parent directories
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
