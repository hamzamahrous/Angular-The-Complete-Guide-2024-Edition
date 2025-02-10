- In this section we will have a deep dive in .. **What are Observables ?** .. **Creating & Using Observables** .. **Observables Operators** .. **Observables vs Signals**.
***
- Observables aren't angular specific feature .. it's a concept introduced by a third part library called **RxJs** which is used by angular .. and it's in the end an object that produces and controls a stream of data.
***
- `RxJs` introduces a lot of functions that you can use to create observables .. instead of using subjects ... for example in the following code here we would use `interval` from `RxJs` which will emit a number every constant interval.

- Recall that `subjects` are special kind of observables where you can subscribe to the data in many components and use them .. but the difference is that in `subjects` you will be manually emitting the data.

- With any observable in order to listen to the values that are emitted and use them you need to set up a subscription .. also you need to set up a subscriber in order to kick of the observable .. without the subscriber the observable won't emit anything.

```TS
 ngOnInit(): void {
    const subscription = interval(1000).subscribe({
      next: (val) => console.log(val), // you could also use other methods like error to do something in case of error or use complete to do something after the completion.
    });
    
    this.destroyRef.onDestroy(() => subscription.unsubscribe()) // don't forget to unsubscribe to prevent memory leaks.
```
***
-  Most of the functions provided by `RxJs` aren't created to make an observables .. instead they will operate on existing observables and allow you to manipulate their values .. because `RxJs` has this concept of operators which are functions you could pipe them into your observable data stream to perform transformations.

```TS
 const subscription = interval(1000)
	  .pipe(map((val) => val * 2)) // note that you call it before subscribe.
	  .subscribe({
		next: (val) => console.log(val),
	  });
```
***
**Observables vs Signals**

- Signals have initial values .. observables don't.

- If you made the previous logic using signals note that it will always start immediately unlike the observables which won't start unless you set a subscriber.

- With signals you can read the data automatically without setting a subscription.

- Observables are great for events & streamed data ... Signals are great for managing application state.
***
**Converting Between Observables & Signals** 

 `clickCount$ = toObservable(this.clickCount)` .. and then in the `ngOnInit` you could set up a subscription and use it as observable.

 `interval$ = interval(1000);`
 `intervalSignal = toSignal(this.interval$, { initialValue: 0 });`
  .. note that `toSignal` automatically cleanup the subscription for you when this component is destroyed .. also note that if you didn't pass initial value to the new signal it will be undefined.
***
- To build an observable from scratch you can use the `observable` class.

```TS
import { Observable } from 'rxjs';

const customInterval$ = new Observable((subscriber) => {
  let timesExecuted = 0;

  const interval = setInterval(() => {
    console.log('EMITTING NEW VALUE...');
    subscriber.next({ message: 'NEW VALUE' }); // Emitting the next event and sending the data.

    timesExecuted++;

    if (timesExecuted > 2) {
      clearInterval(interval); // Clear the interval to stop emitting.
      subscriber.complete();   // Emit the complete event.
      return;
    }
  }, 2000);
});
```
