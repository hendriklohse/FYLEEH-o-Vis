<?php
	$uploads = apply_filters( 'upload_dir', $cache[ $key ] );
	add_filter( 'upload_dir', 'stimuli_upload_dir' );

    $post_id = $post->ID;
    if ( isset( $_POST['stimuli-upload'] ) && ! empty( $_FILES ) ) {
		require_once( ABSPATH . 'wp-admin/includes/admin.php' );
		$id = media_handle_upload( 'async-upload2', $post_id ); //post id of Client Files page
		$stimuliname = $_FILES['async-upload2']['name'];
		unset( $_FILES );
		if( is_wp_error( $id ) ) {
			$errors['upload_error'] = $id;
			$id = false;
		}

		echo '<script>function displayError() {';
		if( $errors ) {
			echo 'alert("There was an error uploading your file.")';
		} else {
			echo 'alert("Your file (' . $stimuliname . ') has been uploaded."); SetCookie("stimuli","' . $stimuliname . '"); SetUrl("' . get_permalink() . '");';
		}
		echo "} window.onload = displayError; </script>";
    }

	remove_filter( 'upload_dir', 'stimuli_upload_dir' ); 
?>

<form id="stimuli_form" enctype="multipart/form-data" action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="POST">
	<input class="yii-input" title="Upload stimulus" type="file" accept=".png, .jpg, .jpeg" id="async-upload2" name="async-upload2" onchange="CheckStimuli(this);">
	<input type="submit" value="Upload" onclick="ClearCookie('color,csv')" name="stimuli-upload" id="stimuli_submit">
	<input type="hidden" name="post_id2" id="post_id2" value="<?php echo $post_id ?>" />
	<input type="hidden" name="redirect_to" value="<?php echo $_SERVER['REQUEST_URI']; ?>" />
</form>
<script>
	function CheckStimuli(oInput) {
		if (oInput.type == "file") {
			var _validFileExtensions = [".png", ".jpg", ".jpeg"];
			var sFileName = oInput.value;
			if (sFileName.length > 0) {
				var blnValid = false;
				for (var j = 0; j < _validFileExtensions.length; j++) {
					var sCurExtension = _validFileExtensions[j];
					if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
						blnValid = true;
						break;
					}
				}
				if (blnValid) {
					document.getElementById("stimuli_submit").click();
				} else {
					alert("Sorry, the file '" + oInput.files[0].name + "' is invalid. The only allowed extensions are: '" + _validFileExtensions.join("', '") + "'.");
					oInput.value = "";
					return false;
				}
			}
		}
	}
</script>