import * as fs from 'fs';
import * as path from 'path';

function getTemplates() {
    return fs.readdirSync(path.join(__dirname, 'templates'));
}

export { getTemplates };
