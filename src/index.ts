#!/usr/bin/env node

import inquirer from 'inquirer';
import { getTemplates } from './getTemplates';
import { handle } from './handleAnswers';

const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: getTemplates(),
    },
];

inquirer.prompt(QUESTIONS).then((answers) => {
    handle(answers);
});
