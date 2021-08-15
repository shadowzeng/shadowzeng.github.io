import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MarkdownViewerComponent} from './markdown-viewer'
import {MarkdownModule} from 'ngx-markdown'
import {MarkdownViewerRoutingModule} from './routing.module'

@NgModule({
  declarations: [MarkdownViewerComponent],
  exports: [MarkdownViewerComponent],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    // MarkdownViewerRoutingModule,
  ]
})
export class MarkdownViewerModule { }
