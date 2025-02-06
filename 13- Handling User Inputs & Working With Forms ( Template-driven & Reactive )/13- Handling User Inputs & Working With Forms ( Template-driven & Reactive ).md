
- In this section we will dive deep in handling forms in angular .. **Template-driven Forms & Reactive Forms** .. **Managing Inputs, Values and Validation**.
***
- In the **template-driven** you will be setting up forms via component's template unlike the **Reactive** approach which you will be setting up forms via TS code then link it to the form.
***
## Template-driven Forms

- Using `ngModel` with any kind of HTML inputs makes angular aware of this input and be able to manage it behind the scenes.
- When using `ngModel` with some input element you must be using the `name` property with this element as this is the name that `ngModel` will use to register this input.
***
- To get access to the form object that's created by angular and managed behind the scenes .. angular gives you some special identifiers to make this template variable binded to something else other than the default value.
  `#form="ngForm"` .. by this `form` is binded to the angular object which will be of the type `NgForm`.
***
- Now we can use this object to get hold the values that's entered by the user .. `const enteredEmail = formData.form.value.email` .. note that this `email` is the name that's used with the input element.
***
- When you add `required` attribute for an input that's using `ngModel` angular will take over and make the validation instead of the website    built-in validation .. also when you use it the form won't be prevented from submission instead it will be marked as invalid in the form object and you can find the errors in `controls -> email -> errors` for example.
***
- If you tried to use the form object inside the template they won't work because it's the first time it's being rendered .. the form hasn't been set up yet .. instead we would access the control object by this syntax .. `#email = "ngModel"` .. which is a supported syntax when using `ngModel` to store the control object.

```TS
<form #myForm="ngForm">
  <input type="email" name="email" ngModel required #email="ngModel">
  <p *ngIf="email.invalid">Invalid Email</p>
</form>
```
***
- `ng-pristine` class is added if this input field hasn't received any input.
***
- Note that `reset` will also reset all the internally managed information.

- `valueChanges`  returns an observable which will emit an event every time the value of one of the controls changed.

```TS
constructor() {
    afterNextRender(() => {
      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500)) // Won't emit events unless there wasn't changes for 500ms.
        .subscribe({
          next: (value) =>
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ // As localStorage items has to be string
                email: value.email,
              })
        });

      this.destroyRef.onDestroy(()=> subscription?.unsubscribe());
    });
  }
```

- And then you can use this saved value to set the email again when the user has refreshed or something.

```TS
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  setTimeout(() => { this.form().controls['email'].setValue(JSON.parse(savedForm).email) // setValue is used to set one of the controls.
 }, 1)} // We had to wait just one millisecond to the control to be initialized.
```
***
## Reactive Forms

- First you should instantiate a new object of the `formGroup` class .. which will take an object as a parameter that contains a key value pairs for the controls.

```TS
form = new FormGroup({
    email: new FormControl(''), // This initial value is used when the form email field is first rendered or when it's rested.
    password: new FormControl(''),
 }); 
```
***
- To link your `formGroup` to the template first import `ReactiveFormsModule` in the imports array .. then link it like this `<form [formGroup]="form">` ... and the inputs by any way of the following two ways .. `[formControl]="form.controls.email"` or `formControlName="email"`.
***
- The `formGroup`s takes a second argument which is a configurations object that contains the `validators` key which will be implemented to all the controls .. also note that the `formGroup` is also from the type `abstractControl` just like the `formControl`.
***
- Here in the reactive forms you will handle the form submission by the same way but the difference is that you don't need to pass values to `onSubmit` method as you have access to the form in the TS file .. also in the TS code you can access the values that's entered by the user super easily and type safe because angular know the form shape.
***
   `email: new FormControl('', {`
      `validators: [Validators.email, Validators.required, mustContainQuestionMark],`
   `}),` .. this is how you can add validators to the input using the `validators` object .. also we can build custom validators like the `mustContainQuestionMark` validator.

- If you want to build your own custom validator .. it's simply a function that takes the control as an input and should return null if it's valid or return object that explains the error.

```TS
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) return null;
  return { doesNotContainQuestionMark: true };
}
```
***
- You can use `asyncValidators` to do some asynchronous logic .. like sending an HTTP request to the backend to make sure this is an unique email ... `asyncValidators` will also take a validator which will be a function with the same structure as before but here it should return an observable .. and we can do this by using `of` which is used to return an observable which instantly emits some value.

```TS
function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') return of(null);
  return of({ notUnique: true });
}
```
***
- `patchValue()` this method is used if you want to update partially a form.
***
- You can use nested `formGroups` but you should then use the `formGroupName` property within the template and it's used with the parent  that will group the elements together .. note that `formGroupName` is used only with the nested form groups.
***
- `formArray` is meant to be used whenever you have a list of controls which you don't necessarily need a unique name per control .. and they are meant to work together in the end.

```TS
source: new FormArray([
  new FormControl(false), // You don't need to give them names.
  new FormControl(false),
  new FormControl(false),
])
```

- After that you should link it to the template using `formArrayName="source"` .. and also link the inputs but using index not names ... `formControlName="0"`.

