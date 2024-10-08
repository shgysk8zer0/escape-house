/* eslint-env node */
import { rollupImport, rollupImportMeta } from '@shgysk8zer0/rollup-import';
import { readFile } from 'node:fs/promises';
import terser from '@rollup/plugin-terser';


async function readJSONFile(file) {
	const content = await readFile(file, { encoding: 'utf8' });
	return JSON.parse(content);
}

const { homepage } = await readJSONFile('./package.json');

export default {
	input: 'js/index.js',
	output: {
		file: 'js/index.min.js',
		format: 'iife',
		plugins: [terser()],
		sourcemap: true,
	},
	plugins: [
		rollupImport('./importmap.json'),
		rollupImportMeta({ baseURL: homepage }),
	],
};
