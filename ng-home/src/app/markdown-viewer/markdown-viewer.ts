import {Component, OnInit, Input} from '@angular/core'

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.html',
  styleUrls: ['./markdown-viewer.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() public content = `## Markdown __rulez__!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet

### Blockquote
> Blockquote to the max`

  constructor() { }

  ngOnInit(): void {
  }

}
