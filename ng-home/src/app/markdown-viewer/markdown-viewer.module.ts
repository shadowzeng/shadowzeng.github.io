import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MarkdownViewerComponent} from './markdown-viewer.component'
import {MarkdownModule} from 'ngx-markdown'

@NgModule({
  declarations: [MarkdownViewerComponent],
  exports: [MarkdownViewerComponent],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
  ]
})
export class MarkdownViewerModule { }
