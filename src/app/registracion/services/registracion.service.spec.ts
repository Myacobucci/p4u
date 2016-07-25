/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { RegistracionService } from './registracion.service';

describe('Registracion Service', () => {
  beforeEachProviders(() => [RegistracionService]);

  it('should ...',
      inject([RegistracionService], (service: RegistracionService) => {
    expect(service).toBeTruthy();
  }));
});
