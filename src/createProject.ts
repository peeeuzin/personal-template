import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

function createDirectoryContents(templatePath: string, projectPath: string) {
    // read all files/folders (1 level) from template folder
    const filesToCreate = fs.readdirSync(templatePath);
    // loop each file/folder
    filesToCreate.forEach((file) => {
        const origFilePath = path.join(templatePath, file);

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents = fs.readFileSync(origFilePath, 'utf8');
            contents = template(contents, {
                projectName: path.basename(projectPath),
            });

            // write file to destination folder
            const writePath = path.join(projectPath, file);
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(projectPath, file));
            // copy files/folder inside current folder recursively
            createDirectoryContents(
                path.join(templatePath, file),
                path.join(projectPath, file)
            );
        }
    });
}

function createProject(templatePath: string, projectPath: string) {
    console.log('Creating project...');

    createDirectoryContents(templatePath, projectPath);

    console.log('Project created!');
    console.log('To start your project, run:');
    console.log(`
        cd ${path.basename(projectPath)}
        yarn install
    `);
}

interface TemplateData {
    projectName: string;
}

function template(content: string, data: TemplateData) {
    return ejs.render(content, data);
}

export { createProject };
