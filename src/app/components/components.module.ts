import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationButtonComponent } from './location-button/location-button.component';
import { LocationInputComponent } from './location-input/location-input.component';
import { HelpItemsComponent } from './help-items/help-items.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    LocationButtonComponent, 
    LocationInputComponent, 
    HelpItemsComponent, 
    PersonCardComponent, 
    GoogleMapComponent],

  exports:[
    LocationButtonComponent, 
    LocationInputComponent, 
    HelpItemsComponent,
    PersonCardComponent,
    GoogleMapComponent]
})
export class ComponentsModule {}
