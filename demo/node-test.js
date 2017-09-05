console.log(__dirname);
console.log(__filename);

const fs = require('fs'); //File System

/**
 * asynchronous异步
 */
// fs.unlink('didi.js', (err) => {
//     if (err) throw err;
//     console.log('successfully deleted didi.js');
// });
// console.log(1);

/**
 * synchronous 
 */
// fs.unlinkSync(__dirname + '/tmp/didi.js');
// console.log('successfully deleted /tmp/hello');

fs.readFile(__dirname + '/tmp/file.js', 'utf-8', function (err, data) {  
  if (err) {  
      console.log(err);  
  } else {  
      console.log(data);  
  }  
}); 

fs.rename(__dirname + '/tmp/file.js', __dirname + '/tmp/world.js', (err) => {
    if (err) throw err;
    fs.stat(__dirname + '/tmp/world.js', (err, stats) => {
      if (err) throw err;
      console.log(`stats: ${JSON.stringify(stats)}`);
    });
});