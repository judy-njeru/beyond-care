import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
import { Observable } from "rxjs";
import { inspectNativeElement } from "@angular/platform-browser/src/dom/debug/ng_probe";
import { finalize, tap, mergeMap, last } from "rxjs/operators";
import { AngularFirestore } from "angularfire2/firestore";
import { IfStmt } from "@angular/compiler";
import { Sitter } from "src/app/entities/sitter";
import { SitterActions } from "../../state-management/sitters-state-management/sitter.actions";

@Component({
  selector: "app-create-sitter",
  templateUrl: "./create-sitter.component.html",
  styleUrls: ["./create-sitter.component.scss"]
})
export class CreateSitterComponent implements OnInit, OnDestroy {
  addBabySitterForm: FormGroup;
  //Main Task
  task: AngularFireUploadTask;

  //Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  //Download URL
  downloadURL: Observable<string>;

  //state for dropzone CSS toggling
  isHovering: boolean;

  isUploading: boolean = false;
  isLoading: boolean = false;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private sitterActions: SitterActions
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }

    //The storage path
    const path = `babySitters/${new Date().getTime()}_${file.name}`;

    const fileRef = this.storage.ref(path);

    //Optional metadata
    const customMetadata = { app: "Beyond Care SPA" };

    //The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    //Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // console.log(this.isUploading);
          //Upload firestore in completion
          this.db.collection("photos").add({ path, size: snap.totalBytes });
        }

        if (snap.bytesTransferred != snap.totalBytes) {
          this.isUploading = true;
        }
      })
    );
    //The file's download URL
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.isUploading = false;
        })
      )
      .subscribe();

    this.task.snapshotChanges().pipe(
      last(),
      mergeMap(() => {
        const url = fileRef.getDownloadURL();
        console.log("download url is ", url);
        return url;
      })
    );
  }
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  ngOnInit() {
    this.addBabySitterForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      min_price: ["", Validators.required],
      max_price: ["", Validators.required],
      age: ["", Validators.required],
      location: ["", Validators.required],
      availability: ["", Validators.required],
      reviews: ["", Validators.required],
      verified: ["", Validators.required],
      strengths: ["", Validators.required],
      quote: ["", Validators.required]
    });
  }

  check() {
    if (this.addBabySitterForm.status == "INVALID") {
      this.isLoading = false;
      console.log(this.isLoading);
    }
    if (this.addBabySitterForm.status == "VALID") {
      this.isLoading = true;
      console.log(this.isLoading);
    }
  }

  onSubmit() {
    // this.addBabySitterForm.value
    const image = document.getElementById("upload_image").getAttribute("src");
    const age = this.addBabySitterForm.value.age;
    const availability = this.addBabySitterForm.value.availability;
    const description = this.addBabySitterForm.value.description;
    const location = this.addBabySitterForm.value.location;
    const max_price = this.addBabySitterForm.value.max_price;
    const min_price = this.addBabySitterForm.value.min_price;
    const name = this.addBabySitterForm.value.name;
    const quote = this.addBabySitterForm.value.quote;
    const reviews = this.addBabySitterForm.value.reviews;
    const strengths = this.addBabySitterForm.value.strengths;
    const verified = this.addBabySitterForm.value.verified;
    this.addBabySitterForm.value.images = [image];
    // this.addBabySitterForm.value.images = [
    //   "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png"
    // ];
    let sitter = this.addBabySitterForm.value as Sitter;

    this.sitterActions.createNewSitter(sitter);

  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, "admin-create-sitter");
  }
}
