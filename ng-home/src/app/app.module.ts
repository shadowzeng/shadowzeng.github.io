import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { ArticleComponent } from '../components/article/article.component'

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
