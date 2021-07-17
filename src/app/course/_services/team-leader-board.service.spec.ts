import { TestBed } from '@angular/core/testing';

import { TeamLeaderBoardService } from './team-leader-board.service';

describe('TeamLeaderBoardService', () => {
  let service: TeamLeaderBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamLeaderBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
