/** @type {import("next").NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  transpilePackages: ["@pure-advance/design-system", "@pure-advance/domain", "@pure-advance/maps"]
};

export default nextConfig;
