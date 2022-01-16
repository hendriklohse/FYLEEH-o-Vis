<?php global $color_palettes, $current_color, $param_name, $param_value, $param_remove, $current_parameters_url;

$param_name = "color";
$current_value = $current_color;

?>

<select title="Select <?php echo $param_name; ?>" onchange="SetCookie('<?php echo $param_name; ?>',this.value)">
	<option value=""><?php echo $color_palettes[0][3][0]; ?></option>
	<?php for ($loop1 = 1; $loop1 < count($color_palettes); $loop1++) { $param_value = $color_palettes[$loop1][3][0]; ?>
		<option value="<?php echo $loop1; ?>"<?php if ($current_value == $loop1) { echo " selected"; } ?>><?php echo $param_value; ?></option>
	<?php } ?>
</select>