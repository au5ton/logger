# logger
console.log() is too boring for me, so I wrote an npm module.

#### Installation:
1. Run: `npm install au5ton-logger`
2. Add the following code:
```javascript
const logger = require('au5ton-logger');
```

## Example code

#### Code
```javascript

```
#### Result

![example.png](img/example.png)


## API

### logger.print(args)

prints arguments to screen (very fancy)

valid example: `logger.print('emoji', 2, {hello: 'world'}, 'more strings')`

### logger.log(args)

same as logger.print, but adds '\n'

### logger.warn(args)

same as logger.log, but all text is yellow and the line starts with :warning:

### logger.error(args)

same as logger.log, but all text is red and the line starts with :no_entry_sign:

### logger.success(args)

same as logger.log, but all text is green and the line starts with :white_check_mark:

### logger.setOptions(options) & logger.setOption(key,val)

logger has different features (other than coloring) that I like, which prompted me to make it.

logger internally includes this `options` object with default option values. Some are self-explanatory, but I'll explain them all.

`logger.setOptions` replaces this object with what you provide. Make sure to specify everything, otherwise errors will occur! If you want to reset it to the default, use `logger.setOptions(logger.default)`

`logger.setOption` (notice the plural vs singular) replaces only the option you specify in the `key` parameter. To edit the `enabled_colors`, use logger.enableColor(color) & logger.disableColor(color)

valid example: `logger.setOption('emoji', true)`

```javascript
let options = {
    //enables or disables emoji before logger.warn,
    //logger.error, and logger.success methods
    emoji: true,
    //different `typeof` javascript variables are colored differently when printed with logger, in addition to logger.warn, logger.error, and logger.success. The `typeof`s present in this array are colored differently from the default terminal color when printed with logger (see screenshot above). If it's not present, its color is unaffected.
    enabled_colors: [
        'function',
        'number',
        'boolean',
        'undefined',
        'object',
        'warn',
        'error',
        'success'
    ],
    //if true, print `[Function]` when attempting to print a function. if false, print the code inside the function.
    function_omission: true,
    //if true, call the .toString() when attempting to print an object. if false, print the JSON string of an object.
    object_omission: false,
    //if true, timestamp each print in this prefix: [YYYY/MM/DD @ HH:MM:SS]
    prefix_date: false,
    //the number of space characters (' ') to print out when calling logger.ind(1)
    tab_size: 4
};
```

### logger.enableColor(color) & logger.disableColor(color)

adds and removes `color` from `enabled_colors` where `color` is a valid string for `enabled_colors`. You can also specify `*` for either method to enable or disable all colors.

valid example: `logger.disableColor('boolean')`

valid example: `logger.disableColor('number')`

valid example: `logger.enableColor('object')`

valid example: `logger.enableColor('*')`
