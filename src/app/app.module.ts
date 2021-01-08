import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // Specify the ngx-auth-firebaseui library as an import
    NgxAuthFirebaseUIModule.forRoot(
      {
        apiKey: 'your-firebase-apiKey',
        authDomain: 'your-firebase-authDomain',
        databaseURL: 'your-firebase-databaseURL',
        projectId: 'your-firebase-projectId',
        storageBucket: 'your-firebase-storageBucket',
        messagingSenderId: 'your-firebase-messagingSenderId'
      },
       () => 'your_app_name_factory',
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: true,
        enableEmailVerification: true, // default: true
      }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
