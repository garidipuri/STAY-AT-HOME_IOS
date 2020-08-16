import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome-selection-page',
  templateUrl: './welcome-selection-page.page.html',
  styleUrls: ['./welcome-selection-page.page.scss'],
})
export class WelcomeSelectionPagePage implements OnInit {

  constructor(
    private router: Router
  ) {}


  volunteer(){
    localStorage.setItem('user', 'volunteer');
    this.router.navigate(['onboarding1']);
  }

  people(){
    localStorage.setItem('user', 'people');
    this.router.navigate(['onboarding1']);
  }

  ngOnInit() {
  }

}
