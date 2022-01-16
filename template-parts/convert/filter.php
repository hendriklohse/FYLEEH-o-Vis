<?php

// Get global values
global $data_array_original;    // get original data
global $current_csv_set;        // get if stimuli is set
global $current_stimuli_set;    // get if stimuli is set
global $current_stimuli;        // get current stimuli
global $current_usr_set;        // get if user is set
global $current_usr;            // get current user
global $current_des_set;        // get if description is set
global $current_des;            // get current description
global $current_AOI_set;        // get if AOI is set
global $current_bar_sti_set;	// get if stimuli are selected
global $AOI;                    // get the array AOI[][]
global $current_mintim;         // get min time
global $current_maxtim;         // get max time
global $stimuliWidth;           // get the stimuliWidth
global $stimuliHeight;          // get the stimuliHeight
global $filenameprefix;         // get the stimuliHeight

// Make values global
global $data_array;             // 
global $results_stim;           // The amount of results after stimuli
global $results_AOI;            // The amount of results per AOI
global $min_xas;                // 
global $max_xas;                // 
global $min_yas;                // 
global $max_yas;                // 
global $min_tim;                // 
global $max_tim;                // 
global $min_rel;                // 
global $max_rel;                // 
global $min_dur;                // 
global $max_dur;                // 
global $unique_des;             // 
global $unique_des_all;         // 
global $unique_usr;             // 
global $unique_usr_all;         // 
global $unique_sti;             // 
global $unique_sti_all;         // 
global $AOI_count;              // 
global $av_tim;                 // 
global $temp_test;              // Temporary test
global $selected_sti;			// list of selected stimuli from input user
global $bar_sti_array;			//

//##############
global $bar_unique_sti;
global $bar_unique_des;
global $bar_data_array;
global $bar_stimuli_stats;		// [stimuli.number][description.number][av_time/number of trials/average]
//##############

global $threed_data_array; //data array for the 3d visualiztion (aka not filtered on user)
global $threed_results_stim;           // The amount of results after stimuli
global $threed_results_AOI;            // The amount of results per AOI
global $threed_min_xas;                // 
global $threed_max_xas;                // 
global $threed_min_yas;                // 
global $threed_max_yas;                // 
global $threed_min_tim;                // 
global $threed_max_tim;                // 
global $threed_min_rel;                // 
global $threed_max_rel;                // 
global $threed_min_dur;                // 
global $threed_max_dur;                // 
global $threed_unique_des;             // 
global $threed_unique_des_all;         // 
global $threed_unique_usr;             // 
global $threed_unique_usr_all;         // 
global $threed_unique_sti;             // 
global $threed_unique_sti_all;			//

	
$threed_results_stim = 0;
$threed_unique_des_count = 0;
$threed_unique_usr_count = 0;
$threed_unique_sti_count = 0;
$threed_tot_tim_count = 0;
$threed_tot_tim = 0;

$threed_tem_tim = INF;

$threed_min_xas = INF;
$threed_max_xas = -INF;

$threed_min_yas = INF;
$threed_max_yas = -INF;

$threed_min_tim = INF;
$threed_max_tim = -INF;

$threed_min_rel = INF;
$threed_max_rel = -INF;

$threed_min_dur = INF;
$threed_max_dur = -INF;

if (!$threed_current_AOI_set) {
    $threed_AOI[0][0] = 0;
    $threed_AOI[0][2] = $stimuliWidth;
    $threed_AOI[0][1] = 0;
    $threed_AOI[0][3] = $stimuliHeight;
}

// initialization
$results_stim = 0;
$unique_des_count = 0;
$unique_usr_count = 0;
$unique_sti_count = 0;
$tot_tim_count = 0;
$tot_tim = 0;

$tem_tim = INF;

$min_xas = INF;
$max_xas = -INF;

$min_yas = INF;
$max_yas = -INF;

$min_tim = INF;
$max_tim = -INF;

$min_rel = INF;
$max_rel = -INF;

$min_dur = INF;
$max_dur = -INF;



