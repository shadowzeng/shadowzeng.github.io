
import {Component, InjectionToken, Inject} from '@angular/core'

export const NODE_MORE_CONTENT_TOKEN = new InjectionToken<string>('node-more-content')

@Component({
  selector: 'app-node-more',
  templateUrl: './node-more.template.html',
  styleUrls: ['./node-more.style.scss'],
})
export class NodeMoreComponent {
  public constructor(@Inject(NODE_MORE_CONTENT_TOKEN)private readonly _content: string) {
    this.markdown = this._content
  }

  public markdown = ''
}
