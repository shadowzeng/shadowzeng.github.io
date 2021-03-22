import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {MindmapViewerRoutingModule} from './mindmap-viewer-routing.module'
import {MindmapViewerComponent} from './mindmap-viewer.component'


@NgModule({
  declarations: [MindmapViewerComponent],
  imports: [
    CommonModule,
    MindmapViewerRoutingModule
  ]
})
export class MindmapViewerModule { }
