import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, Inject } from "@angular/core";
import { SittersApiService } from "src/app/services/sitters-api.service";
import { SitterActions } from "src/app/pages/state-management/sitters-state-management/sitter.actions";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.scss"]
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: SittersApiService,
    private sitterActions: SitterActions
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.sitterActions.deleteSitter(this.data.id);
  }
}
