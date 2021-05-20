import {Component, Input, OnInit} from '@angular/core';
import {NestedCategories} from '@app/_models/category';
import {faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {Sort} from '@angular/material/sort';

@Component({
    selector: 'app-category-stats',
    templateUrl: './category-stats.component.html',
    styleUrls: ['./category-stats.component.scss']
})
export class CategoryStatsComponent implements OnInit {
    @Input() categoryStatData: NestedCategories[];
    expanded: {} = {};
    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;

    constructor() {
    }

    ngOnInit(): void {
    }

    sortData(sort: Sort) {
        if (!this.categoryStatData) { // If there is no data
            return;
        }
        const tempData = this.categoryStatData.slice();
        if (!sort.active || sort.direction === '') {
            this.categoryStatData = tempData;
            return;
        }
        this.categoryStatData = tempData.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            return this.compare(a.category[sort.active], b.category[sort.active], isAsc);
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    toggleChildTopics(categoryStat: NestedCategories): void {
        this.expanded[categoryStat.category.name] = !this.expanded[categoryStat.category.name];
    }

}
