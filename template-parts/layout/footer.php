<div class="footer">
	<?php get_template_part('template-parts/layout/scripts'); ?>
	<div class="hidden" id="form-login">
		<div class="login">
			<form action="" method="post">
				<div>
					Username: <input name="log" type="text" />
				</div>
				<div>
					Password: <input name="pwd" type="password" />
				</div>
				<div>
					<input type="submit" onclick="ClearCookie('');" value="Login" />
					<input type="hidden" name="action" value="my_login_action" />
				</div>
			</form>
			<form method="post" name="myForm">
				<div>
					Username: <input type="text"  name="uname" />
				</div>
				<div>
					Email: <input id="email" type="text" name="uemail" />
				</div>
				<div>
					Password: <input type="password"  name="upass" />
				</div>
				<div>
					<input type="submit" onclick="ClearCookie('color')" value="Register" />
					<input type="hidden" name="action" value="my_create_action" />
				</div>
			</form>
		</div>
	</div>
</div>