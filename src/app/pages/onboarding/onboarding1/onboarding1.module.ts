import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Onboarding1PageRoutingModule } from './onboarding1-routing.module';

import { Onboarding1Page } from './onboarding1.page';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Onboarding1PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Onboarding1Page]
})
export class Onboarding1PageModule {}
