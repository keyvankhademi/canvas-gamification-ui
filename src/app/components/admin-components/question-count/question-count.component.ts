import {Component, Input, OnInit} from '@angular/core';
import {QuestionCount} from '@app/_models/question_counts';
import {Sort} from '@angular/material/sort';
import {faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-question-count',
    templateUrl: './question-count.component.html',
    styleUrls: ['./question-count.component.scss']
})
export class QuestionCountComponent implements OnInit {
    @Input() questionCountData: QuestionCount[];
    expanded: {} = {};
    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;

    constructor() {
    }

    ngOnInit(): void {
    }

    sortData(sort: Sort) {
        if (!this.questionCountData) { // If there is no data
            return;
        }
        const tempData = this.questionCountData.slice();
        if (!sort.active || sort.direction === '') {
            this.questionCountData = tempData;
            return;
        }
        this.questionCountData = tempData.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            return this.compare(a[sort.active], b[sort.active], isAsc);
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    toggleChildTopics(questionCount: QuestionCount): void {
        this.expanded[questionCount.name] = !this.expanded[questionCount.name];
    }
}
