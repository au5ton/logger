/*
** logger.js
**
** https://github.com/au5ton/logger
**
*/
'use strict';

var process = require('process');
var colors = require('colors');
var util = require('util');

var _ = {};
_.options = {
    emoji: true,
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
    function_omission: true,
    object_omission: false
};

_.default = {
    emoji: true,
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
    function_omission: true,
    object_omission: false
};

_.defaultColors = [
    'function',
    'number',
    'boolean',
    'undefined',
    'object',
    'warn',
    'error',
    'success'
];

//normal log message
_.print = function(dat){
    for(let i = 0; i < arguments.length; i++) {
        if(typeof arguments[i] === 'function') {
            if(_.options.enabled_colors.indexOf('function') > -1) {
                if(_.options.function_omission) {
                    process.stdout.write(colors.cyan('[Function]'));
                }
                else {
                    process.stdout.write(colors.cyan(arguments[i]));
                }
            }
            else {
                if(_.options.function_omission) {
                    process.stdout.write('[Function]');
                }
                else {
                    process.stdout.write(arguments[i]);
                }
            }
        }
        else if(typeof arguments[i] === 'number') {
            if(_.options.enabled_colors.indexOf('number') > -1) {
                process.stdout.write(colors.magenta(arguments[i]));
            }
            else {
                process.stdout.write(arguments[i]);
            }
        }
        else if(typeof arguments[i] === 'boolean') {
            if(_.options.enabled_colors.indexOf('boolean') > -1) {
                process.stdout.write(colors.magenta(arguments[i]));
            }
            else {
                process.stdout.write(arguments[i]);
            }
        }
        else if(typeof arguments[i] === 'undefined') {
            if(_.options.enabled_colors.indexOf('undefined') > -1) {
                process.stdout.write(colors.grey(arguments[i]));
            }
            else {
                process.stdout.write(arguments[i]);
            }
        }
        else if(typeof arguments[i] === 'object') {
            if(_.options.enabled_colors.indexOf('object') > -1) {
                if(_.options.object_omission) {
                    process.stdout.write(colors.blue(arguments[i].toString()));
                }
                else {
                    process.stdout.write(colors.blue(util.inspect(arguments[i])));
                }
            }
            else {
                if(_.options.object_omission) {
                    process.stdout.write(arguments[i].toString());
                }
                else {
                    process.stdout.write(util.inspect(arguments[i]));
                }
            }
        }
        else {
            process.stdout.write(arguments[i]);
        }
        if(typeof arguments[i] !== 'string' && typeof arguments[i+1] !== 'string') {
            //c
            process.stdout.write(' ');
        }
    }
}

_.log = function() {
    _.print.apply(this, arguments);
    process.stdout.write('\n');
}

_.warn = function() {
    if(_.options.emoji) {
        process.stdout.write('⚠️  ');
    }
    for(let i = 0; i < arguments.length; i++) {
        if(_.options.enabled_colors.indexOf('warn') > -1) {
            if(typeof arguments[i] === 'function') {
                if(_.options.function_omission) {
                    process.stdout.write(colors.yellow('[Function]'));
                }
                else {
                    process.stdout.write(colors.yellow(arguments[i]));
                }
            }
            else if(typeof arguments[i] === 'object') {
                if(_.options.object_omission) {
                    process.stdout.write(colors.yellow(arguments[i].toString()));
                }
                else {
                    process.stdout.write(colors.yellow(util.inspect(arguments[i])));
                }
            }
            else {
                process.stdout.write(colors.yellow(arguments[i]));
            }
        }
        else {
            if(typeof arguments[i] === 'function') {
                if(_.options.function_omission) {
                    process.stdout.write('[Function]');
                }
                else {
                    process.stdout.write(arguments[i]);
                }
            }
            else if(typeof arguments[i] === 'object') {
                if(_.options.object_omission) {
                    process.stdout.write(arguments[i].toString());
                }
                else {
                    process.stdout.write(util.inspect(arguments[i]));
                }
            }
            else {
                process.stdout.write(arguments[i]);
            }
        }

        if(typeof arguments[i] !== 'string' && typeof arguments[i+1] !== 'string') {
            //c
            process.stdout.write(' ');
        }
    }
    process.stdout.write('\n');
};

