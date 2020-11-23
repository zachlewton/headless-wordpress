<?php
/**
 * NextGen block overrides
 *
 * @package NextGen
 */

namespace GoDaddy\WordPress\Plugins\NextGen;

defined( 'ABSPATH' ) || exit;

/**
 * Block Editor Override Class.
 */
class Block_Editor {


	/**
	 * Constructor.
	 *
	 * @access public
	 */
	public function __construct() {

		add_action( 'enqueue_block_editor_assets', array( $this, 'block_editor_overrides' ) );
		add_action( 'init', array( $this, 'register_settings' ) );
		add_action( 'admin_init', array( $this, 'register_nextgen_pattern_categories' ) );
		add_action( 'admin_init', array( $this, 'remove_default_block_patterns' ) );

	}

	/**
	 * Register NextGen settings.
	 *
	 * @access public
	 */
	public function register_settings() {
		register_setting(
			'nextgen_admin_dashboard_shortcut_enabled',
			'nextgen_admin_dashboard_shortcut_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting to disable or enable NextGen administration dashboard shortcut.', 'nextgen' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

	}

	/**
	 * Remove theme supports for NextGen.
	 *
	 * @access public
	 */
	public function remove_default_block_patterns() {
		
		$registered_patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

		array_walk( $registered_patterns, function($item) {

			if ( ! isset( $item['name'] ) ) {

			  return;

			}

			if ( strpos( $item['name'], 'core/' ) === 0 ) {

			  unregister_block_pattern( $item['name'] );

			}

		} );

	}

	/**
	 * Register pattern categories for NextGen.
	 *
	 * @access public
	 */
	public function register_nextgen_pattern_categories() {

		register_block_pattern_category( 'headline', array( 'label' => __( 'Headline', 'nextgen' ) ) );
		register_block_pattern_category( 'text', array( 'label' => __( 'Text', 'nextgen' ) ) );
		register_block_pattern_category( 'list', array( 'label' => __( 'List', 'nextgen' ) ) );
		register_block_pattern_category( 'image', array( 'label' => __( 'Image', 'nextgen' ) ) );
		register_block_pattern_category( 'gallery', array( 'label' => __( 'Gallery', 'nextgen' ) ) );
		register_block_pattern_category( 'contact', array( 'label' => __( 'Contact', 'nextgen' ) ) );
		register_block_pattern_category( 'call-to-action', array( 'label' => __( 'Call To Action', 'nextgen' ) ) );

	}

	/**
	 * Override block editor defaults.
	 *
	 * @action enqueue_block_editor_assets
	 */
	public function block_editor_overrides() {

		$referer = wp_get_referer();

		wp_enqueue_script(
			'nextgen-block-editor',
			GD_NEXTGEN_PLUGIN_URL . 'build/block-editor.js',
			array( 'wp-blocks' ),
			GD_NEXTGEN_VERSION,
			true
		);

		wp_enqueue_script(
			'nextgen-block-editor-behavior',
			GD_NEXTGEN_PLUGIN_URL . 'build/site-editor-behavior.js',
			array( 'wp-blocks' ),
			GD_NEXTGEN_VERSION,
			true
		);

		wp_localize_script(
			'nextgen-block-editor',
			'nextgenBlockEditorDefaults',
			array(
				'closeLabel'           => esc_attr__( 'Back' ), // Use translation from core.
				'closeReferer'         => $referer ? esc_url( $referer ) : 0,
				'userId'               => get_current_user_id(),
				'adminUrl'             => admin_url(),
				'buttonLabel'          => __( 'WordPress Dashboard', 'nextgen' ),
				'adminShortcutEnabled' => get_option( 'nextgen_admin_dashboard_shortcut_enabled' ),
			)
		);

		wp_enqueue_style(
			'nextgen-uxcore-style',
			GD_NEXTGEN_PLUGIN_URL . 'build/block-editor-style.css',
			array( 'wp-block-library' ),
			GD_NEXTGEN_VERSION
		);
	}

}
