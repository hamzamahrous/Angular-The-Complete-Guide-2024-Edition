
## Part 1 ( 1 - 16 )

-  In the src/app we will write the code for the components.
****
- AngularCLI Inject the TS script file when it starts working .. but first compile it to JS.
****
- We are building components as classes but we never make objects of them the angular will do this.
****
- A decorator in TS is a special kind of declaration that can be attached to class, method, property.
- The **@component** decorator is a class decorator that marks a class as an angular component and it's used to add configurations to the class and some metadata.
- The **@component** is linked to the exported class by placing the decorator just above the class if you would create another class you should attach the decorator just above it again.
****
- In the component you can use template to write the HTML template but don't do this except for only very short components .. instead use templateUrl to add a path .. same for styling.
- "./" the dot then slash is used to show this is relative path.
****
- Angular depend on the idea of **Hierarchy Components** that you call a main component that calls other components .. and call the 'bootstrapApplication' function for the root component .. and in the root component inside it's HTML you should use the selector that was specified for other components and also in it's TS file you should import the other child components that will be used.

## Part 2 ( 17 - 25 )

- You should have folder for each section of components and you can do this manually or by the command 'ng g c user' => ng generate component user .. will make a file called user and insert the necessary files for the component .. and the extra one is for automated testing.
****
- If you have a component selector in HTML that doesn't take data you can modify it to make it a self closing element.
****
- `<span>{{public property}}</span>` This is used in the HTML of the component and it's called **String Interpolation** that allow you to access the public properties of your class that have been exported from the component .. and this will only be used between the tags.
****
* **property binding** .. This feature will be used to add a dynamic content to the attributes .. like this `[src] = "selectedUser.avatar"` and maybe also for the 'alt' .. `[alt] = "selectedUser.name"`.
****
- **getters & setters** is a method that can be used in a class to manipulate the data with some logic but still will be accessed and used like a normal method.
****
- `(click)= "onSelectUser()"` this is to handle the user events and then declare the function normally inside your class.
****
- Note that angular automatically detect when a component's data has changed .. and it checks if this change will reflect on the UI .. if it will then it just updates the UI automatically .. and this is done using 'zone.js' framework.

## Part 3 ( 26 - 32 )

- The signals is the other way to change the data .. It's like a container that take a value and when this value changes .. it sends a signal .. and this make it a way more efficient.
- To use it first import it from angular/core .. then make it in the object and pass initial value like this `selectedUser = signal(DummyUsers[randomIndex])` .. and to change it's value you can use the `set` method on the signal object .. and in the template you need to call it like a function .. and also for the image path instead of getters you could use `computed()` which is meant to be used with signals .. it takes one signal or more than one and compute value from them and when any signal changes it re-compute the value and also it makes a signal under the hood.
****
- To make the component takes an input in the template we should use `@Input()` decorator.
- Here we will deal with a property that doesn't have initial value as we will take it in the template .. so you should declare it's type and also use `!` to handle that you know it will be set `@Input() avatar!: string` .. also this input decorator can accept configurations object .. and we can use it's required property and set it to true to make it can't be empty in the HTML.
****
- Note that `input` .. is a special function that produce a signal in the end but `Input` .. this is the decorator ... the following two approaches are equal .. but using `input` function will be read only that means that you can't change it's value from inside the component (when an event occur for example) ... and also note that whatever the way you have declared the input when we assign it's value we will use `Property Binding` normally.
## Part 4 ( 33 - 38 )

- In Angular, the `@Output` decorator and `EventEmitter`  are used to create custom events that a component can emit to its parent component `@Output() select = new EventEmitter();`
-   `onSelectUser() {`
    `this.select.emit(this.id);`
    `}`
- You would have also a function for the parent (It's convenient to use the same name) that handle what will be happen with this received id.
- `$event` in Angular represents the data emitted by the child component ..         `(select)="onSelectUser($event)`.
****
- `select = output<string>();` using this output function like the `input` function .. instead of the first approach .. but it still works the same as it's in the end also as `EventEmitter()` and note that this `output` function doesn't produce a signal unlike the `input` function.
****
- `@Input() name?: string` this question mark tells TS that 'this is might be unset and I'm aware of that .. or you could use something like this : `string | undefined`.
- `<app-tasks [name]="selectedUser?.name" />` this is a JS syntax that will access the name if selectedUser isn't undefined .. but if it's undefined it will just return `undefined` as a fallback value .. also you could have written ternary operator.

## Part 5 ( 39 - 43 )

- You can make the input type is object like this .. note that we just are declaring the type not actually creating an object.
-   `@Input({ required: true }) user!: {`
    `id: string;`
    `avatar: string;`
  `};
****
- `type User = {`
  `id: string;`
  `avatar: string;`
  `name: string;`
`};`

`interface User {`
  `id: string;`
  `avatar: string;`
  `name: string;`
`}`
****
- `@for (user of users; track user.id) {`
	`<li>`
		  `<app-user [user]="user" (select)="onSelectUser($event)"></app-user>`
	`</li> }`  
	
- This is used to output the list users dynamically & this track is used to make each item has a specific thing that's attached to it .. this helps angular a lot when it's need to be rendered again and make it a way more efficient.

- Note @if & @else if & @else use.
****
- Note the use of the legacy code with (ngFor) & (ngif) and that they need to be imported.
## Part 6 ( 44 - 54 )

- It's a common pattern that you use a separate files for the interfaces .. and then import and add the prefix keyword 'type' to make it very clear that you are importing a type here .. and with this you now can use this interface anywhere in your application.
- `[class.active] = "expression"` is a specific type of property binding that binds the presence of the `active` CSS class to the result of the Boolean expression.
***
- We can say that directives are enhancements that are added to the elements to have more features or you can say it's a component without template.
- `ngModel` is meant to be used with the form-related inputs and with the two-way-bindings to make like a live connection between the user's input and a public property.
- `[(ngModel)] = "publicProperty"` but first you should import `formsModule` from angular/forms.
***
- You could also use signals with two-way bindings like this .. `enteredTitle = signal('')` and that's all you don't have to change anything in the template.
***
- When you import the `formsModule` the form now by default is prevented from it's default behavior so it won't try to submit something to the server and also you could use the directive `(ngSubmit) = onSubmit()` so when the form is trying to submit your function `onSubmit` will be triggered.
## Part 7 ( 55 - 63 )

-  When you use a component as a wrapper for some markup it won't keep them instead it will use it's own markup .. so to solve this we should use the markup `< ng-content />` to make the markup stays and also you could combine it with another built-in markups.
****
- You could use **pipes** to do some changes to the output before outputting it .. they are used by this`|` that's put after the output like this `<time>{{ task.dueDate | date:'fullDate' }}</time>` and it can be configured like this to show the full date .. but first it must imported from `@angular/common` like this `import { DatePipe } from '@angular/common';`
****
- You should consider using services .. which is a file that contain a class that have some data and methods to manipulate it.
****
- **Dependency Injection** means that you don't make an instance of your service object by yourself .. instead you tells angular and it's made for you .. by this approach your now can use this instance in all the components and now you are working on the same data in all of them.

-   `constructor(private tasksService: TasksService) {}` This is a shorthand offered by angular to make a private property -we could have make it public- and assign it to the instantaneous of the `TasksService` class.
- And also you should inject it in the service object by using this decorator `@Injectable({ providedIn: 'root' })`  and by this you are now tell angular to make just one instantaneous and use it everywhere.

 - And also note to do this `private tasksService = inject(TasksService);` when you want to use this injected `TasksService` service.