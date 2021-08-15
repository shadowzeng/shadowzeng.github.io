import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatSnackBarModule} from '@angular/material/snack-bar'

import {MarkdownEditorModule} from '../common/markdown-editor'
import {MindmapEditorRoutingModule} from './routing.module'
import {MindmapEditorComponent} from './mindmap-editor'
import {NodeContentEditComponent} from './node-content-edit'


@NgModule({
  declarations: [MindmapEditorComponent, NodeContentEditComponent],
  imports: [
    MatTooltipModule,
    MarkdownEditorModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MindmapEditorRoutingModule,
  ]
})
export class MindmapEditorModule { }
