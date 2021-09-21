import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  foo = 'foo'
  text = 'test'
  ngOnInit(): void {
    setTimeout(() => {
      this.foo = 'bar'
      this.text = 'hello'
    }, 1000)
  }
}
