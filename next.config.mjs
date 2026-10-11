/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/sanityImageLoader.js",
  },
};

export default nextConfig;
