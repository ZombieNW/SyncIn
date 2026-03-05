import { analyzeAudio } from './analyze';
import { writeFileSync } from 'fs';

const file = Bun.argv[2];

if (!file) {
	console.error('Usage: syncin <audiofile>');
	process.exit(1);
}

const project = analyzeAudio(file);

const out = file + '.syncin.json';

writeFileSync(out, JSON.stringify(project, null, 2));

console.log('Project written to', out);

process.exit(0);
