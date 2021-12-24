import {Component, OnInit, OnDestroy} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {saveAs} from 'file-saver'
import {Subject} from 'rxjs'
import {throttleTime} from 'rxjs/operators'

import {create, MindapInstance, Node} from '../mindap'
import {PopupConfig, PopupService} from '../common/popup'
import {EcsService} from '../file-provider'
import {NodeContentEditComponent, NODE_CONTENT_EDIT_TOKEN} from './node-content-edit'

@Component({
  providers: [PopupService],
  selector: 'app-mindmap-editor',
  styleUrls: ['./mindmap-editor.scss'],
  templateUrl: './mindmap-editor.html',
})
export class MindmapEditorComponent implements OnInit, OnDestroy {
  private _map!: MindapInstance
  private _mapZoom$ = new Subject<void>()

  public constructor(
    private readonly _fileService: EcsService,
    private readonly _snackBar: MatSnackBar,
    private readonly _popupService: PopupService<NodeContentEditComponent>) {}

  public ngOnInit(): void {
    this._initMap()
    this._mapZoom$.pipe(throttleTime(0)).subscribe(() => {
      this._popupService.updatePosition()
    })
  }

  public ngOnDestroy(): void {
    this._mapZoom$.complete()
  }

  public onAddNode(): void {
    this._map.addNode()
  }

  public onRemoveNode(): void {
    this._map.removeNode()
  }

  public onUndo(): void {
    this._map.undo()
  }

  public onRedo(): void {
    this._map.redo()
  }

  public onDownloadMap(): void {
    const json = this._map.exportAsJSON()
    const blob = new Blob([JSON.stringify(json)], {type: 'application/json'})
    saveAs(blob)
  }

  public onUploadMap(): void {
    const data = this._map.exportAsJSON()
    const json = JSON.stringify(data)
    this._fileService.save(json).then(() => {
      this._snackBar.open('上传服务器成功', undefined, {duration: 3000})
    })
  }

  public onBackupMap(): void {
    const data = this._map.exportAsJSON()
    const json = JSON.stringify(data)
    this._fileService.saveAs(json).then(() => {
      this._snackBar.open('备份成功', undefined, {duration: 3000})
    })
  }

  public onLoadMap(event: Event): void {
    const reader = new FileReader()
    const input = event.target as HTMLInputElement
    if (!input.files)
      return
    reader.readAsText(input.files[0])
    reader.onload = (e) => {
      if (!e.target) 
        return
      const result = e.target.result
      if (!result || typeof result !== 'string')
        return
      const data = JSON.parse(result)
      this._map.new(data)
    }
    input.value = ''
  }

  public openContentEditor(node: Node): void {
    const target = node.dom
    const config: PopupConfig<NodeContentEditComponent, Node> = {
      target,
      component: NodeContentEditComponent,
      token: NODE_CONTENT_EDIT_TOKEN,
      data: node
    }
    this._popupService.show(config).detachments().subscribe(() => {
      this._map.updateNodeContent()
    })
  }

  private _initMap(): void {
    this._map = create('editor-map', {rootNode: {name: 'Node'}})

    this._fileService.get().then(json => {
      this._map.new(json)
    })

    this._map.on('nodeContentEdit', (node: Node) => {
      this.openContentEditor(node)
    })

    this._map.on('zoom', () => {
      this._mapZoom$.next()
    })
  }
}
