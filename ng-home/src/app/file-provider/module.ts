import {NgModule} from '@angular/core'
import {MatSnackBarModule} from '@angular/material/snack-bar'

import {OssService} from './oss.service'

@NgModule({
  providers: [OssService],
  imports: [MatSnackBarModule],
})
export class MapFileModule { }