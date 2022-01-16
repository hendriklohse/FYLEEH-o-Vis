<?php global $data_array, $stimuliUrl, $stimuliWidth, $stimuliHeight, $current_parameters; ?>

<?php get_header(); ?>

	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/front.css"/>

<?php get_template_part('template-parts/layout/middle'); ?>

<div class="page front">
	<div class="hidden" id="more-info" title="More information"> 
<!-- 		<p>
			Greetings! We are six students from Eindhoven University of Technology and this website is produced by us for the DBL HTI + Webtech course over 10 weeks. We prioritized functionality and ease of use on our website, hope you enjoy. 
		</p>  -->
		<p>
			To get started, you can either:
		</p>
		<ul>
			<li><strong>Upload your own data and stimuli</strong> - using the buttons on the top left, or</li>
			<li><strong>Select an already uploaded set of data and stimuli</strong> - using the buttons on the top right.</li>
		</ul>
		<p>
			We save our users’ uploads so any files that have already been uploaded by previous users will appear within your options so everyone can benefit from this growing database.
		</p>
		<table border=1 cellspacing=0 cellpadding=4 id="front-page">
			<caption><strong>Button guide</strong></caption>
			<tr class="images"> 
				<td> <img src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/themes/fyleeh-o-vis/assets/images/csv_Up.svg" width=75px height=75px> </td>	
				<td> <img src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/themes/fyleeh-o-vis/assets/images/image_Up.svg" width=100px height=75px> </td>
				<td> <img src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/themes/fyleeh-o-vis/assets/images/information.svg" width=98px height=75px> </td>
				<td> <img src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/themes/fyleeh-o-vis/assets/images/csv_Down.svg" width=75px height=75px> </td>
				<td> <img src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/themes/fyleeh-o-vis/assets/images/image_Down.svg" width=100px height=75px> </td>
				<td> <img src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/themes/fyleeh-o-vis/assets/images/compare.svg" width=88px height=75px> </td>
				<td> <img src="https://yipisit.ondernemerscoach-dekempen.nl/wp-content/themes/fyleeh-o-vis/assets/images/filter.svg" width=81px height=75px> </td>
			</tr>
			<tr>
				<td rowspan=2>Upload CSV</td>
				<td rowspan=2>Upload stimulus</td>
				<td rowspan=2>More information</td>
				<td rowspan=2>Select CSV</td>
				<td rowspan=2>Select stimulus</td>
				<td rowspan=2>Compare page</td>
				<td rowspan=2>Filter menu</td>
			</tr>			
		</table>
		<p>
			Following the larger buttons in the left menu gives access to several visualisations and an overview of all of them together on one page.
		</p>
		<p>
			We have implemented a compare page which is accessible using the aforementioned button in the button guide, located in the top right corner of the screen. This feature lets users compare any of the visualizations on this site in a side-to-side view. For more explanation, see the compare page.
		</p>
		<p>
			We have so much to offer, so please take your time and enjoy!
		</p>	
	</div>
	<div class="phrase">
Visualizing data in a  beat
	</div>
	<div class="text">
	Greetings! You may choose your desired type of visualization via clicking on the name to your left. To discover and learn more about how to use the visualizations, please see the <strong onclick="yii_modal('more-info','more-info','More Information');">‘More Information’</strong> button on the top left of each page. We have so much to offer, so take your time and enjoy!
	</div>
</div>

<?php get_footer(); ?>