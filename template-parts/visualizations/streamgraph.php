<?php global $data_array, $AOI_count, $min_rel, $max_rel, $current_csv_set, $current_stimuli_set, $current_AOI_set, $stimuli_stats, $color_palettes, $current_color, $current_mintim, $current_maxtim; ?>

<script src="<?php bloginfo('template_directory'); ?>/assets/js/streamgraph/d3.v4.js"></script>
<script src="<?php bloginfo('template_directory'); ?>/assets/js/streamgraph/d3-scale-chromatic.v1.min.js"></script>

<div class="vis-streamgraph"><?php if ($current_csv_set && $current_stimuli_set) { ?>
	<div id="my_dataviz"></div>
	<div id="tooltip-sg" class="tooltip-sg"></div>
	<pre id="csv" class="hidden"><?php
	echo 'year';
	for ($x = 0; $x < count($AOI_count[0]); $x++) {
		echo ',AOI' . ($x+1);
	}
	$sg_range = -INF;
	
	for ($t = floor($min_rel/100); $t < floor($max_rel/100); $t++) {
?>

<?php 	echo ($t*100);
		$sg_sum_row = 0;
		for ($x = 0; $x < count($AOI_count[$t]); $x++) {
			echo ',' . $AOI_count[$t][$x];
			$sg_sum_row += $AOI_count[$t][$x];
		}
		$sg_range = max($sg_range, $sg_sum_row);
	} 
	if($sg_range == -INF) {$sg_range = 100;}
	?></pre>

	<script>
		if ( window.location !== window.parent.location ) {
			yipvariableHeight = <?php if (is_page("overview")) { echo "window.innerHeight*0.4"; } else { echo "window.innerHeight - 100"; } ?>;
		} else {
			yipvariableHeight = <?php if (is_page("overview")) { echo "window.innerHeight*0.4 - 26"; } else { echo "window.innerHeight - 150"; } ?>;
		}
		yipvariableWidth = <?php if (is_page("overview")) { echo "window.innerWidth*0.5 - 1"; } else { echo "window.innerWidth - 100"; } ?>;

		// set the dimensions and margins of the graph
		var margin = {top: 20, right: 20, bottom: 50, left: 50},
			width = yipvariableWidth - margin.left - margin.right,
			height = yipvariableHeight - margin.top - margin.bottom;

		// append the svg object to the body of the page
		var svg = d3.select("#my_dataviz")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");

		// Parse the Data
		var data = d3.csvParse(d3.select("#csv").text());

		// List of groups = header of the csv files
		var keys = data.columns.slice(1)

		// Add X axis
		var x = d3.scaleLinear()
		.domain([<?php echo $min_rel; ?>, <?php echo $max_rel; ?>])         // This is what is written on the Axis: from 0 to 100
		.range([0, width]);       // This is where the axis is placed: from 100px to 800px
		svg.append("g")
			.attr("transform", "translate(0,0)")
			.call(d3.axisBottom(x).tickSize(height).tickValues([<?php
				  if(floor($current_maxtim/1000) - floor($current_mintim/1000) >= 1) {
					   for ($t = floor($current_mintim/1000); $t <= floor($current_maxtim/1000); $t += ((floor($current_maxtim/1000) - floor($current_mintim/1000))/10)) {
					  if ($t != floor($current_mintim/1000)) {
						  echo ',';
 					  }
 					  echo $t*1000;
 				  }
				  } else {
					  for ($t = floor($current_mintim/100); $t <= floor($current_maxtim/100); $t += ((floor($current_maxtim/100) - floor($current_mintim/100))/10)) {
					  if ($t != floor($current_mintim/100)) {
						  echo ',';
 					  }
 					  echo $t*100;
				  	}
				  }
			?>]))
			.select(".domain").remove()
		// Customization
		svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

		// Add X axis label:
		svg.append("text")
			.attr("text-anchor", "end")
			.attr("x", width)
			.attr("y", height+30 )
			.text("Timestamp (milliseconds)");

		// Add Y axis
		var y = d3.scaleLinear()
		.domain([-<?php echo $sg_range/2; ?>, <?php echo $sg_range/2; ?>])
		.range([ height, 0 ]);
		svg.append("g")
    		.call(d3.axisLeft(y));

		// Add Y axis label:
		svg.append("text")
			.attr("text-anchor", "end")
			.attr("x", 0)
			.attr("y", -30 )
			.attr("transform", "rotate(-90)")
			.text("Nr. of observers");
		
// 		// Add Y axis label:
// 		svg.append("text")
// 			.attr("text-anchor", "end")
// 			.attr("x", 0)
// 			.attr("y", height+30 )
// 			.text("Intensity");

		// color palette
		var color = d3.scaleOrdinal()
		.domain(keys)
		.range(["<?php echo $color_list = implode('", "', $color_palettes[$current_color][1]); ?>"]);

		//stack the data
		var stackedData = d3.stack()
		.offset(d3.stackOffsetSilhouette)
		.keys(keys)
		(data)

		// Three function that change the tooltip when user hover / move / leave a cell
		var mouseover = function(d,i) {
			d3.selectAll(".myArea").style("opacity", .5)
			d3.select(this)
				.style("stroke", "black")
				.style("opacity", 1)
			document.getElementById("tooltip-sg").classList.add("active");
			//HightlightAOI(this, '<?php echo "AOI". ($x+1); ?>', false);
			HightlightAOI(document.getElementById("heyy"+ i), "AOI" + (i+1), true);
		}
		var mousemove = function(d,i) {
			<?php if ($current_AOI_set) { ?>
				document.getElementById("tooltip-sg").innerHTML = keys[i];
			<?php } else { ?>
				document.getElementById("tooltip-sg").innerHTML = "The full image";
			<?php } ?>
			document.getElementById("tooltip-sg").style.webkitTransform = 'translate(' + (event.clientX + 15) + 'px, ' + (event.clientY + 15) + 'px)';
		}
		var mouseleave = function(d,i) {
			d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none");
			document.getElementById("tooltip-sg").classList.remove("active");
			HightlightAOI(document.getElementById("heyy"+ i), "AOI" + (i+1), false);
		}

		// Area generator
		var area = d3.area()
		.x(function(d) { return x(d.data.year); })
		.y0(function(d) { return y(d[0]); })
		.y1(function(d) { return y(d[1]); })

		// Show the areas
		svg
			.selectAll("mylayers")
			.data(stackedData)
			.enter()
			.append("path")
			.attr("class", "myArea")
			.attr("id", function(d,i) { return keys[i]; })
			.style("fill", function(d) { return color(d.key); })
			.attr("d", area)
			.on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseleave", mouseleave)

</script>
<?php } ?></div>