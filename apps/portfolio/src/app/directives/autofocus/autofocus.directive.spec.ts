import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppDummyComponent } from '@mono/client-unit-testing';

import { AppAutofocusDirective } from './autofocus.directive';

describe('AppAutofocusDirective', () => {
  let fixture: ComponentFixture<AppDummyComponent>;
  let debugElement: DebugElement;
  let directive: AppAutofocusDirective;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        declarations: [AppDummyComponent, AppAutofocusDirective],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppDummyComponent);
          debugElement = fixture.debugElement.query(By.directive(AppAutofocusDirective));
          directive = debugElement.injector.get(AppAutofocusDirective);
        });
    }),
  );

  it('dummy component should compile successfully', () => {
    expect(directive).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(directive?.nativeElement?.autofocus).toBeUndefined();
    expect(directive.autofocusState).toEqual(expect.any(Boolean));
  });

  it('ngOnInit should call directive renderer invokeElementMethod if autofocus condition is met', () => {
    const focusSpy = spyOn(directive.el.nativeElement, 'focus');

    directive.autofocusState = false;
    directive.ngOnInit();
    expect(focusSpy).not.toHaveBeenCalled();

    directive.autofocusState = true;
    directive.ngOnInit();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('autofocus method should set autofocusState property', () => {
    directive.autofocus = true;
    expect(directive.autofocusState).toBeTruthy();
    directive.autofocus = false;
    expect(directive.autofocusState).toBeFalsy();
  });
});