import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
  {path: '', redirectTo: 'mindmap-viewer', pathMatch: 'full'},
  {path: 'mindmap-viewer', loadChildren: () => import('./mindmap-viewer').then(m => m.MindmapViewerModule)},
  {path: 'mindmap-editor', loadChildren: () => import('./mindmap-editor').then(m => m.MindmapEditorModule)},
  // {path: 'blog-viewer', loadChildren: () => import('./markdown-viewer').then(m => m.MarkdownViewerModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
