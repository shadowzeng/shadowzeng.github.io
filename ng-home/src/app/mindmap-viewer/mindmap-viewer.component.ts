import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mindmap-viewer',
  templateUrl: './mindmap-viewer.component.html',
  styleUrls: ['./mindmap-viewer.component.scss']
})
export class MindmapViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    mindap.create('editor-map', {rootNode: {name: 'Root'}})
  }
}
