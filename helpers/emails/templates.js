const emailTemplate = {};

emailTemplate.invite = (name, email, OTP) => {
  return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
			rel="stylesheet"
		/>
		<title>Invitation</title>
		<style type="text/css">
			@media only screen and (max-width: 480px) {
				.header {
					text-align: center;
				}
				.footer-text {
					margin: 0 auto;
				}
			}
		</style>
	</head>
	<body
		style="margin: 2.5rem 3rem; padding: 0; font-family: 'Roboto', sans-serif; color: #333;"
	>
		<table style="width: 100%; border-collapse: collapse;">
			<tr>
				<td
					class="header"
					colspan="2"
					style="text-align: left; white-space: nowrap; vertical-align: middle;"
				>
					<img
						src="https://sa-media.fra1.digitaloceanspaces.com/lms_upload/svg+xml/1680524520508doc.svg+xml"
						style="vertical-align: middle; display: inline-block; width: 30px; margin-right: 0.5rem;"
					/>
					<h4
						style="margin: unset; color: #212b36; display: inline-block; vertical-align: middle;"
					>
						Home Service 
					</h4>
				</td>
			</tr>
			<tr>
				<td
					class="card-body"
					colspan="2"
					style="text-align: center; padding-top: 3rem;"
				>
					<div
						class="inner-container"
						style="position: relative; width: 56px; height: 56px; background: #ad92fb; border-radius: 50%; margin: 0 auto;"
					>
						<span
							class="first-last"
							style="height: inherit; width: inherit; text-align: center; vertical-align: middle; color: #fff; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 24px; line-height: 28px; display: table-cell;"
						>
							${name
                .split(" ")
                .map((s) => s.slice(0, 1))
                .join("")}
						</span>
					</div>
					<h3
						class="name"
						style="font-weight: 400; font-size: 24px; line-height: 23px; text-align: center; margin-bottom: 1rem; color: #212b36;"
					>
						Hi, ${name}!
					</h3>
					<p
						class="message"
						style="font-weight: 400; font-size: 16px; line-height: 19px; text-align: center; color: #212b36; max-width: 28.3125rem; margin: 0 auto; padding: 1em;"
					>
					we welcomes you to collaborate on Home Service  Platform
					</p>
					<div class="email-container" style="padding-top: 1rem;">
						<div
							class="email"
							style="text-align: center; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; color: #212b36;"
						>
							<p style="margin: 0;">Your Login Email:</p>
							<a href="">${email}</a>
						</div>
						<div
							class="email"
							style="text-align: center; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; color: #212b36;"
						>
							<p style="margin: 0;">Your OTP for validation:</p>
							<a href="">${OTP}</a>
						</div>
					</div>
					<div
						class="regards"
						style="text-align: center; margin-top: 1.5rem; font-weight: 400; font-size: 16px; line-height: 19px; color: #626262; padding: 1em;"
					>
						<p style="margin: 0;">Regards, </p>
						<p style="margin: 0;">Home Service</p>
					</div>
				</td>
			</tr>
			
		</table>
	</body>
</html>`;
};
emailTemplate.serviceStartedProvider = (email) => {
  return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
			rel="stylesheet"
		/>
		<title>Invitation</title>
		<style type="text/css">
			@media only screen and (max-width: 480px) {
				.header {
					text-align: center;
				}
				.footer-text {
					margin: 0 auto;
				}
			}
		</style>
	</head>
	<body
		style="margin: 2.5rem 3rem; padding: 0; font-family: 'Roboto', sans-serif; color: #333;"
	>
		<table style="width: 100%; border-collapse: collapse;">
			<tr>
				<td
					class="header"
					colspan="2"
					style="text-align: left; white-space: nowrap; vertical-align: middle;"
				>
					<img
						src="https://sa-media.fra1.digitaloceanspaces.com/lms_upload/svg+xml/1680524520508doc.svg+xml"
						style="vertical-align: middle; display: inline-block; width: 30px; margin-right: 0.5rem;"
					/>
					<h4
						style="margin: unset; color: #212b36; display: inline-block; vertical-align: middle;"
					>
						Home Service 
					</h4>
				</td>
			</tr>
			<tr>
				<td
					class="card-body"
					colspan="2"
					style="text-align: center; padding-top: 3rem;"
				>
					Your service booking otp has confirmed by user and your booking schedule is started
	
					<div class="email-container" style="padding-top: 1rem;">
						<div
							class="email"
							style="text-align: center; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; color: #212b36;"
						>
							<p style="margin: 0;">Your Login Email:</p>
							<a href="">${email}</a>
						</div>
				
					</div>
					<div
						class="regards"
						style="text-align: center; margin-top: 1.5rem; font-weight: 400; font-size: 16px; line-height: 19px; color: #626262; padding: 1em;"
					>
						<p style="margin: 0;">Regards, </p>
						<p style="margin: 0;">Home Service</p>
					</div>
				</td>
			</tr>
			
		</table>
	</body>
</html>`;
};

