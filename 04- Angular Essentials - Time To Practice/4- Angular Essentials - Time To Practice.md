
- The value you get out of an input will always be a string .. even if the user entered a number.
- The `[(ngModel)]` needs the name property to be set on the input field .. and also with it we don't use signals with the parenthesis.
****
`results?: {`
    `year: number;`
    `interest: number;`
    `valueEndOfYear: number;`
    `annualInvestment: number;`
    `totalInterest: number;`
    `totalAmountInvested: number;`
  `}[]` // This format is used to indicate the type of results which would be an array of objects that will have the provided shape.
***
- You should use signals with the properties that when change would have an impact on the UI.
****
- `asReadOnly()` is a method to be used with signals to return a version of this signal that's only can be read.