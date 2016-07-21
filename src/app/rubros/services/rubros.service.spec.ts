/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { RubrosService } from './rubros.service';

describe('Rubros Service', () => {
  beforeEachProviders(() => [RubrosService]);

  it('should ...',
      inject([RubrosService], (service: RubrosService) => {
    expect(service).toBeTruthy();
  }));
});
