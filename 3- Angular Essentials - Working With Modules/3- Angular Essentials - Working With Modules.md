
- In this section instead of building stand alone components we will dive to **modules** .. and modules we can say that it's a container that will wrap all the components that will need to interact with each other .. also we will learn how to declare & export components, how to work with shared modules .. also you should know that you can mix stand alone components with modules.
***
- Modules is just a normal .ts file that will contain a class decorated with `ngModlue` decorator which is imported from `@angular/core`.

- Now in the `main.ts` you won't call the `bootstrap application` and give it the main component instead you do the following code .. and also adjust the decorator like the following.

	**main.ts**
	`import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';`
	`import { AppModule } from './app/app.module';`
	`platformBrowserDynamic().bootstrapModule(AppModule);`

	**Decorator for the main module**
	`@NgModule({`
	`declarations: [AppComponent],`
	`bootstrap: [AppComponent],` // This is used to declare which component is the root one.
	`})`

- In the `NgModule` you should import all the components that need to work with each other .. if it's a **stand alone or another module** you should add it in the imports array .. other components should added to the declarations array.

  `imports: [HeaderComponent, UserComponent, TasksComponent, BrowserModule],` 
  // `BrowserModule` is essential for running an Angular application in a web browser .. but it's meant to be imported only with the root module .. instead in any other module that also needs the essential and common features you would import the `commonModule`.
***
- To convert a component you will remove the `standalone` property as the default is false .. and also deleted the imports array as it can't be used with a non standalone component and then also do the same for all the components that this component was depending on .. and finally add all of them to the declarations array.

- When you have a shared component it's quite common to build it's own module.

**Implementation of the shared component module**
`@NgModule({`
  `declarations: [CardComponent], 
  // If we have multiple shared component other than `CardComponent` it would be added here to the declarations array.`
  `exports: [CardComponent],` // This export is used when another module will import this module .. then the components that's added here to the exports array will be available there .. and note that you should only add the components that another component in the declarations array need to use (Don't just add all the components). 
`})`
`export class SharedModule {}`

- Every module is working on it's own .. so if a module needs something it should be imported or added to the declarations array.
