<?php global $unique_sti_all, $current_stimuli, $current_stimuli_set, $param_name, $param_value, $param_remove, $current_parameters_url;

$param_name = "stimuli";
$current_value = $current_stimuli;

?>

<select title="Select <?php echo $param_name; ?>" onchange="SetCookie('<?php echo $param_name; ?>',this.value); if (this.value == '') { ClearCookie('color,csv,bar_sti,compare'); } else { ClearCookie('color,csv,stimuli,bar_sti,compare'); }; SetUrl('<?php echo get_permalink(); ?>')">
	<option value=""><?php if ($current_stimuli_set) { ?>Deselect<?php } else { ?>Select<?php } ?></option>
	<?php foreach ($unique_sti_all as $stimuli) { $param_value = end(explode("/",$stimuli)); ?>
		<option value="<?php echo $param_value; ?>"<?php if ($current_value == $param_value) { echo " selected"; } ?>><?php echo explode(".",$param_value)[0]; ?></option>
	<?php } ?>
</select>