import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {faEye, faPencilAlt, faTrashAlt, faDownload} from '@fortawesome/free-solid-svg-icons';
import {Category, Question} from '@app/_models';
import {QuestionService} from '@app/_services/api/question.service';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {ToastrService} from "ngx-toastr";
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatTableDataSource} from '@angular/material/table';
import {CategoryService} from "@app/_services/api/category.service";
import {Difficulty} from "@app/_models/difficulty";
import {DifficultyService} from "@app/_services/api/problem/difficulty.service";
import {DomSanitizer} from "@angular/platform-browser";
import {formatDate} from "@angular/common";
import {ImportExportService} from "@app/_services/api/import-export.service";

@Component({
    selector: 'app-problem-set',
    templateUrl: './problem-set.component.html',
    styleUrls: ['./problem-set.component.scss']
})
export class ProblemSetComponent implements OnInit {
    formData: FormGroup;
    faEye = faEye;
    faPencilAlt = faPencilAlt;
    faTrashAlt = faTrashAlt;
    faDownload = faDownload;
    questions: Question[];
    questionsSource: MatTableDataSource<Question>;

    // Pagination
    questionsLength: number;
    pageSize: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageEvent: PageEvent;

    // Sorting
    ordering: string;

    // Filtering
    filterQueryString;

    // Modal
    deleteQuestionId: number;

    paramChanged: Subject<{
        page: number,
        page_size: number,
        search: string,
        parentCategory: string,
        subCategory: string,
        difficulty: string,
        is_sample: string,
        ordering: string
    }> = new Subject<{
        page: number,
        page_size: number,
        search: string,
        parentCategory: string,
        subCategory: string,
        difficulty: string,
        is_sample: string,
        ordering: string
    }>();
    displayedColumns: string[] = ['id', 'title', 'author', 'event__name', 'category__parent__name', 'category__name',
        'difficulty', 'token_value', 'avg_success', 'actions'];
    categories: Category[];
    parentCategories: Category[];
    subCategories: Category[];
    difficulties: Difficulty[];

    //Import/Export Variables
    private parsedQuestions: Question[];

