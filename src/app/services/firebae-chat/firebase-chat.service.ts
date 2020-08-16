import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseChatService {

  private db: any;
  constructor(private angularFirestore: AngularFirestore, private router: Router) { 
    this.db = this.angularFirestore;
  }

  // async getTheMemberDetails(id){
  //   const userRole = localStorage.getItem('user');
  //   if(userRole === 'volunteer'){

  //     await this.memberDetails('People', id).then((userData)=>{
  //       console.log(userData);
  //       return userData;
  //     });

  //   } else {

  //     await this.memberDetails('Volunteer', id).then((volunteerData)=>{
  //       console.log(volunteerData);
  //       return volunteerData;
  //     });
      
  //   }
  // }


  // async memberDetails(userType: string, id: string){
  //   await this.db.collection(userType).ref.where('userId', '==', id).get()
  //   .then( snapshot => {
  //     if (snapshot.empty) {
  //       console.log('No matching documents.');
  //       return;
  //     }

  //     snapshot.forEach(doc => {
  //       console.log(doc.id, '=>', doc.data());
  //       return doc.data();
  //     }); 
  //   })
  //   .catch(err => {
  //     console.log('Error getting documents', err);
  //     return;
  //   });
  
  // }

}
