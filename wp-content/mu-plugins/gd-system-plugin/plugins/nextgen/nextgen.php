<?php
/**
 * Plugin Name: NextGen
 * Plugin URI: https://www.godaddy.com
 * Description: Next Generation WordPress Experience
 * Author: GoDaddy
 * Author URI: https://www.godaddy.com
 * Version: 1.0.0
 * Text Domain: gd-nextgen
 * Domain Path: /languages
 * Tested up to: 5.6.0
 *
 * NextGen is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with Content Management. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package Content_Management
 */

namespace GoDaddy\WordPress\Plugins\NextGen;

defined( 'ABSPATH' ) || exit;

define( 'GD_NEXTGEN_VERSION', '1.0.0' );
define( 'GD_NEXTGEN_PLUGIN_DIR', dirname( __FILE__ ) );
define( 'GD_NEXTGEN_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once __DIR__ . '/includes/autoload.php';

final class Plugin {

	use Singleton;

	/**
	 * Class constructor.
	 */
	private function __construct() {

		load_plugin_textdomain( 'gd-nextgen', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

		new Site_Design();
		new Site_Content();
		new Block_Editor();

	}

}

Plugin::load();
