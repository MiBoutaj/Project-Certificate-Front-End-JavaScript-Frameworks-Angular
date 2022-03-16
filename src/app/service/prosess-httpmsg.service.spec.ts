import { TestBed } from '@angular/core/testing';

import { ProsessHTTPMsgService } from './prosess-httpmsg.service';

describe('ProsessHTTPMsgService', () => {
  let service: ProsessHTTPMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProsessHTTPMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
