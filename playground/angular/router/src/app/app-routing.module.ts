import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component'
import {FooComponent} from './foo/foo.component'
import {BarComponent} from './bar/bar.component'
import {HaoComponent} from './hao/hao.component'
import {JarComponent} from './jar/jar.component'

const child_routes: Routes = [
      {path: '', redirectTo: 'aaa', pathMatch: 'full'},
      {path: 'aaa', component: FooComponent},
]

const routes: Routes = [
  {
    path: '11',
    // children: child_routes,
    children: [
      {path: '', component: FooComponent, children: child_routes},
      {path: '', component: BarComponent, outlet: 'header'},
    ]
  },
  {
    path: '22',
    children: [
      {path: '', component: HaoComponent},
      {path: '', component: JarComponent, outlet: 'header'},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(child_routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
