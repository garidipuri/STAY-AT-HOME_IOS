import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-help-items',
  templateUrl: './help-items.component.html',
  styleUrls: ['./help-items.component.scss'],
})
export class HelpItemsComponent implements OnInit {

  checked1: Boolean = false;
  checked2: Boolean = false;
  checked3: Boolean = false;
  checked4: Boolean = false;

  helpItems = {};

  private db: any;

  constructor(private angularFirestore: AngularFirestore) {
    this.db = this.angularFirestore;
    var helpItems = JSON.parse(localStorage.getItem('helpItems'));
   
    console.log(helpItems);
    if(helpItems !== null) {
      if(helpItems['groceries'] === true){
        this.checked1 = true;
      } else {
        this.checked1 = false;
      }
      if(helpItems['madiciens'] === true){
        this.checked2 = true;
      } else {
        this.checked2 = false;
      }
      if(helpItems['dog_walking'] === true){
        this.checked3 = true;
      } else {
        this.checked3 = false;
      }
      if(helpItems['others'] === true){
        this.checked4 = true;
      } else {
        this.checked4 = false;
      }
    } else {
      this.checked1 = false;
      this.checked2 = false;
      this.checked3 = false;
      this.checked4 = false;
    } 
  }

  ngOnInit() {
  }

  select1(){
    this.checked1 = !this.checked1;
    console.log(this.checked1);
    this.updateHelpItems(this.checked1, 'groceries');
  }
  select2(){
    this.checked2 = !this.checked2;
    console.log(this.checked2);
    this.updateHelpItems(this.checked2, 'madiciens');
  }
  async select3(){
    this.checked3 = !this.checked3;
    console.log(this.checked3);
    this.updateHelpItems(this.checked3, 'dog_walking');
  }
  select4(){
    this.checked4 = !this.checked4;
    console.log(this.checked4);
    this.updateHelpItems(this.checked4, 'others');
  }

  updateHelpItems(checkStatus: Boolean, Item: String){
    if(checkStatus){
      this.helpItems[`${Item}`] = true;
      localStorage.setItem('helpItems', `${JSON.stringify(this.helpItems)}`);
      
    } else {
      this.helpItems[`${Item}`] = false;
      localStorage.setItem('helpItems', `${JSON.stringify(this.helpItems)}`);
    }

    // update the data into databse.
    var userLoggedInData = localStorage.getItem('userDetails');

    if(userLoggedInData !== null){
      var userRole = localStorage.getItem('user');
      // update the location into firebase
      var Id = localStorage.getItem('firebaseId');
      var helpItems = JSON.parse(localStorage.getItem('helpItems'));

      if(userRole === 'volunteer'){
        // write location to the firebase 
        let cityRef = this.db.collection('Volunteer').doc(Id);
        // Set the 'capital' field of the city
        let updateSingle = cityRef.update({helpItems: helpItems});
      } else {
        // write location to the firebase 
        let cityRef = this.db.collection('People').doc(Id);
        // Set the 'capital' field of the city
        let updateSingle = cityRef.update({helpItems: helpItems});
      }
    } 

  }

}
