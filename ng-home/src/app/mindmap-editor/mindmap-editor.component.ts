import {Component, OnInit} from '@angular/core'

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

  private _map!: MindapInstance
}
