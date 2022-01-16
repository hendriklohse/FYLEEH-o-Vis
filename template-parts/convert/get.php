<?php

// Make values global
global $upload_url;             // 
global $upload_dir;             // 
global $current_parameters;     // String with current end url parameters
global $current_csv_set;        // get if stimuli is set
global $current_csv;            // 
global $current_stimuli_set;    // get if stimuli is set
global $current_stimuli;        // get current stimuli
global $current_usr_set;        // get if user is set
global $current_usr;            // get current user
global $current_des_set;        // get if description is set
global $current_des;            // get current description
global $current_color_set;      // get if description is set
global $current_color;          // get current description
global $current_AOI_set;        // get if AOI is set
global $current_AOI;            // get AOI
global $current_comparison_set; // get if AOI is set
global $current_comparison;     // get AOI
global $current_compare;        // get AOI
global $current_bar_sti_set;    // get if AOI is set
global $current_hmmin;          // get min for the heatmap value
global $current_hmmin_set;      // get if set min for the heatmap value
global $current_hmmax;			// get max for the heatmap value
global $current_hmmax_set;		// get if set max for the heatmap value
global $current_hmsensitivity;	// get sensitivity for the heatmap value
global $current_hmsensitivity_set; // get if set sensitivity for the heatmap value
global $current_hmopacity;		// get opacity for the heatmap value
global $current_hmopacity_set;	// get if set opacity for the heatmap value


global $current_bar_sti;        // get AOI
global $bar_sti_array;          // get the array AOI[][]
global $AOI_array;                    // get the array AOI[][]
global $AOI;                    // get the array AOI[][]
global $current_mintim_set;     // get if min time is set
global $current_mintim;         // get min time
global $current_maxtim_set;     // get if max time is set
global $current_maxtim;         // get max time
global $csvUrl;             	// 
global $data_array_original;    // 
global $stimuliUrl;             // 
global $stimuliWidth;           // 
global $stimuliHeight;          // 
global $stimuli_files;          // 
global $files;  	        	//  
global $ratioWidth;  	        //  
global $imageRatio;  	        //  
global $imageWidth;  	        //  
global $imageHeight;  	        // 
global $yipvariableWidth;  	    // 
global $yipvariableHeight;  	//  
global $temp_test;              // Temporary test
global $color_palettes;			// Color palette array
global $filenameprefix;			// Color palette array

// Get values
global $min_dur;
global $max_dur;

// Initialization
$upload_url = wp_upload_dir()['baseurl'];
$upload_dir = wp_upload_dir()['basedir'];
$current_parameters = '';
if (is_user_logged_in()) {
	$filenameprefix = wp_get_current_user()->user_login . '-';
} else {
	$filenameprefix = 'global-';
}

// Get parameter
$current_comparison = $_COOKIE['compare'];
if (empty($_GET['bar_sti'])) {
	$current_bar_sti = $_COOKIE['bar_sti'];
} else {
	$current_bar_sti = $_GET['bar_sti'];
}
if (empty($_GET['aoi'])) {
	$current_AOI = $_COOKIE['aoi'];
} else {$current_AOI = $_GET['aoi'];
	   }
if (empty($_GET['csv'])) {
	$current_csv = $_COOKIE['csv'];
} else {
	$current_csv = $_GET['csv'];
}
if (empty($_GET['stimuli'])) {
	$current_stimuli = $_COOKIE['stimuli'];
} else {
	$current_stimuli = $_GET['stimuli'];
}
if (empty($_GET['user'])) {
	$current_usr = $_COOKIE['user'];
} else {
	$current_usr = $_GET['user'];
}
if (empty($_GET['desc'])) {
	$current_des = $_COOKIE['desc'];
} else {
	$current_des = $_GET['desc'];
}
if (empty($_GET['color'])) {
	$current_color = $_COOKIE['color'];
} else {
	$current_color = $_GET['color'];
}
if (empty($_GET['maxtim'])) {
	$current_maxtim = $_COOKIE['maxtim'];
} else {
	$current_maxtim = $_GET['maxtim'];
}
if (empty($_GET['mintim'])) {
	$current_mintim = $_COOKIE['mintim'];
} else {
	$current_mintim = $_GET['mintim'];
}
if (empty($_GET['mintim'])) {
	$current_mintim = $_COOKIE['mintim'];
} else {
	$current_mintim = $_GET['mintim'];
}
if (empty($_GET['hmmin'])) {
	$current_hmmin = $_COOKIE['hmmin'];
} else {
	$current_hmmin = $_GET['hmmin'];
}

