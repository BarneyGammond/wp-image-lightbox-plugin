<?php 

/*
   Plugin Name: Gallery Lightbox
   Description: Custoim lightbox for displaying artwork images in a lightbox with a description.
   Version: 1.0
   Author: Barney Gammond
   Author URI: https://github.com/BarneyGammond
   License: GPL2
*/

function enqueue_lightbox_scripts() {

    //Enqueue lightbox mechanics
    wp_enqueue_script('lightbox_js', plugin_dir_url( __FILE__ ) . 'lightbox.js');

    //Enqueue lightbox stylings
    wp_enqueue_style('lightbox_css', plugin_dir_url( __FILE__ ) . 'lightbox.css');

}

function enqueue_block_filter_scripts() {

     //Enqueue image block filter
     wp_enqueue_script(
        'lightbox_js', 
        plugin_dir_url( __FILE__ ) . 'build/index.js',
        ['wp-i18n', 'wp-hooks', 'wp-element','wp-block-editor', 'wp-components', 'wp-compose']
    );

}

add_action('wp_enqueue_scripts', 'enqueue_lightbox_scripts');
add_action('enqueue_block_editor_assets', 'enqueue_block_filter_scripts');

function enqueue_block_mod() {
    wp_enqueue_script('block_mod_js', plugin_dir_url( __FILE__ ) . 'gallery-block-mod.js');
}

add_action( 'enqueue_block_editor_assets', 'enqueue_block_mod' );

/**
 * Adds Image gallery inputs
 *
 * @param $form_fields array, fields to include in attachment form
 * @param $post object, attachment record in database
 * @return $form_fields, modified form fields
 */
  
function gallerylb_fields( $form_fields, $post ) {
    $form_fields['lb-artwork-medium'] = array(
        'label' => 'Artwork Medium',
        'input' => 'text',
        'value' => get_post_meta( $post->ID, 'lb_artwork_medium', true ),
        'helps' => 'If provided, medium will be show in lightbox',
    );
 
    $form_fields['lb-artwork-dimensions'] = array(
        'label' => 'Artwork Dimensions',
        'input' => 'text',
        'value' => get_post_meta( $post->ID, 'lb_artwork_dimensions', true ),
        'helps' => 'If provided, dimensions will be show in lightbox',
    );
 
    $form_fields['lb-artwork-year'] = array(
        'label' => 'Artwork Year',
        'input' => 'text',
        'value' => get_post_meta( $post->ID, 'lb_artwork_year', true ),
        'helps' => 'If provided, year will be show in lightbox',
    );
 
    $form_fields['lb-artwork-description'] = array(
        'label' => 'Artwork Description',
        'input' => 'textarea',
        'value' => get_post_meta( $post->ID, 'lb_artwork_description', true ),
        'helps' => 'If provided, description will be show in lightbox',
    );
 
    return $form_fields;
}
 
add_filter( 'attachment_fields_to_edit', 'gallerylb_fields', 10, 2 );
 
/**
 * Save values of Photographer Name and URL in media uploader
 *
 * @param $post array, the post data for database
 * @param $attachment array, attachment fields from $_POST form
 * @return $post array, modified post data
 */
 
function gallerylb_fields_save( $post, $attachment ) {
    if( isset( $attachment['lb-artwork-medium'] ) )
        update_post_meta( $post['ID'], 'lb_artwork_medium', $attachment['lb-artwork-medium'] );
 
    if( isset( $attachment['lb-artwork-dimensions'] ) )
        update_post_meta( $post['ID'], 'lb_artwork_dimensions', $attachment['lb-artwork-dimensions'] );
 
    if( isset( $attachment['lb-artwork-year'] ) )
        update_post_meta( $post['ID'], 'lb_artwork_year', $attachment['lb-artwork-year'] );
 
    if( isset( $attachment['lb-artwork-description'] ) )
        update_post_meta( $post['ID'], 'lb_artwork_description', $attachment['lb-artwork-description'] );
 
    return $post;
}
 
add_filter( 'attachment_fields_to_save', 'gallerylb_fields_save', 10, 2 );

?>