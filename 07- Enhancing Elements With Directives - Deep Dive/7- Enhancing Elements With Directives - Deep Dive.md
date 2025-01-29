
- In this section we will dive deep into directives .. and we will learn about **Directives vs Components** .. **Attribute directives** .. **Structural directives** .. **Built-in directives** .. **Building custom directives**.
****
- We can say that the directives are enhancements that are added to the elements to have more features .. we can say it's a component without template.
***
- `ngModel` is an attribute directive ( It's called attribute directive as it's added like attributes ) and it allows us to perform **two-way binding** .. and it also adds dynamically managed CSS classes.
***
- `*ngIf="exp"` is an example for the built-in structural directives .. and **It's called structural because it changes the DOM structure** ... and note that now there's no structural directives that's used in modern angular.

```TS nums
import { Directive } from '@angular/core';
 
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
})
export class SafeLinkDirective {
  constructor() {
  console.log('SafeLinkDirective Is Active!'); 
  }
}
```

- This is how we can build a custom directive and note this is an attribute directive as it's not manipulating the DOM so it's not structural and also note that it also should be imported before you use it inside a component.
***
- `(event.target as HTMLAnchorElement).href` here we are using **type casting** to convince typescript that the type would be `HTMLAnchorElement` so we can safely access the `href` property on that. 
***
- The directives are just like the components so they can take an input or emit an output or inject service or maybe inject the host element .. but it's better to simplify the use of the directives so we don't make different input name .. instead we use the same name of the directive as an input ... so we can set an alias for the input to have some name inside the directive but outside it's the directive name.

  `queryParam = input('my-app', { alias: 'appSafeLink' })` note that `appSafeLink` would be the selector name of the directive.
***
- All the previous directives created was `Attribute directives` now we will convert the directive to `Structural directive`.

- `<ng-template>` is used to wrap some content that will show up eventually but not at the beginning .. and we can use with it the directive directly without the asterisk .. as if you used the asterisk `<ng-template>` will be added under the hood ... and also it will act like it's binded so if you want to add string you would have to quote it again.

```TS nums
<ng-template appAuth="admin">
     <p>Only Admins Should See This!</p>
</ng-template>
```

- Also we need to inject two things `TemplateRef, ViewContainerRef` .. the `templateRef` will hold a reference to the template which uses the directive .. and the `ViewContainerRef` will hold a reference to the place in the DOM where this template is being used.

```TS
  effect(() => {
      if (this.userType() === this.authService.activePermission()) {
         this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
         this.viewContainerRef.clear();
      }
  })
```
***
- When we have a directive that should corporates with another directives or components there's no need for repetition and adding them manually for each one .. instead we could use `hostDirectives: []` inside the component's decorator configurations and add the directives here and they will be added automatic .. and also you could combine it with the regular way of adding them manually.
