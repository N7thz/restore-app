import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["localhost"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  // Configurações para produção na Vercel
  outputFileTracingRoot: process.env.NODE_ENV === "production" ? "./" : undefined,
  
  // Configurações de cache e otimização
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Configurações para API routes
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
    responseLimit: false,
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.CORS_ORIGIN || "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ]
  },
  
  typedRoutes: true,
}

export default nextConfig
