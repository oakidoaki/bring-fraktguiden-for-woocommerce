<?php

/**
 * Plugin Name:         Bring Fraktguiden for WooCommerce
 * Plugin URI:          http://drivdigital.no
 * Description:         N/A
 * Author:              Driv Digital
 * Author URI:          http://drivdigital.no
 * License:             MIT
 *
 * Version:             ##VERSION##
 * Requires at least:   3.2.1
 * Tested up to:        4.0.1
 *
 * Text Domain:         bring-fraktguiden
 * Domain Path:         /languages
 *
 * @package             WooCommerce
 * @category            Shipping Method
 * @author              Driv Digital
 */
class Bring_Fraktguiden {

  /**
   * Entry point
   */
  static function init() {
    if ( class_exists( 'WooCommerce' ) ) {
      load_plugin_textdomain( 'bring-fraktguiden', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
      wp_register_script( 'bring-fraktguiden-checkout', plugins_url( 'js/bring-fraktguiden-pickuppoint.js', __FILE__ ), array( 'jquery' ), '##VERSION##', true );

      add_action( 'woocommerce_shipping_init', 'Bring_Fraktguiden::shipping_init' );

      // todo: only if Bring is enabled.
      add_action( 'wp_enqueue_scripts', 'Bring_Fraktguiden::add_pickup_point_script' );

    }
  }

  /**
   * Include the shipping method
   */
  static function shipping_init() {
    include_once 'classes/class-wc-shipping-method-bring.php';
    add_filter( 'woocommerce_shipping_methods', 'Bring_Fraktguiden::add_bring_method' );
  }

  /**
   * Adds Bring shipping method to WooCommerce.
   *
   * @package  WooCommerce/Classes/Shipping
   * @param array $methods
   * @return array
   */
  static function add_bring_method( $methods ) {
    $methods[] = 'WC_Shipping_Method_Bring';
    return $methods;
  }

  /**
   * Adds pick up point js to the checkout page.
   *
   * @access public
   */
  static function add_pickup_point_script() {
    if ( is_checkout() ) {
      wp_enqueue_script( 'bring-fraktguiden-checkout' );
    }
  }

}

add_action( 'plugins_loaded', 'Bring_Fraktguiden::init' );