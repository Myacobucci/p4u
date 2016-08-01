/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { OrderCartService } from './order-cart.service';

describe('OrderCart Service', () => {
  beforeEachProviders(() => [OrderCartService]);

  it('should ...',
      inject([OrderCartService], (service: OrderCartService) => {
    expect(service).toBeTruthy();
  }));
});
