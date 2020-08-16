import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isPeople: Boolean;
  constructor() { }

  ngOnInit() {

    const userStatus =  localStorage.getItem('user');
    
    if(userStatus === 'people'){
      this.isPeople = false;
    } else if(userStatus === 'volunteer'){
      this.isPeople = true;
    }
  }

}
