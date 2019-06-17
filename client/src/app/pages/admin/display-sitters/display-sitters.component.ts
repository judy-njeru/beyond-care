import { Component, OnInit, Renderer2, OnDestroy } from "@angular/core";
import { SitterActions } from "../../state-management/sitters-state-management/sitter.actions";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "src/app/store";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { DeleteDialogComponent } from "../dialogs/delete-dialog/delete-dialog.component";
import { EditDialogComponent } from "../dialogs/edit-dialog/edit-dialog.component";
import { Sitter } from "src/app/entities/sitter";
import { SittersComponent } from "../../sitters/sitters.component";

@Component({
  selector: "app-display-sitters",
  templateUrl: "./display-sitters.component.html",
  styleUrls: ["./display-sitters.component.scss"]
})
export class DisplaySittersComponent implements OnInit, OnDestroy {
  allSitters: Sitter[];
  isLoading: boolean;
  index: number;
  id: string;
  name: string;
  location: number;
  reviews: number;
  verified: string;
  edit: string;
  delete: string;

  constructor(
    private renderer: Renderer2,
    private sitterActions: SitterActions,
    private ngRedux: NgRedux<AppState>,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    "id",
    "name",
    "location",
    "reviews",
    "verified",
    "edit",
    "delete"
  ];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.sitterActions.getSitters();
    this.ngRedux
      .select(state => state.sitters) //subscribe to sitters from the store
      .subscribe(res => {
        this.allSitters = res.sitters;
        SittersComponent.allSitters = res.sitters;
        this.dataSource = new MatTableDataSource(this.allSitters);
        this.isLoading = res.isLoading;
      });
  }

  deleteItem(i, id: string, name: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: id, name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result === 1) {
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }
  startEdit(i: number, id: string, verified: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        id: id,
        verified: verified
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "admin-display-sitters");
  }
}
