import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-mindmap-viewer',
  templateUrl: './mindmap-viewer.template.html',
  styleUrls: ['./mindmap-viewer.style.scss']
})
export class MindmapViewerComponent implements OnInit {

  constructor(private readonly _http: HttpClient) { }


  ngOnInit(): void {
    // @ts-ignore
    const map = mindap.create('editor-map', {rootNode: {name: 'Root'}})
    this._http.get('./map.json').subscribe(response => {
      map.new(response)
    })
  }
}
