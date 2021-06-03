import {NgModule} from '@angular/core'
import {HttpClientModule} from '@angular/common/http'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatButtonModule} from '@angular/material/button'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {MapFileModule} from './file-provider'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MapFileModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
