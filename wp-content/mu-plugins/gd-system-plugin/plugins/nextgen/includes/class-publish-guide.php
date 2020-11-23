<?php

namespace GoDaddy\WordPress\Plugins\NextGen;

defined( 'ABSPATH' ) || exit;

class Publish_Guide {

	public function __construct() {

		add_action( 'enqueue_block_editor_assets', array( $this, 'register_scripts' ) );

		add_action( 'rest_api_init', function () {
			register_rest_route( 'nextgen/v1', '/title/(?P<id>\d+)', array(
			  'methods' => 'GET',
			  'callback' => '__return_true',
			  'permission_callback' => '__return_true',
			) );
		  } );

	}

	/**
	 * Enqueue the scripts and styles.
	 */
	public function register_scripts() {

		$default_asset_file = [
			'dependencies' => [],
			'version'      => GD_NEXTGEN_VERSION,
		];

		// Editor Script.
		$asset_filepath = GD_NEXTGEN_PLUGIN_DIR . '/build/publish-guide.asset.php';
		$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : $default_asset_file;

		wp_enqueue_script(
			'nextgen-publish-guide',
			GD_NEXTGEN_PLUGIN_URL . 'build/publish-guide.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true // Enqueue script in the footer.
		);

		wp_set_script_translations( 'nextgen-publish-guide', 'nextgen', GD_NEXTGEN_PLUGIN_DIR . '/languages' );

		// Editor Styles.
		$asset_filepath = GD_NEXTGEN_PLUGIN_DIR . '/build/publish-guide-editor.asset.php';
		$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : $default_asset_file;

		wp_enqueue_style(
			'nextgen-publish-guide-style',
			GD_NEXTGEN_PLUGIN_URL . 'build/publish-guide-editor.css',
			[],
			$asset_file['version']
		);

		wp_localize_script(
			'nextgen-publish-guide',
			'nextgenPublishGuideDefaults',
			array(
				'userId' => get_current_user_id(),
			)
		);

	}

}
