import { Component, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import * as marked from 'marked'

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    '../../node_modules/highlight.js/styles/github.css',
  ]
})
export class AppComponent implements AfterViewInit {

  public constructor(private readonly _http: HttpClient) {}

  public a = ''

  public ngAfterViewInit(): void {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code): string => {
        return hljs.highlight('typescript', code).value
      }
    })
  }

  public getArticle(): void {
    this._http.get('./docs/rxjs.md', {responseType: 'text'}).subscribe((content: string): void => {
      this.a = marked(content)
      // setTimeout((): void => {
      //   hljs.highlightBlock(this._docDivRef.nativeElement)
      // }, 1000)
    })
  }

  // @ViewChild('doc')
  // private readonly _docDivRef!: ElementRef<HTMLDivElement>
}
