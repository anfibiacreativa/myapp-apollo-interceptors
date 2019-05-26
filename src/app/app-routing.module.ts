import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../commons/guards/authentication.guard';
import { CatTeaserComponent } from '../commons/components/cat-teaser/cat-teaser.component';
import { OopsComponentComponent } from '../commons/components/oops-component/oops-component.component';
import { SupporterAreaComponent } from 'src/commons/components/supporter-area/supporter-area.component';

const routes: Routes = [
  {
    path: 'astronaut-cats',
    component: CatTeaserComponent
  },
  {
    path: 'oops',
    component: OopsComponentComponent
  },
  {
    path: 'supporter-area',
    component: SupporterAreaComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  },
  {
    path: '',
    redirectTo: 'astronaut-cats',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
