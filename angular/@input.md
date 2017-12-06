```javascript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
 
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
 
  //appHighlight 为输入的名字， highlightColor 未指令中用的别名
  @Input('appHighlight') highlightColor: string;
 
  private el: HTMLElement;
 
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }
 
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'cyan');
  }
 
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
 
  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
}
```
