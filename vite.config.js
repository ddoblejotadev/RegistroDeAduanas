import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Only enable the Base44 vite plugin when explicitly requested via env vars.
const useBase44 = !!process.env.VITE_BASE44_APP_BASE_URL || !!process.env.ENABLE_BASE44;

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  plugins: [
    ...(useBase44 ? [ base44({
      // Keep plugin opt-in for local demos; disable noisy injections by default
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: false,
      navigationNotifier: false,
      analyticsTracker: false,
      visualEditAgent: false
    })] : []),
    react(),
  ]
});
