=== Bring Fraktguiden for WooCommerce ===
Author: Driv Digital
Author URI: https://drivdigital.no
Contributors: drivdigital, Matt Gates, oakidoaki
Donate link: http://drivdigital.no/
Tags: woocommerce, shipping, bring, fraktguiden
Requires at least: 3.2
Tested up to: 4.5
WC requires at least: 2.2
WC tested up to: 2.5
Stable tag: ##VERSION##
License: The MIT License
License URI: http://opensource.org/licenses/MIT

Bring Fraktguiden provides shipping calculation based on rates from bring.no.

== Description ==
Bring Fraktguiden provides shipping calculations based on shipping rates from bring.no.
All standard shipping methods from Bring are built-in. Volume calculations based on product dimensions and weight.

Please consult the installation section and the changelog section before installing or upgrading.

New in 1.2.1

* Fraktguiden services list is up-to-date with Fraktguiden. Please check your services configuration after updating.
* Improved support for shipping from and to all Nordic countries.
* Option for using Display Name or Product Name when displaying the services to customers (Thanks to oakidoaki).
* Option for displaying the service's description (Thanks to oakidoaki).
* General bug fixes throughout

Special thanks goes to Matt Gates for allowing us to use his code as a base for this plugin.

If you want to contribute or file an issue, please go to: https://github.com/drivdigital/bring-fraktguiden-for-woocommerce

== Installation ==

= Prerequisites =

The plugin has been tested with WooCommerce version 2.5

Make sure WooCommerce is configured with:

* Dimension unit and weight unit (see WooCommerce > Settings > Products)
* Currency (see WooCommerce > Settings > General). The currency should be NOK.

In order to calculate shipping, products in the stock must have dimensions and weight.

1. Upload `bring-fraktguiden-for-woocommerce` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Navigate to wp-admin > WooCommerce > Settings > Shipping
4. Enable and configure Bring Fraktguiden

== Frequently Asked Questions ==

Q: Why do rates not show up on the cart page?

A: Rates are only shown when the customer has a valid zip code.

== Changelog ==

= 1.2.1 =

* WBF-30: Update the Fraktguiden product list.
* WBF-33: Improve support for sending to other countries - The support for sending from and to all Nordic countries has been improved.
* WBF-32: Fixed an issue where the checkout page would print a 'Invalid argument supplied for foreach.' message if no Fraktguiden services was provided by the shop (WP DEBUG MODE only)
* WBF-35: Option for using Product Name when displaying the services to customers
* WBF-37: Option for displaying the service description to customers

= 1.2.0 =

* WBF-16: Fixed packaging issue: Shipping options was not shown if one or more package surpassed 240 grams.
* WBF-17: Added support for recipient notification over SMS or E-Mail from Bring. Note that recipient notification needs to be activated after the upgrade (See: WooCommerce > settings > shipping > Bring Fraktguiden).
* WBF-18: Added WP filter for modifying the Fraktguiden request parameters.
* WBF-22: Added path to Woo Commerce logs in the plugin's options page.
* WBF-23: Fixed undefined variable bug when logging is enabled.

= 1.1.2 =
* Renamed plugin to bring-fraktguiden-for-woocommerce

= 1.1.1 =

* Requests to the bring api is now logged if debug is enabled (see settings screen)
* Misc. text changes

= 1.1.0 =

* Improved support for multi packaging.
* Fixed so fee is added to the rate.

= 1.0.0 =

* Initial release.

