// 读取相对路径下的readme文件，并写入hello world
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'readme.md');

// 写入文件
fs.writeFile(filePath, 'hello world', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
})
