import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent implements OnInit {

  public users = [];

  private db: any;


  constructor(private router: Router , private angularFirestore: AngularFirestore) { 
    this.db = this.angularFirestore;
    const userStatus = localStorage.getItem('user');
    console.log(userStatus);


    let location = JSON.parse(localStorage.getItem('location'));
    let latitude = location.lat;
    let longitude = location.lng;
    let distance = 50;
    console.log(latitude, longitude);

    let lat = 0.0144927536231884
    let lon = 0.0181818181818182

    let lowerLat = latitude - (lat * distance)
    
    let lowerLon = longitude - (lon * distance)

    let greaterLat = latitude + (lat * distance)
    let greaterLon = longitude + (lon * distance)

    let lesserGeopoint =  new firebase.firestore.GeoPoint(lowerLat, lowerLon)
    let greaterGeopoint =  new firebase.firestore.GeoPoint(greaterLat, greaterLon)


    console.log(lesserGeopoint, greaterGeopoint);
    
    if(userStatus === 'volunteer'){

      
      this.getTheNearByLocationData('People', lesserGeopoint, greaterGeopoint);
                           

    } else if(userStatus === 'people'){

      this.getTheNearByLocationData('Volunteer', lesserGeopoint, greaterGeopoint);

    }
    
  }

  ngOnInit() {
    
  }

  sendMessage(user: any){
    this.router.navigate([`home/conversation/${user.userId}`]);
  }

  async getTheNearByLocationData(collection: string,lesserGeopoint, greaterGeopoint ){

    
    //  await this.db.collection(collection).ref.where('location', '>=', lesserGeopoint).where('location', '<=',greaterGeopoint).get()
    //  .then(snapshot => {
    //   snapshot.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    //     ListOfAllUsers.push(doc.data());
    //     console.log(ListOfAllUsers);
    //   });
    //   this.users = ListOfAllUsers;
    //   console.log(this.users,'..people or volunteers' );
    // })
    // .catch(err => {
    //   console.log('Error getting documents', err);
    // });

    await this.db.collection(collection).ref.where('location', '>=', lesserGeopoint).where('location', '<=',greaterGeopoint).onSnapshot((querySnapshot) =>{
      var ListOfAllUsers: any = [];
        querySnapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          ListOfAllUsers.push(doc.data());
          console.log(ListOfAllUsers);
        });
        this.users = ListOfAllUsers;
        console.log(this.users, 'final list of users')
    });

  }

}