if (!$current_AOI_set) {
    $AOI[0][0] = 0;
    $AOI[0][2] = $stimuliWidth;
    $AOI[0][1] = 0;
    $AOI[0][3] = $stimuliHeight;
}

// Loop over the original data
for ($loop_1 = 1; $loop_1 < count($data_array_original); $loop_1++) { // Start at 1 = skip first row with titles
    
    $cur_row = $data_array_original[$loop_1];
    $cur_tim = $cur_row[0]; // Timestamp
	$cur_sti = $cur_row[1]; // StimuliName
	$cur_fix = $cur_row[2]; // FixationIndex
	$cur_dur = $cur_row[3]; // FixationDuration
	$cur_xas = $cur_row[4]; // MappedFixationPointX
	$cur_yas = $cur_row[5]; // MappedFixationPointY
	$cur_usr = $cur_row[6]; // user
    $cur_des = $cur_row[7]; // description

	if ($data_array_original[$loop_1-1][1] != $cur_sti || $data_array_original[$loop_1-1][6] != $cur_usr) { // if previous had different stimuli or person then set start point
		// creating an array with the different users
		if (!in_array($cur_usr, $unique_usr_all)) {
			$unique_usr_all[$unique_usr_all_count] = $cur_usr;
			$unique_usr_all_count++;
		}

		// creating an array with the different descriptions
		if (!in_array($cur_des, $unique_des_all)) {
			$unique_des_all[$unique_des_all_count] = $cur_des;
			$unique_des_all_count++;
		}

		// creating an array with the different stimuli
		if (!in_array($cur_sti, $unique_sti_all)) {
			$unique_sti_all[$unique_sti_all_count] = $cur_sti;
			$unique_sti_all_count++;
		}
	}
	
	// Create new relative value
	if ($data_array_original[$loop_1-1][1] != $cur_sti || $data_array_original[$loop_1-1][6] != $cur_usr) { // if previous had different stimuli or person then set start point
		$t_start = $cur_tim;
		$cur_rel = 0;
		$fix_start = $cur_fix;
		$fix_rel = 0;
	} else {
		$cur_rel = $cur_tim - $t_start;
		$fix_rel = $cur_fix - $fix_start;
	}
    
    if ((!$current_stimuli_set || $cur_sti == $current_stimuli) && $cur_rel <= $current_maxtim && $cur_rel >= $current_mintim) { // Filter 1 = Stimuli *&& $results_stim < 14*
    
    	if ((!$current_usr_set || $cur_usr == $current_usr)) { // Filter 2 = User
    
			if ((!$current_des_set || $cur_des == $current_des)) { // Filter 3 = description

				for ($loop_2 = 0; $loop_2 < count($AOI); $loop_2++) {

					if (!$current_AOI_set || ($cur_xas >= $AOI[$loop_2][0] && $cur_xas <= $AOI[$loop_2][2] && $cur_yas >= $AOI[$loop_2][1] && $cur_yas <= $AOI[$loop_2][3])) { // Filter 4 = AOI

						if ($cur_tim != $tem_tim) { // Make resulting array unique

							// set the unique array and the resulting unique array
							$tem_tim = $cur_tim;

							// Create new relative value / this is the trial
							if ($data_array[$results_stim-1][1] != $cur_sti || $data_array[$results_stim-1][6] != $cur_usr) { // if previous had different stimuli or person then set start point
								// creating an array with the different users
								if (!in_array($cur_usr, $unique_usr)) {
									$unique_usr[$unique_usr_count] = $cur_usr;
									$unique_usr_count++;
								}

								// creating an array with the different descriptions
								if (!in_array($cur_des, $unique_des)) {
									$unique_des[$unique_des_count] = $cur_des;
									$unique_des_count++;
								}

								// creating an array with the different stimuli
								if (!in_array($cur_sti, $unique_sti)) {
									$unique_sti[$unique_sti_count] = $cur_sti;
									$unique_sti_count++;
								}
							}

							// set min and max values
							$min_xas = min($cur_xas,$min_xas);
							$max_xas = max($cur_xas,$max_xas);

							$min_yas = min($cur_yas,$min_yas);
							$max_yas = max($cur_yas,$max_yas);

							$min_tim = min($cur_tim,$min_tim);
							$max_tim = max($cur_tim,$max_tim);

							$min_rel = min($cur_rel,$min_rel);
							$max_rel = max($cur_rel,$max_rel);

							$min_dur = min($cur_dur,$min_dur);
							$max_dur = max($cur_dur,$max_dur);

							$data_array[$results_stim] = $cur_row;

							$data_array[$results_stim][count($data_array[$results_stim])] = $cur_rel; // last row will be containing the relative time

							$results_stim++;
						}

					}

				}
				
			}
			
		}
			
    }

}



