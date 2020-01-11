import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
// 'fas' (solid) is the default prefix for fontawesome style, so we must use 
// a different one ('far') here for the regular version of the same icon
import { faBell as farBell, faStar as farStar, faThumbsUp as farThumbsUp} from '@fortawesome/free-regular-svg-icons';
import { faBell, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { LikeComponent } from './like/like.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    LikeComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    // Add multiple icons (regular and solid styles) to the library
    library.addIcons(faBell, farBell, faStar, farStar, faThumbsUp, farThumbsUp);
  }
}
