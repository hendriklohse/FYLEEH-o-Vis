<div class="no-data">
	<div class="title">
		No data to visualize
	</div>
	<div class="text">
		<?php global $current_csv_set, $data_array; if (!$current_csv_set) { ?>
			<div>
				Please select a data file in the top right corner
			</div>
			<div>
				or upload data in the top left corner.
			</div>
		<?php } else if (count($data_array) == 0) { ?>
			<div>
				We could not match data to your selection of filters.
			</div>
			<div>
				Try a different combination.
			</div>
			<div class="here-reset" onclick="ClearCookie('csv,stimuli');SetUrl('<?php echo get_permalink(); ?>')">Click here to reset your configurations</div>
		<?php } else { ?>
			<div>Please adjust your filter in the right corner.</div>
			<div class="here-reset" onclick="ClearCookie('csv,stimuli');SetUrl('<?php echo get_permalink(); ?>')">Click here to reset your configurations</div>
		<?php } ?>
	</div>
</div>