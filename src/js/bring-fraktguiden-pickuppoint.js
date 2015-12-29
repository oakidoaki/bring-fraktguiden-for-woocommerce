// Self execute. Avoid leakage to global
(function () {
    var $ = jQuery;

    /**
     * Listen for checkout ajax load events.
     */
    // Before update.
    $( document.body ).on( 'update_checkout', function () {
        console.log( 'update' );
    } );
    // After update.
    $( document.body ).on( 'updated_checkout', function () {
        if ( has_bring_shipping_rates() ) {
            add_pickup_point_html();
            load_pickup_points( $( '#fraktguiden-pickuppoint-postcode' ).val() );
        }
    } );

    /**
     * Store values between checkout ajax load.
     * @type {{postal_code: string, pickup_point_id: string}}
     */
    var store = {
        postal_code: '',
        pickup_point_id: ''
    };

    /**
     * Adds html to the review order table.
     */
    function add_pickup_point_html() {
        var html = [];
        html.push( '<tr id="fraktguiden-pickuppoint">' );
        html.push( '<th>Pickup point</th>' );
        html.push( '<td>Postcode<br><input type="text" name="fraktguiden-pickuppoint-postcode" id="fraktguiden-pickuppoint-postcode" class="input-text" value="' + store.postal_code + '"/><br/>' );
        html.push( '<select name="fraktguiden-pickuppoint-select" id="fraktguiden-pickuppoint-select">' );
        html.push( '<option id="fraktguiden-pickuppoint-placeholder">Select pickup point</option>' );
        html.push( '</select>' );
        html.push( '<div id="fraktguiden-pickuppoint-info"></div>' );
        html.push( '</td>' );
        html.push( '</tr>' );
        $( '.shipping' ).after( html.join( '' ) );

        // Add events to the input elements
        // todo: handle shipping method radiobuttons and select.
        // todo: show address and opening hours on select.

        $( '#fraktguiden-pickuppoint-postcode' ).keyup( function ( event ) {
            var postal_code = $.trim( event.target.value );
            if ( postal_code == '' )  return;
            delay( function () {
                load_pickup_points( postal_code );
            }, 700 );
        } );

        $( '#fraktguiden-pickuppoint-select' ).change( function () {
            store.pickup_point_id = this.value;
        } );
    }

    /**
     * @param postal_code {String}
     */
    function load_pickup_points( postal_code ) {
        store.postal_code = postal_code;
        $.ajax( {
            url: '/wp-content/plugins/woocommerce-bring-fraktguiden/classes/class-proxy.php?url=https://api.bring.com/pickuppoint/api/pickuppoint/no/postalCode/' + postal_code + '.json',
            dataType: 'json',
            beforeSend: function ( xhr ) {

            },
            success: function ( data, status ) {
                if ( !data || !data.pickupPoint ) {
                    // todo: handle no result.
                    return;
                }
                // Remove any previous pickup points.
                $( '#fraktguiden-pickuppoint-select option[id!=fraktguiden-pickuppoint-placeholder]' ).remove();
                var options = [];
                $.each( data.pickupPoint, function ( key, pickup_point ) {
                    options.push( '<option value="' + pickup_point.id + '">' + pickup_point.name + ', ' + pickup_point.visitingAddress + ', ' + pickup_point.visitingPostalCode + ', ' + pickup_point.visitingCity + '</option>' );
                } );
                $( '#fraktguiden-pickuppoint-placeholder' ).after( options.join( '' ) );

                if ( store.pickup_point_id ) {
                    $( '#fraktguiden-pickuppoint-select' ).val( store.pickup_point_id );
                }
            }
        } );
    }

    /**
     * Returns true if shipping methods has any bring shipping rates.
     * @returns {boolean}
     */
    function has_bring_shipping_rates() {
        return $( '.shipping input[type=radio][value^=bring_fraktguiden].shipping_method' ).length > 0;
    }

    function set_info( info ) {
        $( '#fraktguiden-pickuppoint-info' ).html( 'info' );
    }

    var delay = (function () {
        var timer = 0;
        return function ( callback, ms ) {
            clearTimeout( timer );
            timer = setTimeout( callback, ms );
        };
    })();


})();
