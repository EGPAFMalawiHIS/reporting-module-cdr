import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'emc',
  appName: 'emc',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
