import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MarkdownViewerModule} from '../markdown-viewer'

import {MarkdownEditorComponent} from './markdown-editor'

@NgModule({
  declarations: [MarkdownEditorComponent],
  exports: [MarkdownEditorComponent],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MarkdownViewerModule,
  ]
})
export class MarkdownEditorModule { }
