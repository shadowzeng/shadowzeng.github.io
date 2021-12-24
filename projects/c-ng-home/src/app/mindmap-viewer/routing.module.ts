import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MindmapViewerComponent} from './mindmap-viewer'

const routes: Routes = [
  {path: '', component: MindmapViewerComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MindmapViewerRoutingModule { }