emailTemplate.serviceStartedUser = (email) => {
  return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
			rel="stylesheet"
		/>
		<title>Invitation</title>
		<style type="text/css">
			@media only screen and (max-width: 480px) {
				.header {
					text-align: center;
				}
				.footer-text {
					margin: 0 auto;
				}
			}
		</style>
	</head>
	<body
		style="margin: 2.5rem 3rem; padding: 0; font-family: 'Roboto', sans-serif; color: #333;"
	>
		<table style="width: 100%; border-collapse: collapse;">
			<tr>
				<td
					class="header"
					colspan="2"
					style="text-align: left; white-space: nowrap; vertical-align: middle;"
				>
					<img
						src="https://sa-media.fra1.digitaloceanspaces.com/lms_upload/svg+xml/1680524520508doc.svg+xml"
						style="vertical-align: middle; display: inline-block; width: 30px; margin-right: 0.5rem;"
					/>
					<h4
						style="margin: unset; color: #212b36; display: inline-block; vertical-align: middle;"
					>
						Home Service 
					</h4>
				</td>
			</tr>
			<tr>
				<td
					class="card-body"
					colspan="2"
					style="text-align: center; padding-top: 3rem;"
				>
					You confirmed the provider and the booked service can be start now!
					<p
						class="message"
						style="font-weight: 400; font-size: 16px; line-height: 19px; text-align: center; color: #212b36; max-width: 28.3125rem; margin: 0 auto; padding: 1em;"
					>
					we welcomes you to collaborate on Home Service  Platform
					</p>
					<div class="email-container" style="padding-top: 1rem;">
						<div
							class="email"
							style="text-align: center; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; color: #212b36;"
						>
							<p style="margin: 0;">Your Login Email:</p>
							<a href="">${email}</a>
						</div>
						
					</div>
					<div
						class="regards"
						style="text-align: center; margin-top: 1.5rem; font-weight: 400; font-size: 16px; line-height: 19px; color: #626262; padding: 1em;"
					>
						<p style="margin: 0;">Regards, </p>
						<p style="margin: 0;">Home Service</p>
					</div>
				</td>
			</tr>
			
		</table>
	</body>
</html>`;
};

emailTemplate.resetPassword = (name, email, OTP) => {
  return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
			rel="stylesheet"
		/>
		<title>Invitation</title>
		<style type="text/css">
			@media only screen and (max-width: 480px) {
				.header {
					text-align: center;
				}
				.footer-text {
					margin: 0 auto;
				}
			}
		</style>
	</head>
	<body
		style="margin: 2.5rem 3rem; padding: 0; font-family: 'Roboto', sans-serif; color: #333;"
	>
		<table style="width: 100%; border-collapse: collapse;">
			<tr>
				<td
					class="header"
					colspan="2"
					style="text-align: left; white-space: nowrap; vertical-align: middle;"
				>
					<img
						src="https://sa-media.fra1.digitaloceanspaces.com/lms_upload/svg+xml/1680524520508doc.svg+xml"
						style="vertical-align: middle; display: inline-block; width: 30px; margin-right: 0.5rem;"
					/>
					<h4
						style="margin: unset; color: #212b36; display: inline-block; vertical-align: middle;"
					>
						Home Service 
					</h4>
				</td>
			</tr>
			<tr>
				<td
					class="card-body"
					colspan="2"
					style="text-align: center; padding-top: 3rem;"
				>
					<div
						class="inner-container"
						style="position: relative; width: 56px; height: 56px; background: #ad92fb; border-radius: 50%; margin: 0 auto;"
					>
						<span
							class="first-last"
							style="height: inherit; width: inherit; text-align: center; vertical-align: middle; color: #fff; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 24px; line-height: 28px; display: table-cell;"
						>
							${name
                .split(" ")
                .map((s) => s.slice(0, 1))
                .join("")}
						</span>
					</div>
					<h3
						class="name"
						style="font-weight: 400; font-size: 24px; line-height: 23px; text-align: center; margin-bottom: 1rem; color: #212b36;"
					>
						Hi, ${name}!
					</h3>
					<p
						class="message"
						style="font-weight: 400; font-size: 16px; line-height: 19px; text-align: center; color: #212b36; max-width: 28.3125rem; margin: 0 auto; padding: 1em;"
					>
					Reset your password !
					</p>
					<div class="email-container" style="padding-top: 1rem;">
						<div
							class="email"
							style="text-align: center; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; color: #212b36;"
						>
							<p style="margin: 0;">Your Email:</p>
							<a href="">${email}</a>
						</div>
						<div
							class="email"
							style="text-align: center; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; color: #212b36;"
						>
							<p style="margin: 0;">Your OTP for validation:</p>
							<a href="">${OTP}</a>
						</div>
					</div>
					<div
						class="regards"
						style="text-align: center; margin-top: 1.5rem; font-weight: 400; font-size: 16px; line-height: 19px; color: #626262; padding: 1em;"
					>
						<p style="margin: 0;">Regards, </p>
						<p style="margin: 0;">Home Service</p>
					</div>
				</td>
			</tr>
			
		</table>
	</body>
</html>`;
};

