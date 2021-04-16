import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {MarkdownViewerModule} from '../markdown-viewer'

import {MarkdownEditorComponent} from './markdown-editor'

@NgModule({
  declarations: [MarkdownEditorComponent],
  exports: [MarkdownEditorComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MarkdownViewerModule,
  ]
})
export class MarkdownEditorModule { }
