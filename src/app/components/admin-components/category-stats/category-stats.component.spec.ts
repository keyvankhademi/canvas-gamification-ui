import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryStatsComponent} from './category-stats.component';

describe('CategoryStatsComponent', () => {
    let component: CategoryStatsComponent;
    let fixture: ComponentFixture<CategoryStatsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryStatsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
