import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Onboarding3PageRoutingModule } from './onboarding3-routing.module';

import { Onboarding3Page } from './onboarding3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Onboarding3PageRoutingModule
  ],
  declarations: [Onboarding3Page],
  entryComponents: [Onboarding3Page]
})
export class Onboarding3PageModule {}
