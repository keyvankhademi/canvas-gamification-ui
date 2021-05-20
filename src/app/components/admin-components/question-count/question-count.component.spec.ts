import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionCountComponent} from './question-count.component';

describe('QuestionCountComponent', () => {
    let component: QuestionCountComponent;
    let fixture: ComponentFixture<QuestionCountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuestionCountComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
