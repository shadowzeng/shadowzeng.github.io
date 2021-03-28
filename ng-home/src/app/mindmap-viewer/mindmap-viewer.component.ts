import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {create} from '../mindap'

@Component({
  selector: 'app-mindmap-viewer',
  templateUrl: './mindmap-viewer.template.html',
  styleUrls: ['./mindmap-viewer.style.scss']
})
export class MindmapViewerComponent implements OnInit {

  constructor(private readonly _http: HttpClient) { }

  ngOnInit(): void {
    const map = create('viewer-map', {rootNode: {name: 'Root'}, readonly: true})
    this._http.get('./map.json').subscribe(response => {
      map.new(response)
    })
  }
}
