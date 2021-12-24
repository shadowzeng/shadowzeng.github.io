import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MindmapEditorComponent} from './mindmap-editor'

const routes: Routes = [
  {path: '', component: MindmapEditorComponent, pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MindmapEditorRoutingModule { }
