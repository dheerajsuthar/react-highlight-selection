# React Highlight Selection

React component to highlight and retrieve text selected with mouse. 

## Installation
```
npm i react-highlight-selection
```

## Usage
[![Edit ReactHighlightSelection](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/y0vw15o39j)

 - Provide required **text** prop. This will be the text contained inside the component.
 - Highlight the required portion of text by dragging the mouse over it with left-button pressed. The text would be highlighted on button's release
- Optionally, provide a custom class to give your own background color or any other styling.
- Optionally, provide a call back function **selectionHandler**. An object containing the following will be returned to the function 
	- selected text
	- selection start index 
	- selection end index

```css
.custom-class {
  background-color: #e06f6f
}
```

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SelectionHighlighter from 'react-highlight-selection';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.selectionHandler = this.selectionHandler.bind(this);
  }

  selectionHandler(selection) {
    //do something with selection
    console.log(selection);

  }
  render() {
    const text = "Let there be light, let there be Sun.";
    return (
      <SelectionHighlighter
        text={text}
        selectionHandler={this.selectionHandler}
        customClass='custom-class'
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


```

## What's unique
- It's a very simple and lightweight component.
- Most other existing components highlight only given text (somewhat like search/replace). This component, however, helps in retrieving dynamic selection done with the mouse.


