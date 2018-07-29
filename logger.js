const style = require('ansi-styles');
const chalk = require('chalk')

module.exports = (function(options){

    // check if logger is already initialized
    if(typeof console.success === 'function') return;

    // Set default values for options
    options = (options === undefined ? {} : options)
    options.emoji = (options.emoji === undefined ? true : options.emoji)
    options.prefix_date = (options.prefix_date === undefined ? false : options.prefix_date)
    options.tab_size = (options.tab_size === undefined ? 4 : options.tab_size)

    // default flag value
    console._indflag = false


    // Preserve functions
    let rebinds = [
        'error',
        'warn',
        'info',
        'log'
    ]
    for(let i in rebinds) {
        //preserves build-in functions by rebinding them
        // ex: console.error ==> console._error
        console['_'+rebinds[i]] = console[rebinds[i]].bind({});
    }

    function generateDatePrefix() {
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

    //Provide chalk access
    console.chalk = new chalk.constructor();

    // "Override"s build-in functions
    console.log = function() {
        if(options.prefix_date && !console._indflag) {
            process.stdout.write(generateDatePrefix()+' ');
        }
        console._log.apply(this, arguments);
        console._indflag = false;
    }
    console.info = function() {
        if(options.prefix_date && !console._indflag) {
            process.stdout.write(generateDatePrefix()+' ');
        }
        if(options.emoji) {
            process.stdout.write('❕  ')
        }
        process.stdout.write(style.modifier.bold.open);
        console._info.apply(this, arguments);
        process.stdout.write(style.modifier.bold.close);
        console._indflag = false;
    }
    console.warn = function() {
        if(options.prefix_date && !console._indflag) {
            process.stdout.write(generateDatePrefix()+' ');
        }
        if(options.emoji) {
            process.stdout.write('⚠️  ');
        }
        process.stdout.write(style.color.yellow.open);
        console._warn.apply(this, arguments);
        process.stdout.write(style.color.yellow.close);
        console._indflag = false;
    }
    console.error = function() {
        if(options.prefix_date && !console._indflag) {
            process.stdout.write(generateDatePrefix()+' ');
        }
        if(options.emoji) {
            process.stdout.write('⛔️  ');
        }
        process.stdout.write(style.color.red.open);
        console._error.apply(this, arguments);
        process.stdout.write(style.color.red.close);
        console._indflag = false;
    }
    console.success = function() {
        if(options.prefix_date && !console._indflag) {
            process.stdout.write(generateDatePrefix()+' ');
        }
        if(options.emoji) {
            process.stdout.write('✅  ');
        }
        process.stdout.write(style.color.green.open);
        console._log.apply(this, arguments);
        process.stdout.write(style.color.green.close);
        console._indflag = false;
    }

    // new functions
    console.ind = (tabs) => {
        console._indflag = true
        if(options.prefix_date) {
            process.stdout.write(generateDatePrefix()+' ');
        }
        if(tabs === undefined) tabs = 1;
        //print n tabs
        for(let n = 0; n < tabs; n++) {
            //print one tab
            for(let i = 0; i < options.tab_size; i++) {
                process.stdout.write(' ');
            }
        }
        return console;
    }
    console.nl = (newLines) => {
        if(newLines === undefined) newLines = 1;
        //print n '\n'
        for(let n = 0; n < newLines; n++) {
            process.stdout.write('\n');
        }
    }
    console.flag = function() {
        process.stdout.write('🚩  ');
        process.stdout.write(chalk.bold.red('Flag raised!\n'))
        process.stdout.write(style.reset.open+''+style.reset.close)
        console.trace()
        console.error.apply(this, arguments)
    }

    // chalk integration:
    // useful methods that chalk has, such as writing things in different colors
    // are "symlinked" here.
    // You cannot chain these together. For that, use chalk directly: console.chalk
    let methods = [
        'bold',
        'dim',
        'italic',
        'underline',
        'inverse',
        'strikethrough',
        'black',
        'red',
        'green',
        'yellow',
        'blue',
        'magenta',
        'cyan',
        'white',
        'gray',
        'redBright',
        'greenBright',
        'yellowBright',
        'blueBright',
        'magentaBright',
        'cyanBright',
        'whiteBright',
        'bgBlack',
        'bgRed',
        'bgGreen',
        'bgYellow',
        'bgBlue',
        'bgMagenta',
        'bgCyan',
        'bgWhite',
        'bgBlackBright',
        'bgRedBright',
        'bgGreenBright',
        'bgYellowBright',
        'bgBlueBright',
        'bgMagentaBright',
        'bgCyanBright',
        'bgWhiteBright'
    ];
    for(let i in methods) {
        console[methods[i]] = function() {
            for(let j in arguments) {
                arguments[j] = chalk[methods[i]](arguments[j])
            }
            console.log.apply(this, arguments)
            process.stdout.write(style.reset.open+''+style.reset.close)
        }
    }
});

