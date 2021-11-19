import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'foo',
  template: `<div>{{message}}</div>`,
})
export class FooComponent {
  @Input() message = 'foo'
}
