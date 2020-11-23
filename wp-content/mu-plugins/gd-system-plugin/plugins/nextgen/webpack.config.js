const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,

	entry: {
		'site-design': path.resolve( process.cwd(), 'assets/js/site-design', 'index.js' ),
		'site-design-editor': path.resolve( process.cwd(), 'assets/scss/site-design', 'admin-editor.scss' ),
		'site-content': path.resolve( process.cwd(), 'assets/js/site-content', 'index.js' ),
		'site-content-editor': path.resolve( process.cwd(), 'assets/scss/site-content', 'admin-editor.scss' ),
		'block-editor': path.resolve( process.cwd(), 'assets/js', 'block-editor.js' ),
		'block-editor-style': path.resolve( process.cwd(), 'assets/scss', 'block-editor.scss' ),
	},

};
