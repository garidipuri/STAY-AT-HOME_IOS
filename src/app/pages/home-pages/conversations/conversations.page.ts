import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; 

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
// importing service

// import { FirebaseChatService } from './../../../services/firebae-chat/firebase-chat.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {

  chatMember = {
    
    userId: '',
    profilePicture: '',
    displayName: '',
    profile: '',
    facebookRefreshToken:'',
    location: '',
    formatedLocation: '',
    latesthelpItems: '',
    role: ''

  }
  chatMemberDocId;

  newMsg = '';

  messages = [
    // {
    //   userId:'1',
    //   userName:'Ajay',
    //   createdAt:1587610983,
    //   message:'Hi, Jhon.. Can i get your location?'
    // },
    // {
    //   userId:'2',
    //   userName:'Jhon',
    //   createdAt:1587610983,
    //   message:'Yes..sure'
    // },
    // {
    //   userId:'2',
    //   userName:'Jhon',
    //   createdAt:1587610983,
    //   message:'I am near to your location around 2 km. I will reach there in 6 min'
    // },
    // {
    //   userId:'1',
    //   userName:'Ajay',
    //   createdAt:1587610983,
    //   message:'Thanks..then I will be waiting for you!'
    // },
  ];

  chatRId;

  @ViewChild(IonContent,{static: true}) content: IonContent;

  curruntUser = JSON.parse(localStorage.getItem('firebaseData')).userId;
  private db: any;
  isFirstTimeChat : Boolean;

  constructor(private activatedRoute: ActivatedRoute, private angularFirestore: AngularFirestore) { 
    this.db = this.angularFirestore;
    // by default set it as a new coversation.

    const docId = localStorage.getItem('firebaseId');


    this.activatedRoute.params.subscribe(res => {
      // console.log(res.id);

      
      
      const userRole = localStorage.getItem('user');

      if(userRole === 'volunteer'){

        this.getThechatUser('People', res.id );

        this.db.collection('Volunteer').doc(docId).ref.collection('chatMembers').where('userId', '==', res.id).get()
          .then( snapshot => {
            var Data;
            if (snapshot.empty) {
              console.log('No matching documents.');
              this.isFirstTimeChat = true;
              localStorage.setItem('isFirstTimeChat', 'true');
            }
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
              Data = doc.data(); 
              // console.log('the chat room already exits');
              
              this.chatRId = Data.chatRoomId;
              this.isFirstTimeChat = false;
              localStorage.setItem('isFirstTimeChat', 'false');
              // the chat room already exits for them...lets get all messages from it.
            });
            if(this.chatRId !== undefined){
              // console.log(this.chatRId);
              this.db.collection('ChatRooms').doc(this.chatRId).ref.get().then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  console.log('Document data:', doc.data());
                  this.messages = doc.data().messages;
                  // console.log(this.messages);
                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });
            }
          })
          .catch(err => {
            console.log('Error getting documents', err);
            return;
          });



      } else {

        
          this.getThechatUser('Volunteer', res.id );

          this.db.collection('People').doc(docId).ref.collection('chatMembers').where('userId', '==', res.id).get()
          .then( snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
              this.isFirstTimeChat = true;
              localStorage.setItem('isFirstTimeChat', 'true');
            }
            var Data;
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
              Data = doc.data();
              this.isFirstTimeChat = false;
              localStorage.setItem('isFirstTimeChat', 'false');
              this.chatRId = Data.chatRoomId;
            });
            if(this.chatRId !== undefined){
              // console.log(this.chatRId);
              this.db.collection('ChatRooms').doc(this.chatRId).ref.get().then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  console.log('Document data:', doc.data());
                  this.messages = doc.data().messages;
                  // console.log(this.messages);
                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });
            }
          })
          .catch(err => {
            console.log('Error getting documents', err);
            return;
          });

      }
    });
  }

  ngOnInit() {


    
  }

  async sendMessage(){
    // console.log(this.newMsg)
    this.messages.push(
      {
      userId: JSON.parse(localStorage.getItem('firebaseData')).userId,
      timestamp:new Date().getTime(),
      message:this.newMsg
    })
    
    
    setTimeout(()=>{
      this.content.scrollToBottom(200);
    });


    // lets send the data to firebase

    const userRole = localStorage.getItem('user');

    // console.log(this.newMsg);
    const userId = JSON.parse(localStorage.getItem('firebaseData')).userId;
    var messageData = [];
    var Data = {
      userId: userId,
      message: this.newMsg,
      timestamp: new Date().getTime()
    }

    this.newMsg = '';
    var chatStatus = localStorage.getItem('isFirstTimeChat');
    if(chatStatus === 'true'){

      messageData.push(Data);
      var allMessages = {
        messages: messageData
      }
      localStorage.setItem('isFirstTimeChat', 'false');

      if(userRole === 'volunteer'){
        await this.addmessagesTONewChanel('Volunteer', allMessages, Data);
      } else {
        await this.addmessagesTONewChanel('People', allMessages, Data);
      }

    } else {

        await this.addmessagesTOExistingChanel(this.chatRId, Data);
     

    }
  }


  async getThechatUser(userType: string, id: string ){
    this.db.collection(userType).ref.where('userId', '==', id).get()
    .then( snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        this.chatMemberDocId = doc.id;
        this.chatMember = doc.data();
        // console.log( this.chatMember);
      }); 
    })
    .catch(err => {
      console.log('Error getting documents', err);
      return;
    });
  }

  async addmessagesTONewChanel(userType: string, messagesData: any, Data: any){
    await this.db.collection('ChatRooms').add(messagesData)
            .then(ref => {
              console.log('Added document with ID: ', ref.id);
              var id = localStorage.getItem('firebaseId');
              // console.log(this.chatMember, 'member')
              this.chatRId = ref.id;
              // automatic update
              let doc = this.db.collection('ChatRooms').doc(ref.id);

              let observer = doc.ref.onSnapshot(docSnapshot => {
                console.log(`Received doc snapshot: ${docSnapshot}`);
                // console.log(docSnapshot.data());
                this.messages = docSnapshot.data().messages;
                // ...
          
                setTimeout(()=>{
                  this.content.scrollToBottom(200);
                });
          
              }, err => {
                console.log(`Encountered error: ${err}`);
              });

              // add sub collection to the user database.
              var subCollectionData = {
                chatRoomId: ref.id,
                timestamp: new Date().getTime(),
                userId: this.chatMember.userId,
                userName: this.chatMember.displayName,
                profilePicture: this.chatMember.profilePicture,
                lastMessage: Data.message
              }
              this.db.collection(userType).doc(id).collection('chatMembers').add(subCollectionData)
              .then(ref => {
                console.log('Added document with ID: ', ref.id);
              })
              
              // add sub collection to the chat member database.
              var firebaseData = JSON.parse(localStorage.getItem('firebaseData'));

              var subCollectionForChatMember = {
                chatRoomId: ref.id,
                timestamp: new Date().getTime(),
                userId: firebaseData.userId,
                userName: firebaseData.displayName,
                profilePicture: firebaseData.profilePicture,
                lastMessage:  Data.message
              }
             if(firebaseData.role === 'volunteer'){
              this.db.collection('People').doc(this.chatMemberDocId).collection('chatMembers').add(subCollectionForChatMember)
              .then(ref => {
                console.log('Added document with ID: ', ref.id);
              })
             } else {
              this.db.collection('Volunteer').doc(this.chatMemberDocId).collection('chatMembers').add(subCollectionForChatMember)
              .then(ref => {
                console.log('Added document with ID: ', ref.id);
              })
             }
    });
  }

  async addmessagesTOExistingChanel(RId, Data){
    await this.db.collection('ChatRooms').doc(RId).ref.update({
      messages: firebase.firestore.FieldValue.arrayUnion(Data)
    });
    let doc = this.db.collection('ChatRooms').doc(RId);

    let observer = doc.ref.onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot}`);
      // console.log(docSnapshot.data());
      this.messages = docSnapshot.data().messages;
      // ...

      setTimeout(()=>{
        this.content.scrollToBottom(200);
      });
    
    var userStatus = localStorage.getItem('user');
    var docId = localStorage.getItem('firebaseId');

    var firebaseData = JSON.parse(localStorage.getItem('firebaseData'));
    console.log(firebaseData);
    if(firebaseData.role === 'volunteer'){
      console.log('volunteer')
      this.db.collection('Volunteer').doc(docId).ref.collection('chatMembers').where('userId', '==', this.chatMember.userId).get()
          .then( snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
            }
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
              this.db.collection('Volunteer').doc(docId).ref.collection('chatMembers').doc(doc.id).update(
                {
                  lastMessage: Data.message, timestamp: new Date().getTime()
                }
              )
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
            return;
          });

    } else {
      console.log('people')
      this.db.collection('People').doc(docId).ref.collection('chatMembers').where('userId', '==', this.chatMember.userId).get()
      .then( snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
        }
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.db.collection('People').doc(docId).ref.collection('chatMembers').doc(doc.id).update(
            {
              lastMessage: Data.message, timestamp: new Date().getTime()
            }
          )
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
        return;
      });
    }
    // add sub collection to the user database.
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

}
