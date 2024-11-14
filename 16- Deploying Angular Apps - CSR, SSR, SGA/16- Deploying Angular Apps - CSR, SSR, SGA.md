
- In this section we will explore what's **Build Options: SPA, SSR, SSG** .. **What, Why & When ?** .. **Deployment Examples**.
***
- Deployment is a multi-step process which starts by developing & testing your application ... after that we must prepare the application for deployment and that means we need to build it ... and you do this by  telling angular CLI that now we want to compile and optimize our code and that can be done by running `ng build` or `npm run build` .. then you will find `dist` folder which will contain a `browser` folder which contains the code files that will be deployed.
***
- When we just build the application using `ng build` then it's built as **SPA** which stands for **Single Page Application** ... which means to build a client-side only web application (all the the UI rendering happens on the client side) by the JS code that's being served by the web host to the website visitors ... and this is the **CSR** (Client Side Rendering).

- That also means that **All the code executes in the browser** .. and **No dynamic web server needed - a static suffices**.

- Potential disadvantages: **Initially missing content, bad SEO** .. if the user's connection is slow or anything happens.
***
- For deploying you can use **Firebase** which is free and perfect for static hosting and you can watch any tutorial to see the process.

- You can also use angular CLI to deploy your project by running `ng add @angular/fire` or any other supported provider .. then run `ng deploy`.
***
- The next option is to build your application as a **Server Side Rendered App (SSR)** ... so when the user wants to visit a certain page the request is handled on the server first and the page that was requested will be re-rendered on demand on the server so **Browser receives finished, rendered page** .. then **Web app is hydrated and becomes a SPA after initial rendering** .. so a **Dynamic web server is required** ... so now the visitors will no longer have an initial empty page but the disadvantages is that the rendering will take a little bit longer also we have increased complexity.

- To prepare your application to be built as SSR you can run the command `ng add @angular/ssr` or when you are making a new project you could run `ng new --ssr` to configure it from the beginning ... by this it's updated by adding all the needed files and it's ready to be built. 

- To build it you will still use `npm run build` and due to the changes angular will understand that it should be built as SSR .. now you will get a `server` folder inside the `dist` folder ... you also will get a new script to preview the SSR application on your system.

- You can use `afterNextRender()` to add some code that should only be excuted on the browser as you might encounter errors if you are using for example local storage because when it runs on the server it won't be available.
***
- The last option is the **Static Side Generation (SSG)** .. it's a mix between the two previous approaches as **Angular app routes are pre-rendered at build time** .. so **Browser receives finished, rendered pages** .. then **Web app hydrated and becomes as a SPA** .. also a **Dynamic web server is required** and also there's potential disadvantages as **No dynamic server-side data fetching**.

 ![[Pasted image 20241114112333.png]]
***
- To configure and use SSG first you also would run `ng add @angular/ssr`.

- Note that the routes that needs to be updated and up-to-date can't be pre-rendered using SSG.

- By default angular will try to re-render pages .. and it will render the pages that don't have a dynamic part in their path.

- If you want to pre-render some pages first in the `angular.json` change `prerender` property to an object that contains the key `routesFile` and the value that will be the path to the text file which contain the routes to be pre-rendered by angular (one per line).
