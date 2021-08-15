const marked = require('marked')
const path = require('path')
const fs = require('fs')

const docPath = path.join(__dirname, 'docs/')

// 读取目录下的所有文件
function readFiles(directory, onFileContent) {
    fs.readdir(directory, (error, files) => {
        if (error)
            return console.log('read directory error')
        files.forEach(filename => {
            fs.readFile(directory + filename, 'utf-8', (err, content) => {
                if (err)
                    return console.log(err)
                onFileContent(filename, content)
            })
        })
    })
}

readFiles(docPath, (filename, content) => {
    const html = marked(content)
    fs.writeFile(docPath + `${filename}.html`, html, error => {
        if (error)
            return console.log(error)
        console.log(`file ${filename}.html saved`)
    })
})

