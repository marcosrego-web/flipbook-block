<?php
/**
 * @link              https://marcosrego.com
 * @since             0.1
 * @package           FlipBook Block
 *
 * Plugin Name:       FlipBook Block
 * Plugin URI:        https://marcosrego.com/development/flipbook-block
 * Description:       Shows a PDF from your Media in a Flip Book, for your visitors to turn the pages.
 * Version:           1.1
 * Author:            Marcos Rego
 * Author URI:        https://marcosrego.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       flipbook-block
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Admin
 */
if (is_admin()) {
	require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';
}

/**
 * Public
 */
require_once plugin_dir_path( __FILE__ ) . 'public/public.php';