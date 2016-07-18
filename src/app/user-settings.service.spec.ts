/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { UserSettingsService } from './user-settings.service';

describe('UserSettings Service', () => {
  beforeEachProviders(() => [UserSettingsService]);

  it('should ...',
      inject([UserSettingsService], (service: UserSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
