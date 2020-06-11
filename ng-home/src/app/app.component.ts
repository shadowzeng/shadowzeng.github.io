import { Component, AfterViewInit } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    public articles = [
        {
            name: 'test',
            path: './docs/test.md',
        },
        {
            name: 'rxjs',
            path: './docs/rxjs.md',
        },
    ]

    public path = ''

    public ngAfterViewInit(): void {}

    public onClick(path: string): void {
        this.path = path
    }
}
