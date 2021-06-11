import {OverlayModule} from '@angular/cdk/overlay'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

import {MarkdownViewerModule} from '../markdown-viewer'

import {MindmapViewerRoutingModule} from './routing.module'
import {MindmapViewerComponent} from './mindmap-viewer'
import {NodeMoreComponent} from './node-more'

@NgModule({
  declarations: [MindmapViewerComponent, NodeMoreComponent],
  imports: [
    OverlayModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MarkdownViewerModule,
    MindmapViewerRoutingModule,
  ]
})
export class MindmapViewerModule { }