if (empty($_GET['hmmax'])) {
	$current_hmmax = $_COOKIE['hmmax'];
} else {
	$current_hmmax = $_GET['hmmax'];
}
if (empty($_GET['hmsensitivity'])) {
	$current_hmsensitivity = $_COOKIE['hmsensitivity'];
} else {
	$current_hmsensitivity = $_GET['hmsensitivity'];
}
if (empty($_GET['hmopacity'])) {
	$current_hmopacity = $_COOKIE['hmopacity'];
} else {
	$current_hmopacity = $_GET['hmopacity'];
}


// Check if parameter is set
$current_comparison_set = !empty($current_comparison);
$current_bar_sti_set = !empty($current_bar_sti);
$current_AOI_set = !empty($current_AOI);
$current_csv_set = !empty($current_csv);
$current_stimuli_set = !empty($current_stimuli);
$current_usr_set = !empty($current_usr);
$current_des_set = !empty($current_des);
$current_color_set = !empty($current_color);
$current_maxtim_set = !empty($current_maxtim);
$current_mintim_set = !empty($current_mintim);
$current_hmmin_set = !empty($current_hmmin);

$current_hmmax_set = !empty($current_hmmax);
$current_hmsensitivity_set = !empty($current_hmsensitivity);
$current_hmopacity_set = !empty($current_hmopacity);

// color palette array
$color_palettes = array(
	
	//pallette #0
	array(
		array("rgb(203, 39, 58)", 	"rgb(228,149,39)", "rgb(22,92,115)"), // heatmap
		array("rgb(22, 92, 115)", 	"rgb(136, 199, 217)",	"rgb(125, 42, 126)",	"rgb(228, 149, 39)",	"rgb(203, 39, 58)",		"rgb(239, 141, 141)",	"rgb(48, 184, 166)"), // streamgraph
		array("rgb(203, 39, 58)", 	"rgb(136, 199, 217)",	"rgb(125, 42, 126)",	"rgb(228, 149, 39)"), // bar-chart
		array("Standard"), // Name
	),
	
	//pallette #1
	array(
		array("rgb(136,34,85)", 	"rgb(204,102,119)", "rgb(68,170,153)"), // heatmap
		array("rgb(136, 204, 238)", "rgb(68, 170, 153)",	"rgb(17, 119, 51)",		"rgb(51, 34, 136)", 	"rgb(221, 204, 119)",	"rgb(204, 102, 119)",	"rgb(136, 34, 85)"), // streamgraph
		array("rgb(68, 170, 153)", 	"rgb(51, 34, 136)",     "rgb(221, 204, 119)",   "rgb(136, 34, 85)"), // bar-chart
		array("Muted"), // Name
	),
	
	//pallette #2
	array(
		array("rgb(88,53,94)", 	"rgb(204,213,255)", "rgb(86,180,233)"), // heatmap
		array("rgb(88, 53, 94)", 	"rgb(86, 180, 233)", 	"rgb(0, 158, 115)",		"rgb(204, 213, 255)",	"rgb(0, 114, 178)",		"rgb(83, 221, 108)",		"rgb(166, 130, 255)"), // streamgraph
		array("rgb(230, 159, 0)", 	"rgb(86, 180, 233)", 	"rgb(0, 158, 115)",		"rgb(240, 228, 130)"), // bar-chart
		array("Cold"), // Name
	),
	
	//pallette #3
	array(
		array("rgb(251,54,64)", 	"rgb(68,119,170)", 	"rgb(102,204,238)"), // heatmap
		array("rgb(238, 102, 119)", "rgb(10, 16, 69)",		"rgb(68, 119, 170)",	"rgb(251, 54, 64)",		"rgb(102, 204, 238)",	"rgb(170, 51, 119)",	"rgb(172, 243, 157)"), // streamgraph
		array("rgb(238, 102, 119)", "rgb(102, 204, 238)",	"rgb(170, 51, 119)",	"rgb(68, 119, 170)"), // bar-chart
		array("Bright"), // Name
	),
	
	//pallette #4
	array(
		array("rgb(68,187,153)", 	"rgb(169,221,136)", "rgb(119,170,221)"), // heatmap
		array("rgb(187, 204, 51)", 	"rgb(119, 170, 221)", 	"rgb(238, 136, 102)", 	"rgb(169, 221, 136)", 	"rgb(255, 170, 187)", 	"rgb(153, 221, 255)", 	"rgb(68, 187, 153)"), // streamgraph
		array("rgb(187, 204, 51)", 	"rgb(119, 170, 221)", 	"rgb(238, 136, 102)", 	"rgb(169, 221, 136)"), // bar-chart
		array("Light"), // Name
	)
);

