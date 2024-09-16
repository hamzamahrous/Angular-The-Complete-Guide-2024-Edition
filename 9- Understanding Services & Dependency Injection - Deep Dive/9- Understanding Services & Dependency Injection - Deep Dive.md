
- In this section we will **Revisit Services** .. **Revisit DI** .. **Hierarchical Injectors & DI Resolution Process** .. **Injection Tokens & Values**.
***
- Remember that the signal has a generic nature.
***
- Why we need DI ? .. If you used the normal JS syntax to make instance of the `TasksService`in each place where you need to use the service .. you would have different instances of the class and you aren't working on the same data.
***
- The injectors in angular set as hierarchy .. and these injectors are the place where components and directives reach to ask for service or a value.

- `Null Injector` .. to generate errors if it's reached.
- `platform Environment Injector` .. to provide a value for multiple applications that are registered in one angular project.
- `Application root Environment Injector -- Module Injector` .. to inject to the whole application.
- `Element Injector` .. you will use it by adding `providers: []` in your component decorator configuration object .. and by this it will be available to inject inside this component and it's sub components ... but note that you can't use it to inject service into another service.
***
- `@Injectable({ providedIn: 'root' })` .. register an injectable thing with the `Application Root Environment Injector` .. another way to do the same approach is to pass second parameter to the bootstrap function `bootstrapApplication(AppComponent, {providers: [TasksService]})` .. but the difference is with this second approach the service will always be provided initially .. so this may lead to large code base ... unlike the first approach which will only load the service when needed.
***
- When you use the `ElementInjector` by the `providers: []` .. it's important to understand that it's providing different instance for each component.
***
- `Injection Token` .. it acts as an identifier for the injectable thing ... and it has a generic nature that's used to tell TS which kind of value will be provided through that token.

- Now we will return the approach of using `bootstrapApplication` and understand what angular do behind the scenes by **Using Custom DI Tokens & Providers** ... what happens is that angular creates a provider object .. and this object has a `provide` property that you should make an `InjectionToken` to use with it and then one of the `use` properties to define what will you inject.

`export const TasksServiceToken = new InjectionToken<TasksService>(`
  `'tasks-service-token'`
`);`
 
`bootstrapApplication(AppComponent, {`
  `providers: [{ provide: TasksServiceToken, useClass: TasksService }],`
`}).catch((err) => console.error(err));` .. note that this make it available in the entire application.


- Then you need to change the `InjectionToken` with the `inject` function when you want to inject the service and use the custom DI token `TasksServiceToken` .. but with the constructor syntax this wouldn't work and we need an alternative syntax which would be the following ... 

`constructor(@Inject(TasksServiceToken) private tasksService: TasksService) {}`
***
- We can use the previous knowledge to provide non service values for our angular application .. as you can provide any value to your components, directives and services .. by doing the same logic but you may consider declaring a `Provider` in `task.model` and then use it .. in the `providers: []` directly.

`export const taskStatusOptionsProvider: Provider = {`
  `provide: TASk_STATUS_OPTIONS,`
  `useValue: taskStatusOptions,`
`};`
***
- If you are using modules then you can in the `AppModule` use the `providers: []` to provide any values just as you learned.
***
- Note that all you have learned in the services doesn't rely on signals .. you could use the non-signals way inside the service and all will work the same.