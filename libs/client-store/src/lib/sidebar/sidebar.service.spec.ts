import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@mono/client-unit-testing';

import { AppSidebarStoreModule } from './sidebar.module';
import { AppSidebarService } from './sidebar.service';

describe('AppSidebarService', () => {
  let service: AppSidebarService;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppSidebarStoreModule],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppSidebarService);
        });
    }),
  );

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
