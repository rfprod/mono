import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { DummyComponent } from '../../mocks/components/dummy.component';
import { AppMaterialModule } from '../../modules/material/material.module';
import { GithubService } from '../../services/github/github.service';
import { HttpHandlersService } from '../../services/http-handlers/http-handlers.service';
import { WINDOW } from '../../services/providers.config';
import { UserConfigService } from '../../services/user-config/user-config.service';
import { UiState } from '../../state/ui/ui.store';
import { AppUserService } from '../../state/user/user.service';
import { AppUserState } from '../../state/user/user.store';
import { AppLanguagesComponent } from './languages.component';

describe('AppLanguagesComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppLanguagesComponent, DummyComponent],
    imports: [
      BrowserDynamicTestingModule,
      NoopAnimationsModule,
      HttpClientTestingModule,
      AppMaterialModule,
      FlexLayoutModule,
      NgxsModule.forRoot([AppUserState, UiState]),
      RouterTestingModule.withRoutes([{ path: '', component: DummyComponent }]),
    ],
    providers: [
      { provide: WINDOW, useValue: window },
      {
        provide: MatSnackBar,
        useValue: {
          open: (): null => null,
        },
      },
      {
        provide: HttpHandlersService,
        useFactory: (snackBar: MatSnackBar) => new HttpHandlersService(snackBar),
        deps: [MatSnackBar],
      },
      {
        provide: UserConfigService,
        useFactory: (http: HttpClient, handlers: HttpHandlersService, window: Window) =>
          new UserConfigService(http, handlers, window),
        deps: [HttpClient, HttpHandlersService, WINDOW],
      },
      {
        provide: GithubService,
        useFactory: (http: HttpClient, handlers: HttpHandlersService, window: Window) =>
          new GithubService(http, handlers, window),
        deps: [HttpClient, HttpHandlersService, WINDOW],
      },
      {
        provide: AppUserService,
        useFactory: (store: Store, userConfig: UserConfigService, github: GithubService) =>
          new AppUserService(store, userConfig, github),
        deps: [Store, UserConfigService, GithubService],
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppLanguagesComponent>;
  let component: AppLanguagesComponent;
  let httpController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppLanguagesComponent);
          component = fixture.componentInstance;
          httpController = TestBed.inject(HttpTestingController);
          httpController
            .match((req: HttpRequest<unknown>): boolean => true)
            .forEach((req: TestRequest) => {
              req.flush({});
            });
          fixture.detectChanges();
        });
    }),
  );

  afterEach(() => {
    httpController
      .match((req: HttpRequest<unknown>): boolean => true)
      .forEach((req: TestRequest) => {
        req.flush({});
      });
    httpController.verify();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
