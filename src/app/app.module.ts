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
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {CommonModule} from '@angular/common';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ToastrModule} from "ngx-toastr";
import {NotFoundComponent} from './components/general/not-found/not-found.component';
import {ForbiddenComponent} from './components/general/forbidden/forbidden.component';
import {ProblemPracticeComponent} from "@app/components/problem-practice/problem-practice.component";
import {ProblemsModule} from "@app/problems/problems.module";

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        ContactComponent,
        HeaderComponent,
        TopicsComponent,
        SampleQuestionsComponent,
        UserStatsComponent,
        TokenValuesComponent,
        FaqComponent,
        HomepageComponent,
        RecentUserActionsComponent,
        UserActionsComponent,
        RecentViewedQuestionsComponent,
        CourseDashboardComponent,
        InactiveCoursesComponent,
        NotFoundComponent,
        ForbiddenComponent,
        ProblemPracticeComponent,
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
        HighlightModule,
        ProblemsModule,
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
