import { Component, OnInit, Renderer2, OnDestroy } from "@angular/core";
import { SitterActions } from '../state-management/sitters-state-management/sitter.actions';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  Sitter: any;
  constructor(
    private sitterActions: SitterActions, 
    private ngRedux: NgRedux<AppState>,
    private route: ActivatedRoute, 
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.sitterActions.getSitter(id);
    
    this.ngRedux
      .select(state => state.sitters) //subscribe to sitters from the store
      .subscribe(res => {
        this.Sitter = res.sitters;
        console.log(this.Sitter);
      });
      this.renderer.addClass(document.body, "profile");

  }

  ngOnDestroy() {
    const id = this.route.snapshot.paramMap.get('id');
    this.renderer.removeClass(document.body, `profile-${id}`);
    this.renderer.removeClass(document.body, "profile");
  }
}
