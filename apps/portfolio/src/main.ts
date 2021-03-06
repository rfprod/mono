import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeSentry } from '@mono/client-services';

import { AppPortfolioClientModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

initializeSentry(environment);

platformBrowserDynamic()
  .bootstrapModule(AppPortfolioClientModule)
  .catch(err => {
    console.error(err);
  });
