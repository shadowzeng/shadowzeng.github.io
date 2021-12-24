import {Component, OnInit, Input} from '@angular/core'

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.html',
  styleUrls: ['./markdown-viewer.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() public content = ''

  constructor() { }

  ngOnInit(): void {
  }

}
