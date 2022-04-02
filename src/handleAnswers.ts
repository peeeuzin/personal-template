import inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';

import { createProject } from './createProject';

async function handle(answers: any) {
    const [, , ...args] = process.argv;

    console.log(args);

    let projectPath = '';

    if (args.length !== 0) {
        if (!fs.existsSync(args[0])) {
            console.log(`${args[0]} does not exist`);
            process.exit(1);
        }

        projectPath = args[0];
    } else {
        const answer = await inquirer.prompt([
            {
                name: 'projectName',
                type: 'input',
                message: 'What is the name of your project?',
            },
        ]);
        projectPath = path.resolve(process.cwd(), answer.projectName);
    }

    const templatePath = path.join(__dirname, 'templates', answers.template);

    if (!fs.existsSync(templatePath)) {
        console.log(`${templatePath} does not exist`);
        process.exit(1);
    }

    if (fs.existsSync(projectPath)) {
        console.log(`${projectPath} already exists`);
        process.exit(1);
    }
    fs.mkdirSync(projectPath);

    createProject(templatePath, projectPath);
}

export { handle };
