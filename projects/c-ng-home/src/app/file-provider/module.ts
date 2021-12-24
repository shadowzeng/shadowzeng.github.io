import {NgModule} from '@angular/core'
import {MatSnackBarModule} from '@angular/material/snack-bar'

import {EcsService} from './ecs.service'

@NgModule({
  providers: [EcsService],
  imports: [MatSnackBarModule],
})
export class FileProviderModule { }
