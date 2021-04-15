import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MarkdownViewerComponent} from './markdown-viewer.component'

const routes: Routes = [
  {path: '', component: MarkdownViewerComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkdownViewerRoutingModule { }
