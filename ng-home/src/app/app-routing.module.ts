import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
  {path: '', redirectTo: 'viewer', pathMatch: 'full'},
  {path: 'viewer', loadChildren: () => import('./mindmap-viewer').then(m => m.MindmapViewerModule)},
  {path: 'editor', loadChildren: () => import('./mindmap-editor').then(m => m.MindmapEditorModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
