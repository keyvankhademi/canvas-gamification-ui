
import {TestBed} from '@angular/core/testing';

import {LeaderBoardService} from './leaderboard.service';
import {TestModule} from '@test/test.module';

describe('CourseService', () => {
    let service: LeaderBoardService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(LeaderBoardService);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
