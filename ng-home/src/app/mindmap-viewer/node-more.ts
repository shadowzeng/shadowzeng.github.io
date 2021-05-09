
import {OverlayRef} from '@angular/cdk/overlay'
import {Component, InjectionToken, Inject} from '@angular/core'

export const NODE_MORE_CONTENT_TOKEN = new InjectionToken<string>('node-more-content')

@Component({
  selector: 'app-node-more',
  templateUrl: './node-more.html',
  styleUrls: ['./node-more.scss'],
})
export class NodeMoreComponent {
  public constructor(
    private readonly _overlayRef: OverlayRef,
    @Inject(NODE_MORE_CONTENT_TOKEN)private readonly _content: string) {
    this.markdown = this._content
  }

  public markdown = ''

  public onClose(): void {
    this._overlayRef.detach()
  }
}
