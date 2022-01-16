<?php get_header(); ?>

	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/heatmap.css"/>

<?php get_template_part('template-parts/layout/middle'); ?>

<div class="page heatmap-page">
	<div class="hidden" id="more-info">
		<p>
			Welcome on the heatmap page! If you have selected or uploaded your data and stimuli, you are able to see a heatmap of your data. The color points resemble the viewing behaviour of user. In the top option of ‘General’ subfilter you may choose a color palette of your own preference.
		</p>
		<p>
			The <strong>‘Heatmap’ subfilter </strong> has a few <strong>features</strong> that will be explained below:
			<ul>
				<li>
					‘Tooltip’ button: enables the tooltip to show culumative values of the heatmap.
				</li>
				<li>
				‘Reset’ button: the user can remove all the selected AOIs at once.
				</li>
				<li>
				‘Range Min’/ ‘Range Max’: the user can enter a minimum/ maximum value the adjust the range of sensitivity.
				</li>
				<li>
					Sensitivity: the user can adjust sensitivity of the heatmap with the upper slider.
				</li>
				<li>
					Opacity: the user can adjust opacity of the heatmap with the lower slider.
				</li>
		</ul>
		</p> 
	<p>
		<strong>Step-by-step: Selecting AOI</strong>
		<ol>
			<li>
			Move your cursor to the image.
			</li>
			<li>
			Click on the image and drag cursor to select an AOI.
			</li>
			<li>
			You are able to resize and move the AOI to your own preference.
			</li>
			<li>
			Click on ‘Update now’ below the ‘Filter’ menu to submit your AOIs to the streamgraph.
			</li>
	</ol>
You are now able to see your selected AOIs in the streamgraph!

	<p>
		<strong>Tip!</strong> In the list of AOIs you are able to deselect AOIs. This way you can choose which AOIs you want to visualize in the heatmap and streamgraph. 
	</p>
		<p>
		</p>
		<p><strong>Tutorial Heatmap</strong></p>
		<p>
			<video width="560" height="315" controls>
				<source src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/uploads/2020/07/finalcompare.mp4" type="video/mp4">
				Your browser does not support the video tag.
			</video>
		</p>
	</div>

	<?php global $csvUrl, $stimuliUrl, $current_stimuli_set, $current_csv_set, $current_csv, $current_stimuli; if ($current_csv_set) { ?>
	<div class="yii-download">
		<a class="data" title="Click to download" target="_blank" href="<?php echo $csvUrl; ?>">Data (<?php echo $current_csv; ?>)</a><?php if ($current_stimuli_set) { ?> | <a class="stimulus" title="Click to download" target="_blank" href="<?php echo $stimuliUrl; ?>">Stimulus: (<?php echo $current_stimuli; ?>)</a><?php } ?>
	</div>
	<?php } ?>

	<?php global $current_csv_set, $current_stimuli_set, $data_array; if ($current_csv_set && $current_stimuli_set && count($data_array) != 0) { ?><div id="page-content" class="content"><?php
		get_template_part('template-parts/visualizations/heatmap');
	?></div><?php } else {
		get_template_part('template-parts/layout/no-data');
	} ?>
	
	<div class="yii-download-as-image">
		<a title="Click to download" target="_blank" onclick="downloadHeatmap();">Download view</a>
	</div>
</div>

<?php get_footer(); ?>