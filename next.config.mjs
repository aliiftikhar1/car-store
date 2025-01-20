/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imghippo.com',
          // pathname: '/files/**', // Allows all files under '/files/'
        },
      ],
    },
  };
  
  export default nextConfig
  