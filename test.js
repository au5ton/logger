var logger = require('./logger.js');

logger.log('au5ton-logger can do some neat things.');
logger.log('printing a function: ',function(){return 2+2;});
logger.setOption('function_omission', false);
logger.log('another function: ',function(){return 4*8;});
logger.setOptions(logger.default);
logger.log('I am ', 17, ' years old.');
logger.log('Houston is cold? ', false);
var something;
logger.log('printing something undefined: '+something);
var obj = {
    is_done: false,
    arr: ['hello', 'world']
};
logger.log('Here\'s an object ', obj);
logger.log('I\'m a normal logger.log');
logger.warn('Uh, hey, you should look out for this!');
logger.error('Woah! Fix this!');
logger.success('All is good, my friend.');
logger.log('-----------------------');
logger.log('normal');
logger.ind(1).log('indented once');
logger.ind(2).log('indented twice');
