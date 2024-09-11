
## Part 1 ( 94 - 104 )

- In this section we will build on the solid foundation we have before .. and also we will dive deeper to some important concepts like .. **1- Advanced components features & concepts** .. **2- Working with the host element** .. **3- Inputs, Outputs & Two-Way-Binding** .. **4- Interacting with component view & content** .. **5- Component lifecycle** .. and we will do this by working on another demo application.
****
- The first important question about components is when to split a component ? .. The answer is that it's depending on your specific preferences as you have **Separation Of Concerns** principle which tells to make every component doing exactly just one thing but also with that you could end up with a plenty of components that could have been migrated into a less number of components.
****
- When you see duplicated code then you should notice that you could do a reusable component
****
- When you use property binding you tell typescript that this should be evaluated like a typescript code not just as a string.
***
- Consider that you could  **Extend build-in elements with custom components via attribute selector** .. `selector: 'button[appButton]` this will make any build-in button that have the custom attribute `appButton` will activate this component and take over it.

## Part 2 ( 105 - 116 )

- `<span> <ng-content /></span> 
  `<ng-content select=".icon" />` .. now this will work by selecting `.icon` and render it to the second ng-content also you could have used any CSS selector inside the select attribute .. and then render the rest of the content in the upper span.

- Also instead of the previous approach you could have used `ngProjectAs="icon"` for the content to be projected and then use `select="icon"` to specify it's projected position.

- Note that if you write content inside the `ng-content` it will be used as a fallback value.
****
- For component selector and for ng-content selector you could use multiple selectors separated by comma like this .. `selector:"button[appButton], a[appButton]"`
****
- By default the styles are just scoped to effect only the component .. if you want to disable this feature add to the component configurations .. `encapsulation: ViewEncapsulation.None` and by this the styles are global again.
****
- The host element is the selector of the component and it's the element that act as a wrapper for your component's template and note that it's actually do end up in your DOM .. like for the header the host element is the `app-header` element .. and if you want to target this host element inside your CSS you could use `:host` .. but note that you can't do this while you are preventing the encapsulation as there won't by any real connection between the styles and the component.

- Now instead of adding the properties to the host element when using it like adding a class or id .. you could define the **host property** inside your component decorator like this 
  `host: {`
    `class: 'control',
    `'(click)': 'onClick()'` .. to trigger the `onClick` when the host element is clicked
  `}`

- When you want to add a property to your host element you could use **HostBinding** like this `@HostBinding('class') className = 'control'`.
- Also if you want to add an event listener but using **HostListener** you could use the following approach 
	`@HostListener('click') onClick(){
		`console.log('clicked');
	`}
	
- Note that the angular team recommend the approach using the `host` property inside the decorator.

- If you needed to access the host element programmatically you could use the following 
`private el = inject(ElementRef)`

## Part 3 ( 117 - 129 )

- Note this syntax for binding class dynamic 
  `[class]="{`
    `status: true,`
    `'status-online': currentStatus === 'online',`.. the key are quoted as it's invalid name.
    `'status-offline': currentStatus === 'offline',`
    `'status-unknown': currentStatus === 'unknown'`
`}"`
***
- You could also bind the styling by the same way ... and if style property contain two words you could use the camelCase method or quote it like before in the classes.
 - `[style]="{`  
    `'font-size': '40px'` **or** `fontSize: '40px'`
  `}"` .. If just one property `[style.font-size]="'40px'"`.
***
- `currentStatus: 'online' | 'offline' | 'unknown' = 'online';` using **Literal Values** to assign `currentStatus` to only some specific strings.
****
- In the previous section when we done the logic of set interval in the constructor .. it's considered a good practice to let your constructor lean as much as you can and do the logic using the component life cycle hooks .. like using **ngOnInit()** which would be triggered when all the inputs of the component got initialized.

- Now using this function might cause some problems as you won't get any errors if you wrote the name wrong for example like this **ngonInit()** .. so to solve this problem you could use after the class name `implements onInit` to force the class to throw error if you didn't use it.
  `export class ServerStatusComponent implements OnInit{} `
***
**Component Lifecycle**

- `ngOnChanges` will be triggered when one of the inputs value has changed 
  `ngOnChanges(changes: SimpleChanges){}` The `changes` is an object that will be generated automatically by angular and contain the following attributes for each input .. **currentValue, firstChange, previousValue**.

- `ngOnDestroy` will be triggered when the component isn't rendered anymore for example if it's rendered conditionally and the condition is no longer met .. and you can use it to do some cleanup work.

- `ngDoCheck` is triggered whenever angular thinks that there's a changes that might reflect on the UI .. so it's discouraged to use it as any code written in it would run a lot.

- **View** is an internally managed data structure that holds references to the DOM elements rendered by the component so we can say that it's the template.
- **Content** is another **View** projected into the component's view and it's related to the content projection.

- Note the hooks `ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked`.
***
- Note this different approach for using instead of `ngOnDestroy` first inject `DestroyRef`like this .. `private destroyRef = inject(DestroyRef)` then use it to add an event listener for the destruction like this `this.destroyRef.onDestroy(() => clearInterval(interval))`.
***
- Another way to get the input values instead of the **Two ways binding** is the **Template Variables** and it's working by using `#anyName` inside the element .. `<input name="title" id="title" #titleInput />` then it's available anywhere in your template so you could for example pass it to a function like this .. `onSubmit(titleInput.value)` .. also note that you can use the same variable name for various elements .. and you could add for the same element multiple variables names.

- If you use **Template Variables** with some of your components then it hold a reference to the instance of that component.

## Part 4 ( 130 - 138 )

- Note that `form` element has by default `reset()`method which reset all the inputs.
- Note that `ElementRef`is a wrapper around a native element .. so you need to tell typescript what's the type of the element it will be wrapped inside this ElementRef.

- Now instead of passing every template variable that we need to interact with it .. we will use another approach which is **ViewChild** .. And this will be used by first declare the template variable normally and then use it like this `@ViewChild('form') form?: ElementRef<HTMLFormElement>` ... note that this **ViewChild** takes a selector so you could pass to it a component like this `@ViewChild(ButtonComponent)` or a  **Template Variable** but you can't use a CSS selector inside it.

- You could use `ViewChildren`if you have more than one child to be selected.
****
- `private form = viewChild.required<ElementRef<HTMLFormElement>>('form')` .. note this approach for using `viewChild`function instead of the decorator .. and note that it returns a signal.

- Now when we will deal with the `content` instead of the `view` and this will happen when the template variable is inside the content that's being projected inside our component view .. we will use the content related methods... `contentChild, @ContentChild`.
****
- When we are getting elements using `@ViewChild, @ContentChild`decorators it's not guaranteed to able to use them inside `ngOnInit`hook unlike if you used `ngAfterViewInit, ngAfterContentInit` they will be available ... but if you used the signal methods `viewChild, contentChild`they will always be available even inside the `ngOnInit`hook.
****
- `afterRender(), afterNextRender()` will be implemented inside the constructor not as methods in the class .. and note that `afterRender`will be called a lot .. as it's called when anything changes in the entire application .. unlike `afterNextRender`.
****
-   `constructor() {`
    `effect(() => {`
      `console.log(this.currentStatus());`
    `});`
  `}` Using effect allow you to write a code that will run whenever a signal value changes. 
***
- Note the use of `onCleanUp()`hook to do the some cleanup work .. this function will be called inside the `effect`function and it will be executed before the next execution for the `effect function`.
## Part 5 ( 139 - 146 )

- When we use `@for` the array might be empty so you could use `@empty{}` after the `@for` to add some fallback value.
- When working with `@for` you might want to know if this element is the first, last and so on .. so angular offers some variables to be used inside the `@for` like .. `$first, $last, $even, $odd, $count`.
***
-   `onDetailsToggle() {`
     `this.isVisible.set(!this.isVisible());`
     `this.isVisible.update((wasVisible) => !wasVisible);`
 `}` .. note that these two approaches are equal .. the `update` method takes a callback function which takes the old value of the signal as a parameter and update based on it. 
***
  -  `this.tickets = this.tickets.map((ticket) => {`
      `if (ticket.id === id) {`
        `return { ...ticket, status: 'closed' };`
      `}`
      `return ticket;`
    `});` note this syntax .. if we find the ticket that should be modified we make a shallow copy using the spread operator .. and overriding the status property and return the modified object .. if it's not the required ticket we return it without modifications. 
***
- There are some configurations that you could use with the inputs & outputs like using `alias:` property which would change the name of the input or output from outside the component ... so when working inside the template you would use the property name normally but when setting the input from outside the component you would use the alias name ... but note that this isn't recommended.

- You could also use the `transform` property to make some changes to the input value `transform: (value) => {}`but you should be careful with this too.

- for outputs you could only use `alias`.
***
- To set up custom two-way binding you should use inside the component a combination of `input & output` but with specific naming pattern ... for example if you have input with the name `size` then the output would be with the name `sizeChange` and then you could use two way binding with this input property ... `[(size)]="rectSize"`.

  `@Input({ required: true }) size!: { width: string; height: string }`
  `@Output() sizeChange = new EventEmitter<{ width: string; height: string }>()`.
***
- If you are using **Angular 17.2** or later you could use the **model** function ... `size = model.required<{ width: string; height: string }>()` .. and if you want to reset it's value instead of emitting some data you could just use the set property .. as it's in the end `modelSignal`.