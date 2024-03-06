import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cdr-reporting-app',
  appName: 'cdr-reporting-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
