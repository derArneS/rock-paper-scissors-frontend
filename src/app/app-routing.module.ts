import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { RulesComponent } from './rules/rules.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'rules', component: RulesComponent},
    { path: 'about', component: AboutComponent},
    { path: 'play', component: PlayComponent},
    { path: 'sign-up', component: SignupComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
