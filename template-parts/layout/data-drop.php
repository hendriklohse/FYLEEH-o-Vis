<?php global $current_stimuli_set, $current_csv_set; ?>

<div id="yiidatadrop" class="datadrop subheader<?php if ($current_csv_set && !$current_stimuli_set) { echo " active"; } ?>">
	<div class="filter">
		<div class="title">
			Login for data upload
		</div>
		<hr>
		<div class="content">
			<?php if (!is_user_logged_in()) { ?><div class="button power info" title="More information" onclick="yii_modal('form-login','form-login','More Information');">Login</div><?php } else { ?><a title="Logout" class="button power info" onclick="ClearCookie('color')" href="<?php echo wp_logout_url( home_url() ); ?>">Logout</a><?php } ?>
		</div>
	</div>
	<?php if (is_user_logged_in()) { ?>
	<div class="filter upload">
		<div class="title">
			Upload
		</div>
		<hr>
		<div class="content">
			<div class="dropdown">
				<div class="label">Data (.csv)</div>
				<div class="csv"<?php if (!is_user_logged_in()) { ?> onclick="alert('Sorry, you have to be logged in to upload a CSV file.');"<?php } ?>><?php if ( is_user_logged_in() ) { get_template_part('template-parts/upload/csv'); } ?></div>
			</div>
			<?php if ($current_csv_set) { ?>
				<div class="dropdown">
					<div class="label">Stimulus</div>
					<div class="stimuli"<?php if (!is_user_logged_in()) { ?> onclick="alert('Sorry, you have to be logged in to upload a stimuli.');"<?php } ?>><?php if ( is_user_logged_in() ) { get_template_part('template-parts/upload/stimuli'); } ?></div>
				</div>
		<?php } ?>
		</div>
	</div>
	<?php } ?>
	<div class="filter">
		<div class="title">
			Select
		</div>
		<hr>
		<div class="content">
			<div class="dropdown csv<?php if (!$current_csv_set) { echo " no"; } ?>">
				<div class="label">Data</div>
				<?php get_template_part('template-parts/select/csv'); ?>
			</div>
			<?php if ($current_csv_set) { ?>
				<div id="select-stimuli" class="dropdown stimuli">
					<div class="label">Stimulus</div>
					<?php if ($current_csv_set) { get_template_part('template-parts/select/stimuli'); } ?>
				</div>
			<?php } ?>
		</div>
	</div>
</div>