import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {

  constructor(
    private router: Router
  ) { }


  welcome(){

    localStorage.setItem('isFirstTimeLoggedIn', 'true');
    this.router.navigate(['welcome']);

  }

  ngOnInit() {
  }

}
