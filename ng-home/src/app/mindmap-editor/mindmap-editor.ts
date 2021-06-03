import {Component, OnInit, OnDestroy} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'

import {create, MindapInstance, Node} from '../mindap'
import {PopupConfig, PopupService} from '../popup'
import {EcsService} from '../file-provider'
import {NodeContentEditComponent, NODE_CONTENT_EDIT_TOKEN} from './node-content-edit'

const MAP_FILE_NAME = 'mindmap.json'

@Component({
  selector: 'app-mindmap-editor',
  templateUrl: './mindmap-editor.html',
  styleUrls: ['./mindmap-editor.scss']
})
export class MindmapEditorComponent implements OnInit, OnDestroy {
  private _map!: MindapInstance

  public constructor(
    private readonly _fileService: EcsService,
    private readonly _snackBar: MatSnackBar,
    private readonly _popupService: PopupService<NodeContentEditComponent>) {}

  public ngOnInit(): void {
    this._initMap()
  }

  public ngOnDestroy(): void {
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
    const data = this._map.exportAsJSON()
    const json = JSON.stringify(data)

    // const blob = new Blob([json], {type: 'application/json'})
    // const file = new File([blob], MAP_FILE_NAME)
    this._fileService.save(json).then(() => {
      this._snackBar.open('上传服务器成功', undefined, {duration: 3000})
    })
  }

  public onBackupMap(): void {
    const data = this._map.exportAsJSON()
    const json = JSON.stringify(data)

    // const blob = new Blob([json], {type: 'application/json'})
    // const file = new File([blob], MAP_FILE_NAME)
    this._fileService.saveAs(json).then(() => {
      this._snackBar.open('备份成功', undefined, {duration: 3000})
    })
  }

  public onLoadMap(event: Event): void {
    console.log(event)
    let reader = new FileReader()
    const input = event.target as HTMLInputElement
    // @ts-ignore
    reader.readAsText(input.files[0])
    reader.onload = (e) => {
        // @ts-ignore
        let data = JSON.parse(e.target.result)
        this._map.new(data)
    }
    input.value = ''
  }

  public _openContentEditor(node: Node): void {
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
      this._openContentEditor(node)
    })
  }
}
