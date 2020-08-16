import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [

      // { path: '', loadChildren: './../pages/welcome-page/welcome-page.module#WelcomePagePageModule' },
      { path: '', loadChildren: './../pages/welcome-selection-page/welcome-selection-page.module#WelcomeSelectionPagePageModule' },
      { path: 'onboarding1', loadChildren: './../pages/onboarding/onboarding1/onboarding1.module#Onboarding1PageModule'},
      { path: 'onboarding2', loadChildren: './../pages/onboarding/onboarding2/onboarding2.module#Onboarding2PageModule'},
      { path: 'onboarding3', loadChildren: './../pages/onboarding/onboarding3/onboarding3.module#Onboarding3PageModule'},
      { path: 'google-map', loadChildren: './../pages/map-page/map-page.module#MapPagePageModule'}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
