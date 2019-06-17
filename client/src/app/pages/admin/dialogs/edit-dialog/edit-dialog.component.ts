import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { SittersApiService } from "src/app/services/sitters-api.service";
import { SitterActions } from "src/app/pages/state-management/sitters-state-management/sitter.actions";

@Component({
  selector: "app-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: SittersApiService,
    private sitterActions: SitterActions
  ) {}

  formControl = new FormControl("", [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  submit() {
    console.log("submit");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editSitter(): void {
    this.sitterActions.updateSitter(this.data);
    // this.dataService.updateSitter(this.data);
  }
}
