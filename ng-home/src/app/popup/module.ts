import {OverlayModule} from '@angular/cdk/overlay'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {PopupService} from './popup.service'

@NgModule({
  imports: [
    OverlayModule,
    CommonModule,
  ],
  providers: [PopupService],
})
export class PopupModule { }