_.error = function() {
    if(_.options.emoji) {
        process.stdout.write('🚫  ');
    }
    for(let i = 0; i < arguments.length; i++) {
        if(_.options.enabled_colors.indexOf('error') > -1) {
            if(typeof arguments[i] === 'function') {
                if(_.options.function_omission) {
                    process.stdout.write(colors.red('[Function]'));
                }
                else {
                    process.stdout.write(colors.red(arguments[i]));
                }
            }
            else if(typeof arguments[i] === 'object') {
                if(_.options.object_omission) {
                    process.stdout.write(colors.red(arguments[i].toString()));
                }
                else {
                    process.stdout.write(colors.red(util.inspect(arguments[i])));
                }
            }
            else {
                process.stdout.write(colors.red(arguments[i]));
            }
        }
        else {
            if(typeof arguments[i] === 'function') {
                if(_.options.function_omission) {
                    process.stdout.write('[Function]');
                }
                else {
                    process.stdout.write(arguments[i]);
                }
            }
            else if(typeof arguments[i] === 'object') {
                if(_.options.object_omission) {
                    process.stdout.write(arguments[i].toString());
                }
                else {
                    process.stdout.write(util.inspect(arguments[i]));
                }
            }
            else {
                process.stdout.write(arguments[i]);
            }
        }

        if(typeof arguments[i] !== 'string' && typeof arguments[i+1] !== 'string') {
            //c
            process.stdout.write(' ');
        }
    }
    process.stdout.write('\n');
};

_.success = function() {
    if(_.options.emoji) {
        process.stdout.write('✅  ');
    }
    for(let i = 0; i < arguments.length; i++) {
        if(_.options.enabled_colors.indexOf('success') > -1) {
            if(typeof arguments[i] === 'function') {
                if(_.options.function_omission) {
                    process.stdout.write(colors.green('[Function]'));
                }
                else {
                    process.stdout.write(colors.green(arguments[i]));
                }
            }
            else if(typeof arguments[i] === 'object') {
                if(_.options.object_omission) {
                    process.stdout.write(colors.green(arguments[i].toString()));
                }
                else {
                    process.stdout.write(colors.green(util.inspect(arguments[i])));
                }
            }
            else {
                process.stdout.write(colors.green(arguments[i]));
            }
        }
        else {
            if(typeof arguments[i] === 'function') {
                if(_.options.function_omission) {
                    process.stdout.write('[Function]');
                }
                else {
                    process.stdout.write(arguments[i]);
                }
            }
            else if(typeof arguments[i] === 'object') {
                if(_.options.object_omission) {
                    process.stdout.write(arguments[i].toString());
                }
                else {
                    process.stdout.write(util.inspect(arguments[i]));
                }
            }
            else {
                process.stdout.write(arguments[i]);
            }
        }

        if(typeof arguments[i] !== 'string' && typeof arguments[i+1] !== 'string') {
            //c
            process.stdout.write(' ');
        }
    }
    process.stdout.write('\n');
};

_.setOptions = function(opt) {
    _.options = opt;
}

_.setOption = function(key,val) {
    _.options[key] = val;
}

_.disableColor = function(color) {
    if(color === '*') {
        _.options.enabled_colors = [];
    }
    else {
        //remove all instances, if there happens to be more than one
        while(_.options.enabled_colors.indexOf(color) >= 0) {
            _.options.enabled_colors.splice(_.options.enabled_colors.indexOf(color), 1);
        }
    }
};

_.enableColor = function(color) {
    if(color === '*') {
        _.options.enabled_colors = _.defaultColors;
    }
    else {
        //prevent duplicates
        if(_.options.enabled_colors.indexOf(color) === -1) {
            _.options.enabled_colors.push(color);
        }
    }
}

module.exports = _;
