import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-onboarding2',
  templateUrl: './onboarding2.page.html',
  styleUrls: ['./onboarding2.page.scss'],
})
export class Onboarding2Page implements OnInit {

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

  onboarding3(){
    this.router.navigate(['onboarding3']);
  }

}
