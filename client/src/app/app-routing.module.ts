import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { SittersComponent } from "./pages/sitters/sitters.component";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { AdminGuard } from "./auth/admin/admin.guard";
import { CreateSitterComponent } from "./pages/admin/create-sitter/create-sitter.component";
import { DisplaySittersComponent } from "./pages/admin/display-sitters/display-sitters.component";
import { UserGuard } from './auth/user/user.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [//routes array of Routes describes how to navigate
  { path: "", redirectTo: "", pathMatch: "full", component: HomeComponent },//default path for the application, if path is empty  
  { path: "login", component: LoginComponent },
  // { path: "profile", component: ProfileComponent, canActivate: [UserGuard] },
  { path: "profile/:id", component: ProfileComponent, canActivate: [UserGuard] },
  {
    path: "sitters",
    children: [{ path: "", pathMatch: "full", component: SittersComponent }]
  },
  {
    path: "admin",
    canActivate: [AdminGuard],
    children: [
      { path: "create-sitter", component: CreateSitterComponent },
      { path: "display-sitters", component: DisplaySittersComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }//if url doesn't match any paths router selects this path(wildcard) 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//configure the router
  exports: [RouterModule]
})
export class AppRoutingModule {}
