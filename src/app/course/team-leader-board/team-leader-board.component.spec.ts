import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeaderBoardComponent } from './team-leader-board.component';

describe('LeaderboardComponent', () => {
    let component: TeamLeaderBoardComponent;
    let fixture: ComponentFixture<TeamLeaderBoardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TeamLeaderBoardComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamLeaderBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
