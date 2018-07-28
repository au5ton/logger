// test.js

// enable to prefix prints with: [YYYY/MM/DD @ HH:MM:SS]
// require('./logger')({ prefix_date: true })

require('./logger')()

// Different styles of prints
console.log('A normal log function')
console.info('I have some important information for you!')
console.warn('This might be a problem later.')
console.error('Houston, we have a problem.')
console.success('Great job!')
console.flag('Lets diagnose what went wrong here')

// Easy Identation
console.log('normal');
console.ind().log('indented once');
console.ind(2).log('indented twice');

// Chalk integration
let chalk = console.chalk
console.log(chalk.magenta('I am magenta!'))

let methods=['bold','dim','italic','underline','inverse','strikethrough','black','red','green','yellow','blue','magenta','cyan','white','gray','redBright','greenBright','yellowBright','blueBright','magentaBright','cyanBright','whiteBright','bgBlack','bgRed','bgGreen','bgYellow','bgBlue','bgMagenta','bgCyan','bgWhite','bgBlackBright','bgRedBright','bgGreenBright','bgYellowBright','bgBlueBright','bgMagentaBright','bgCyanBright','bgWhiteBright'];
for(let i in methods) {
    // Calls every console.<modifier> function. Example: console.bold, console.cyan
    console[methods[i]]('Styles!')
}