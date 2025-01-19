import { TestBed } from '@angular/core/testing';

import { QuestiongenerationService } from './questions_generation.service';

describe('QuestiongenerationService', () => {
  let service: QuestiongenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestiongenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
