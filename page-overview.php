<?php get_header(); ?>

	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/overview.css"/>
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/heatmap.css"/>
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/bar-chart.css"/>
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/3d-line-plot.css"/>
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/streamgraph.css"/>

<?php get_template_part('template-parts/layout/middle'); ?>

<div class="page overview">
	<div class="hidden" id="more-info">
		<div>
			Welcome on the Overall page. Here you can observe all of the visualizations at the same time on one page. The visualizations portrayed are:
		</div>
		<ul>
			<li>The heatmap (top left)</li>
			<li>The streamgraph (bottom left)</li>
			<li>3D line plot (top right)</li>
			<li>Bar chart (bottom right)</li>
		</ul>
		<div>
			If no data or stimulus is selected, this can be achieved using the buttons on the top right. The bar chart will show all measurements for all (or a few selected) stimuli once a dataset has been selected.
		</div>
		<div>
			If data and a specific stimulus have been selected but no areas of interest (AOI), the heatmap, streamgraph and 3D line plot will display the entire dataset for this stimulus.
		</div>
		<p>
		</p>
		<div>
			If areas of interest have been selected, the heatmap and streamgraph show more detailed data.
		</div>
		<div>
			For a more detailed explanation on what the visualizations present and how to use them, see their respective ‘More Information’ pages.
		</div>
	</div>
	<?php global $current_csv_set, $current_stimuli_set, $data_array; if ($current_csv_set && $current_stimuli_set && count($data_array) != 0) { ?><div id="page-content" class="content">
		<div class="visualizations">
			<div class="visualization heatmap">
				<a href="<?php echo site_url() . '/heatmap/'; ?>" class="more">
					<svg class="yii-icon arrow" viewBox="0 0 50 50">
						<style type="text/css">.yii-header.sticky .yii-icon.arrow * { fill: none; stroke: #000000; stroke-linecap: round; }</style>
						<line class="_0" x1="10" y1="32.68" x2="25" y2="17.68"></line>
						<line class="_1" x1="40" y1="32.68" x2="25" y2="17.68"></line>
					</svg>
				</a>
				<?php get_template_part('template-parts/visualizations/heatmap'); ?>
			</div>
			<div class="visualization line-plot">
				<a href="<?php echo site_url() . '/3d-line-plot/'; ?>" class="more">
					<svg class="yii-icon arrow" viewBox="0 0 50 50">
						<style type="text/css">.yii-header.sticky .yii-icon.arrow * { fill: none; stroke: #000000; stroke-linecap: round; }</style>
						<line class="_0" x1="10" y1="32.68" x2="25" y2="17.68"></line>
						<line class="_1" x1="40" y1="32.68" x2="25" y2="17.68"></line>
					</svg>
				</a>
				<?php get_template_part('template-parts/visualizations/3d-line-plot'); ?>
			</div>
			<div class="visualization bar-chart">
				<a href="<?php echo site_url() . '/bar-chart/'; ?>" class="more">
					<svg class="yii-icon arrow" viewBox="0 0 50 50">
						<style type="text/css">.yii-icon.arrow * { fill: none; stroke: #000000; stroke-linecap: round; }</style>
						<line class="_0" x1="10" y1="32.68" x2="25" y2="17.68"></line>
						<line class="_1" x1="40" y1="32.68" x2="25" y2="17.68"></line>
					</svg>
				</a>
				<?php get_template_part('template-parts/visualizations/bar-chart'); ?>
			</div>
			<div class="visualization streamgraph">
				<a href="<?php echo site_url() . '/streamgraph/'; ?>" class="more">
					<svg class="yii-icon arrow" viewBox="0 0 50 50">
						<style type="text/css">.yii-header.sticky .yii-icon.arrow * { fill: none; stroke: #000000; stroke-linecap: round; }</style>
						<line class="_0" x1="10" y1="32.68" x2="25" y2="17.68"></line>
						<line class="_1" x1="40" y1="32.68" x2="25" y2="17.68"></line>
					</svg>
				</a>
				<?php get_template_part('template-parts/visualizations/streamgraph'); ?>
			</div>
		</div>
	</div><?php } else {
		get_template_part('template-parts/layout/no-data');
	} ?>
</div>

<?php get_footer(); ?>