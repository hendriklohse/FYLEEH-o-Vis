<?php global $current_parameters, $param_remove, $param_name, $param_value, $current_parameters_url;

$current_parameters_array1 = explode('&', substr($current_parameters, 1));
$found = false;
$skip = 0;

for ($loop1 = 0; $loop1 < count($current_parameters_array1); $loop1++) {
	if (explode('=', $current_parameters_array1[$loop1])[0] == $param_name) {
		if ($param_remove) {
			$skip = 1;
		} else {
			$current_parameters_array[$loop1-$skip][0] = explode('=', $current_parameters_array1[$loop1])[0];
			$current_parameters_array[$loop1-$skip][1] = $param_value;
			$found = true;
		}
	} else {
		$current_parameters_array[$loop1-$skip] = explode('=', $current_parameters_array1[$loop1]);
	}
}

if (!$found && !$param_remove) {
	$current_parameters_array[count($current_parameters_array1)][0] = $param_name;
	$current_parameters_array[count($current_parameters_array1)][1] = $param_value;
}

$current_parameters_url = '';

for ($loop1 = 0; $loop1 < count($current_parameters_array); $loop1++) {
	if (!empty($current_parameters_array[$loop1])) {
		if ($loop1 == 0) {
			$split = '?';
		} else {
			$split = '&';
		}
		$current_parameters_url = $current_parameters_url . $split . $current_parameters_array[$loop1][0] . "=" . $current_parameters_array[$loop1][1];
	}
}

$current_parameters_url = get_permalink() . $current_parameters_url;

?>