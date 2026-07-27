/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera el sitio en modo servidor Node (necesario para /api/contact en cPanel).
  poweredByHeader: false,
  compress: true,
  experimental: {
    // El hosting compartido de cPanel limita memoria y procesos durante el build.
    cpus: 1,
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
