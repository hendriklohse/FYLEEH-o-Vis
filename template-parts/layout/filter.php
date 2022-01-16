<?php global $stimuliUrl, $stimuliWidth, $stimuliHeight, $current_stimuli_set, $current_csv_set, $current_stimuli, $current_csv, $current_AOI, $current_usr, $current_des, $current_AOI_set, $current_color_set, $current_parameters, $imageRatio, $min_dur, $max_dur, $bar_unique_sti, $bar_sti_array, $unique_sti_all, $current_bar_sti_set, $current_compare, $current_comparison_set, $current_maxtim, $current_mintim, $AOI_array, $current_AOI, $current_hmmin, $current_hmmax, $current_hmopacity, $current_hmsensitivity;

$current_param_aoi[0] = $current_csv;		// 1
$current_param_aoi[1] = $current_stimuli;	// 2
$current_param_aoi[2] = $current_usr;		// 4
$current_param_aoi[3] = $current_des;		// 5

$current_param_aoi[4] = 'csv=';				// <1
$current_param_aoi[5] = 'stimuli=';			// <2
$current_param_aoi[6] = 'user=';				// <3
$current_param_aoi[7] = 'desc=';				// <3

$count_param_aoi = 0; for ($p = 0; $p < count($current_param_aoi)/2; $p++) {
	if (!empty($current_param_aoi[$p])) {
		if ($count_param_aoi == 0) {
			$split = '?';
		} else if ($count_param_aoi < (count($current_param_aoi)/2)-1) {
			$split = '&';
		} else {
			$split = '';
		}
		$current_params_aoi = $current_params_aoi . $split . $current_param_aoi[$p+4] . $current_param_aoi[$p];
		$count_param_aoi++;
	}
}

