import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite'
import replace from '@rollup/plugin-replace';

const config = {
	plugins: [
		sveltekit(),
		Unocss({ /* options */ }),
		replace({
      'API_URL': process.env.API_URL || 'http://localhost:3000',
			'SITE_ID': process.env.SITE_ID,
    })
	]
};

export default config;
