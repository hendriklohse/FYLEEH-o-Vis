<!-- Test page for testing -->

<div class="testing">
	<div>
		test1 - <?php global $data_array_original; $x = 1; echo $data_array_original[5461][1] . " | " . count($data_array[0]) . " | " . $data_array[$x][8] . " - " . ($data_array[$x][8]+$data_array[$x][3]); ?>
	</div>
	
	<div>
		test2 - 
		<?php global $AOI_count, $current_AOI_set, $AOI, $stimuliWidth, $stimuliHeight, $stimuliUrl; ?>
		<?php  
			echo $AOI_count[0][0];
		?>
		
		<?php if (!$current_AOI_set) {
			$AOI[0][0] = 0;
			$AOI[0][2] = $stimuliWidth;
			$AOI[0][1] = 0;
			$AOI[0][3] = $stimuliHeight;
		}
		echo $AOI[0][0] . " - " . $AOI[0][2] . " - " . $AOI[0][1] . " - " . $AOI[0][3] . " - " . $stimuliUrl;
		?>
		
		
	</div>
	
	<div>
		test3 - 
		
		<!-- shrewing around -->
		<?php global $data_array; $number = 1;
			echo $data_array[$number][0];	//Timestamp
		?> | <?php
			echo $data_array[$number][1];	//StimuliName
		?> | <?php
			echo $data_array[$number][2]; //FixationIndex
		?> | <?php
			echo $data_array[$number][3];	//FixationDuration 		----------
		?> | <?php
			echo $data_array[$number][4];	//MappedFixationPointX 	----------
		?> | <?php
			echo $data_array[$number][5];	//MappedFixationPointY 	----------
		?> | <?php
			echo $data_array[$number][6];	//user
		?> | <?php
			echo $data_array[$number][7];	//description
		?> | <?php
			echo $data_array[$number][8];	//relative time
		?> | <?php
			echo count($data_array)	
		?> 
		
	</div>
	
	<div>
		test4 - 
		<?php global $unique_des;
			print_r($unique_des);	//Timestamp
		?>
	</div>
	
	<div>

		test 5 - 
		<script>
		<?php
			for ($x = 0; $x <= 10; $x++) {
  				?> console.log(" <?php echo "The number is: $x" ?> "); <?php
			} ?>
		
		var ditjedatje = [];
		let ObjectA = {a: 1, b:2};
		
		var HeatMapDataPoints = [
		<?php
			for ($i = 0; $i <= 10; $i++) { ?>
				{x: <?php echo $data_array[$i][4]; ?>, y: <?php echo $data_array[$i][5]; ?>, value: <?php echo $data_array[$i][3]; ?>},
				<?php
			} ?>  ];
			
			
		console.log(HeatMapDataPoints[0]);
 		</script>
	</div>
	
	<div><a href="<?php echo site_url() . '/testpage1/' . $current_parameters; ?>">TestPage1</a> | <a href="<?php echo site_url() . '/testpage2/' . $current_parameters; ?>">TestPage2</a> | <a href="<?php echo site_url() . '/testpage3/' . $current_parameters; ?>">TestPage3</a> | <a href="<?php echo site_url() . '/testpage4/' . $current_parameters; ?>">TestPage4</a></div>
	
	<div>
		<a href="<?php echo site_url(); ?>">reset</a>
	</div>
	
	<div>
		global $upload_url;             // 
	</div>
	<div>
		global $upload_dir;             // 
	</div>
	<div>
		global $current_parameters;     // String with current end url parameters
	</div>
	<div>
		global $current_AOI;            // 
	</div>
	<div>
		global $current_csv;            // 
	</div>
	<div>
		global $current_stimuli;        // 
	</div>
	<div>
		global $current_AOI_set;        // 
	</div>
	<div>
		global $current_csv_set;        // 
	</div>
	<div>
		global $current_stimuli_set;    // 
	</div>
	<div>
		global $AOI;             		// 
	</div>
	<div>
		global $csvUrl;             	// 
	</div>
	<div>
		global $data_array_original;    // 
	</div>
	<div>
		global $stimuliUrl;             // 
	</div>
	<div>
		global $stimuliWidth;           // 
	</div>
	<div>
		global $stimuliHeight;          // 
	</div>
	<div>
		global $data_array;             // 
	</div>
	<div>
		global $results_stim;           // The amount of results after stimuli
	</div>
	<div>
		global $results_AOI;            // The amount of results per AOI
	</div>
	<div>
		global $min_xas;                // 
	</div>
	<div>
		global $max_xas;                // 
	</div>
	<div>
		global $min_yas;                // 
	</div>
	<div>
		global $max_yas;                // 
	</div>
	<div>
		global $min_tim;                // 
	</div>
	<div>
		global $max_tim;                // 
	</div>
	<div>
		global $min_rel;                // 
	</div>
	<div>
		global $max_rel;                // 
	</div>
	<div>
		global $unique_des;             // 
	</div>
	<div>
		global $unique_usr;             // 
	</div>
	<div>
		global $AOI_count;              // 
	</div>
	
	<div class="visualizations">
		<div class="visualization _1">
			<?php //get_template_part('template-parts/visualizations/heatmap'); ?>
		</div>
		<div class="visualization _2">
			<?php //get_template_part('template-parts/visualizations/heatmap'); ?>
		</div>
		<div class="visualization _3">
			<?php //get_template_part('template-parts/visualizations/heatmap'); ?>
		</div>
		<div class="visualization _4">
			<?php //get_template_part('template-parts/visualizations/heatmap'); ?>
		</div>
	</div>
</div>