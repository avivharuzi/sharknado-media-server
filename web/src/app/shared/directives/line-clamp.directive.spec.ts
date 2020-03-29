import { ElementRef, PLATFORM_ID } from '@angular/core';
import { inject } from '@angular/core/testing';

import { LineClampDirective } from './line-clamp.directive';

describe('LineClampDirective', () => {
  it('should create an instance', inject([ElementRef], (elementRef: ElementRef) => {
    const directive = new LineClampDirective(elementRef, PLATFORM_ID);
    expect(directive).toBeTruthy();
  }));
});
