<?php
/**
 * @since      0.1
 *
 * @package    flipbook-block
 * @subpackage flipbook-block/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * @package    flipbook-block
 * @subpackage flipbook-block/admin
 * @author     marcosrego-web <web@marcosrego.com>
 */

/**
 *
 * Enqueue styles and scripts
 *
 */
 	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	add_action( 'enqueue_block_editor_assets', 'fbb_enqueue_styles_admin' );
	function fbb_enqueue_styles_admin() {
		wp_enqueue_style( 
			'fbb-admin-styles', 
			plugin_dir_url( __FILE__ ) . 'css/editor.css', 
			array(), 
			'', 
			'all' 
		);
		wp_register_script(
			'fbb-admin-scripts',
			plugins_url( 'js/block.js', __FILE__ ),
			array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'js/block.js' ),
			true
		);
		wp_enqueue_script( 'fbb-admin-scripts' );
	}
	register_block_type( 'marcosrego-web/flipbook-block', 
		array(
			'editor_script' => 'fbb-admin-scripts',
			'editor_style'  => 'fbb-admin-styles',
		)
	);

