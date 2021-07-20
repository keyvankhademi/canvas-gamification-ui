import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProblemPracticeComponent} from "@app/components/problem-practice/problem-practice.component";


describe('ProblemPracticeComponent', () => {
    let component: ProblemPracticeComponent;
    let fixture: ComponentFixture<ProblemPracticeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProblemPracticeComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemPracticeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
