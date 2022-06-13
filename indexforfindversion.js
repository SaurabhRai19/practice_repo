const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

const nameOfModule = core.getInput('module-name');
console.log(`Module Name:  ${nameOfModule}.`);

const file_name = core.getInput('file-name');
console.log(`File Name:  ${file_name}.`);


core.setOutput("modulewhver", 'module not present');
const search = (filename='./requirements.txt', text) => {

    return new Promise((resolve) => {
        
        const regEx = new RegExp(text, "i")
       

        fs.readFile(`${filename}`,'utf8', function(err, content){
            let liness = content.toString().split("\n");
            liness.forEach(line => {
                if (line && line.search(regEx) >= 0) {
                    console.log('Found in file ', filename)
                    
                    core.setOutput("modulewhver", line);
                    console.log(line);        
                    
                }
            })
        })
    
    });
    
    
}

search(file_name, nameOfModule);