    constructor(private builder: FormBuilder,
                private questionService: QuestionService,
                private importExportService: ImportExportService,
                private categoryService: CategoryService,
                private difficultyService: DifficultyService,
                private toastr: ToastrService,
                private sanitizer: DomSanitizer,
                private modalService: NgbModal) {
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.questionService.getQuestions(options).subscribe(paginatedQuestions => {
                this.questions = paginatedQuestions.results;
                this.questionsSource = new MatTableDataSource<Question>(this.questions);
                this.questionsLength = paginatedQuestions.count;
            });
        });
    }

    ngOnInit(): void {
        this.initialize();
        this.formData = this.builder.group({
            search: new FormControl(''),
            difficulty: new FormControl(''),
            parentCategory: new FormControl(''),
            subCategory: new FormControl(''),
            is_sample: new FormControl('')
        });
        this.categoryService.getCategories().subscribe((categories) => {
            this.parentCategories = categories.filter(c => c.parent == null);
            this.categories = categories;
        });
        this.difficultyService.getDifficulties().subscribe((difficulties) => this.difficulties = difficulties);
        this.formData.controls['parentCategory'].valueChanges.subscribe((value) => {
            const parentCategoryPK = this.categories.filter(c => c.name === value)[0].pk;
            this.subCategories = this.categories.filter(c => c.parent === parentCategoryPK);
        });
    }

    initialize(): void {
        this.questionService.getQuestions().subscribe(paginatedQuestions => {
            this.questionsLength = paginatedQuestions.count;
            this.pageSize = paginatedQuestions.results.length;
            this.questions = paginatedQuestions.results;
            this.questionsSource = new MatTableDataSource(this.questions);
        });
    }

    newPageEvent(event: PageEvent): void {
        this.pageEvent = event;
        this.update();
    }

    update(): void {
        const options = {
            ...(this.pageEvent && {
                page: this.pageEvent.pageIndex + 1,
                page_size: this.pageEvent.pageSize,
            }),
            ...this.filterQueryString,
            ordering: this.ordering,
        };
        this.paramChanged.next(options);
    }

    sortData(sort: Sort): void {
        if (sort.direction === 'asc') {
            this.ordering = sort.active;
        } else if (sort.direction === 'desc') {
            this.ordering = '-' + sort.active;
        } else {
            this.ordering = '';
        }
        this.update();
    }

    applyFilter(): void {
        this.filterQueryString = this.formData.value;
        this.update();
    }

    deleteQuestion(): void {
        this.questionService.deleteQuestion(this.deleteQuestionId)
            .subscribe(() => {
                this.toastr.success('The Question has been Deleted Successfully.');
                this.update();
                window.scroll(0, 0);
            }, error => {
                this.toastr.error(error);
                console.warn(error);
                window.scroll(0, 0);
            });
    }

    highlight(status: string): string {
        if (status.localeCompare('Solved') === 0) {
            return 'highlight-success';
        } else if (status.localeCompare('Partially Solved') === 0) {
            return 'highlight-warning';
        } else if (status.localeCompare('Wrong') === 0) {
            return 'highlight-danger';
        }
        return '';
    }

    open(content: unknown, questionId: number): void {
        this.deleteQuestionId = questionId;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
    }

    getFileName(id: number): string {
        const timestamp = formatDate(new Date(), 'yyyy/MM/dd_HH:mm:ss', 'en');
        return `question-${id}-${timestamp}.json`;
    }

    downloadQuestion(id: number): void {
        this.questionService.getQuestion(id).subscribe(question => {
            const tempElement = document.createElement('a');
            tempElement.download = this.getFileName(id);
            const blob = new Blob([JSON.stringify(question)], {type: 'application/json'});
            const url = window.URL.createObjectURL(blob);
            tempElement.href = String(url);
            tempElement.click();
        });
    }

    downloadAllQuestions(): void {
        const options = {
            ...this.filterQueryString,
            ordering: this.ordering,
        };
        this.importExportService.downloadAllQuestions(options).subscribe(questions => {
            if(questions.length > 0) {
                const timestamp = formatDate(new Date(), 'yyyy/MM/dd_HH:mm:ss', 'en');
                const tempElement = document.createElement('a');
                tempElement.download = 'questions-' + timestamp + '.json';
                const blob = new Blob([JSON.stringify(questions)], {type: 'application/json'});
                const url = window.URL.createObjectURL(blob);
                tempElement.href = String(url);
                tempElement.click();
            }
            else
                this.toastr.error('There are no questions to download!');
        });
    }

    onFileChanged(target: EventTarget): void {
        const selectedFile = (<HTMLInputElement>target).files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(selectedFile, "UTF-8");
        fileReader.onload = () => {
            if (typeof fileReader.result === "string") {
                this.parsedQuestions = JSON.parse(fileReader.result);
            }
        };
        fileReader.onerror = (error) => {
            console.log(error);
            this.toastr.error('Error occurred while reading file');
        };
    }

    uploadQuestions(): void {
        const questions = this.parsedQuestions;
        if (questions == null)
            return;
        if (typeof questions[Symbol.iterator] === 'function') {
            for (const question of questions) {
                this.uploadQuestion(question);
            }
        } else
            this.uploadQuestion(questions as unknown as Question);
    }

    uploadQuestion(question: Question): void {
        if (question.type_name === 'multiple choice question')
            this.importExportService.uploadMCQuestion(question);
        else if (question.type_name === 'parsons question')
            this.importExportService.uploadParsonsQuestion(question);
        else if (question.type_name === 'java question')
            this.importExportService.uploadJavaQuestion(question);
        else
            this.toastr.error('The question type is invalid');
    }
}
