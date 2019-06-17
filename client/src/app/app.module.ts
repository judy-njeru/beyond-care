import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {
  MatDividerModule,
  MatCardModule,
  MatSnackBarModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatGridListModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatTableModule,
  MatDialogModule
} from "@angular/material";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./pages/home/home.component";
import { SittersComponent } from "./pages/sitters/sitters.component";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { CreateSitterComponent } from "./pages/admin/create-sitter/create-sitter.component";
import { DisplaySittersComponent } from "./pages/admin/display-sitters/display-sitters.component";
import {
  NgRedux,
  DevToolsExtension,
  NgReduxModule
} from "@angular-redux/store";
import { NgReduxRouter, NgReduxRouterModule } from "@angular-redux/router";
import { AppState, rootReducer } from "./store";
import { HttpClientModule } from "@angular/common/http";
import { SitterPipe } from "./sitter.pipe";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { DropZoneDirective } from "./directives/drop-zone.directive";
import { FileSizePipe } from "./file-size.pipe";
import { AdminNavComponent } from "./components/admin-nav/admin-nav.component";
// import { MaterialModule } from "./material/material.module";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { EditDialogComponent } from "./pages/admin/dialogs/edit-dialog/edit-dialog.component";
import { DeleteDialogComponent } from "./pages/admin/dialogs/delete-dialog/delete-dialog.component";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MaterialModule } from './material/material.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SittersComponent,
    LoginComponent,
    ProfileComponent,
    CreateSitterComponent,
    DisplaySittersComponent,
    SitterPipe,
    DropZoneDirective,
    FileSizePipe,
    AdminNavComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    PageNotFoundComponent
  ],
  entryComponents: [EditDialogComponent, DeleteDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatTableModule,
    MatDialogModule,
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,// For access of the HttpClient service within components
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      {},
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

    ngReduxRouter.initialize(/* args */);
  }
}
