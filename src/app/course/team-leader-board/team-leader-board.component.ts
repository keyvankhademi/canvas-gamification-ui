import {
    Component,
    OnInit,
    Input,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import {
    MatTableDataSource
} from '@angular/material/table';
import {
    MatSort
} from '@angular/material/sort';
import {
    Team
} from "@app/_models/team"
import {
    TeamLeaderBoardService
} from '@app/course/_services/team-leader-board.service';

@Component({
    selector: 'app-team-leader-board',
    templateUrl: './team-leader-board.component.html',
    styleUrls: ['./team-leader-board.component.scss']
})
export class TeamLeaderBoardComponent implements OnInit {


    displayedColumns: string[] = ['rank', 'name', 'token'];
    teamLeaderBoardData: MatTableDataSource < {
        name: string,
        tokens: number,
    } > ;
    @ViewChild(MatSort) matSort: MatSort;


    teamTopThree: Team[] = [];
    teams: Team[] = [];
    constructor(private teamLeaderboardService: TeamLeaderBoardService) {}



    ngOnInit(): void {

        this.teamLeaderboardService
            .getTeams()
            .subscribe((teams) => {

                this.teams = teams.sort((a, b) => {
                    if (a.tokens < b.tokens) {
                        return 1;
                    }
                    if (a.tokens > b.tokens) {
                        return -1
                    }
                    return 0;
                });

                for (let i = 0; i < 3; i++) {
                    if (this.teams[0]) {
                        this.teamTopThree.push(this.teams.shift());
                    } else {
                        break;
                    }
                }
                this.teamLeaderBoardData = new MatTableDataSource(this.teams);
            });
            

    }



    // ! Methods to animate and unanimate the streak icons
    // ! Not currently in use
    // turnToGif(e: Event): void {
    //     const parent = e.target as HTMLElement;
    //     if (parent.children[2].children[0]) {
    //         const img = parent.children[2].children[0].children[0] as HTMLImageElement;
    //         const fire: string = window.location.origin + '/assets/gif/fire-still.png';
    //         const snow: string = window.location.origin + '/assets/gif/snow-still.png';
    //         if (img.src == fire) {
    //             img.src = 'assets/gif/fire.gif';
    //         } else if (img.src == snow) {
    //             img.src = 'assets/gif/snow.gif';
    //         }
    //     }
    // }

    // turnToStatic(e: Event): void {
    //     const parent = e.target as HTMLElement;
    //     if (parent.children[2].children[0]) {
    //         const img = parent.children[2].children[0].children[0] as HTMLImageElement;
    //         const fire: string = window.location.origin + '/assets/gif/fire.gif';
    //         const snow: string = window.location.origin + '/assets/gif/snow.gif';
    //         if (img.src == fire) {
    //             img.src = 'assets/gif/fire-still.png';
    //         } else if (img.src == snow) {
    //             img.src = 'assets/gif/snow-still.png';
    //         }
    //     }
    // }

}
