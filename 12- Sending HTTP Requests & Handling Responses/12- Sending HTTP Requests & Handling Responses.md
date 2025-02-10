- In this section we will learn how to **Connect Angular Application To A Backend & Database** .. **Fetch Data** .. **Send Data** .. **Handling "Loading & Error" States**.
***
- It's important to understand that you won't directly access the database inside your angular code .. as it would eventually run inside the visitors' website so you should prevent them to see database credentials .. so the solution would be to have some web API so the backend code will be isolated .. but gives you access to the database through some routes to interact with some data like `/places .. /user-places`.
***
- To handle requests you need to use `HttpClient` in your components .. so you should inject it ... but first you should use `ProvideHttpClient()` function .. so you could use the `Application Root Environemt Injector` approach by providing it in the main.ts to make it application wide.

```TS
  this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .subscribe({
        next: (resData) => console.log(resData.places),
  }); 

```

- Whatever method you would use ( get - post ) or anything .. you should define the datatype `<>` .. note that get returns an observable so you need to subscribe to listen to the emitted data and also to trigger the get request and send it.
***
- You could pass configurations object to `get` and use `observe: 'response' | 'events'` to trigger the next with different data .. in case of `'response'` the data will be the response object .. and in case of `events` next will be triggered multiple times for the request response lifecycle.
***
- When handling the error case you could consider use the `catchError` operator before `subscribe` to change the error that will be caught by the `error` method inside the `subscribe`.

```TS
.pipe(
map((val) => val.places),
catchError((error) => { // cathcError should return observable.
  console.log(error);
  return throwError(() => // function that generates observable
  new Error( 'Something went wrong fetching the available places. Please try again later.' )
 );})) 
```
***
- When you use `put` to send data the second argument will be the data .. and don't forget to subscribe.
***
- `tap` operator is used to execute some code as you would do in subscribe but without subscribing .. It’s useful for logging, debugging, or triggering side effects.
***
- You shouldn't do optimistic updating .. this means that you shouldn't update the UI before sending the request to the backend because the request might have some errors.
***
- Angular `HttpClient` allows us to register so-called interceptors .. which are special functions that will be excuted when a request is about to be sent or when a response arrived.

```TS
function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Some Logic
  return next(request); // To continue the request.
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
```
***
- To set up a response interceptor you actually will always need a request interceptor because now it's the result of calling `next` is what will allow us to also intercept responses and act on them.

 **The return of the request interceptor**

```TS
  return next(request).pipe(
    tap({
      next: (event) => { // next here in the tap will be of the type event.
        if (event.type === HttpEventType.Response) { // you could also use Sent instead of Response to listen to the sent event.
          console.log('INCOMING RESPONSE!');
          console.log(event.status);
          console.log(event.body);
	}}
```
  
