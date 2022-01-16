<?php global $unique_usr_all, $current_usr, $current_usr_set, $param_name, $param_value, $param_remove, $current_parameters_url;

$param_name = "user";
$current_value = $current_usr;

?>

<select title="Select <?php echo $param_name; ?>" onchange="SetCookie('<?php echo $param_name; ?>',this.value)">
	<option value=""><?php if ($current_usr_set) { ?>Deselect<?php } else { ?>Select<?php } ?></option>
	<?php foreach ($unique_usr_all as $user) { $param_value = $user; ?>
		<option value="<?php echo $param_value; ?>"<?php if ($current_value == $param_value) { echo " selected"; } ?>><?php echo $param_value; ?></option>
	<?php } ?>
</select>