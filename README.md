# JavaScript Selector

![Selector][logo]

[logo]: logo.png "Logo Title Text 2"

## Install

```
npm install @mrbakieness/npm_js_selector --save-dev
```

## Useage

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

```javascript
    $_('.element').on('mouseover', (e) => {
        e.target.style.color = 'red';
    }, { once: true })
```

## .forEach(*callback*)

```javascript
$_('.elements').forEach((el) => {
    el.classList.remove('active');
})
```

| Arguments    | Description                          |
| ------------ | ------------------------------------ |
| *callback*   | Function to execute on each element  |

## .addClass(*class*)

```javascript
$_('.elements').addClass('class');
```

| Arguments | Description              |
| --------- | ------------------------ |
| *class*   | Class to add to element  |

## .removeClass(*class*)

```javascript
$_('.elements').removeClass('class');
```

| Arguments | Description                 |
| --------- | --------------------------- |
| *class*   | Class to remove to element  |

## .modal()

```javascript
$_('.element').modal();
```

## .slide(*position, time*)

```javascript
$_('.element').slide(toCenter, 500);
```

| Arguments  | Description              |
| ---------- | ------------------------ |
| *position* | Position for element to slide in pixels|
| *time*     | Time to slide elements in milliseconds |

## .fadeOut(*time*)

```javascript
$_('.element').fadeOut(2000);
```

| Arguments | Description                      |
| --------- | -------------------------------- |
| *time*    | Time to fade out in milliseconds |