import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {FormControl} from '@angular/forms'

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.html',
  styleUrls: ['./markdown-editor.scss']
})
export class MarkdownEditorComponent implements OnInit {
  @Input() inputContent = ''
  @Output() readonly confirm = new EventEmitter<string>()
  @Output() readonly close = new EventEmitter<void>()
  formControl = new FormControl('')
  editingContent = ''

  ngOnInit(): void {
    this.formControl.setValue(this.inputContent)
    this.editingContent = this.inputContent
    this.formControl.valueChanges.subscribe(content => {
      this.editingContent = content
    })
  }

  onConfirm(): void {
    if (this.formControl.untouched) {
      this.close.emit()
      return
    }
    this.confirm.emit(this.editingContent)
  }
}
