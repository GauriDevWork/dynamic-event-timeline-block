<?php
/**
 * Plugin Name: Dynamic Event Timeline Block
 * Plugin URI:  https://github.com/GauriDevWork/dynamic-event-timeline-block
 * Description: A Gutenberg block for creating interactive event timelines.
 * Version:     0.1.0
 * Author:      WebTechee
 * Author URI:  https://profiles.wordpress.org/gauri87/
 * License:     GPL-2.0-or-later
 * Text Domain: dynamic-event-timeline-block
 * Requires at least: 6.5
 * Requires PHP: 8.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'DETB_VERSION', '0.1.0' );
define( 'DETB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'DETB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Registers the block using block.json.
 */
function detb_register_block(): void {
    register_block_type( DETB_PLUGIN_DIR . 'build/' );
}
add_action( 'init', 'detb_register_block' );