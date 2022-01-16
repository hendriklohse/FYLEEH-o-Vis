<script src="<?php bloginfo('template_directory'); ?>/assets/js/layout/particles.js"></script>
<script src="<?php bloginfo('template_directory'); ?>/assets/js/layout/particles-config.js"></script>

<script>
	function yiiDownload(canvas, filename) {
		/// create an "off-screen" anchor tag
		var lnk = document.createElement('a'), e;

		/// the key here is to set the download attribute of the a tag
		lnk.download = filename;

		/// convert canvas content to data-uri for link. When download
		/// attribute is set the content pointed to by link will be
		/// pushed as "download" in HTML5 capable browsers
		lnk.href = canvas.toDataURL("image/png;base64");

		/// create a "fake" click-event to trigger the download
		if (document.createEvent) {
			e = document.createEvent("MouseEvents");
			e.initMouseEvent("click", true, true, window,
							 0, 0, 0, 0, 0, false, false, false,
							 false, 0, null);

			lnk.dispatchEvent(e);
		} else if (lnk.fireEvent) {
			lnk.fireEvent("onclick");
		}
	}
	if ( window.location !== window.parent.location ) { document.body.classList.add("iframe"); }
	function SetCookie(name,value) {
		document.cookie = name + "=" + value + "; domain=<?php echo end(explode('//', get_site_url())); ?>; path=/";
		document.getElementById("filter-reload").classList.add("active");
	}
	function ClearCookie(values) {
		var cookie = ["color","compare","csv","desc","maxtim","mintim","stimuli","user","bar_sti","hmmin", "hmmax", "hmsensitivity","hmopacity","aoi"];
		var value = values.split(',');
		for (var i = 0; i < cookie.length; i++) {
			if (!value.includes(cookie[i])) {
				SetCookie(cookie[i],'');
			}
		}
	}
	function SetUrl(url) {
		window.location = url;
	}
	function yii_modal(elemid, elemclass, elemtitle) {
		var modal = document.getElementById("yii-modal");
		var title = document.getElementById("yii-modal-title");
		var content = document.getElementById("yii-modal-container");

		modal.classList.add(elemclass);
		content.innerHTML = document.getElementById(elemid).innerHTML;
		title.innerHTML = elemtitle;

		yii_mask(modal);
	}
	function yii_mask(elem) {
		if (elem == 'close' || elem.classList.contains('yii-MFront')) {
			document.getElementById("yii-mask").classList.remove('active');
			var slides = document.getElementsByClassName("yii-MFront");
			for (var i = 0; i < slides.length; i++) {
			   slides.item(i).classList.remove('yii-MFront');
			}
			document.body.classList.remove("yii-disable-scroll");
		} else {
			document.getElementById("yii-mask").classList.remove('active');
			var slides = document.getElementsByClassName("yii-MFront");
			for (var i = 0; i < slides.length; i++) {
			   slides.item(i).classList.remove('yii-MFront');
			}
			document.getElementById("yii-mask").classList.add('active');
			elem.classList.add('yii-MFront');
			document.body.classList.add("yii-disable-scroll");
		}
	}
</script>