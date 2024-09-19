
- In this section we will have a deep dive in **What's Change Detection ?** .. **Understanding Angular's Change Detection Mechanism** .. **Using the OnPush Strategy** .. **Change Detection & Signals** .. **Going Zoneless**.
***
- By default you have your component tree and angular wraps this entire tree with so-called **zone** which is a feature provided by **zone.js** .. which is a library that's used to inform angular about potential events that's going on the page that could potentially lead to changes that should be reflected on the screen.

- So when a button for example has an event listener is clicked angular will get notification and then it will go and check all the entire components.

- If you have getters in the components that will be used in property binding or string interpolation don't do performance-intensive logic inside them as they will be excuted a lot when angular will check the components again.
***
- During the **Development Mode** when you haven't deploy the application yet .. change detection will run twice to check if some returned value has changed between this two cycles .. and will throw an error in this case.
***
- When you have a timer for example that will just log some message .. you could inject `NgZone` to use the `runOutsideAngular` method to make the code inside it won't trigger the change detection when the timer expired.

  `ngOnInit(): void {`
    `this.zone.runOutsideAngular(() => {`
      `setTimeout(() => {`
        `console.log('Hello From Counter Component!');`
***
  - To use the `OnPush` strategy add this to the component configurations object ... `changeDetection: ChangeDetectionStrategy.OnPush`.

- When using `OnPush` there are three ways that could trigger the change detection .. 1- Manually trigger ... 2- Input has changed on the component which you set `OnPush` ... 3- An event occurred anywhere in this component or one of it's child components. 

- One other way that could lead to re-evaluate your `OnPush` component .. if you are using signals and a signal value has changed then your component and it's child components will be re-evaluated.
***
- You could inject `changeDetectionRef` to use inside the component that will need to trigger the change detection manually.

- Angular use `RxJs` which is a third part library that angular use to get notified about events that could have an impact on a component ... we would import `BehaviorSubject` inside the service from the `RxJs` which will act like a signal .. as it will be a wrapper around a value and allows you to set a subscription to changes to that value.

- `variableName$` this is a special naming convention that's used with `RxJs` related variables.


**Code Snapshots From Service**
`messages$ = new BehaviorSubject<string[]>([])` .. make instance of the `BehaviorSubject` and then use it to emit the messages using `next`.

`this.messages$.next(this.messages)`

**Code Snapshots From The Component**

  `private cdRef = inject(ChangeDetectorRef);`

  `ngOnInit() {`
    `const subscription = this.messageService.messages$.subscribe((messages) => {`
      `this.messages = messages;` .. messages is the values that's emitted from the service using `next`.
      `this.cdRef.markForCheck();`
    `});`
    `this.destroyRef.onDestroy(() => subscription.unsubscribe());`
  `}`
***
- Instead of all the code written inside the component you could only have a variable that holds the `BehaviorSubject` like this .. `messages$ = this.messageService.messages$` .. then use the `Async` pipe inside the template with this property ... by using this shortcut approach angular will set the subscription to this subject and automatically read the emitted data, delete the subscription when needed .. and also it will trigger the change detection for this component.
***
- If you are using only `signals` and `property binding` you can get rid of `Zone.Js` as you have enough resources to inform angular when something has changed .. and then angular will run change detection.

- To deactivate `zone.js` first go to `angular.json` .. under the `build` under the `polyfils` remove that `zone.js` .. then stop and restart your development server to have an effect ... then in the `main.ts` import `provideExperimentalZonelessChangeDetection` and add it as a second parameter for the `bootstrapApplication` inside the `providers`.