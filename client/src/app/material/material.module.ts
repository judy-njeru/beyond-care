import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as Material from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
  imports: [
    CommonModule,
    Material.MatDividerModule,
    Material.MatCardModule,
    Material.MatSnackBarModule,
    Material.MatButtonModule,
    Material.MatToolbarModule,
    Material.MatIconModule,
    Material.MatMenuModule,
    Material.MatGridListModule,
    Material.MatNativeDateModule,
    Material.MatSidenavModule,
    Material.MatTableModule,
    Material.MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  exports: [
    Material.MatDividerModule,
    Material.MatCardModule,
    Material.MatSnackBarModule,
    Material.MatButtonModule,
    Material.MatToolbarModule,
    Material.MatIconModule,
    Material.MatMenuModule,
    Material.MatGridListModule,
    Material.MatNativeDateModule,
    Material.MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  declarations: []
})
export class MaterialModule {}
