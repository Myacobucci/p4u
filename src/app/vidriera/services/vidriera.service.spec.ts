/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { VidrieraService } from './vidriera.service';

describe('Vidriera Service', () => {
  beforeEachProviders(() => [VidrieraService]);

  it('should ...',
      inject([VidrieraService], (service: VidrieraService) => {
    expect(service).toBeTruthy();
  }));
});
