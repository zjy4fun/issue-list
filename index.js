// 读取相对路径下的readme文件，并写入hello world
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'readme.md');

// 获取当前的时间

const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
const time = new Date().toLocaleString('zh-CN', options);
console.log(time);

// 写入文件
fs.writeFile(filePath, 'hello world\n\n' + time, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
})
