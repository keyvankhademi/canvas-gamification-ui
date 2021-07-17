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
import { LeaderBoardStudents} from '@app/_models/leader_board';
import { LeaderBoardService } from '@app/_services/api/leaderboard.service';

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit, AfterViewInit {



    // Array of objects
    // Storing the top three users and their number of tokens
    topThree: {
        name: string,
        token: number
    } [] = [];

    // Array of objects
    // Storing all users in the leaderboard
    // Passed down from the course component
    @Input() leaderBoard: {
        name: string,
        token: number,
    } [];



    displayedColumns: string[] = ['rank', 'name', 'token'];
    leaderBoardData: MatTableDataSource < {
        name: string,
        token: number,
    } > ;
    @ViewChild(MatSort) matSort: MatSort;


    teamTopThree: LeaderBoardStudents[] = [];
    teamUsers: LeaderBoardStudents[] = [];
    constructor(private leaderboardService: LeaderBoardService) {}



    ngOnInit(): void {

        this.leaderboardService
            .getLeaderBoard()
            .subscribe((users) => {
                console.log(users);
                this.teamUsers = users.sort((a, b) => {
                    if (a.token_value < b.token_value) {
                        return 1;
                    }
                    if (a.token_value > b.token_value) {
                        return -1;
                    }
                    return 0;
                });

                for (let i = 0; i < 3; i++) {
                    this.teamTopThree.push(this.teamUsers.shift());
                }
            });

        // Sort the input leaderboard in descending order based on number of tokens
        this.leaderBoard = this.leaderBoard.sort((a, b) => {
            if (a.token < b.token) {
                return 1;
            }
            if (a.token > b.token) {
                return -1;
            }
            return 0;
        });

        // Pop the top three users from leaderBoard and store them in topThree
        for (let i = 0; i < 3; i++) {
            if (this.leaderBoard[0]) {
                this.topThree.push(this.leaderBoard.shift());
            } else {
                break;
            }
        }

    }



    ngAfterViewInit(): void {
        // intialize the datasource for the matTable from leaderBoard
        this.leaderBoardData = new MatTableDataSource(this.leaderBoard);


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
