/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // MediaPipe libraries should only be loaded on the client side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
  // Ensure MediaPipe is treated as external or handled correctly
  serverExternalPackages: ['@mediapipe/face_mesh', '@mediapipe/camera_utils'],
};

module.exports = nextConfig;

