import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

import {MindmapEditorRoutingModule} from './mindmap-editor-routing.module'
import {MindmapEditorComponent} from './mindmap-editor.component'


@NgModule({
  declarations: [MindmapEditorComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MindmapEditorRoutingModule
  ]
})
export class MindmapEditorModule { }
