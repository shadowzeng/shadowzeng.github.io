import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Subject} from 'rxjs'
import {throttleTime} from 'rxjs/operators'

import {create} from '../mindap'
import {PopupService, PopupConfig} from '../common/popup'
import {EcsService} from '../file-provider'
import {NodeMoreComponent, NODE_MORE_CONTENT_TOKEN} from './node-more'

@Component({
  providers: [PopupService],
  selector: 'app-mindmap-viewer',
  styleUrls: ['./mindmap-viewer.scss'],
  templateUrl: './mindmap-viewer.html',
})
export class MindmapViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  private _mapZoom$ = new Subject<void>()
  constructor(
    private readonly _http: HttpClient,
    private readonly _fileService: EcsService,
    private readonly _popupService: PopupService<NodeMoreComponent>
  ) {}

  ngOnInit(): void {
    const map = create('viewer-map', {rootNode: {name: 'Root'}, readonly: true})
    this._fileService.get().then(json => {
      map.new(json)
    })

    map.on('nodePayloadSelect', (element: Element, payload: any) => {
      this._openMore(element, payload.content)
    })
    map.on('zoom', () => {
      this._mapZoom$.next()
    })
  }

  ngAfterViewInit(): void {
    this._mapZoom$.pipe(throttleTime(0)).subscribe(() => {
      this._popupService.updatePosition()
    })
  }

  ngOnDestroy(): void {
    this._mapZoom$.complete()
  }

  private _openMore(target: Element, content: string): void {
    const config: PopupConfig<NodeMoreComponent, string> = {
      target,
      component: NodeMoreComponent,
      token: NODE_MORE_CONTENT_TOKEN,
      data: content
    }
    this._popupService.show(config)
  }
}
