<?php global $filenameprefix, $upload_dir, $csv_files, $current_csv, $current_stimuli, $current_csv_set, $current_stimuli_set, $param_name, $param_value, $param_remove, $current_parameters_url;

$param_name = "csv";
$current_value = $current_csv;

$csv_files = glob($upload_dir . '/csv/' . $filenameprefix . '*');

?>

<select title="Select <?php echo $param_name; ?>" onchange="SetCookie('<?php echo $param_name; ?>',this.value); if (this.value == '') { ClearCookie('color'); } else { ClearCookie('color,csv'); }; SetUrl('<?php echo get_permalink(); ?>')">
	<option value=""><?php if ($current_csv_set) { ?>Deselect<?php } else { ?>Select<?php } ?></option>
	<?php foreach ($csv_files as $file) { $param_value = explode(".",end(explode("/",$file)))[0];?>
		<option value="<?php echo $param_value; ?>"<?php if ($current_value == $param_value) { echo " selected"; } ?>><?php echo str_replace($filenameprefix,"",$param_value); ?></option>
	<?php } ?>
</select>