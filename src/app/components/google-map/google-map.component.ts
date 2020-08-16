import { Component, OnInit, ElementRef , NgZone, ViewChild} from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthenticationService} from './../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {


  // Map related
  @ViewChild('map',{static: true}) mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location = {lat: null, lng: null};
  markerOptions: any = {position: null, map: null, title: null};
  marker: any;

  address='';

  private db: any;

  ngOnInit(){
    
  }
 
  constructor(private geolocation: Geolocation, public ngZone: NgZone, private httpClient: HttpClient, private authenticationService: AuthenticationService, private router: Router, private angularFirestore: AngularFirestore) {
        

        this.db = this.angularFirestore;

        const script = document.createElement('script');
        script.id = 'googleMap'
        
        document.head.appendChild(script);

        this.geolocation.getCurrentPosition().then(async (position) =>  {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
            localStorage.setItem('location', `${JSON.stringify(this.location)}`);
            const AddressRes: any = await this.getTheAddress( this.location.lng, this.location.lat);
           
            console.log(AddressRes);
            try {
              const address = AddressRes.results[0];
              this.address = address.formatted_address;
              console.log(this.address);
              localStorage.setItem('manualLocation', `${JSON.stringify(address)}`);
            } catch (error) {
              console.log(error);
            }
        });
        /*Map options*/
        this.mapOptions = {
            center: this.location,
            zoom: 12,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        setTimeout(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
            /*Marker Options*/
            this.markerOptions.position = this.location;
            this.markerOptions.map = this.map;
            this.markerOptions.title = 'My Location';
            this.marker = new google.maps.Marker(this.markerOptions);
        }, 3000);

        console.log('map loaded!')
  }

  async getTheAddress(lng, lat){
    console.log(environment.maps_API);
    return await this.httpClient.get(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.maps_API}`).toPromise();
  }
  

  updateLocation(){
    var userStatus = localStorage.getItem('user');

    this.authenticationService.loggedIn.subscribe(status => {
      console.log(status,'login status');
      if (!status) {
        this.router.navigate(['onboarding3']);
      } else {
        var userLoggedInData = localStorage.getItem('userDetails');
        if(userLoggedInData !== null){

          var Id = localStorage.getItem('firebaseId');
          var location = JSON.parse(localStorage.getItem('location'));
          var manualLocation = JSON.parse(localStorage.getItem('manualLocation'));

          const geoPointLocation = new firebase.firestore.GeoPoint(location.lat, location.lng);

          if(userStatus === 'volunteer'){

            // write location to the firebase 
            let cityRef = this.db.collection('Volunteer').doc(Id);
            // Set the 'capital' field of the city
            let updateSingle = cityRef.update({location: geoPointLocation, formatedLocation: manualLocation.formatted_address });
            
            this.router.navigate(['home/people']);
          } else {

            // write location to the firebase 
            let cityRef = this.db.collection('People').doc(Id);
            // Set the 'capital' field of the city
            let updateSingle = cityRef.update({location: geoPointLocation, formatedLocation: manualLocation.formatted_address  });
            this.router.navigate(['home/volunteer']);
          }

        } else {

          if(userStatus === 'volunteer'){
            this.router.navigate(['home/people']);
          } else {
            this.router.navigate(['home/volunteer']);
          }
        }
      }
    });
  }


 
  // ionViewWillEnter() {
  //   this.loadMap();
  // }
 
  // Perform an anonymous login and load data

  // anonLogin() {
  //   this.afAuth.signInAnonymously().then(res => {
  //     this.user = res.user;

  //     this.locationsCollection = this.afs.collection(
  //       `locations/${this.user.uid}/track`,
  //       ref => ref.orderBy('timestamp')
  //     );
  //   });
  // }
 
  
  // Initialize a blank map
  // loadMap() {

  // }

}
