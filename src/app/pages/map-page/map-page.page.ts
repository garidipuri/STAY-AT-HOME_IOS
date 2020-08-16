import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication/authentication.service';
@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.page.html',
  styleUrls: ['./map-page.page.scss'],
})
export class MapPagePage implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }



}
