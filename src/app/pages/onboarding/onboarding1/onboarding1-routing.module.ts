import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Onboarding1Page } from './onboarding1.page';

const routes: Routes = [
  {
    path: '',
    component: Onboarding1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Onboarding1PageRoutingModule {}
