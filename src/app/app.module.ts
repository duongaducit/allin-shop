import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListingComponent } from './views/listing/listing.component';
import { HttpClientModule } from '@angular/common/http';
import { GuideComponent } from './views/guide/guide.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    GuideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