// sort arrays
sort($unique_sti);
sort($unique_sti_all); // usort($unique_sti_all, SORTNUMERIC);
sort($unique_des);
usort($unique_usr, function ($a, $b){
	return preg_replace('/\D/', '', $a) - preg_replace('/\D/', '', $b);
});

//################################################################################################

$bar_results_stim = 0;
$bar_unique_des_count = 0;
$bar_unique_sti_count = 0;

$bar_tem_tim = INF;

$bar_min_xas = INF;
$bar_max_xas = -INF;

$bar_min_yas = INF;
$bar_max_yas = -INF;

$bar_min_tim = INF;
$bar_max_tim = -INF;

$bar_min_rel = INF;
$bar_max_rel = -INF;

$bar_min_dur = INF;
$bar_max_dur = -INF;

// Loop over the original data
for ($loop_1 = 1; $loop_1 < count($data_array_original); $loop_1++) { // Start at 1 = skip first row with titles
    
    $bar_cur_row = $data_array_original[$loop_1];
    $bar_cur_tim = $bar_cur_row[0]; // Timestamp
	$bar_cur_sti = $bar_cur_row[1]; // StimuliName
	$bar_cur_fix = $bar_cur_row[2]; // FixationIndex
	$bar_cur_dur = $bar_cur_row[3]; // FixationDuration
	$bar_cur_xas = $bar_cur_row[4]; // MappedFixationPointX
	$bar_cur_yas = $bar_cur_row[5]; // MappedFixationPointY
	$bar_cur_usr = $bar_cur_row[6]; // user
    $bar_cur_tim = $bar_cur_row[0]; // Timestamp
    $bar_cur_des = $bar_cur_row[7]; // description
	
	if (in_array($bar_cur_sti, $bar_sti_array) || !$current_bar_sti_set) {
		// Create new relative value / this is the trial
		if ($bar_data_array[$bar_results_stim-1][1] != $bar_cur_sti || $bar_data_array[$bar_results_stim-1][6] != $bar_cur_usr) { // if previous had different stimuli or person then set start point
			$bar_t_start = $bar_cur_tim;
			$bar_cur_rel = 0;
			$bar_fix_start = $bar_cur_fix;
			$bar_fix_rel = 0;

			// creating an array with the different descriptions
			if (!in_array($bar_cur_des, $bar_unique_des)) {
				$bar_unique_des[$bar_unique_des_count] = $bar_cur_des;
				$bar_unique_des_count++;
			}

			// creating an array with the different stimuli
			if (!in_array($bar_cur_sti, $bar_unique_sti)) {
				$bar_unique_sti[$bar_unique_sti_count] = $bar_cur_sti;
				$bar_unique_sti_count++;
			}

		} else {
			$bar_cur_rel = $bar_cur_tim - $bar_t_start;
			$bar_fix_rel = $bar_cur_fix - $bar_fix_start;
		}

		if ($data_array_original[$loop_1+1][1] != $bar_cur_sti || $data_array_original[$loop_1+1][6] != $bar_cur_usr) {

			$bar_stimuli_key = array_search($bar_cur_sti, $bar_unique_sti);
			$bar_descr_key = array_search($bar_cur_des, $bar_unique_des);
			$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][0] += $bar_cur_rel; // Sum of total time
			$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][1]++; // Sum of total trials
			if ($bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][1] == 1) {
				$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][2] = $bar_cur_rel;
				$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][4] = $bar_cur_rel;
			} else {
				$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][2] = min($bar_cur_rel,$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][2]); // min time
				$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][4] = max($bar_cur_rel,$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][4]); // max time
			}

			$bar_stimuli_stats[$bar_stimuli_key][$bar_descr_key][5] += $bar_fix_rel; // max time
		}
		
		$bar_data_array[$bar_results_stim] = $bar_cur_row;

		$bar_data_array[$bar_results_stim][count($bar_data_array[$bar_results_stim])] = $bar_cur_rel; // last row will be containing the relative time

		$bar_results_stim++;
	}
}

