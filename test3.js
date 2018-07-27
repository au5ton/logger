// test3.js

console.info('This is important!')
console.warn('Look out for this!')
console.error('Something happened!')
try{console.success('Great job!')}catch(err){console.log('TypeError: console.success is not a function')}
try{
    let chalk = console.chalk;
    console.log(chalk.magenta('I am magenta!'))
}
catch(err) {
    console.log('TypeError: Cannot read property \'magenta\' of undefined')
}

process.stdout.write('\n\n')
require('./logger3')()

console.info('This is important!')
console.error('Something happened!')
console.warn('Look out for this!')
console.success('Great job!')
let chalk = console.chalk;
console.log(chalk.magenta('I am magenta!'))
console.log('normal');
console.ind().log('indented once');
console.ind(2).log('indented twice');