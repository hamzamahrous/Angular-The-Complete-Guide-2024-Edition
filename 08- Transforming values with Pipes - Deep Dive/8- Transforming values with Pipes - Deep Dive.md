
- In this section will have a deep dive into **Pipes** .. **Built-in Pipes** .. **Building Custom Pipes** .. **Pure vs Impure Pipes**.
***
- Pipes is a thing you can add in your template to transform the way data is displayed .. and it can work on any type of data.
***
- `<p>{{ currentDate | date }}</p>` .. and it should be imported.
- `<p>{{ currentDate | date : "medium" }}</p>` .. this is how it can be configured .. by passing arguments to the pipe.

- `<p> Chicago: {{ currentTemperaturs.chicago | number : "1.1-2" }}</p>`  .. example usage to the `DecimalPipe` the parameters are .. `min num of int .. min num of decimal .. max num of decimal`.
***
- `temp : "fah" : "cel"` .. note the syntax to pass more than one argument to the pipe.

- You can chain pipes by simply adding them after each other .. but by aware of the expected data types.
- You can add pipes any where in your template it's not restricted to be inside the string interpolation or something.
***
- To prevent the pipes from running a lot .. as it's part of the UI and it can be triggered a lot .. angular caches the returned value from the pipe transform method and only re trigger it if the input value changed .. so for example if you changed one item's value inside an array angular will consider the array didn't changed .. as in the end the array is just a pointer to the memory location .. so it will see the same pointer to the same array in memory.

- To fix this and make `transform` triggered again .. you could change your method to make a new array then make your changes and set your array to the new array.

- Another approach would be to set the `pure` to false in the pipe decorator configuration object .. this would effectively disable the caching mechanism .. and now angular will execute `transform` method when any thing change any where in your template .. so you should do this with care as now the pipe would be excuted a lot.
***
- Note the following code as an example for how you can build a custom pipe.

```TS 
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'temp',
    standalone: true,
})
export class TemperaturePipe implements PipeTransform {
    transform(
        value: number | string,
        inputType: 'cel' | 'fan',
        outputType?: 'cel' | 'fan'
    ) {
        let val: number;
        if (typeof value === 'string') {
            val = parseFloat(value);
        } else {
            val = value;
        }

        let outputTemp;
        if (inputType === 'cel' && outputType === 'fan') {
            outputTemp = val * (9 / 5) + 32;
        } else if (inputType === 'fan' && outputType === 'cel') {
            outputTemp = (val - 32) * (5 / 9);
        } else {
            outputTemp = val;
        }

        let symbol: ' C' | ' F';
        if (!outputType) {
            symbol = inputType === 'cel' ? ' C' : ' F';
        } else {
            symbol = outputType === 'cel' ? ' C' : ' F';
        }
        return `${outputTemp} ${symbol}`;
    }
}
```
