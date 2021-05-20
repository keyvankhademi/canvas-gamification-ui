import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MessagesComponent} from './components/messages/messages.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {ContactComponent} from './components/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TopicsComponent} from './components/topics/topics.component';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// TODO: Remove this suppress after fixing concept map
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ConceptMapComponent} from './components/concept-map/concept-map.component';
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {TokenValuesComponent} from './components/token-values/token-values.component';
import {LoginComponent} from './components/accounts/login';
import {ErrorInterceptor, JwtInterceptor} from '@app/_helpers';
import {HomepageComponent} from './components/homepage/homepage.component';
import {RecentUserActionsComponent} from './components/homepage/recent-user-actions/recent-user-actions.component';
import {UserActionsComponent} from './components/homepage/user-actions/user-actions.component';
import {RecentViewedQuestionsComponent} from './components/homepage/recent-viewed-questions/recent-viewed-questions.component';
import {CourseDashboardComponent} from './components/homepage/course-dashboard/course-dashboard.component';
import {InactiveCoursesComponent} from './components/homepage/inactive-courses/inactive-courses.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RegisterComponent} from './components/accounts/register/register.component';
import {ProfileDetailsComponent} from './components/accounts/profile-details/profile-details.component';
import {ResetPasswordComponent} from './components/accounts/reset-password/reset-password.component';
import {ConsentFormComponent} from './components/accounts/consent-form/consent-form.component';
import {TermsAndConditionsSnippetComponent} from './components/accounts/terms-and-conditions-snippet/terms-and-conditions-snippet.component';
import {FaqComponent} from './components/faq/faq.component';
import {CourseListComponent} from './components/course/course-list/course-list.component';
import {CourseComponent} from './components/course/course.component';
import {CourseEventsSnippetComponent} from './components/course/course-events-snippet/course-events-snippet.component';
import {TokenUseSnippetComponent} from './components/course/token-use-snippet/token-use-snippet.component';
import {CourseQuestionSnippetComponent} from './components/course/course-question-snippet/course-question-snippet.component';
import {MatButtonModule} from '@angular/material/button';
import {CourseEventCreateEditComponent} from './components/course/course-event-create/course-event-create-edit.component';
import {CourseRegisterComponent} from './components/course/course-registration/course-register.component';
import {MatSortModule} from '@angular/material/sort';
import {ProblemSetComponent} from './components/problems/problem-set/problem-set.component';
import {ProblemViewComponent} from './components/problems/problem-view/problem-view.component';
import {ProblemEditComponent} from './components/problems/problem-edit/problem-edit.component';
import {CommonModule} from '@angular/common';
import {ProblemCreateComponent} from './components/problems/problem-create/problem-create.component';
import {DragulaModule} from 'ng2-dragula';
import {AceEditorModule} from 'ng2-ace-editor';
import {AceComponent} from './components/problems/problem-view/ace/ace.component';
import {McqViewSnippetComponent} from './components/problems/problem-view/mcq-view-snippet/mcq-view-snippet.component';
import {JavaViewSnippetComponent} from './components/problems/problem-view/java-view-snippet/java-view-snippet.component';
import {ParsonsViewSnippetComponent} from './components/problems/problem-view/parsons-view-snippet/parsons-view-snippet.component';
import {ParsonsEditSnippetComponent} from './components/problems/problem-edit/parsons-edit-snippet/parsons-edit-snippet.component';
import {McqEditSnippetComponent} from './components/problems/problem-edit/mcq-edit-snippet/mcq-edit-snippet.component';
import {JavaEditSnippetComponent} from './components/problems/problem-edit/java-edit-snippet/java-edit-snippet.component';
import {McqCreateSnippetComponent} from './components/problems/problem-create/mcq-create-snippet/mcq-create-snippet.component';
import {JavaCreateSnippetComponent} from './components/problems/problem-create/java-create-snippet/java-create-snippet.component';
import {ParsonsCreateSnippetComponent} from './components/problems/problem-create/parsons-create-snippet/parsons-create-snippet.component';
import {VariableViewComponent} from './components/problems/problem-view/variable-view/variable-view.component';
import {JsonEditorComponent} from './components/problems/json-editor/json-editor.component';
import {SubmissionSnippetComponent} from './components/problems/problem-view/submission-snippet/submission-snippet.component';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LeaderBoardComponent} from './components/course/leader-board/leader-board.component';
import {SubmissionViewComponent} from '@app/components/problems/submission-view/submission-view.component';
import {ActivationEmailComponent} from './components/accounts/activation-email/activation-email.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { QuestionCountComponent } from './components/admin-components/question-count/question-count.component';
import { CategoryStatsComponent } from './components/admin-components/category-stats/category-stats.component';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
    declarations: [
        AppComponent,
        MessagesComponent,
        LandingPageComponent,
        ContactComponent,
        HeaderComponent,
        TopicsComponent,
        SampleQuestionsComponent,
        // Temporarily disable concept map due to optimization errors.
        // ConceptMapComponent,
        UserStatsComponent,
        LoginComponent,
        TokenValuesComponent,
        FaqComponent,
        ProblemSetComponent,
        HomepageComponent,
        RecentUserActionsComponent,
        UserActionsComponent,
        RecentViewedQuestionsComponent,
        CourseDashboardComponent,
        InactiveCoursesComponent,
        RegisterComponent,
        ProfileDetailsComponent,
        ResetPasswordComponent,
        ConsentFormComponent,
        TermsAndConditionsSnippetComponent,
        CourseListComponent,
        CourseRegisterComponent,
        CourseComponent,
        CourseEventsSnippetComponent,
        TokenUseSnippetComponent,
        CourseQuestionSnippetComponent,
        CourseEventCreateEditComponent,
        ProblemViewComponent,
        ProblemEditComponent,
        ProblemCreateComponent,
        AceComponent,
        McqViewSnippetComponent,
        JavaViewSnippetComponent,
        ParsonsViewSnippetComponent,
        ParsonsEditSnippetComponent,
        McqEditSnippetComponent,
        JavaEditSnippetComponent,
        McqCreateSnippetComponent,
        JavaCreateSnippetComponent,
        ParsonsCreateSnippetComponent,
        VariableViewComponent,
        JsonEditorComponent,
        SubmissionSnippetComponent,
        LeaderBoardComponent,
        SubmissionViewComponent,
        ActivationEmailComponent,
        AdminComponent,
        QuestionCountComponent,
        CategoryStatsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatCardModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        FontAwesomeModule,
        FormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatTableModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        CommonModule,
        DragulaModule.forRoot(),
        CKEditorModule,
        AceEditorModule,
        MatDatepickerModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        HighlightModule,
        MatSelectModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
                languages: {
                    java: () => import('highlight.js/lib/languages/java')
                }
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
