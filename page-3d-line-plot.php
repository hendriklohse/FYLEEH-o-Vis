<?php get_header(); ?>

	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/3d-line-plot.css"/>

<?php get_template_part('template-parts/layout/middle'); ?>

<div class="page vis-3d-page">
	<div class="hidden" id="more-info">
	<p>
		Welcome on the 3D Line Plot page. Here we provide a 3D representation of the viewer’s eye movement over time. 
		</p>
		<p> 
			You can use <strong>your mouse</strong> to rotate the graph and hover over the line to observe the:
		</p>
		<ul>
			<li>Time</li>
			<li>Width</li>
			<li>Height</li>
			<li>Variables of each gaze point</li>
		</ul>
	<p>
		Using the <strong>filter button</strong> on the top right, the filter menu appears and under ‘General’ you can respectively select a specific user, color of the image observed, minimum and maximum time on the graph.
		</p>
	</div>
	
	<?php global $csvUrl, $stimuliUrl, $current_stimuli_set, $current_csv_set, $current_csv, $current_stimuli; if ($current_csv_set) { ?>
	<div class="yii-download">
		<a class="data" title="Click to download" target="_blank" href="<?php echo $csvUrl; ?>">Data (<?php echo $current_csv; ?>)</a><?php if ($current_stimuli_set) { ?> | <a class="stimulus" title="Click to download" target="_blank" href="<?php echo $stimuliUrl; ?>">Stimulus: (<?php echo $current_stimuli; ?>)</a><?php } ?>
	</div>
	<?php } ?>
	
	<?php global $current_csv_set, $current_stimuli_set, $data_array; if ($current_csv_set && $current_stimuli_set && count($data_array) != 0) { ?><div id="page-content" class="content"><?php
		get_template_part('template-parts/visualizations/3d-line-plot');
	?></div><?php } else {
		get_template_part('template-parts/layout/no-data');
	} ?>
	
	<div class="yii-download-as-image">
		<a title="Click to download" target="_blank" onclick="download3d();">Download view</a>
	</div>
</div>

<?php get_footer(); ?>