import { Capacitor } from '@capacitor/core';
import { IWebClientAppEnvironment } from '@mono/client-util';

const platform: string = Capacitor.getPlatform();

/**
 * Development environment variables.
 * This file can be replaced during build by using the `fileReplacements` array.
 * `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.
 *
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown:
 *
 * import 'zone.js/dist/zone-error';  // Included with Angular CLI.
 */
export const environment: IWebClientAppEnvironment = {
  production: false,
  platform,
  appName: 'Portfolio',
  api: window.location.origin.includes('localhost') ? 'http://localhost:8080/api' : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8082',
  sentry: {
    env: 'development',
    dsn: 'https://8d1b8e74d9e64ab7946fa0f0aac9704b@o551250.ingest.sentry.io/5674548',
    tracingOrigins: ['localhost:4200', 'https://rfprod-2cda1.web.app', 'https://rfprod-2cda1.firebaseapp.com', 'https://rfprod.tk'],
  },
};
