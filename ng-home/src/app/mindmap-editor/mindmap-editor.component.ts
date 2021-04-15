import {Component, OnInit} from '@angular/core'
import * as qiniu from 'qiniu-js'

import {create, MindapInstance} from '../mindap'

@Component({
  selector: 'app-mindmap-editor',
  templateUrl: './mindmap-editor.template.html',
  styleUrls: ['./mindmap-editor.style.scss']
})
export class MindmapEditorComponent implements OnInit {
  public ngOnInit(): void {
    this._map = create('editor-map', {rootNode: {name: 'Node'}})
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
    const blob = new Blob([json], {type: 'application/json'})
    // qiniu.upload(blob, )
  }

  private _map!: MindapInstance
}