emailTemplate.bookingOTP = (email, OTP) => {
  return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
			rel="stylesheet"
		/>
		<title>Invitation</title>
		<style type="text/css">
			@media only screen and (max-width: 480px) {
				.header {
					text-align: center;
				}
				.footer-text {
					margin: 0 auto;
				}
			}
		</style>
	</head>
	<body
		style="margin: 2.5rem 3rem; padding: 0; font-family: 'Roboto', sans-serif; color: #333;"
	>
		<table style="width: 100%; border-collapse: collapse;">
			<tr>
				<td
					class="header"
					colspan="2"
					style="text-align: left; white-space: nowrap; vertical-align: middle;"
				>
					<img
						src="https://sa-media.fra1.digitaloceanspaces.com/lms_upload/svg+xml/1680524520508doc.svg+xml"
						style="vertical-align: middle; display: inline-block; width: 30px; margin-right: 0.5rem;"
					/>
					<h4
						style="margin: unset; color: #212b36; display: inline-block; vertical-align: middle;"
					>
						Home Service 
					</h4>
				</td>
			</tr>
			<tr>
				<td
					class="card-body"
					colspan="2"
					style="text-align: center; padding-top: 3rem;"
				>
					<p
						class="message"
						style="font-weight: 400; font-size: 16px; line-height: 19px; text-align: center; color: #212b36; max-width: 28.3125rem; margin: 0 auto; padding: 1em;"
					>
					Start your service !
					</p>
					<div class="email-container" style="padding-top: 1rem;">
						<div
							class="email"
							style="text-align: center; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; color: #212b36;"
						>
							<p style="margin: 0;">Your Email:</p>
							<a href="">${email}</a>
						</div>
						<div
							class="email"
							style="text-align: center; font-family: 'Roboto', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; color: #212b36;"
						>
							<p style="margin: 0;">Your OTP for validation:</p>
							<a href="">${OTP}</a>
						</div>
					</div>
					<div
						class="regards"
						style="text-align: center; margin-top: 1.5rem; font-weight: 400; font-size: 16px; line-height: 19px; color: #626262; padding: 1em;"
					>
						<p style="margin: 0;">Regards, </p>
						<p style="margin: 0;">Home Service</p>
					</div>
				</td>
			</tr>
			
		</table>
	</body>
</html>`;
};

module.exports = emailTemplate;
