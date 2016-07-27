/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { RegalosService } from './regalos.service';

describe('Regalos Service', () => {
  beforeEachProviders(() => [RegalosService]);

  it('should ...',
      inject([RegalosService], (service: RegalosService) => {
    expect(service).toBeTruthy();
  }));
});
