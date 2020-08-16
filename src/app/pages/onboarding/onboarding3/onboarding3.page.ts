import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { AuthenticationService } from '../../../services/authentication/authentication.service';

import * as firebase from 'firebase/app';
import "@firebase/auth";

import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-onboarding3',
  templateUrl: './onboarding3.page.html',
  styleUrls: ['./onboarding3.page.scss'],
})
export class Onboarding3Page implements OnInit {

  isFirstTimeLoggedIn: Boolean;
  loading;
  loadingDuration;
  constructor(private router: Router,private activatedRoute: ActivatedRoute, private loadingController: LoadingController, private authenticationService: AuthenticationService, private angularFirestore:AngularFirestore) {
    
    activatedRoute.params.subscribe(async val => {


      var userLoginStatus = localStorage.getItem('isFirstTimeLoggedIn');
   
      if(userLoginStatus === 'true'){
        this.isFirstTimeLoggedIn = true;
      } else if(userLoginStatus === 'false') {
       this.isFirstTimeLoggedIn = false;
      } else {
       this.isFirstTimeLoggedIn = true;
      }
      var db = this.angularFirestore;
      var route = this.router;
      var isUserLoggingFirstTime: Boolean;

      var facebookData: any;
      const loading = await this.loadingController.create({
        message: 'Authenticating...',
      }); 
      await loading.present();
      // console.log('user is logged in already')
      await firebase.auth().getRedirectResult().then(async function(result) {

        if (result.user !== null) {
          console.log(result, 'result from the redirect')
          facebookData = result;
          
          localStorage.setItem('userDetails', JSON.stringify(result));
          
          
          var userRole = localStorage.getItem('user');
          const location = JSON.parse(localStorage.getItem('location'));
          var latitude = location.lat;
          var longitude = location.lng;
          const formatedLocation =  JSON.parse(localStorage.getItem('manualLocation'));
          const helpItems = JSON.parse(localStorage.getItem('helpItems'));
          
        
            var userData = {
            userId :  facebookData.user.uid,
            profilePicture:  facebookData.user.photoURL,
            displayName:  facebookData.user.displayName,
            profile:  facebookData.additionalUserInfo.profile,
            location: new firebase.firestore.GeoPoint(latitude, longitude),
            formatedLocation: formatedLocation.description,
            latesthelpItems: helpItems,
            }
         
            
          if(userRole === 'volunteer') {
           
            userData['role']= 'volunteer';
            // search for the specific documents in Volunteers collection.
            try {
              
              // await this.getTheSpecificDocument('Volunteer',  facebookData.user.uid);
              await db.collection('Volunteer').ref.where('userId', '==', facebookData.user.uid).get()
              .then( snapshot => {
                if (snapshot.empty) {
                  console.log('No matching documents.');
                  isUserLoggingFirstTime = true;
                }  
            
                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  localStorage.setItem('firebaseId', doc.id );
                  localStorage.setItem('firebaseData', JSON.stringify(doc.data()));
                  isUserLoggingFirstTime = false;
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
                return;
              });

            } catch (error) {
              console.log(error);
            }


            if(isUserLoggingFirstTime){
              console.log('The user is a new user need to save!');
            // await this.addUserDataToFirebase('Volunteer', userData);
            await db.collection('Volunteer').add(userData)
            .then(ref => {
              console.log('Added document with ID: ', ref);
              localStorage.setItem('firebaseId', ref.id );
              localStorage.setItem('firebaseData', JSON.stringify(userData));
            })

            isUserLoggingFirstTime = false;
            
            } else {
              // merge the newly updated data.
              var docId = localStorage.getItem('firebaseId');
              // await this.mergeUserDataToFirebase('Volunteer',docId, userData);
              await db.collection('Volunteer').doc(docId).set(userData,  {merge: true} ); 
            }

            // this.navigateToHomePage();
            route.navigate(['home/people']);

            
          } else {

            userData['role']= 'people';
           
         
            // await this.getTheSpecificDocument('People',  facebookData.user.uid);
            try {
              
              await db.collection('People').ref.where('userId', '==', facebookData.user.uid).get()
                .then( snapshot => {
                  if (snapshot.empty) {
                    console.log('No matching documents.');
                    isUserLoggingFirstTime = true;
                  }  
              
                  snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    localStorage.setItem('firebaseId', doc.id );
                    localStorage.setItem('firebaseData', JSON.stringify(doc.data()));
                    isUserLoggingFirstTime = false;
                  });
                })
                .catch(err => {
                  console.log('Error getting documents', err);
                  return;
                });

            } catch (error) {
              console.log(error);
            }
            if(isUserLoggingFirstTime){
              console.log('The user is a new user need to save!');
              // await this.addUserDataToFirebase('People', userData);
              await db.collection('People').add(userData)
            .then(ref => {
              console.log('Added document with ID: ', ref);
              localStorage.setItem('firebaseId', ref.id );
              localStorage.setItem('firebaseData', JSON.stringify(userData));
            })

            isUserLoggingFirstTime = false;
            
            } else {
              // console.log(localStorage.getItem('firebaseId'))
              var docId = localStorage.getItem('firebaseId');
              // await this.mergeUserDataToFirebase('People',docId, userData);
              await db.collection('People').doc(docId).set(userData,  {merge: true} ); 
         
            }

            // this.navigateToHomePage();
            route.navigate(['home/volunteer']);

          }
          
          // ...
        } else {

          console.log('no result from url');
          return;
        }
        
      }).catch(async function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      loading.dismiss();
    });

      
    


   }

  ngOnInit() {

  }



   authenticateFb(){

        this.authenticationService.loggedIn.subscribe(async status => {
  
          await this.showLoading();
          await this.loading.dismiss();
          const userDetails = localStorage.getItem('userDetails');
          const userStatus = localStorage.getItem('user');

          if(userDetails !== null){
            console.log(status,'status of the Authentication');
            if (status) {
              console.log('already loggedIn')
              console.log(status);
              console.log(userStatus);
              // this.loading.dismiss();
              if(userStatus === 'volunteer'){
                this.router.navigate(['home/people']);
              } else if(userStatus === 'people'){
                this.router.navigate(['home/volunteer']);
              } else {
                this.router.navigate(['']);
              }
            } else {
              console.log('Need to login!');
              //  await this.loading.dismiss();
              this.authenticationService.login();
            }
          } else {
            await this.loading.dismiss();
            this.authenticationService.login();
          }

        });
   
  }


  async showLoading() {
    this.loading = await this.loadingController.create({
      message: "Authenticating..."
    });
    this.loading.present();
  }

}
