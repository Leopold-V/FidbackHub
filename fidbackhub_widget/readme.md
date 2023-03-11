# FidbackHub

React.js Component for the FidbackHub application.

## Installation

With Yarn:

```bash
yarn add fidbackhub
```

With npm:

```bash
npm install fidbackhub
```

## Usage

Fidbackhub works as any other React component so It is extremely easy to start with.\
This is a small button which can be push to open a card with a form.\
The component has **an absolute position so be sure to put it in a relative container**.\
It will always be placed at the bottom-left of the container with a small margin.
The button has a default animation to be more "catchy" but can be disabled with a props (see next section).
We recommand you to use Fidbackhub at the root component of your application and use the "disabled" props if you want to hide according to certains actions or the page.

**Example:**

```js
import Fidbackhub from "Avisitor";

export const Fidbackhub = () => {
  return (
    <Fidbackhub
      color="blue"
      token={YOUR_SECRET_KEY}
      width={300} 
      height={300}
      animate={true}
      disabled={false}
    />
  )
}
```

## Props

```js
type FidbackHubProps = {
  // Default "blue"
  color?: 'indigo' | 'blue' | 'red' | 'green' | 'orange' | 'gray' | 'white' | 'black' | 'yellow' | 'orange';
  // Your project token to find in your project settings at FidbackHub
  apiKey: string;
  // Default 300
  width?: number;
  // Default 300
  height?: number;
  // Default true
  animate?: boolean;
  // Default false
  disabled?: boolean;
};
```