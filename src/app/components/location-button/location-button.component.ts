import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-location-button',
  templateUrl: './location-button.component.html',
  styleUrls: ['./location-button.component.scss'],
})
export class LocationButtonComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit() {}

  getLocation(){
    // console.log('get the device location')
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log('Latitude:' , resp.coords.latitude, 'Longitude:', resp.coords.longitude )
      
      this.router.navigate(['google-map']);

    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
    
    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //   // console.log(JSON.stringify( data.coords));
    //   this.router.navigate(['google-map']);
    //   console.log('Latitude:' , data.coords.latitude, 'Longitude:', data.coords.longitude);
    //  });
  }
}
