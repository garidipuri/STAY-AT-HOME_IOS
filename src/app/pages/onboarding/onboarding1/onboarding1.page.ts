import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding1',
  templateUrl: './onboarding1.page.html',
  styleUrls: ['./onboarding1.page.scss'],
})
export class Onboarding1Page implements OnInit {

  isPeople: Boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    const userStatus = localStorage.getItem('user');
    if(userStatus === 'volunteer'){
      this.isPeople = false	
    } else {
      this.isPeople = true
    }
  }
  
  onboarding2(){
    localStorage.setItem('isHelpItemsUpdated', 'true');
    this.router.navigate(['onboarding2']);
  }

}
