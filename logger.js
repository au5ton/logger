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
    object_omission: false,
    prefix_date: false,
    tab_size: 4
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
    object_omission: false,
    prefix_date: false,
    tab_size: 4
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

function generateDateString() {
    let d = new Date();
    return '['+d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()+' @ '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+']';
}

//normal log message
_.print = function(dat){
    if(_.options.prefix_date) {
        if(_.options.enabled_colors.indexOf('date') > -1) {
            process.stdout.write(colors.grey(generateDateString()+' '));
        }
        else {
            process.stdout.write(generateDateString()+' ');
        }
    }
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

//Aliases
_.println = function() {
    _.log.apply(this, arguments);
};

//Ruby
_.puts = function() {
    _.log.apply(this, arguments);
};

//Golang
_.Println = function() {
    _.log.apply(this, arguments);
};
_.Print = function() {
    _.print.apply(this, arguments);
};


_.warn = function() {
    if(_.options.emoji) {
        process.stdout.write('⚠️  ');
    }
    if(_.options.prefix_date) {
        if(_.options.enabled_colors.indexOf('date') > -1) {
            process.stdout.write(colors.grey(generateDateString()+' '));
        }
        else {
            process.stdout.write(generateDateString()+' ');
        }
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
    if(_.options.prefix_date) {
        if(_.options.enabled_colors.indexOf('date') > -1) {
            process.stdout.write(colors.grey(generateDateString()+' '));
        }
        else {
            process.stdout.write(generateDateString()+' ');
        }
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
    if(_.options.prefix_date) {
        if(_.options.enabled_colors.indexOf('date') > -1) {
            process.stdout.write(colors.grey(generateDateString()+' '));
        }
        else {
            process.stdout.write(generateDateString()+' ');
        }
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

_.ind = (tabs) => {
    if(tabs === undefined) tabs = 1;
    //print n tabs
    for(let n = 0; n < tabs; n++) {
        //print one tab
        for(let i = 0; i < _.options.tab_size; i++) {
            process.stdout.write(' ');
        }
    }
    return _;
}

_.nl = (newLines) => {
    if(newLines === undefined) newLines = 1;
    //print n '\n'
    for(let n = 0; n < newLines; n++) {
        process.stdout.write('\n');
    }
    return _;
}

module.exports = _;
