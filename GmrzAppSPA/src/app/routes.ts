import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PlayerDetailResolver } from './_resolvers/player-detail.resolver';
import { PlayerEditResolver } from './_resolvers/player-edit.resolver';
import { PlayerListResolver } from './_resolvers/player-list.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'players',
        component: PlayerListComponent,
        resolve: { users: PlayerListResolver },
      },
      {
        path: 'players/:id',
        component: PlayerDetailComponent,
        resolve: { user: PlayerDetailResolver },
      },
      {
        path: 'player/edit',
        component: PlayerEditComponent,
        resolve: { user: PlayerEditResolver },
        canDeactivate:[PreventUnsavedChanges]
      },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent }
     
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
