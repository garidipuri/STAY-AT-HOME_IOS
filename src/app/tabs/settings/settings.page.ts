import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router, private authenticationService:AuthenticationService
  ) { }

  signOut(){
    console.log('signing out from the App');
    localStorage.setItem('isFirstTimeLoggedIn', 'false');
    this.authenticationService.logout();
  }

  ngOnInit() {
  }

}
