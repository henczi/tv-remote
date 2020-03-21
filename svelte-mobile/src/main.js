import Framework7 from 'framework7/framework7-lite.esm.bundle.js';
import Framework7Svelte from 'framework7-svelte';

import 'framework7-icons';
import 'framework7/css/framework7.bundle.min.css';

let theme = 'ios';
if (window.location.href.indexOf('theme=md') >= 0) theme = 'md';
if (window.location.href.indexOf('theme=aurora') >= 0) theme = 'aurora';

const themePlugin = {
  params: {
    theme,
  },
};

Framework7.use(themePlugin);
Framework7.use(Framework7Svelte, { theme });


import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'LG remote'
	}
});

export default app;