// Form string to array
$AOI_array = explode('_', $current_AOI);
for ($loop_1 = 0; $loop_1 < count($AOI_array); $loop_1++) {
	$AOI[$loop_1] = explode('-', $AOI_array[$loop_1]);
}
$bar_sti_array = explode(',', $current_bar_sti);
$current_compare = explode(',', $current_comparison);

// If stimuli is set make varibles
if ($current_stimuli_set) {
	$stimuliUrl = $upload_url . '/stimuli/' . $filenameprefix . $current_stimuli;
	if ($current_des == "gray" && $current_stimuli[2] != "b") {
		$stimuliUrl = $upload_url . '/stimuli/' . $filenameprefix . substr_replace($current_stimuli, "b", strpos($current_stimuli,"_"), 0);
	}
	$stimuliWidth = getimagesize($stimuliUrl)[0];
	$stimuliHeight = getimagesize($stimuliUrl)[1];
}

// If value is not set, set standard
if (!$current_color_set) {
	$current_color = 0;
}
if (!$current_maxtim_set) {
	$current_maxtim = 100000;
}
if (!$current_mintim_set) {
	$current_mintim = 0;
}


// Get all stimuli in folder
$file_count = 0;
foreach (glob($upload_dir . '/stimuli/' . $filenameprefix . '*') as $file) {
	$files[$file_count] = end(explode("/",$file));
	$file_count++;
}

// Create automatic the end of the url with parameters
$current_param[0] = $current_csv;		// 1
$current_param[1] = $current_stimuli;	// 2
$current_param[2] = $current_AOI;		// 3
$current_param[3] = $current_usr;		// 4
$current_param[4] = $current_des;		// 5
$current_param[5] = $current_color;		// 6

$current_param[6] = 'csv=';				// <1
$current_param[7] = 'stimuli=';			// <2
$current_param[8] = 'aoi=';				// <3
$current_param[9] = 'user=';			// <4
$current_param[10] = 'desc=';			// <5
$current_param[11] = 'color=';			// <6

$count_param = 0; for ($p = 0; $p < count($current_param)/2; $p++) {
	if (!empty($current_param[$p])) {
		if ($count_param == 0) {
			$split = '?';
		} else {
			$split = '&';
		}
		$current_parameters = $current_parameters . $split . $current_param[$p+6] . $current_param[$p];
		$count_param++;
	}
}

// calculations by Frank and Latisha
$yipvariableWidth = 1920;
$yipvariableHeight = 1080;

$ratioHeight = $yipvariableHeight/$stimuliHeight;
$ratioWidth = $yipvariableWidth/$stimuliWidth;
$imageRatio = 0;

$imageWidth = 1000;
$imageHeight = 1000;

if ($ratioWidth >= $ratioHeight) {
	$imageWidth = $ratioHeight*$stimuliWidth;
	$imageHeight = $ratioHeight*$stimuliHeight;
	$imageRatio =  $ratioHeight;
} else {
	$imageWidth = $ratioWidth*$stimuliWidth;
	$imageHeight = $ratioWidth*$stimuliHeight;
	$imageRatio =  $ratioWidth; 
}

// If csv is set make varibles and do filter
if ($current_csv_set) {
	$csvUrl = $upload_url . '/csv/' . $current_csv . '.csv';
	$csvFile = file($csvUrl);
	
	for ($loop_1 = 0; $loop_1 < count($csvFile); $loop_1++) {
		$words = str_getcsv($csvFile[$loop_1], "\t");
		for ($loop_2 = 0; $loop_2 < count($words); $loop_2++) {
			$data_array_original[$loop_1][$loop_2] = utf8_encode($words[$loop_2]);
		}
	}
	
	get_template_part('template-parts/convert/filter');
	
	if (!$current_hmmin_set) {
		$current_hmmin = $min_dur;
	}
	if (!$current_hmmax_set) {
		$current_hmmax = $max_dur*10;
	}
	if (!$current_hmsensitivity_set) {
		$current_hmsensitivity = $max_dur*10/8;
	}
	if (!$current_hmopacity_set) {
		$current_hmopacity = 0.8;
	}
}

?>