import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  persons;

  private db: any;
  constructor(private router: Router,private activatedRoute: ActivatedRoute, private angularFirestore: AngularFirestore) { 

    activatedRoute.params.subscribe(async val => {
      
      this.db = this.angularFirestore;
      console.log('messages tab')
      const userDocId = localStorage.getItem('firebaseId');
      var userStatus = localStorage.getItem('user');
      if(userStatus === 'volunteer'){
        this.getAllSubCollections('Volunteer', userDocId);
      } else {
        this.getAllSubCollections('People', userDocId);
      }
    });

  }

  ngOnInit() {

  }

  conversation(user){
    this.router.navigate([`home/conversation/${user.userId}`]);
  }

  async getAllSubCollections(userType: string, userDocId){
    console.log(userType, userDocId);
    // this.db.collection(userType).doc(userDocId).ref.collection('chatMembers').orderBy("timestamp", "desc").get()
    // .then( snapshot => {
    //   if (snapshot.empty) {
    //     console.log('No matching documents.');
    //   }
    //   var allUsers = [];
    //   snapshot.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    //     allUsers.push(doc.data());
    //   });
    //   this.persons = allUsers;
    // })
    // .catch(err => {
    //   console.log('Error getting documents', err);
    //   return;
    // });
    this.db.collection(userType).doc(userDocId).ref.collection('chatMembers').orderBy("timestamp", "desc").onSnapshot((querySnapshot) =>{
      var allUsers = [];
      querySnapshot.forEach(function(doc) {
      // console.log(doc.data());
        allUsers.push(doc.data());
      });
      this.persons = allUsers;
      console.log(this.persons);
  })
  }

}
