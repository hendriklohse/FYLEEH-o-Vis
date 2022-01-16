<?php get_header(); ?>

	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/bar-chart.css"/>

<?php get_template_part('template-parts/layout/middle'); ?>

<div class="page bar-chart">
	<div class="hidden" id="more-info">
	<p>
		Welcome to the Bar chart page. This chart shows four measurements collected from the selected data set, that being the minimum time, average time, maximum time, and the number of fixation points. 
		</p>
	<p>
		By hovering over the graph, the variable, the specific number, and the name of the image can be observed.
		</p>
	<p>
		The measurements are shown for all descriptions per stimulus. <strong>Any of the measurements can be deselected</strong> by clicking on the measurement above the bar chart.
		</p>
	<p>
		Upon entering the page, all stimuli are visualized. Any stimulus can be deselected by opening the filter menu on the top right of the screen and clicking on its name in the list of stimuli under ‘Bar chart’. Under ‘General’ you can respectively select the color palette, specific user, color of the image observed, minimum and maximum time on the graph.
		</p>
		<p>
		</p>
		<p><strong>Tutorial Bar chart</strong></p>
		<p>
			<video width="560" height="315" controls>
				<source src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/uploads/2020/07/finalbarchart.mp4" type="video/mp4">
				Your browser does not support the video tag.
			</video>
		</p>
	</div>

	<?php global $csvUrl, $stimuliUrl, $current_stimuli_set, $current_csv_set, $current_csv, $current_stimuli; if ($current_csv_set) { ?>
	<div class="yii-download">
		<a class="data" title="Click to download" target="_blank" href="<?php echo $csvUrl; ?>">Data (<?php echo $current_csv; ?>)</a><?php if ($current_stimuli_set) { ?> | <a class="stimulus" title="Click to download" target="_blank" href="<?php echo $stimuliUrl; ?>">Stimulus: (<?php echo $current_stimuli; ?>)</a><?php } ?>
	</div>
	<?php } ?>
	
	<?php global $current_csv_set; if ($current_csv_set) { ?><div id="page-content" class="content"><?php
		get_template_part('template-parts/visualizations/bar-chart');
	?></div><?php } else {
		get_template_part('template-parts/layout/no-data');
	} ?>
</div>

<?php get_footer(); ?>