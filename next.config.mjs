/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  typedRoutes: false,
  devIndicators: false
};

export default nextConfig;
