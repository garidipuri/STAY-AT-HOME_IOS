import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeSelectionPagePage } from './welcome-selection-page.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeSelectionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeSelectionPagePageRoutingModule {}
