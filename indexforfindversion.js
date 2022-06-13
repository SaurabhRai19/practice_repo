const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');

// `who-to-greet` input defined in action metadata file
const nameOfModule = core.getInput('module-name');
console.log(`Module Name:  ${nameOfModule}.`);

const file_name = core.getInput('file-name');
console.log(`File Name:  ${file_name}.`);


const file= fs.readFileSync(
    path.join('file.txt')
)

console.log(file); //prints file content

const searchFull = (filename='./requirements.txt', text) => {

    return new Promise((resolve) => {
        
        const regEx = new RegExp(text, "i")
        const result = [];

        fs.readFile(`${filename}`,'utf8', function(err, content){
            let liness = content.toString().split("\n");
            liness.forEach(line => {
                if (line && line.search(regEx) >= 0) {
                    console.log('found in file ', filename)
                    result.push(line)
                    core.setOutput("modulewhver", line);
                    console.log(line);        
                    
                }
            })
        })
            resolve(result);
    
    });
    
    
}

searchFull(file_name, nameOfModule);
//https://stackoverflow.com/questions/43378060/meaning-of-the-github-message-push-declined-due-to-email-privacy-restrictions
