import { TestBed } from '@angular/core/testing';

import { ConviteProfessorService } from './convite-professor.service';

describe('ConviteProfessorService', () => {
  let service: ConviteProfessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConviteProfessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
