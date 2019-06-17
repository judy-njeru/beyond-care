import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SittersComponent } from "./sitters.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatFormFieldModule, MatCardModule } from "@angular/material";
import { SitterPipe } from "src/app/sitter.pipe";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { NgReduxTestingModule } from "@angular-redux/store/testing";
import { SitterActions } from "../state-management/sitters-state-management/sitter.actions";

describe("SittersComponent", () => {
  let component: SittersComponent;
  let fixture: ComponentFixture<SittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SittersComponent, SitterPipe],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        HttpClientModule,
        NgReduxTestingModule
      ],
      providers: [SitterActions]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
