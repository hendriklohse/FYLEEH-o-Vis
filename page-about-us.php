<?php get_header(); ?>

	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/css/page/about-us.css"/>

<?php get_template_part('template-parts/layout/middle'); ?>

<div class="page about-us-page">
	<div class="hidden" id="more-info">
		About us
	</div>
	<div id="page-content" class="content">
		<div class="title">
			Meet the Team
		</div>
		<div class="cards">
			<div class="card">
				<div class="color-box"> </div>
				<div class="plus" onclick="this.parentNode.classList.toggle('active')"></div>
				<div class="picture">
					<img src="<?php bloginfo('template_directory'); ?>/assets/images/person1.png">
				</div>
				<div class="name">
					Esmee Bellemakers
				</div>
				<div class="role">
					Designer & Member Team Streamgraph
				</div>
				<div class="desc">
					I worked primarily on the design and am a member of team streamgraph. This group made working on this project so much fun and I want to thank them for the great cooperation!
				</div>
			</div>
			<div class="card">
				<div class="color-box"> </div>
				<div class="plus" onclick="this.parentNode.classList.toggle('active')"></div>
				<div class="picture">
					<img src="<?php bloginfo('template_directory'); ?>/assets/images/person2.png">
				</div>
				<div class="name">
					Ece Zeynep  Akdemir
				</div>
				<div class="role">
					Writer & Member Team Streamgraph
				</div>
				<div class="desc">
					I mostly worked on the written part of the project. I really enjoyed the whole process.
				</div>
			</div>
			<div class="card">
				<div class="color-box"> </div>
				<div class="plus" onclick="this.parentNode.classList.toggle('active')"></div>
				<div class="picture">
					<img src="<?php bloginfo('template_directory'); ?>/assets/images/person3.png">
				</div>
				<div class="name">
					Frank Nusteling
				</div>
				<div class="role">
					Member Team Heatmap
				</div>
				<div class="desc">
					It was challenging, but really fun. Shout-out to Cosmin!
				</div>
			</div>
			<div class="card">
				<div class="color-box"> </div>
				<div class="plus" onclick="this.parentNode.classList.toggle('active')"></div>
				<div class="picture">
					<img src="<?php bloginfo('template_directory'); ?>/assets/images/person4.png">
				</div>
				<div class="name">
					Latisha Boor
				</div>
				<div class="role">
					Member Team Heatmap
				</div>
				<div class="desc">
					Working on this project really made my quarantine life better. I learned a lot more about programming and designing. My motto: "Live Laugh Program!" 
				</div>
			</div>
			<div class="card">
				<div class="color-box"> </div>
				<div class="plus" onclick="this.parentNode.classList.toggle('active')"></div>
				<div class="picture">
					<img src="<?php bloginfo('template_directory'); ?>/assets/images/person5.png">
				</div>
				<div class="name">
					Hendrik Löhse
				</div>
				<div class="role">
					Member team 3D line plot + Barchart
				</div>
				<div class="desc">
					Sweet kisses!
				</div>
			</div>
			<div class="card">
				<div class="color-box"> </div>
				<div class="plus" onclick="this.parentNode.classList.toggle('active')"></div>
				<div class="picture">
					<img src="<?php bloginfo('template_directory'); ?>/assets/images/person6.png">
				</div>
				<div class="name">
					Yip van Ginkel
				</div>
				<div class="role">
					Scrum Master & Member team 3D line plot + Barchart
				</div>
				<div class="desc">
					I am the guy with years of experience in web applications.
				</div>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>