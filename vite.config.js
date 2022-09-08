import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
import replace from '@rollup/plugin-replace';
import presetIcons from '@unocss/preset-icons'

const config = {
	plugins: [
		sveltekit(),
		Unocss({
			presets: [
				presetUno(),
				presetIcons({
					extraProperties: {
						'fill': 'currentColor',
						'stroke': 'currentColor',
						'display': 'inline-block',
						'vertical-align': 'middle'
					}
				})
			]
		}),
		replace({
      'API_URL': process.env.API_URL || 'http://localhost:3000',
			'SITE_ID': process.env.SITE_ID,
    })
	]
};

export default config;
