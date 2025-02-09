- In this section we will have a deep dive in **What's Change Detection ?** .. **Understanding Angular's Change Detection Mechanism** .. **Using the OnPush Strategy** .. **Change Detection & Signals** .. **Going Zoneless**.
***
- By default you have your component tree and angular wraps this entire tree with so-called **zone** which is a feature provided by **zone.js** .. which is a library that's used to inform angular about potential events that's going on the page that could potentially lead to changes that should be reflected on the screen.
***
- So when a button for example has an event listener is clicked angular will get notification and then it will go and check all the entire components.

**Angular Change Detection Flow**

When an event happens (like a button click), Angular follows these steps:

1. Mark the affected component and its children as dirty.
2. Start change detection from the root (AppComponent).
3. Traverse the tree but **only check dirty components.**
    - If a component is clean (not marked as dirty), Angular skips it.
    - If a component is dirty, Angular checks it and updates the view if needed.
4. Re-render only necessary parts of the DOM.
***
- If you have getters in the components that will be used in property binding or string interpolation don't do performance-intensive logic inside them as they will be excuted a lot when angular will check the components again.
***
- During the **Development Mode** when you haven't deploy the application yet .. change detection will run twice to check if some returned value has changed between this two cycles .. and will throw an error in this case.
***
- When you have a timer for example that will just log some message .. you could inject `NgZone` to use the `runOutsideAngular` method to make the code inside it won't trigger the change detection when the timer expired.

```TS
 ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('Hello From Counter Component!');
        }
    }
}
```
***
- There's a strategy that we can use to enhance the performance which is the **OnPush** strategy ... when using `OnPush` there are three ways that could trigger the change detection .. 1- Manually trigger ... 2- Input has changed on the component which you set `OnPush` ... 3- An event occurred anywhere in this component or one of it's child components. 

  - To use the `OnPush` strategy add this to the component configurations object ... `changeDetection: ChangeDetectionStrategy.OnPush`.

- One other way that could lead to re-evaluate your `OnPush` component .. if you are using signals and a signal value has changed then your component and it's child components will be re-evaluated.
***
- You could inject `changeDetectionRef` to use inside the component that will need to trigger the change detection manually.

- Angular uses `RxJs .. (Reactive Extensions for JavaScript)` which is a third part library to handle asynchronous operations and to get notified about events that could have an impact on a component.

- `BehaviorSubject` will be imported inside the service from the `RxJs` which will act like a signal .. as it will be a wrapper around a value and allows you to set a subscription to changes to that value.

- `variableName$` this is a special naming convention that's used with `RxJs` related variables.


- Code Snapshots From a **Service** .. which makes instance of the `BehaviorSubject` and then use it to emit the messages using next.


```TS
messages$ = new BehaviorSubject<string[]>([]) 
this.messages$.next(this.messages)
```

- Code Snapshots From **The Component** .. note that  `messages` is the values that's emitted from the service using next.

```TS
 private cdRef = inject(ChangeDetectorRef);

  ngOnInit() {
    const subscription = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
```

- Instead of all the code written inside the component you could only have a variable that holds the `BehaviorSubject` like this .. `messages$ = this.messageService.messages$` .. then use the `Async` pipe inside the template with this property ... by using this shortcut approach angular will **set the subscription** to this subject and **automatically read the emitted data**, **delete the subscription when needed** .. and also it will **trigger the change detection** for this component.
***
- If you are using only `signals` and `property binding` you can get rid of `Zone.Js` as you have enough resources to inform angular when something has changed .. and then angular will run change detection.

- To deactivate `zone.js` first go to `angular.json` .. under the `build` under the `polyfils` remove that `zone.js` .. then stop and restart your development server to have an effect ... then in the `main.ts` import `provideExperimentalZonelessChangeDetection` and add it as a second parameter for the `bootstrapApplication` inside the `providers`.
