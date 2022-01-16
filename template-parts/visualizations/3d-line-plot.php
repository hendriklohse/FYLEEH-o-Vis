<?php global $threed_data_array, $stimuliWidth, $stimuliHeight, $threed_max_yas, $threed_min_tim, $threed_max_tim, $threed_min_rel, $threed_max_rel, $stimuliWidth, $stimuliHeight, $stimuliUrl, $current_csv_set, $current_stimuli_set, $imageRatio; ?>

<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/3d-vis/vis-graph3d.js"></script>

<div class="vis-3d"><?php if ($current_csv_set && $current_stimuli_set) { ?>
	<div class="graph" id="mygraph" onmouseout="HeatmapSliderChange(document.getElementById('heatmapSlider').value);"></div>
	<div id="info"></div>

	<script>
		var data = null;
		var graph = null;
		<?php if (is_page("overview")) { ?>
 		var c = document.getElementsByClassName("heatmap-canvas");
		var ctx =  c[0].getContext('2d');
 		ctx.save();
 		<?php } ?>
		
	// Called when the Visualization API is loaded.
	function drawVisualization() {
	  // Create and populate a data table.
		data = new vis.DataSet();
		
		
// 		data.add({ x: 4000, y: 0, z: 0, style: 0, filter: 0 });
// 		data.add({ x: 3500, y: 800, z: 800, style: 0, filter: 0});
// 		data.add({ x: 4000, y: 200, z: 200, style: 0.1, filter: 0.1 });
// 		data.add({ x: 3500, y: 400, z: 400, style: 0.1, filter: 0.1});

		<?php   ?>
		<?php
		//$tStep = ceil(($tMax-$tmin)/10);
		for ($x = 0; $x < count($threed_data_array); $x++) {
			
			?>data.add({ x: <?php echo $threed_data_array[$x][4];  ?>, y: <?php echo $threed_data_array[$x][8]; ?>, z: <?php echo $stimuliHeight - $threed_data_array[$x][5]; ?>});<?php
		}
		?>
	  // x: width, y: time, z: height
	  // specify options
	  var options = {
		width: "100%",
		height: "100%",
		style: "line",
		xStep: <?php echo $stimuliWidth/2; ?>, // width
		yStep: <?php echo $threed_max_tim; ?>, // time
		zStep: <?php echo $stimuliHeight/2; ?>, // height
		xMin: 0,
		xMax: <?php echo $stimuliWidth; ?>,
		yMin: <?php echo $threed_min_rel; ?>, // min time
		yMax: <?php echo $threed_max_rel; ?>, // max time
		zMin: 0,
		zMax: <?php echo $stimuliHeight; ?>,
		xLabel: "Width",
		yLabel: "Time",
		zLabel: "Height",
		xCenter: '50%',
		yCenter: '50%',
		xValueLabel: function (x) { return x+' px'; },
		yValueLabel: function (y) { return ''; },
		zValueLabel: function (z) { return z+' px'; },
		axisFontSize: 40,
		axisFontType: 'arial',
		showPerspective: false,
		rotateAxisLabels: false,
		showGrid: true,
		keepAspectRatio: false,
		verticalRatio: <?php echo $stimuliHeight/$stimuliWidth; ?>,
		animationInterval: 1000, // milliseconds
		animationPreload: false,
		animationAutoStart: true,
		cameraPosition: {
			horizontal: (-1/4)*Math.PI,
			vertical: 0.2,
			distance: 3
	  	},
		tooltip: function (point) {
			stimuliHeight = <?php echo $stimuliHeight; ?>;
			stimuliWidth = <?php echo $stimuliWidth; ?>;
			if ( window.location !== window.parent.location ) {
				yipvariableHeight = <?php if (is_page("overview")) { echo "window.innerHeight*0.6"; } else { echo "window.innerHeight - 100"; } ?>;
				//SwitchCropper();
			} else {
				yipvariableHeight = <?php if (is_page("overview")) { echo "window.innerHeight*0.6 - 26"; } else { echo "window.innerHeight - 150"; } ?>;
			}			
			yipvariableWidth = <?php if (is_page("overview")) { echo "window.innerWidth*0.5 - 1"; } else { echo "window.innerWidth - 100"; } ?>;
			ratioHeight = yipvariableHeight/stimuliHeight;
			ratioWidth = yipvariableWidth/stimuliWidth;

			if (ratioWidth >= ratioHeight) {
				imageWidth = ratioHeight*stimuliWidth;
				imageHeight = ratioHeight*stimuliHeight;
				imageRatio =  ratioHeight;
			} else {
				imageWidth = ratioWidth*stimuliWidth;
				imageHeight = ratioWidth*stimuliHeight;
				imageRatio =  ratioWidth; 
			}
			<?php if  (is_page("overview"))  { ?>
 			HeatmapSliderChange(document.getElementById('heatmapSlider').value);
 			ctx.beginPath();
 			ctx.arc(point.x*imageRatio, (<?php echo $stimuliHeight; ?> - point.z)*imageRatio, 5, 0, 2 * Math.PI);	
 			ctx.stroke();
			<?php } ?>
            return '<div>Time: '+ point.y +' ms</div><div>Width: '+ point.x +' px</div><div>Height: '+ point.z +' px</div>';
        },
        tooltipDelay: 0,
        tooltipStyle: {
            content: {
                background    : 'rgba(255, 255, 255, 0.7)',
                padding       : '10px',
                borderRadius  : '10px'
            },
            line: {
                borderLeft    : '1px dotted rgba(0, 0, 0, 0.5)'
            },
            dot: {
                border        : '5px solid rgba(0, 0, 0, 0.5)'
            },
        },
        dataColor: {
			fill: '#000000',
			stroke: '#000000',
			strokeWidth: 2,
		},
	  };


	  // create our graph
	  var container = document.getElementById("mygraph");
	  graph = new vis.Graph3d(container, data, options);

	  graph.setCameraPosition(0.4, undefined, undefined);
	}
		
// // 	adding IMAGE 

// 	const image = new Image(); 
// 	image.onload = drawImage; // Draw when image has loaded

// 	// Load an image
// 	image.src = '<?php $stimuliUrl ?>';

// 	function drawImage() {
// 	  canvas.width = this.<?php $stimuliWidth ?>;
// 	  canvas.height = this.<?php $stimuliHeight ?>;

// 	  image.drawImage(this, 0, 0, this.width, this.height);
	 

	  
// 	}

	window.addEventListener("load", () => {
	  drawVisualization();
	});
		
		
	

	</script>
<?php } ?>
	
</div>