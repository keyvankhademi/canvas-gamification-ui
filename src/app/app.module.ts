import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// TODO: Remove this suppress after fixing concept map
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {TokenValuesComponent} from './components/token-values/token-values.component';
import {ErrorInterceptor, JwtInterceptor} from '@app/_helpers';
import {HomepageComponent} from './components/homepage/homepage.component';
import {RecentUserActionsComponent} from './components/homepage/recent-user-actions/recent-user-actions.component';
import {UserActionsComponent} from './components/homepage/user-actions/user-actions.component';
import {RecentViewedQuestionsComponent} from './components/homepage/recent-viewed-questions/recent-viewed-questions.component';
import {CourseDashboardComponent} from './components/homepage/course-dashboard/course-dashboard.component';
import {InactiveCoursesComponent} from './components/homepage/inactive-courses/inactive-courses.component';
import {MatPaginatorModule} from '@angular/material/paginator';
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
import {CommonModule} from '@angular/common';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LeaderBoardComponent} from './components/course/leader-board/leader-board.component';
import {HighlightModule} from 'ngx-highlightjs';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ToastrModule} from "ngx-toastr";
import {NotFoundComponent} from './components/general/not-found/not-found.component';
import {ForbiddenComponent} from './components/general/forbidden/forbidden.component';
import {CamelCaseInterceptor} from "@app/_helpers/camelCase.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        ContactComponent,
        HeaderComponent,
        TopicsComponent,
        SampleQuestionsComponent,
        // Temporarily disable concept map due to optimization errors.
        // ConceptMapComponent,
        UserStatsComponent,
        TokenValuesComponent,
        FaqComponent,
        HomepageComponent,
        RecentUserActionsComponent,
        UserActionsComponent,
        RecentViewedQuestionsComponent,
        CourseDashboardComponent,
        InactiveCoursesComponent,
        CourseListComponent,
        CourseRegisterComponent,
        CourseComponent,
        CourseEventsSnippetComponent,
        TokenUseSnippetComponent,
        CourseQuestionSnippetComponent,
        CourseEventCreateEditComponent,
        LeaderBoardComponent,
        NotFoundComponent,
        ForbiddenComponent,
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
        MatDatepickerModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        HighlightModule,
        MatSelectModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: CamelCaseInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
