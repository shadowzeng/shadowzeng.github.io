import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MindmapEditorRoutingModule } from './mindmap-editor-routing.module';
import { MindmapEditorComponent } from './mindmap-editor.component';


@NgModule({
  declarations: [MindmapEditorComponent],
  imports: [
    CommonModule,
    MindmapEditorRoutingModule
  ]
})
export class MindmapEditorModule { }
