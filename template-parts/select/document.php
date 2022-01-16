<?php global $unique_des_all, $current_des, $current_des_set, $param_name, $param_value, $param_remove, $current_parameters_url;

$param_name = "desc";
$current_value = $current_des;

?>

<select title="Select <?php echo $param_name; ?>" onchange="SetCookie('<?php echo $param_name; ?>',this.value)">
	<option value=""><?php if ($current_des_set) { ?>Deselect<?php } else { ?>Select<?php } ?></option>
	<?php foreach ($unique_des_all as $description) { $param_value = $description; ?>
		<option value="<?php echo $param_value; ?>"<?php if ($current_value == $param_value) { echo " selected"; } ?>><?php echo $param_value; ?>
	</option>
	<?php } ?>
</select>

