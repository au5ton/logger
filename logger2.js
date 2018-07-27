// logger.js

const util = require('util')
const chalk = require('chalk')
chalk.level = 1

const defaultColors = {
    _dateprefix: 'grey',
    special: 'cyan',
    number: 'yellow',
    bigint: 'yellow',
    boolean: 'magenta',
    undefined: 'grey',
    null: 'grey',
    string: 'blue',
    symbol: 'green',
    date: 'magenta',
    regexp: 'red'
};
const types = Object.keys(defaultColors);
for(let i in types) {
    util.inspect.styles[types[i]] = defaultColors[types[i]]
}
const defaultOptions = {
    emoji: true,
    colors: defaultColors,
    use_colors: true,
    prefix_date: false,
    tab_size: 4,
    normal_log: true
};

class Logger {

    /**
     * Returns a copy of the default colors object
     * @returns {object} colors
     */
    static defaultColors() {
        return Object.assign({},defaultColors)
    }
    set colors(c) {
        this._c = Object.assign({},c)
        for(let i in types) {
            util.inspect.styles[types[i]] = this._col(types[i])           
        }
    }
    get colors() {
        return this._c
    }
    get chalk() {
        return chalk
    }
    /**
     * Returns a copy of the default options object
     * @returns {object} options
     */
    static defaultOptions() {
        return Object.assign({},defaultOptions)
    }
    set options(o) {
        this._o = Object.assign({},o)
    }
    get options() {
        return this._o
    }
    /**
     * Returns the custom options, if its defined, otherwise returns the default options
     */
    static _options() {
        //if custom options are defined, return the entire custom options object
        return (Logger.options === undefined ? defaultOptions : Logger.options)
    }
    /**
     * Returns the custom option, if its defined, otherwise returns the default option
     * @param {string} key 
     */
    static opt(key) {
        return (Logger.options === undefined ? defaultOptions[key] : (Logger.options[key] === undefined ? defaultOptions[key] : Logger.options[key]))
    }
    static _col(type) {
        return (Logger.colors === undefined ? defaultColors[type] : (Logger.colors[type] === undefined ? defaultColors[type] : Logger.colors[type]));
    }

    /**
     * Returns a formatted date in [YYYY/MM/DD @ HH:MM:SS] as a string
     * @returns {string} prefix
     */
    static _generateDatePrefix() {
        let d = new Date();
        return '['
        +d.getFullYear()
        +'/'
        +((d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1))
        +'/'
        +((d.getDate()) < 10 ? '0'+(d.getDate()) : (d.getDate()))
        +' @ '
        +((d.getHours()) < 10 ? '0'+(d.getHours()) : (d.getHours()))
        +':'
        +((d.getMinutes()) < 10 ? '0'+(d.getMinutes()) : (d.getMinutes()))
        +':'
        +((d.getSeconds()) < 10 ? '0'+(d.getSeconds()) : (d.getSeconds()))
        +']';
    }

    /**
     * Returns a string that is colorized to what color is set for its datatype (typeof)
     * @param {*} any
     * @param {string} [type]
     * @returns {string}
     */
    static _colorize(any, type) {
        type = (type === undefined ? typeof any : type)
        return (this.opt('use_colors') ? chalk.keyword(this._col(type))( (any === undefined || any === null) ? String(any) : any) : any)
    }

    
    static print() {
        if(this.opt('prefix_date')) {
            process.stdout.write(this._colorize(this._generateDatePrefix(),'_dateprefix'))
        }
        for(let i = 0; i < arguments.length; i++) {
            if(typeof arguments[i] !== 'object') {
                process.stdout.write(this._colorize(arguments[i]))
            }
            else {
                process.stdout.write(util.inspect(arguments[i], {colors: true}))
            }
            if(typeof arguments[i] !== 'string' && typeof arguments[i+1] !== 'string') {
                //make a little space
                process.stdout.write(' ');
            }
        }
    }

    static log() {
        Logger.print.apply(this, arguments);
        process.stdout.write('\n')
    }

    static warn() {
        if(this.opt('emoji')) {
            process.stdout.write('⚠️  ');
        }
        if(this.opt('prefix_date')) {
            process.stdout.write(chalk.yellow(this._generateDatePrefix(),'_dateprefix'))
        }
        for(let i = 0; i < arguments.length; i++) {
            if(typeof arguments[i] !== 'object') {
                process.stdout.write(chalk.yellow(arguments[i]))
            }
            else {
                process.stdout.write(chalk.yellow(util.inspect(arguments[i])))
            }
            if(typeof arguments[i] !== 'string' && typeof arguments[i+1] !== 'string') {
                //make a little space
                process.stdout.write(' ')
            }
        }
        process.stdout.write('\n')
    }

    static error() {
        if(this.opt('emoji')) {
            process.stdout.write('🚫  ');
        }
        if(this.opt('prefix_date')) {
            process.stdout.write(chalk.red(this._generateDatePrefix(),'_dateprefix'))
        }
        for(let i = 0; i < arguments.length; i++) {
            if(typeof arguments[i] !== 'object') {
                process.stdout.write(chalk.red(arguments[i]))
            }
            else {
                process.stdout.write(chalk.red(util.inspect(arguments[i])))
            }
            if(typeof arguments[i] !== 'string' && typeof arguments[i+1] !== 'string') {
                //make a little space
                process.stdout.write(' ')
            }
        }
        process.stdout.write('\n')
    }

    static success() {
        if(this.opt('emoji')) {
            process.stdout.write('✅  ');
        }
        if(this.opt('prefix_date')) {
            process.stdout.write(chalk.green(this._generateDatePrefix(),'_dateprefix'))
        }
        for(let i = 0; i < arguments.length; i++) {
            if(typeof arguments[i] !== 'object') {
                process.stdout.write(chalk.green(arguments[i]))
            }
            else {
                process.stdout.write(chalk.green(util.inspect(arguments[i])))
            }
            if(typeof arguments[i] !== 'string' && typeof arguments[i+1] !== 'string') {
                //make a little space
                process.stdout.write(' ')
            }
        }
        process.stdout.write('\n')
    }

    /**
     * Indents what is to be printed after it.
     * @param {number} tabs - The number of indentations to make (default is 1), can be chained together
     */
    static ind(tabs) {
        if(tabs === undefined) tabs = 1;
        //print n tabs
        for(let n = 0; n < tabs; n++) {
            //print one tab
            for(let i = 0; i < this.opt('tab_size'); i++) {
                process.stdout.write(' ');
            }
        }
        return this;
    }

    /**
     * Writes '\n' what is to be printed after it.
     * @param {number} newLines - The number of \n to make (default is 1), can be chained together
     */
    static nl(newLines) {
        if(newLines === undefined) newLines = 1;
        //print n '\n'
        for(let n = 0; n < newLines; n++) {
            process.stdout.write('\n');
        }
        return this;
    }
}

module.exports = Logger;