<?php
	global $filenameprefix;
	$uploads = apply_filters( 'upload_dir', $cache[ $key ] );
	add_filter( 'upload_dir', 'csv_upload_dir' );

    $post_id = $post->ID;
    if ( isset( $_POST['csv-upload'] ) && ! empty( $_FILES ) ) {
		require_once( ABSPATH . 'wp-admin/includes/admin.php' );
		$id = media_handle_upload( 'async-upload1', $post_id ); //post id of Client Files page
		$csvname = $_FILES['async-upload1']['name'];
		unset( $_FILES );
		if( is_wp_error( $id ) ) {
			$errors['upload_error'] = $id;
			$id = false;
		}
		

		echo '<script>function displayError() {';
		if( $errors ) {
			echo 'alert("There was an error uploading your file.")';
		} else {
			echo 'alert("Your file (' . $csvname . ') has been uploaded."); SetCookie("csv","' . $filenameprefix . explode(".",$csvname)[0] . '"); SetUrl("' . get_permalink() . '");';
		}
		echo "} window.onload = displayError; </script>";
    }

	remove_filter( 'upload_dir', 'csv_upload_dir' ); 
?>

<form id="csv_form" enctype="multipart/form-data" action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="POST">
	<input class="yii-input" title="Upload csv" type="file" accept=".csv" id="async-upload1" name="async-upload1" onchange="CheckCsv(this);">
	<input type="submit" onclick="ClearCookie('')" value="Upload" name="csv-upload" id="csv_submit">
	<input type="hidden" name="post_id1" id="post_id1" value="<?php echo $post_id ?>" />
	<input type="hidden" name="redirect_to" value="<?php echo $_SERVER['REQUEST_URI']; ?>" />
</form>
<script>   
	function CheckCsv(oInput) {
		if (oInput.type == "file") {
			var sFileName = oInput.value;
			if (sFileName.length > 0) {
				if (sFileName.substr(sFileName.length - ".csv".length, ".csv".length).toLowerCase() == ".csv".toLowerCase()) {
					document.getElementById("csv_submit").click();
				} else {
					alert("Sorry, the file '" + oInput.files[0].name + "' is invalid. The only allowed extension is '.csv'.");
					oInput.value = "";
				}
			}
		}
	}
</script>