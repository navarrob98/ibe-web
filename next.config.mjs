/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera el sitio en modo servidor Node (necesario para /api/contact en cPanel).
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
