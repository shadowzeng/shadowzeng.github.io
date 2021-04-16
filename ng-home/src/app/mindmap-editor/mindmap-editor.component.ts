import {Component, OnInit} from '@angular/core'
import * as qiniu from 'qiniu-js'

import {create, MindapInstance, Node} from '../mindap'
import {PopupConfig, PopupService} from '../popup'
import {NodeContentEditComponent, NODE_CONTENT_EDIT_TOKEN} from './node-content-edit'

@Component({
  selector: 'app-mindmap-editor',
  templateUrl: './mindmap-editor.template.html',
  styleUrls: ['./mindmap-editor.style.scss']
})
export class MindmapEditorComponent implements OnInit {
  private _map!: MindapInstance

  public constructor(private readonly _popupService: PopupService<NodeContentEditComponent>) {}

  public ngOnInit(): void {
    this._map = create('editor-map', {rootNode: {name: 'Node'}})

    this._map.on('nodeContentEdit', (node: Node) => {
      this._openContentEditor(node)
    })
  }

  public onAddNode(): void {
    this._map.addNode()
  }

  public onRemoveNode(): void {
    this._map.removeNode()
  }

  public onDownload(): void {
    const data = this._map.exportAsJSON()
    const json = JSON.stringify(data)
    console.log(json)
    const blob = new Blob([json], {type: 'application/json'})
    // qiniu.upload(blob, )
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
}
