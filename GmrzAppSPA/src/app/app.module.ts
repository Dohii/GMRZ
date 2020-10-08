import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AuthService } from './_services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErorrInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { PlayerCardComponent } from './players/player-card/player-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerDetailResolver } from './_resolvers/player-detail.resolver';
import { PlayerListResolver } from './_resolvers/player-list.resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { PlayerEditResolver } from './_resolvers/player-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './players/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    PlayerListComponent,
    ListsComponent,
    MessagesComponent,
    PlayerCardComponent,
    PlayerDetailComponent,
    PlayerEditComponent,
    PhotoEditorComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth'],
      },
    }),
    NgxGalleryModule,
    FileUploadModule,
  ],
  providers: [
    AuthService,
    ErorrInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    PlayerDetailResolver,
    PlayerListResolver,
    PlayerEditResolver,
    PreventUnsavedChanges,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
