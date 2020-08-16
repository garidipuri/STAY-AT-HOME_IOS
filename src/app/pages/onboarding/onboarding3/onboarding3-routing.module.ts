import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Onboarding3Page } from './onboarding3.page';

const routes: Routes = [
  {
    path: '',
    component: Onboarding3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Onboarding3PageRoutingModule {}
