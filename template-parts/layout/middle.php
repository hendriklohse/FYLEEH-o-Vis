</head>
<body onresize="document.getElementById('filter-reload').classList.add('active');">
	<div class="yii-background">
		<!-- <?php global $current_csv_set, $current_stimuli_set; if (!$current_csv_set && !$current_stimuli_set) { ?>
			<img class="upload" src="<?php bloginfo('template_directory'); ?>/assets/images/Upload.png">
			<img class="select" src="<?php bloginfo('template_directory'); ?>/assets/images/Select.png">
		<?php } ?> -->
		<div id="particles-js"></div>
	</div>
	<div id="yii-mask" class="yii-mask" onclick="yii_mask('close')"></div>
	<?php get_template_part('template-parts/layout/modal'); ?>
	<?php get_template_part('template-parts/layout/header'); ?>
	<?php get_template_part('template-parts/layout/filter'); ?>
	<?php get_template_part('template-parts/layout/data-drop'); ?>
	<div id="filter-reload" class="reload" onclick="SetUrl('<?php echo get_permalink(); ?>')">Click to update</div>
	<?php get_template_part('template-parts/layout/sidemenu'); ?>