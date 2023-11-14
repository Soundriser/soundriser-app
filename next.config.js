/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {  NEXT_PUBLIC_G_KEY: process.env.NEXT_PUBLIC_G_KEY  },
  images: {
    domains: ['res.cloudinary.com', 'example2.com', 'www.serendeepity.net','hmzpinzpvkmyivqzioqe.supabase.co'],
  },
}

module.exports = nextConfig
