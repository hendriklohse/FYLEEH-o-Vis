<?php global $current_compare; ?>

<?php get_header(); ?>

	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/front.css"/>

<?php get_template_part('template-parts/layout/middle'); ?>

<div class="page front">
	<div class="hidden" id="more-info">
		 <div>
			 Welcome on the Compare page. Here, you can compare more than one visualization on a split-screen view. The screens can be set to show the same or different visualization types.
		</div>
		<div>
			In order to compare visualizations:
		</div>
		<ol>
			<li>Go to the visualization that you want to compare and <strong>create the graph</strong> as instructed in the explanation provided under the ‘More Information’ button.</li>
			<li>After the data and stimulus are visualized, click on the <strong>‘Add view to comparison’</strong> under ‘Comparison’ in the filter menu, accessible by using the button in the top right corner.</li>
			<li>Repeat steps 1 and 2 to select the other desired visualization. Any view can be deselected by clicking on its name under ‘Comparison’ in the filter menu.</li>
			<li>Click on the ‘Comparison’ button to come back to this page and you should be able to observe your selection in one page.</li>
		</ol>
		<p>
		</p>
		<p><strong>Tutorial Comparison View</strong></p>
		<p>
			<video width="560" height="315" controls>
				<source src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/uploads/2020/07/finalcomparecorrect.mp4" type="video/mp4">
				Your browser does not support the video tag.
			</video>
		</p>
	</div>
	
	<?php global $csvUrl, $stimuliUrl, $current_stimuli_set, $current_csv_set, $current_csv, $current_stimuli; if ($current_csv_set) { ?>
	<div class="yii-download">
		<a class="data" title="Click to download" target="_blank" href="<?php echo $csvUrl; ?>">Data (<?php echo $current_csv; ?>)</a> | <?php if ($current_stimuli_set) { ?><a class="stimulus" title="Click to download" target="_blank" href="<?php echo $stimuliUrl; ?>">Stimulus: (<?php echo $current_stimuli; ?>)</a><?php } ?>
	</div>
	<?php } ?>
	
	<div id="page-content" class="content"><?php if (!empty($_COOKIE['compare'])) {
		for ($loop1 = 0; $loop1 < count($current_compare); $loop1++) {
			?><iframe class="_<?php echo count($current_compare); ?>" src="<?php echo $current_compare[$loop1]; ?>"></iframe><?php
		}
	} else {
		?><div class="no-data">
	<div class="title">
		No views in Comparison list
	</div>
	<div class="text">
			<div>
				First select some views with the filter in the right top.
			</div>
</div><?php
	} ?></div>
</div>

<?php get_footer(); ?>