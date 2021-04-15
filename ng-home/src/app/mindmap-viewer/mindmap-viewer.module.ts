import {OverlayModule} from '@angular/cdk/overlay'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {MarkdownViewerModule} from '../markdown-viewer'
import {MindmapViewerRoutingModule} from './mindmap-viewer-routing.module'
import {MindmapViewerComponent} from './mindmap-viewer.component'
import {NodeMoreComponent} from './node-more.componenet'

@NgModule({
  declarations: [MindmapViewerComponent, NodeMoreComponent],
  imports: [
    OverlayModule,
    CommonModule,
    MarkdownViewerModule,
    MindmapViewerRoutingModule
  ]
})
export class MindmapViewerModule { }
