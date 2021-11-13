import preprocess from 'svelte-preprocess';
import path from 'path'
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@import "src/variables.scss";'
					}
				}
			},
			resolve: {
				alias: {
					'@components': path.resolve('./src/lib/components'),
					'@utils': path.resolve('./src/lib/utils'),
					'@lib': path.resolve('./src/lib/lib')
				}
			}
		}
	},

	preprocess: [
		preprocess({
			scss: {
				prependData: '@import "src/variables.scss";'
			}
		})
	]
};

export default config;
