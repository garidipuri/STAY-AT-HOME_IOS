import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Onboarding2Page } from './onboarding2.page';

const routes: Routes = [
  {
    path: '',
    component: Onboarding2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Onboarding2PageRoutingModule {}
