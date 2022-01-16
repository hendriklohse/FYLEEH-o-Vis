<!-- Test page for ... -->
<?php global $color_palettes, $current_color, $AOI_count; ?>

<div>
	<?php echo $color_list = implode($color_palettes[$current_color][1]); ?>
</div>
<div>
	<?php print_r($AOI_count[0]); ?>
</div>
