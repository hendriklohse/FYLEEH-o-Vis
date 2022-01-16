<div id="yiisidemenu" class="sidemenu<?php global $current_csv_set, $current_stimuli_set, $data_array; if (is_front_page() || (!$current_csv_set || (!$current_stimuli_set && !is_page("bar-chart")) || !count($data_array) != 0) && !is_page("about-us") && !is_page("bar-chart") && !is_page("compare")) { echo " active"; } ?>">
	<div class="options">
		<a class="option" href="<?php echo site_url() . '/heatmap/'; ?>">Heatmap</a>
		<a class="option" href="<?php echo site_url() . '/streamgraph/'; ?>">Streamgraph</a>
		<a class="option" href="<?php echo site_url() . '/3d-line-plot/'; ?>">3D line plot</a>
		<a class="option" href="<?php echo site_url() . '/bar-chart/'; ?>">Bar chart</a>
		<a class="option" href="<?php echo site_url() . '/overview/'; ?>">Show all</a>
		<a class="option" href="<?php echo site_url() . '/compare/'; ?>">Compare</a>
		<a class="option" href="<?php echo site_url() . '/about-us/'; ?>">Meet the team</a>
	</div>
</div>