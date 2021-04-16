import {OverlayRef} from '@angular/cdk/overlay'
import {Component, InjectionToken, Inject} from '@angular/core'

import {Node} from '../mindap'

export const NODE_CONTENT_EDIT_TOKEN = new InjectionToken<string>('node-content-edit')

@Component({
  selector: 'app-edit-node-content',
  templateUrl: './node-content-edit.html',
  styleUrls: ['./node-content-edit.scss'],
})
export class NodeContentEditComponent {
  public constructor(
    private readonly _overlayRef: OverlayRef,
    @Inject(NODE_CONTENT_EDIT_TOKEN)private readonly _node: Node,
  ) {
    this.markdown = this._node.payload?.content || ''
  }

  public markdown = ''

  public onContentConfirm(content: string): void {
    this._node.payload = this._node.payload || {}
    this._node.payload.content = content
    this._overlayRef.detach()
  }

  public onClose(): void {
    this._overlayRef.detach()
  }
}
