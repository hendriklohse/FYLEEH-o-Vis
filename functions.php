<?php
/* custom upload dir */
function csv_upload_dir( $dir_data ) {
	$custom_dir = 'csv';
    return [
        'path' => $dir_data[ 'basedir' ] . '/' . $custom_dir,
        'url' => $dir_data[ 'url' ] . '/' . $custom_dir,
        'subdir' => '/' . $custom_dir,
        'basedir' => $dir_data[ 'error' ],
        'error' => $dir_data[ 'error' ],
    ];
}
function stimuli_upload_dir( $dir_data ) {
	$custom_dir = 'stimuli';
    return [
        'path' => $dir_data[ 'basedir' ] . '/' . $custom_dir,
        'url' => $dir_data[ 'url' ] . '/' . $custom_dir,
        'subdir' => '/' . $custom_dir,
        'basedir' => $dir_data[ 'error' ],
        'error' => $dir_data[ 'error' ],
    ];
}
add_filter( 'wp_unique_filename', 'custom_file_name', 10, 2 );
function custom_file_name( $filename ) {
	global $filenameprefix;
	
	return $filenameprefix . $filename;
}

/* remove image sizes */
function remove_image_sizes( $sizes, $metadata ) {
    return [];
}
add_filter( 'intermediate_image_sizes_advanced', 'remove_image_sizes', 10, 2 );

// Favicon //
function fyleeh_o_vis_favicon() {
   global $redux_yipisit; echo '<link rel="shortcut icon" href="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/themes/fyleeh-o-vis/assets/images/favicon.png">';
}
add_action('wp_head', 'fyleeh_o_vis_favicon');
add_action('admin_head', 'fyleeh_o_vis_favicon');

/* register */
add_action('init','create_account');
function create_account(){
	if(!isset($_POST['action']) || $_POST['action'] !== 'my_create_action')
    return;
	
    //You may need some data validation here
    $user = ( isset($_POST['uname']) ? $_POST['uname'] : '' );
    $pass = ( isset($_POST['upass']) ? $_POST['upass'] : '' );
    $email = ( isset($_POST['uemail']) ? $_POST['uemail'] : '' );

    if ( !username_exists( $user )  && !email_exists( $email ) ) {
       $user_id = wp_create_user( $user, $pass, $email );
       if( !is_wp_error($user_id) ) {
           //user has been created
           $user = new WP_User( $user_id );
           $user->set_role('user');
           //Redirect
           wp_redirect(home_url());
           exit;
       } else {
           //$user_id is a WP_Error object. Manage the error
       }
    }
}

add_action('init', function(){

  // not the login request?
  if(!isset($_POST['action']) || $_POST['action'] !== 'my_login_action')
    return;

  // see the codex for wp_signon()
  $result = wp_signon();

  if(is_wp_error($result))
    wp_die('Login failed. Wrong password or user name?');

  // redirect back to the requested page if login was successful    
  header('Location: ' . $_SERVER['REQUEST_URI']);
  exit;
	
});


?>