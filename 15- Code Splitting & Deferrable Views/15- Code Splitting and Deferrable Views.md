
- In This section we will have a deep dive in **Lazy Loading** .. **What & Why ?** .. **Deferrable Views** .. **Lazily Loaded Routes**.
***
- The idea of lazy loading is that you don't load the entire code initially but instead you split it into multiple chunks that are loaded on demand ... which will lead to smaller initial bundle size and the application will be running quicker.
***
- Angular offers two main approaches for implementing lazy loading .. but these two approaches aren't alternative to each other .. instead you can apply both of them (you don't have to but you can).
***
- The first approach is `Route-based Lazy Loading` which means that you don't load some routes (components) except when they are needed.

- You should choose carefully which route to make it lazily loaded .. as there's no meaning to make it a route that will be activated initially .. this might make the application even more slower as will be two requests.

```TS
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  } 
```

This was the code initially for the `'tasks` route now to make it lazily loaded you should add this instead of the `component` property.

```TS
  loadComponent: () => {
      return import('../tasks/tasks.component').then((mod) => mod.TasksComponent);
}, // Note that it returns a promise.
```
    
- Now this will make the component loaded lazily .. note that if you imported the component initially using the normal import it's eagerly loaded like the initial case .. but now it will only be imported when this function gets excuted.

- Note that if you are importing anything else from the same file then the all file is loaded and you aren't using the lazy loading properly.
***
 `loadChildren: () =>` .. to make a children lazily loaded.
      `import('./users/users.routes').then((mod) => mod.routes)`
***
- When you have a service which is injected in root like this 
  `@Injectable({ providedIn: 'root' })`  .. it will be loaded initially when the application starts.

- To deal with this you will remove the configurations object `{providedIn: 'root'}` and group the routes that need this service in one route and add the `providers` method which will make the service available for them when they are loaded as they are lazily loaded so the service now is lazily loaded successfully.

- Of course this is done for only the services which is relevant to some component which isn't used initially .. as if you have a service which should be working with all of the application you won't do this.
***
- Modern angular offers you a new way for implementing lazy loading which is **deferrable views** feature.

- Our motivation here in the application is that we have a counter that should only start when the user get there and be able to see it ... and here we aren't using routes instead we are using normal component.

`@defer () {` .. by this syntax without using triggers the component will be lazily loaded .. but will only be loaded when the browser in the idle mood.
`<app-offer-preview />`
`}`

`@defer (on viewport) {` .. by this it will be triggered when the user can see it
   `<app-offer-preview />`
   `} @placeholder {` .. you need to add a place holder.
   `<p> We have an offer ... </p>`
`}`
***
- You can use `on interaction` trigger to only load the component when the user interacts with the `placeholder` (click on it) .. also you can add a prefetching trigger.
***
- You should consider read the official documentation as there's a lot more of the important `defer` features. 
