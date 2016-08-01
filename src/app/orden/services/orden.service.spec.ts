/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { OrdenService } from './orden.service';

describe('Orden Service', () => {
  beforeEachProviders(() => [OrdenService]);

  it('should ...',
      inject([OrdenService], (service: OrdenService) => {
    expect(service).toBeTruthy();
  }));
});