// sort arrays
sort($bar_unique_sti);
sort($bar_unique_des);
usort($bar_unique_usr, function ($a, $b){
	return preg_replace('/\D/', '', $a) - preg_replace('/\D/', '', $b);
});

for ($loop1 = 0; $loop1 < count($bar_unique_sti); $loop1++) {
    for ($loop2 = 0; $loop2 < count($bar_unique_des); $loop2++) {
        $bar_stimuli_stats[$loop1][$loop2][3] = $bar_stimuli_stats[$loop1][$loop2][0] / $bar_stimuli_stats[$loop1][$loop2][1]; // average time
    }
}


//################################################################################################

if ($current_csv_set && $current_stimuli_set) {
    for ($loop_2 = 0; $loop_2 < count($AOI); $loop_2++) { // loop through every point
        for ($t = 0; $t < floor($max_rel/100); $t++) { //$t = time*100
            $AOI_count[$t][$loop_2] = 0;
        }
    }


    // Loop over the resulting data
    for ($loop_1 = 0; $loop_1 < count($data_array); $loop_1++) { // loop through every point

        $cur_row = $data_array[$loop_1];
        $cur_tim = $cur_row[0]; // Timestamp
        $cur_sti = $cur_row[1]; // StimuliName
        $cur_fix = $cur_row[2]; // FixationIndex
        $cur_dur = $cur_row[3]; // FixationDuration
        $cur_xas = $cur_row[4]; // MappedFixationPointX
        $cur_yas = $cur_row[5]; // MappedFixationPointY
        $cur_usr = $cur_row[6]; // user
        $cur_des = $cur_row[7]; // description
        $cur_rel = $cur_row[8]; // relative time

        for ($loop_2 = 0; $loop_2 < count($AOI); $loop_2++) { // loop through every AOI

            if ($cur_xas > $AOI[$loop_2][0] && $cur_xas < $AOI[$loop_2][2] && $cur_yas > $AOI[$loop_2][1] && $cur_yas < $AOI[$loop_2][3]) { // Filter 2 = AOI
                
                for ($time = ceil($cur_rel/100)*100; $time <= floor(($cur_rel + $cur_dur)/100)*100; $time += 100) {
                    
                    $AOI_count[$time/100][$loop_2]++;
                    
                }

            }

        }
        
    }
    
}

