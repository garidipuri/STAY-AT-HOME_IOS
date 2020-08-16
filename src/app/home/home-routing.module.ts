import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      { path: 'people', loadChildren: './../tabs/people/people.module#PeoplePageModule' },
      { path: 'volunteer', loadChildren: './../tabs/volunteer/volunteer.module#VolunteerPageModule'},
      { path: 'messages', loadChildren: './../tabs/messages/messages.module#MessagesPageModule' },
      { path: 'conversation/:id', loadChildren: './../pages/home-pages/conversations/conversations.module#ConversationsPageModule' },
      { path: 'settings', loadChildren: './../tabs/settings/settings.module#SettingsPageModule' }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
