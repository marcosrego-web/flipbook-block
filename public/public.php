<?php
/**
 * @since      0.1
 *
 * @package    pdf-viewer-block
 * @subpackage pdf-viewer-block/public
 */

/**
 * The public-specific functionality of the plugin.
 *
 * @package    pdf-viewer-block
 * @subpackage pdf-viewer-block/public
 * @author     audrasjb <audrasjb@gmail.com>
 */

/**
 *
 * Enqueue styles and scripts
 *
 */
	add_action( 'wp_enqueue_scripts', 'fbb_enqueue_styles_public' );
	function fbb_enqueue_styles_public() {
		if ( has_block( 'marcosrego-web/flipbook-block' ) ) {
			wp_enqueue_style( 
				'pdf-viewer-block-styles', 
				plugin_dir_url( __FILE__ ) . 'css/style.css', 
				array(), 
				'', 
				'all' 
			);
		}
	}	

