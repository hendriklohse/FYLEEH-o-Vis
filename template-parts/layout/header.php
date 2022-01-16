<?php global $current_csv_set, $current_stimuli_set, $current_parameters, $current_usr_set, $current_des_set; ?>
<div class="header">
	<div class="title"><a href="<?php echo site_url() . '/'; ?>"><img src="<?php bloginfo('template_directory'); ?>/assets/images/35E.png"></a></div>
	<div class="left">
		<div class="menu" title="Menu" onclick="document.getElementById('yiisidemenu').classList.toggle('active');"><img src="<?php bloginfo('template_directory'); ?>/assets/images/burger.svg"></div>
		<div class="home" title="Home"><a href="<?php echo site_url(); ?>"><img src="<?php bloginfo('template_directory'); ?>/assets/images/home.svg"></a></div>
		<div class="info" title="More information" onclick="yii_modal('more-info','more-info','More Information');"></div>
	</div>
	<div class="right">
		<div class="filter" title="Filter" onclick="activefilter()">Filters</div>
		<div class="datadropicon" title="DataDrop" onclick="activedropdown()">Data Input</div>
		<script>
			function activefilter() {
				if (document.getElementById('yiidatadrop').classList.contains('active')) {
					document.getElementById('yiidatadrop').classList.remove('active');
					document.getElementById('filter-reload').classList.remove('datadrop');
				}
				if (document.getElementById('yiisubheader').classList.contains('active')) {
					document.getElementById('yiisubheader').classList.remove('active');
					document.getElementById('filter-reload').classList.remove('filter');
				} else {
					document.getElementById('yiisubheader').classList.add('active');
					document.getElementById('filter-reload').classList.add('filter');
				}
			}
			function activedropdown() {
				if (document.getElementById('yiisubheader').classList.contains('active')) {
					document.getElementById('yiisubheader').classList.remove('active');
					document.getElementById('filter-reload').classList.remove('filter');
				}
				if (document.getElementById('yiidatadrop').classList.contains('active')) {
					document.getElementById('yiidatadrop').classList.remove('active');
					document.getElementById('filter-reload').classList.remove('datadrop');
				} else {
					document.getElementById('yiidatadrop').classList.add('active');
					document.getElementById('filter-reload').classList.add('datadrop');
				}
			}
		</script>
	</div>
</div>