# JavaScript Selector

![Selector][logo]

[logo]: https://github.com/MrBakieness/npm_js_selector/blob/master/logo.png?raw=true "Logo Title Text 2"

## Install

```
npm install @mrbakieness/npm_js_selector --save-dev
```

## Useage

To use the module first you have to import the module into your main JavaScript file.

```javascript
import "../node_modules/@mrbakieness/npm_js_selector/index.js";
```

This libary has multiple functions that can be used to make javascript easier to write. Loosely based on jQuery but much more lightweight.

| Methods     | Arguments                                 | Description                                                 |
| ----------- | ----------------------------------------- | ----------------------------------------------------------- |
| ready       | *callback*                                | Document ready function. All other JS code goes in here.    |
| on          | *event*, *callback*, *options (optional)* | Function to add an event to elements.                       |
| forEach     | *callback*                                | Function to loop through elements                           |
| addClass    | *class*                                   | Adds a class to a given element or list of elements.                                                                                                               |
| removeClass | *class*                                   | Removes a class to a given element or list of elements.                                                                                                               |
| modal       | *none*                                    | Creates a pop up modal                                      |
| slide       | *position*, *time*                        | Slides element horizontally to center of page               |
| fadeOut     | *time*                                    | Fades an element out based on time given                    |

## .ready(*callback*)

Basic ready function.

```javascript
$_(document).ready(() => {
    console.log('document ready!');
    //code goes here
})
```

| Arguments    | Description                                        |
| ------------ | -------------------------------------------------- |
| *callback*   | All code to be executed after document has loaded  |

## .on(*events, callback, options*)

Function to add event listener to elements.

```javascript
    $_('.element').on('click', (e) => {
        e.target.style.color = 'red';
    })
```

| Arguments    | Description                      |
| ------------ | -------------------------------- |
| *event*      | Event to listen for              |
| *callback*   | Function to be executed on event |
| *options*    | JSON object of options           |

The following are the current option arguments that can be passed.

| Options   | Description                                             |
| --------- | ------------------------------------------------------- |
| *once*    | Execute event only once. Type *bool*  default *false*   |

If <code>once: true</code> is being used the following needs to be include within the callback so that the event only happenes once on IE11.

```javascript
if (IE_once(e) == true) {
    //code goes here ...
}
```

A full example:

```javascript
    $_('.element').on('mouseover', (e) => {
        if (IE_once(e) == true) {
            e.target.style.color = 'red';
        }
    }, { once: true })
```

## .forEach(*callback*)

Function to loop through elements and executes code for each element.

```javascript
$_('.elements').forEach((el) => {
    el.classList.remove('active');
})
```

| Arguments    | Description                          |
| ------------ | ------------------------------------ |
| *callback*   | Function to execute on each element  |

## .addClass(*class*)

Adds a class to an element or list of elements.

```javascript
$_('.elements').addClass('class');
```

| Arguments | Description              |
| --------- | ------------------------ |
| *class*   | Class to add to element  |

## .removeClass(*class*)

Removes a class to an element or list of elements.

```javascript
$_('.elements').removeClass('class');
```

| Arguments | Description                 |
| --------- | --------------------------- |
| *class*   | Class to remove to element  |

## .modal()

Creates a modal based on element ID. The Element need to have the attribute <code>data-modal-title</code>.

```html
<div id="element" data-modal-title="Basic dialog">
    <div class="modal__content">
        <p>This is the default dialog.</p>
    </div>
</div>
```

```javascript
$_('#element').modal();
```

## .slide(*position, time*)

Horizontal slide function to move elements left to right based on position.

```javascript
$_('.element').slide(toCenter, 500);
```

| Arguments  | Description              |
| ---------- | ------------------------ |
| *position* | Position for element to slide in pixels|
| *time*     | Time to slide elements in milliseconds |

## .fadeOut(*time*)

Fades out and element in a given time.

```javascript
$_('.element').fadeOut(2000);
```

| Arguments | Description                      |
| --------- | -------------------------------- |
| *time*    | Time to fade out in milliseconds |