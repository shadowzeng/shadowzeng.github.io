import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooComponent } from './foo/foo.component';
import { BarComponent } from './bar/bar.component';
import { HaoComponent } from './hao/hao.component';
import { JarComponent } from './jar/jar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooComponent,
    BarComponent,
    HaoComponent,
    JarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
