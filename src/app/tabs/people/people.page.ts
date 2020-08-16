import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { 


  }

  ngOnInit() {

    this.authenticationService.loggedIn.subscribe(status => {
      console.log(status,'login status');
      if (!status) {
        this.router.navigate(['onboarding3']);
      } else {
        this.router.navigate(['home/people']);
      }
    });

  }

}
