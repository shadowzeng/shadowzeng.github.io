import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

import {MarkdownEditorModule} from '../markdown-editor'
import {PopupModule} from '../popup'
import {MindmapEditorRoutingModule} from './mindmap-editor-routing.module'
import {MindmapEditorComponent} from './mindmap-editor.component'
import {NodeContentEditComponent} from './node-content-edit'


@NgModule({
  declarations: [MindmapEditorComponent, NodeContentEditComponent],
  imports: [
    MarkdownEditorModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MindmapEditorRoutingModule,
    PopupModule,
  ]
})
export class MindmapEditorModule { }
