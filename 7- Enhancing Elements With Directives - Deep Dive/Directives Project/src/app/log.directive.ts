import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
})
export class LogDirective {
  private elementRef = inject(ElementRef);

  constructor() {
    console.log('CLICKED!');
    console.log(this.elementRef.nativeElement);
  }
}
