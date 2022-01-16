<?php global $data_array, $bar_unique_des, $bar_unique_sti, $files, $current_csv_set, $bar_stimuli_stats, $color_palettes, $current_color, $current_bar_sti_set; ?>

<!-- <script src="<?php bloginfo('template_directory'); ?>/assets/js/bar-chart/Chart.min.js"></script> -->
<script src="<?php bloginfo('template_directory'); ?>/assets/js/bar-chart/Chart.js"></script>
<script>
'use strict';

(function(global) {

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};
}(this));
</script>

<div class="vis-bar-chart"><?php if ($current_csv_set) { ?>
	<div class="container" id="canvasContainer"><canvas id="canvas"></canvas></div>
	<script>
		if ( window.location !== window.parent.location ) {
			yipvariableHeight = <?php if (is_page("overview")) { echo "window.innerHeight*0.5 - 36"; } else { echo "window.innerHeight - 140"; } ?>;
		} else {
			yipvariableHeight = <?php if (is_page("overview")) { echo "window.innerHeight*0.5 - 66"; } else { echo "window.innerHeight - 190"; } ?>;
		}
		yipvariableWidth = <?php if (is_page("overview")) { echo "window.innerWidth*0.5 - 41"; } else { echo "window.innerWidth - 140"; } ?>;
		
		document.getElementById("canvasContainer").style.width = yipvariableWidth + "px";
		document.getElementById("canvasContainer").style.height = yipvariableHeight + "px";
		document.getElementById("canvas").style.width = yipvariableWidth + "px";
		document.getElementById("canvas").style.height = yipvariableHeight + "px";
		document.getElementById("canvas").style.cursor = "pointer";
		
		var stimuli = [<?php for($i = 0; $i < count($bar_unique_sti); $i++) {
				if ($i == 0) {
					echo "'" . $bar_unique_sti[$i] . "'"; 
				} else {
					echo ',' . "'" . $bar_unique_sti[$i] . "'"; 
				}
			} ?>];
		var color = Chart.helpers.color;
		var barChartData = {
			labels: [<?php
				for ($loop1 = 0; $loop1 < count($bar_stimuli_stats); $loop1++) {
					 if ($loop1 != 0) { echo ','; }
					 echo "'" . $bar_unique_sti[$loop1] . "'";
				 }
			?>],
			datasets: [<?php $temp_count = 0;
				for ($loop1 = 0; $loop1 < count($bar_stimuli_stats[0]); $loop1++) {
					for ($loop2 = 2; $loop2 < count($bar_stimuli_stats[0][0]); $loop2++) {
						if ($temp_count != 0) { echo ','; }
						$color = $color_palettes[$current_color][2][$loop2-2];
					   	if ($loop2-2 == 0) {
							$label = 'Min time';
						} else if ($loop2-2 == 1) {
							$label = 'Av time';
						} else if ($loop2-2 == 2) {
							$label = 'Max time';
						} else if ($loop2-2 == 3) {
							$label = 'Nr of fixation points';
						} else {
							$label = 'test3';
						}
					   	?>{
						label: '<?php echo $label . ' (' . $bar_unique_des[$loop1] . ')'; ?>',
						backgroundColor: color('<?php echo $color; ?>').alpha(0.5).rgbString(),
						borderColor: '<?php echo $color; ?>',
						borderWidth: 1,
						data: [<?php for ($loop3 = 0; $loop3 < count($bar_unique_sti); $loop3++) {
							if ($loop3 != 0) { echo ','; }
							echo $bar_stimuli_stats[$loop3][$loop1][$loop2];
						} ?> ] }<?php
						$temp_count++;
					}
					if ($loop1 != count($bar_stimuli_stats[0])-1) { ?>,{
						   label: 'Split',
						   backgroundColor: color("rgb(201, 203, 207)").alpha(0.5).rgbString(),
						   borderColor: "rgb(201, 203, 207)",
						   borderWidth: 1,
						   data: [<?php for ($loop3 = 0; $loop3 < count($bar_unique_sti); $loop3++) {
							if ($loop3 != 0) { echo ','; }
							echo 0;
						} ?> ] }<?php
																   
					}
					$temp_count++;
				} ?>]
		};

		window.onload = bar_chart_load();
		function bar_chart_load() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myBar = new Chart(ctx, {
				type: 'bar',
				data: barChartData,
				options: option,
			});
		};
		
		var option = {
			responsive: true,
			maintainAspectRatio: false,
		};
		
// 		document.getElementById('randomizeData').addEventListener('click', function() {
// 			var zero = Math.random() < 0.2 ? true : false;
// 			barChartData.datasets.forEach(function(dataset) {
// 				dataset.data = dataset.data.map(function() {
// 					return zero ? 0.0 : randomScalingFactor();
// 				});

// 			});
// 			window.myBar.update();
// 		});

// 		var colorNames = Object.keys(window.chartColors);
// 		document.getElementById('addDataset').addEventListener('click', function() {
// 			var colorName = colorNames[barChartData.datasets.length % colorNames.length];
// 			var dsColor = window.chartColors[colorName];
// 			var newDataset = {
// 				label: 'Dataset ' + (barChartData.datasets.length + 1),
// 				backgroundColor: color(dsColor).alpha(0.5).rgbString(),
// 				borderColor: dsColor,
// 				borderWidth: 1,
// 				data: []
// 			};

// 			for (var index = 0; index < barChartData.labels.length; ++index) {
// 				newDataset.data.push(randomScalingFactor());
// 			}

// 			barChartData.datasets.push(newDataset);
// 			window.myBar.update();
// 		});

// 		document.getElementById('removeDataset').addEventListener('click', function() {
// 			barChartData.datasets.pop();
// 			window.myBar.update();
// 		});

// 		document.getElementById('addBar').addEventListener('click', function() {
// 			if (barChartData.labels.length < <?php echo count($bar_unique_sti); ?>) {
// 				var stimulus = stimuli[barChartData.labels.length % stimuli.length];
// 				barChartData.labels.push(stimulus);

// 				for (var index = 0; index < barChartData.datasets.length; ++index) {
// 					barChartData.datasets[index].data.push(0);
// 				}

// 				window.myBar.update();
// 			}
// 		});

// 		document.getElementById('removeBar').addEventListener('click', function() {
// 			if (barChartData.labels.length > 1) {
// 				barChartData.labels.splice(-1, 1); // remove the label first

// 				barChartData.datasets.forEach(function(dataset) {
// 					dataset.data.pop();
// 				});

// 				window.myBar.update();
// 			}
// 		});
	</script>
	
<?php } ?></div>