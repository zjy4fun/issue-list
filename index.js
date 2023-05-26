// 读取相对路径下的readme文件，并写入hello world
const fs = require('fs');
const path = require('path');
const json2md = require("json2md")
const axios =  require('axios')
const filePath = path.resolve(__dirname, 'readme.md');
const {repos} = require('./repos')

const issues = {}
const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
repos.forEach(async (repo) => {
    console.log(repo)
    try {
        const res = await axios.get(`https://api.github.com/repos/${repo}/issues?state=open&sort=created`)
        issues[repo] = res.data.map(issue => ({
            title: issue.title,
            labels: issue.labels.map(label => label.name),
            date: new Date(issue.created_at).toLocaleDateString('zh-CN', options),
            html_url: issue.html_url
        }));
    } catch (err) {
        console.error(err)
    }

})

console.log(issues)
const data = []
for (const repo in issues) {
    data.push({
        h2: repo
    })
    data.push({
        ul: issues[repo].map(issue => ({
            link: {
                title: `${issue.date} - [${issue.labels.join('] [')}] - ${issue.title}`,
                source: issue.html_url
            }
        }))
    })

}
fs.writeFile(filePath, json2md(data), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
})
