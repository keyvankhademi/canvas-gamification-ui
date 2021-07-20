import {Component, OnInit} from '@angular/core';
import {UQJ} from "@app/_models";
import {UqjService} from "@app/problems/_services/uqj.service";

@Component({
    selector: 'app-problem-practice',
    templateUrl: './problem-practice.component.html',
    styleUrls: ['./problem-practice.component.scss']
})
export class ProblemPracticeComponent implements OnInit {
    uqjs: UQJ[];
    currentUqj: UQJ;

    constructor(private uqjService: UqjService) {
    }

    ngOnInit(): void {
        this.uqjService.getUQJs().subscribe((paginatedUqjs) => {
            this.uqjs = paginatedUqjs.results.filter(uqj => uqj.question.event === null);
            this.currentUqj = this.uqjs[this.uqjs.length - 1];
        });
    }

    skipQuestion(): void {
        const skippedUqj = this.uqjs.pop();
        this.uqjs.unshift(skippedUqj);
        this.currentUqj = this.uqjs[this.uqjs.length - 1];
    }

}
