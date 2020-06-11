import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import hljs from 'highlight.js'
import * as marked from 'marked'

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

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: [
        './article.component.scss',
        '../../../node_modules/highlight.js/styles/github.css',
    ]
})
export class ArticleComponent implements OnInit {

    public constructor(private readonly http: HttpClient) { }

    @Input() public set path(path: string) {
        if (path === '') {
            return
        }
        this.request(path)
    }

    public content = ''

    public ngOnInit(): void {
    }

    public request(path: string): void {
        this.http.get(path, { responseType: 'text' }).subscribe((content: string): void => {
            this.content = marked(content)
        })
    }
}
