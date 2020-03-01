<?php
/**
* Plugin Name: React Frontend
* Plugin URI: https://www.yourwebsiteurl.com/
* Description: This is the very first plugin I ever created.
* Version: 1.0
* Author: Your Name Here
* Author URI: http://yourwebsiteurl.com/
**/





// Enqueue Theme JS w React Dependency
add_action( 'wp_enqueue_scripts', 'react_app_js' );

function react_app_js() {
  wp_enqueue_script(
    'my-theme-frontend',
    plugin_dir_url( __FILE__ ) . '/build/index.js',
    ['wp-element'],
    time(), // Change this to null for production
    true
  );
}




add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field( array('post'),
        'image',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}