<?php get_header(); ?>

	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/streamgraph.css"/>

<?php get_template_part('template-parts/layout/middle'); ?>

<div class="page streamgraph-page">
	<div class="hidden" id="more-info">
	<p>
		Welcome on the Streamgraph page. We procure a graph showing the number of observers on specific areas over time. The areas are chosen by the user using the heatmap on our website.
		</p>
	<p>
		How to use:
		</p>
	<p>
		<ol>
			<li>Go to the <strong>heatmap</strong> page and select the dataset and the stimulus using the (first and second) buttons on the top right of the page.</li>
			<li>Select the preferred areas of interest (AOI) by <strong>clicking and dragging</strong> the cursor until the desired size is selected. More than one area can be selected and by clicking the green <strong>'Click to update' button</strong>, your selection will be submitted.</li>
			<li>Once the areas are selected, return to the streamgraph page and the selected data will be visualized!</li>
		</ol> 
		</p>
	<p>
		From here forward, you should have a graph showing the number of observers over time per area of interest. When you hover over an AOI, the others grey out and it is easily observable. 
		</p>
	<p>
		In the filter menu, under ‘General’ you can respectively select the color palette, specific user, specific description, and minimum and maximum time on the graph.
	</p>
	<p>
	</p>
	<p><strong>Tutorial Streamgraph</strong></p>
	<p>
		<video width="560" height="315" controls>
			<source src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/uploads/2020/07/finalstream.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video>
	</p>
	</div>
	
	<?php global $csvUrl, $stimuliUrl, $current_stimuli_set, $current_csv_set, $current_csv, $current_stimuli; if ($current_csv_set) { ?>
	<div class="yii-download">
		<a class="data" title="Click to download" target="_blank" href="<?php echo $csvUrl; ?>">Data (<?php echo $current_csv; ?>)</a><?php if ($current_stimuli_set) { ?> | <a class="stimulus" title="Click to download" target="_blank" href="<?php echo $stimuliUrl; ?>">Stimulus: (<?php echo $current_stimuli; ?>)</a><?php } ?>
	</div>
	<?php } ?>
	
	<?php global $current_csv_set, $current_stimuli_set, $data_array; if ($current_csv_set && $current_stimuli_set && count($data_array) > 1) { ?><div id="page-content" class="content"><?php
		get_template_part('template-parts/visualizations/streamgraph');
	?></div><?php } else {
		get_template_part('template-parts/layout/no-data');
	} ?>
</div>

<?php get_footer(); ?>