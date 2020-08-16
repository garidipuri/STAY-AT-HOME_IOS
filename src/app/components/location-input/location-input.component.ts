import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular'
declare var google: any;

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss'],
})
export class LocationInputComponent implements OnInit {

  GoogleAutocomplete:  any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;

  private db: any;

  constructor( private zone: NgZone, private httpClient: HttpClient, private angularFirestore: AngularFirestore, public toastController: ToastController ) {
    console.log(google);
    this.db = this.angularFirestore;

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

   }

  ngOnInit() {
    let manualLocationFromLocal = localStorage.getItem('manualLocation');
    if(manualLocationFromLocal !== null){
      var location = JSON.parse(manualLocationFromLocal);
      this.autocomplete.input = location.description;
    }  else {
      this.autocomplete.input = '';
    }
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions( { input: this.autocomplete.input },
     (predictions, status) => {
      if(predictions !== null){
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      } else {
        this.displayToast('location not found', 2000);
      }
    });
  }
  async selectSearchResult(item) {
    console.log(item);
    this.location = item;
    localStorage.setItem('manualLocation', `${JSON.stringify(this.location)}`);
    this.autocomplete.input = item.description;
    const geocodingres: any = await this.getTheLanAndLat(item);
    console.log(geocodingres, 'response on lat & lan req');
    try {
      const longitude = geocodingres.results[0].geometry.location.lng;
      const latitude = geocodingres.results[0].geometry.location.lat
  
      const LanAndLat = {lat: latitude, lng: longitude };
      localStorage.setItem('location', `${JSON.stringify(LanAndLat)}`);
      

      var userLoggedInData = localStorage.getItem('userDetails');
      if(userLoggedInData !== null){
        var userRole = localStorage.getItem('user');
        // update the location into firebase
        var Id = localStorage.getItem('firebaseId');
        var location = JSON.parse(localStorage.getItem('location'));
        var manualLocation = JSON.parse(localStorage.getItem('manualLocation'));
  
        const geoPointLocation = new firebase.firestore.GeoPoint(location.lat, location.lng);
  
        if(userRole === 'volunteer'){
          // write location to the firebase 
          let cityRef = this.db.collection('Volunteer').doc(Id);
          // Set the 'capital' field of the city
          let updateSingle = cityRef.update({location: geoPointLocation, formatedLocation: manualLocation.description });
        } else {
          // write location to the firebase 
          let cityRef = this.db.collection('People').doc(Id);
          // Set the 'capital' field of the city
          let updateSingle = cityRef.update({location: geoPointLocation, formatedLocation: manualLocation.description });
        }
      } 


    } catch (error) {
      console.log(error);
    }

    this.placeid = this.location.place_id;
    console.log('placeid'+ this.placeid);
    this.autocompleteItems = [];
  }

   async getTheLanAndLat(item){
    console.log(environment.maps_API);
    return await this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${item.description}&key=${environment.maps_API}`).toPromise();

  }
  
  async displayToast(message, duration){
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
