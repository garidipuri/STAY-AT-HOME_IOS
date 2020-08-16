import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeSelectionPagePageRoutingModule } from './welcome-selection-page-routing.module';

import { WelcomeSelectionPagePage } from './welcome-selection-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeSelectionPagePageRoutingModule
  ],
  declarations: [WelcomeSelectionPagePage]
})
export class WelcomeSelectionPagePageModule {}
