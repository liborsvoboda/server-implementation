import test from 'ava';
import remarkLint from 'remark-lint';
import lint from '../_lint.js';
import listItemRule from '../../rules/list-item.js';

const config = {
	plugins: [
		remarkLint,
		listItemRule,
	],
};

test('list-item - valid', async t => {
	const messages = await lint({config, filename: 'test/fixtures/list-item/0.md'});
	t.deepEqual(messages, []);
});

test('list-item - invalid', async t => {
	const messages = await lint({config, filename: 'test/fixtures/list-item/1.md'});
	t.snapshot(messages);
});

test('list-item - valid ignoring Contents section', async t => {
	const messages = await lint({config, filename: 'test/fixtures/list-item/2.md'});
	t.deepEqual(messages, []);
});

test('list-item - invalid sublist punctuation', async t => {
	const messages = await lint({config, filename: 'test/fixtures/list-item/3.md'});
	t.snapshot(messages);
});

test('list-item - disable, enable, and ignore comments', async t => {
	const messages = await lint({config, filename: 'test/fixtures/list-item/4.md'});
	t.snapshot(messages);
});