?>
<div id="yiisubheader" class="subheader">
	<div class="filter">
		<div class="title">
			General
		</div>
		<hr>
		<div class="content">
			<div class="button _1" title="Reset all filters" onclick="ClearCookie('csv,stimuli')">Reset configuration</div>
			<?php if (!is_page("3d-line-plot")) { ?>
			<div class="dropdown">
				<div class="label">Color</div>
				<?php get_template_part('template-parts/select/color'); ?>
			</div>
			<?php } ?>
			<div class="dropdown">
				<div class="label">Person</div>
				<?php get_template_part('template-parts/select/person'); ?>
			</div>
			<div class="dropdown">
				<div class="label">Description</div>
				<?php get_template_part('template-parts/select/document'); ?>
			</div>
			<div class="input">
				<div class="label">Min time</div>
            	<input type="number" id="general-min-tim" value="<?php echo $current_mintim;?>" onchange="GeneralChangeMinTim()">
			
			</div>
			<div class="input">
				<div class="label">Max time</div>
            	<input type="number" id="general-max-tim" value="<?php echo $current_maxtim;?>" onchange="GeneralChangeMaxTim()">
			</div>
			<script>
				function GeneralChangeMinTim() {
					if (parseInt(document.getElementById('general-max-tim').value) < parseInt(document.getElementById('general-min-tim').value)) {
						document.getElementById('general-min-tim').value = parseInt(document.getElementById('general-max-tim').value) - 1000;
						
					}
					if (parseInt(document.getElementById('general-max-tim').value) < (parseInt(document.getElementById('general-min-tim').value) + 1000)) {
						document.getElementById('general-min-tim').value = parseInt(document.getElementById('general-max-tim').value) - 1000;
					}
					SetCookie('mintim',document.getElementById('general-min-tim').value)
				}
				function GeneralChangeMaxTim() {
					if (parseInt(document.getElementById('general-min-tim').value) > parseInt(document.getElementById('general-max-tim').value)) {
						document.getElementById('general-max-tim').value = parseInt(document.getElementById('general-min-tim').value) + 1000;
						
					}
					if (parseInt(document.getElementById('general-min-tim').value) > (parseInt(document.getElementById('general-max-tim').value) - 1000)) {
						document.getElementById('general-max-tim').value = parseInt(document.getElementById('general-min-tim').value) + 1000;
					}
					SetCookie('maxtim',document.getElementById('general-max-tim').value)
				}
			</script>
		</div>
	</div>
	<?php if (is_page("heatmap") || is_page("overview")) { ?>
		<div class="filter">
			<div class="title">
				Heatmap
			</div>
			<hr>
			<div class="content">
 				<div class="button _2" title="Show cumulative of heatmap" id="aoiSwitch" onclick="SwitchCropper()">Tooltip</div>
				<button class="button _2" title="Reset all selected areas of interest" id="aoiReset">Reset AOI</button>
				<div class="labelsubsection">Sensitivity:</div>
				<div class="input">
					<div class="label">Range Min</div>
					<input type="number" value="<?php echo $current_hmmin; ?>" onchange="HeatmapChangeMinRan()" id="heatmapMinVal">
				</div>
				<div class="input">
					<div class="label">Range Max</div>
					<input type="number" value="<?php echo $current_hmmax; ?>" onchange="HeatmapChangeMaxRan()" id="heatmapMaxVal">

					
				</div>
<!-- 				<div class="input"> -->
<!-- 					<div class="label">Currently</div>
					<input type="number" value="<?php //echo $max_dur; ?>" onchange="HeatmapChange(this.value)" id="heatmapCurrentVal">
				</div> -->
				<script>
				function HeatmapChangeMinRan() {
					if (parseInt(document.getElementById('heatmapMaxVal').value) < parseInt(document.getElementById('heatmapMinVal').value)) {
						document.getElementById('heatmapMinVal').value = parseInt(document.getElementById('heatmapMaxVal').value) - 500;
						
					}
					if (parseInt(document.getElementById('heatmapMaxVal').value) < (parseInt(document.getElementById('heatmapMinVal').value) + 1000)) {
						document.getElementById('heatmapMinVal').value = parseInt(document.getElementById('heatmapMaxVal').value) - 500;
					}
					SetCookie('hmmin',document.getElementById('heatmapMinVal').value);
				}
				function HeatmapChangeMaxRan() {
					if (parseInt(document.getElementById('heatmapMinVal').value) > parseInt(document.getElementById('heatmapMaxVal').value)) {
						document.getElementById('heatmapMaxVal').value = parseInt(document.getElementById('heatmapMinVal').value) + 500;
						
					}
					if (parseInt(document.getElementById('heatmapMinVal').value) > (parseInt(document.getElementById('heatmapMaxVal').value) - 1000)) {
						document.getElementById('heatmapMaxVal').value = parseInt(document.getElementById('heatmapMinVal').value) + 500;
					}
					SetCookie('hmmax',document.getElementById('heatmapMaxVal').value);
				}
			</script>
				<input type="range" min="<?php echo $current_hmmin; ?>" max="<?php echo $current_hmmax; ?>" value="<?php echo $current_hmsensitivity; ?>" id="heatmapSlider" oninput="HeatmapSliderChange(this.value); SetCookie('hmsensitivity',this.value)" step="1">
				
				<div class="labelsubsection">Opacity:</div>	
				<input type="range" min="0" max="1" value="<?php echo $current_hmopacity; ?>" id="heatmapOpacitySlider" oninput="HeatmapSliderOpacityChange(this.value); SetCookie('hmopacity',this.value)" step="0.01">
			</div>		
		
		</div>
	<?php } if (is_page("streamgraph") || is_page("overview") || is_page("heatmap")) { ?>
		<div class="filter">
		<div class="title">
			List of AOIs
		</div>
		<hr>
		<div class="content">			
			<div class="list">
				<?php if ($current_AOI_set) { for($i = 0; $i < count($AOI_array) ; $i++) { ?>
				<div class="aoilist item active aoi_active" onclick="selectAoi(this)" onmouseover="			HightlightAOI(document.getElementById('heyy'+ <?php echo $i; ?>), 'AOI' + (<?php echo ($i+1); ?>), true)" onmouseout ="HightlightAOI(document.getElementById('heyy'+ <?php echo $i; ?>), 'AOI' + (<?php echo ($i+1); ?>), false)"><a area="<?php echo $AOI_array[$i]; ?>"><div>AOI&nbsp;</div><?php echo "AOI "+ ($i+1); ?></a></div>
				<?php } } ?>

				<script>					
					function selectAoi(element) {
						if (element.classList.contains('aoi_active')) {
							element.classList.remove('aoi_active');
							element.classList.remove('active');
						} else {
							element.classList.add('aoi_active');
							element.classList.add('active');
						}
						setAoi();
					}

					function setAoi() {
						var aoi_cookie = "";
						var stimuli = document.getElementsByClassName("aoi_active");
						for (var i = 0; i < stimuli.length; i++) {
							if(i != 0) {
								aoi_cookie += "_";
							} 
							aoi_cookie += stimuli.item(i).childNodes[0].getAttribute("area");	
						}
						SetCookie("aoi", aoi_cookie);
					}
				</script>
			</div>
			
			<script>
				function aoi_select() {
					var stim = $('img#stimulus').selectAreas('relativeAreas');
					//console.log(stim);
					if (stim.length != 0) {
						var aois = '';
						for (var loop1 = 0; loop1 < stim.length; loop1++) {
							split = '_';
							if (loop1 == 0) {
								split = '';
							}
							aois += split + stim[loop1].x + '-' + stim[loop1].y + '-' + (stim[loop1].x+stim[loop1].width) + '-' + (stim[loop1].y+stim[loop1].height);
						}
						//console.log(aois);
						SetCookie("aoi", aois);
					} else {
						console.log('none selected');
						SetCookie('aoi', '');
					}
				}
			</script>
		</div>
	</div>
	
	<?php } if (is_page("streamgraph") || is_page("overview")) { ?>
<!-- 		<div class="filter">
			<div class="title">
				Streamgraph
			</div>
			<hr>
			<div class="content">
				
			</div>
		</div> -->
	<?php } if (is_page("3d-line-plot") || is_page("overview")) { ?>
<!-- 		<div class="filter">
			<div class="title">
				3D line plot
			</div>
			<hr>
			<div class="content">
				
			</div>
		</div> -->
	<?php } if (is_page("bar-chart") || is_page("overview")) { ?>
		<div class="filter" id="bar-chart-filter">
			<div class="title">
				Bar chart
			</div>
			<hr>
			<div class="content">
				<button class="button _2" onclick="bar_sti_select(true)">Select all</button>
				<button class="button _2" onclick="bar_sti_select(false)">Deselect all</button>
				<div class="list">
					<?php for($i = 0; $i < count($unique_sti_all) ; $i++) { ?>
						<div class="stimulus item<?php if(in_array($unique_sti_all[$i],$bar_sti_array)) {echo " bar_active active";} ?>" onclick="selectSti(this)"><a image="<?php echo $unique_sti_all[$i]; ?>"><?php echo explode(".",$unique_sti_all[$i])[0]; ?></a></div>
					<?php } ?>

					<script>
					function bar_sti_select(bool) {
						var stimuli = document.getElementById('bar-chart-filter').getElementsByClassName('stimulus');
						for (var i = 0; i < stimuli.length; i++) {
							if (bool) {
								stimuli.item(i).classList.add('bar_active');
								stimuli.item(i).classList.add('active');
							} else {
								stimuli.item(i).classList.remove('bar_active');
								stimuli.item(i).classList.remove('active');
							}
						}
						setSti();
					}
						
					function selectSti(element) {
						if (element.classList.contains('bar_active')) {
							element.classList.remove('bar_active');
							element.classList.remove('active');
						} else {
							element.classList.add('bar_active');
							element.classList.add('active');
						}
						setSti();
					}

					function setSti() {
						var bar_sti_cookie = "";
						var stimuli = document.getElementsByClassName("bar_active");
						for (var i = 0; i < stimuli.length; i++) {
							if(i != 0) {
								bar_sti_cookie += ",";
							} 
							bar_sti_cookie += stimuli.item(i).childNodes[0].getAttribute("image");
						}
						SetCookie("bar_sti", bar_sti_cookie);
					}
					</script>
				</div>
			</div>
		</div>
	<?php } ?>
	<div class="filter">
		<div class="title">
			Comparison
		</div>
		<hr>
		<div class="content">
			<?php if (is_page("heatmap") || is_page("bar-chart") || is_page("3d-line-plot") || is_page("streamgraph")) { ?>
				<div class="button<?php if(count($current_compare) > 3) { echo " disabled"; } ?>" onclick="SetCookie('compare','<?php
					if (!empty($_COOKIE['compare'])) { echo $_COOKIE['compare'] . ","; } 
						echo get_permalink() . $current_parameters;
				?>')">Add view to Comparison</div>
			<?php } ?>
			<div class="list">
				<?php if ($current_comparison_set) { for($loop2 = 0; $loop2 < count($current_compare) ; $loop2++) { ?>
					<div class="comparison item comparison_active active" onclick="selectComparison(this)"><a href="<?php echo $current_compare[$loop2];?>"><?php echo "View " . ($loop2+1); ?></a></div>
				<?php } } ?>
				<script>
					function selectComparison(element) {
						if (element.classList.contains('comparison_active')) {
							element.classList.remove('comparison_active');
							element.classList.remove('active');
						} else {
							element.classList.add('comparison_active');
							element.classList.add('active');
						}
						setComparison();
					}

					function setComparison() {
						var comparison_sti_cookie = "";
						var comp = document.getElementsByClassName("comparison_active");
						for (var loop2 = 0; loop2 < comp.length; loop2++) {
							if(loop2 != 0) {
								comparison_sti_cookie += ",";
							} comp
							comparison_sti_cookie += comp.item(loop2).childNodes[0].getAttribute("href");	
						}
						SetCookie("compare", comparison_sti_cookie);
					}
				</script>
			</div>
			<button class="button _comparisonpage" onclick="location.href='<?php echo site_url() . '/compare/'; ?>';">Go to Comparison page</button>
		</div>
		
	</div>
</div>