//3d line plot loop for data array
for ($threed_loop_1 = 1; $threed_loop_1 < count($data_array_original); $threed_loop_1++) { // Start at 1 = skip first row with titles
    
    $threed_cur_row = $data_array_original[$threed_loop_1];
    $threed_cur_tim = $threed_cur_row[0]; // Timestamp
	$threed_cur_sti = $threed_cur_row[1]; // StimuliName
	$threed_cur_fix = $threed_cur_row[2]; // FixationIndex
	$threed_cur_dur = $threed_cur_row[3]; // FixationDuration
	$threed_cur_xas = $threed_cur_row[4]; // MappedFixationPointX
	$threed_cur_yas = $threed_cur_row[5]; // MappedFixationPointY
	$threed_cur_usr = $threed_cur_row[6]; // user
    $threed_cur_des = $threed_cur_row[7]; // description

	if ($data_array_original[$threed_loop_1-1][1] != $threed_cur_sti || $data_array_original[$threed_loop_1-1][6] != $threed_cur_usr) { // if previous had different stimuli or person then set start point
		// creating an array with the different users
		if (!in_array($threed_cur_usr, $threed_unique_usr_all)) {
			$threed_unique_usr_all[$threed_unique_usr_all_count] = $threed_cur_usr;
			$threed_unique_usr_all_count++;
		}

		// creating an array with the different descriptions
		if (!in_array($threed_cur_des, $threed_unique_des_all)) {
			$threed_unique_des_all[$threed_unique_des_all_count] = $threed_cur_des;
			$threed_unique_des_all_count++;
		}

		// creating an array with the different stimuli
		if (!in_array($threed_cur_sti, $threed_unique_sti_all)) {
			$threed_unique_sti_all[$threed_unique_sti_all_count] = $threed_cur_sti;
			$threed_unique_sti_all_count++;
		}
	}
	
	// Create new relative value
	if ($data_array_original[$threed_loop_1-1][1] != $threed_cur_sti || $data_array_original[$threed_loop_1-1][6] != $threed_cur_usr) { // if previous had different stimuli or person then set start point
		$threed_t_start = $threed_cur_tim;
		$threed_cur_rel = 0;
		$threed_fix_start = $threed_cur_fix;
		$threed_fix_rel = 0;
	} else {
		$threed_cur_rel = $threed_cur_tim - $threed_t_start;
		$threed_fix_rel = $threed_cur_fix - $threed_fix_start;
	}
    
    if ((!$current_stimuli_set || $threed_cur_sti == $current_stimuli) && $threed_cur_rel <= $current_maxtim && $threed_cur_rel >= $current_mintim) { // Filter 1 = Stimuli *&& $threed_results_stim < 14*
    
    	if ((!$current_usr_set || $threed_cur_usr == $current_usr)) { // Filter 2 = User
    
			if ((!$current_des_set || $threed_cur_des == $current_des)) { // Filter 3 = description

						if ($threed_cur_tim != $threed_tem_tim) { // Make resulting array unique

							// set the unique array and the resulting unique array
							$threed_tem_tim = $threed_cur_tim;

							// Create new relative value / this is the trial
							if ($threed_data_array[$threed_results_stim-1][1] != $threed_cur_sti || $threed_data_array[$threed_results_stim-1][6] != $threed_cur_usr) { // if previous had different stimuli or person then set start point
								// creating an array with the different users
								if (!in_array($threed_cur_usr, $threed_unique_usr)) {
									$threed_unique_usr[$threed_unique_usr_count] = $threed_cur_usr;
									$threed_unique_usr_count++;
								}

								// creating an array with the different descriptions
								if (!in_array($threed_cur_des, $threed_unique_des)) {
									$threed_unique_des[$threed_unique_des_count] = $threed_cur_des;
									$threed_unique_des_count++;
								}

								// creating an array with the different stimuli
								if (!in_array($threed_cur_sti, $threed_unique_sti)) {
									$threed_unique_sti[$threed_unique_sti_count] = $threed_cur_sti;
									$threed_unique_sti_count++;
								}
							}

							// set min and max values
							$threed_min_xas = min($threed_cur_xas,$threed_min_xas);
							$threed_max_xas = max($threed_cur_xas,$threed_max_xas);

							$threed_min_yas = min($threed_cur_yas,$threed_min_yas);
							$threed_max_yas = max($threed_cur_yas,$threed_max_yas);

							$threed_min_tim = min($threed_cur_tim,$threed_min_tim);
							$threed_max_tim = max($threed_cur_tim,$threed_max_tim);

							$threed_min_rel = min($threed_cur_rel,$threed_min_rel);
							$threed_max_rel = max($threed_cur_rel,$threed_max_rel);

							$threed_min_dur = min($threed_cur_dur,$threed_min_dur);
							$threed_max_dur = max($threed_cur_dur,$threed_max_dur);

							$threed_data_array[$threed_results_stim] = $threed_cur_row;

							$threed_data_array[$threed_results_stim][count($threed_data_array[$threed_results_stim])] = $threed_cur_rel; // last row will be containing the relative time

							$threed_results_stim++;
						}

					}

		
				
			
		}
			
    }

}

?>