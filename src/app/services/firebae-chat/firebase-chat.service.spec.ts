import { TestBed } from '@angular/core/testing';

import { FirebaseChatService } from './firebase-chat.service';

describe('FirebaseChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseChatService = TestBed.get(FirebaseChatService);
    expect(service).toBeTruthy();
  });
});
