import { buildHTMLBodyEmail } from "../../../shared/email.wrapper.js";

export const setRegistrationEmailTemplate = ({ firstName, today, year }) => {
  const subject = `Welcome to BodyDynamix ${firstName}!`;

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
Welcome to Body Dynamix!

Hey ${firstName}, thanks for signing up.

You've taken the first step towards unlocking your potential and
turning your dreams into reality. Our team of seasoned coaches is
prepared to guide and empower you on this transformative journey.

Explore BodyDynamix

If you have any questions you can reach us at support@bodydynamix.com
`;

  // *********************************/
  // HTML Body
  // *********************************/
  let htmlBody = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#919295">
<tr>
<td align="center" valign="top">
<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
<tr>
<td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:70px 0px 40px 0px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-15 tbrr" style="padding: 20px 30px 20px 30px; border-radius:10px 10px 0px 0px;" bgcolor="#496ca1">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<th class="column-top" width="300" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-header left m-center" style="color:#ffffff; font-family:'Poppins', Arial,sans-serif; font-size:12px; line-height:16px; text-transform:uppercase; text-align:left;"><multiline>${today}, ${year}</multiline></td>
</tr>
</table>
</th>
<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-header" style="color:#ffffff; font-family:'Poppins', Arial,sans-serif; font-size:12px; line-height:16px; text-align:right; text-transform:uppercase;"><multiline><webversion class="link-white" style="color:#ffffff; text-decoration:none;">Open in your browser</webversion></multiline></td>
</tr>
</table>
</th>
</tr>
</table>
</td>
</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-15" style="padding: 25px 30px;" bgcolor="#ffffff" align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<th class="column" width="140" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://www.dropbox.com/scl/fi/1ut47cy522040378wfcr3/long_logo.png?rlkey=qr90f3txx1pxqtm9ahiyvmflw&st=136p41t6&dl=1" width="126" height="25" editable="true" border="0" alt="" /></td>
</tr>
</table>
</th>
<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-nav" style="color:#000; font-family:'Poppins', Arial,sans-serif; font-size:13px; line-height:18px; text-align:right; text-transform:uppercase;">
<multiline>
<a href="#" target="_blank" class="link3" style="text-decoration:none;"><span class="link3" style="color:#000; text-decoration:none;">View Our Classes</span></a>
</multiline>
</td>
</tr>
</table>
</th>
</tr>
</table>
</td>
</tr>
</table>
<repeater>
<layout label='Hero'>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td style="padding-bottom: 10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://www.dropbox.com/scl/fi/pcy19h5r2axktyzz8raf9/t10_image1.jpg?rlkey=y44usm7iqh12scjxhgnyeinj9&st=k2yr2ovv&dl=1" width="650" height="366" editable="true" border="0" alt="" /></td>
</tr>
<tr>
<td class="p30-15 bbrr" style="padding: 40px; border-radius:0px 0px 10px 10px;" bgcolor="#ffffff">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="h2 pb15" style="color:#000; font-family:'Poppins', Arial,sans-serif; font-size:28px; line-height:34px; text-align:left; padding-bottom:15px;"><multiline>Ready to Learn From Best?</multiline></td>
</tr>
<tr>
<td class="text" style="color:#777777; font-family:'Poppins', Arial,sans-serif; font-size:15px; line-height:30px; text-align:left;"><multiline>Hello ${firstName},<br/>
You've taken the first step towards unlocking your potential and turning your dreams into reality. Our team of seasoned coaches is prepared to guide and empower you on this transformative journey.</multiline></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</layout>
<layout label='Two Columns'>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="pb10" style="padding-bottom:10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<th class="column-top br" width="320" bgcolor="#496ca1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; border-radius:10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-q15" style="padding: 30px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="h3 pb25" style="color:#fff; font-family:'Poppins', Arial,sans-serif; font-size:22px; line-height:34px; text-align:left; padding-bottom:25px;"><multiline>Chiropractic Classes</multiline></td>
</tr>
<tr>
<td class="text pb25" style="color:#f5f7f7; font-family:'Poppins', Arial,sans-serif; font-size:15px; line-height:30px; text-align:left; padding-bottom:25px;"><multiline>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</multiline></td>
</tr>
<tr>
<td align="left">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-button" style="background:#104b7d; color:#ffffff; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:22px;"><multiline><a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">SIGN UP FOR CLASSES</span></a></multiline></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</th>
<th class="column-empty" width="10" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
<th class="column-top br" width="320" bgcolor="#496ca1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; border-radius:10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-q15" style="padding: 30px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="h3 pb25" style="color:#fff; font-family:'Poppins', Arial,sans-serif; font-size:22px; line-height:34px; text-align:left; padding-bottom:25px;"><multiline>P.T. Classes<br/>Coming Soon!</multiline></td>
</tr>
<tr>
<td class="text pb25" style="color:#f5f7f7; font-family:'Poppins', Arial,sans-serif; font-size:15px; line-height:30px; text-align:left; padding-bottom:25px;"><multiline>The BodyDynamix Team is working on a new set of classes for Physical Therapy.<br/><br/>Be sure to stay tuned! We'll send an email out when the class becomes available.</multiline></td>
</tr>
<tr>
<td align="left">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-button" style="background:#104b7d; color:#ffffff; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:22px;"><multiline><a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">LEARN MORE</span></a></multiline></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</th>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</layout>
<!--<layout label='Article Image On The Right'>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td style="padding-bottom: 10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl" style="direction: rtl;">
<tr>
<th class="column-dir" dir="ltr" width="325" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="fluid-img mbr" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="../../../shared/images/bdxceu.png" width="325" height="352" editable="true" border="0" alt="" /></td>
</tr>
</table>
</th>
<th class="column-dir" dir="ltr" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-15 brl" style="padding: 40px; border-radius:10px 0px 0px 10px;" bgcolor="#ffffff" height="272">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="h3 pb20" style="color:#445942; font-family:'Poppins', Arial,sans-serif; font-size:22px; line-height:34px; text-align:left; padding-bottom:20px;"><multiline>Lorem ipsum dolor sit amet consectetur</multiline></td>
</tr>
<tr>
<td class="text2 pb20" style="color:#777777; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:28px; text-align:left; padding-bottom:20px;"><multiline>Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</multiline></td>
</tr>
<tr>
<td align="left">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-button" style="background:#ebb67d; color:#ffffff; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:22px;"><multiline><a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">SEE MORE</span></a></multiline></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</th>
</tr>
</table>
</td>
</tr>
</table>
</layout>-->
<!--<layout label='CTA'>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td style="padding-bottom: 10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-15 br" style="padding: 50px 30px; border-radius:10px;"  bgcolor="#7fc278">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="h2 white center pb20" style="font-family:'Poppins', Arial,sans-serif; font-size:28px; line-height:34px; color:#ffffff; text-align:center; padding-bottom:20px;"><multiline>Relax. Nothing is under control.</multiline></td>
</tr>
<tr>
<td class="text white center pb30" style="font-family:'Poppins', Arial,sans-serif; font-size:15px; line-height:30px; color:#ffffff; text-align:center; padding-bottom:30px;"><multiline>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</multiline></td>
</tr>
<tr>
<td align="center">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-button text-button2" style="font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:22px; background:#ffffff; color:#71c167;"><multiline><a href="#" target="_blank" class="link4" style="color:#7fc278; text-decoration:none;"><span class="link4" style="color:#7fc278; text-decoration:none;">CALL TO ACTION</span></a></multiline></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</layout>-->
<layout label='Article Image On The Right / Secondary'>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td style="padding-bottom: 10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-15 br" style="padding: 40px; border-radius:10px;" bgcolor="#ffffff">
<table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl" style="direction: rtl;">
<tr>
<th class="column-dir-top" dir="ltr" width="285" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr; vertical-align:top;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://www.dropbox.com/scl/fi/yt7oyrgskhrpt9sah2x8k/Building-pic.jpeg?rlkey=uvkhibahyqg71bzryee21dzpq&st=r68i8n6d&dl=1" width="285" height="214" editable="true" border="0" alt="" /></td>
</tr>
</table>
</th>
<th class="column-empty" width="30" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
<th class="column-dir-top" dir="ltr" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr; vertical-align:top;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td bgcolor="#ffffff">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="h3 pb20" style="color:#000; font-family:'Poppins', Arial,sans-serif; font-size:22px; line-height:34px; text-align:left; padding-bottom:20px;"><multiline>Our Premises</multiline></td>
</tr>
<tr>
<td class="text2 pb20" style="color:#777777; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:28px; text-align:left; padding-bottom:20px;"><multiline>At our location...</multiline></td>
</tr>
<tr>
<td align="left">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-button" style="background:#104b7d; color:#ffffff; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:22px;"><multiline><a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">LEARN MORE</span></a></multiline></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</th>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</layout>
<!--<layout label='Article Image On The Left'>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td style="padding-bottom: 10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<th class="column" width="325" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="fluid-img mbr" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="images/t10_image4.jpg" width="325" height="352" editable="true" border="0" alt="" /></td>
</tr>
</table>
</th>
<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-15 brr" style="padding: 40px; border-radius:0px 10px 10px 0px;" bgcolor="#ffffff" height="272">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="h3 pb20" style="color:#445942; font-family:'Poppins', Arial,sans-serif; font-size:22px; line-height:34px; text-align:left; padding-bottom:20px;"><multiline>Lorem ipsum dolor sit amet consectetur</multiline></td>
</tr>
<tr>
<td class="text2 pb20" style="color:#777777; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:28px; text-align:left; padding-bottom:20px;"><multiline>Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</multiline></td>
</tr>
<tr>
<td align="left">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-button" style="background:#ebb67d; color:#ffffff; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:22px;"><multiline><a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">SEE MORE</span></a></multiline></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</th>
</tr>
</table>
</td>
</tr>
</table>
</layout>-->
<layout label='Article Image On The Left / Secondary'>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td style="padding-bottom: 10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-15 br" style="padding: 40px; border-radius:10px;" bgcolor="#ffffff">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<th class="column-top" dir="ltr" width="285" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://www.dropbox.com/scl/fi/2h1vcigtibyq19x4xeqeg/230209_SportsAcademy_ISM_9740-edited-1.jpg?rlkey=frpvyjs1jq3fvyduzjzwp05nb&st=5iuxw50d&dl=1" width="285" height="214" editable="true" border="0" alt="" /></td>
</tr>
</table>
</th>
<th class="column-empty" width="30" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
<th class="column-top" dir="ltr" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td bgcolor="#ffffff">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="h3 pb20" style="color:#000; font-family:'Poppins', Arial,sans-serif; font-size:22px; line-height:34px; text-align:left; padding-bottom:20px;"><multiline>Meet Our Co-Founders</multiline></td>
</tr>
<tr>
<td class="text2 pb20" style="color:#777777; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:28px; text-align:left; padding-bottom:20px;"><multiline>Beau Daniels and Eddie Stanislawski.</multiline></td>
</tr>
<tr>
<td align="left">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="text-button" style="background:#104b7d; color:#ffffff; font-family:'Poppins', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:22px;"><multiline><a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Learn More</span></a></multiline></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</th>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</layout>
</repeater>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="p30-15 br" style="padding: 50px 30px; border-radius:10px;" bgcolor="#104b7d">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<!--<tr>
<td align="center" style="padding-bottom: 30px;">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left; border-radius: 50%;"><a href="#" target="_blank"><img src="https://www.dropbox.com/scl/fi/x84bg1evfwc0o95emvnp7/t10_ico_facebook.jpg?rlkey=wbweonllt2zyo8puzfj2tw1fs&st=jzoicely&dl=1" width="38" height="38" editable="true" border="0" alt="" 
/></a></td>
<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left; border-radius: 50%;"><a href="#" target="_blank"><img src="https://www.dropbox.com/scl/fi/3lvuestklde3r4wkw7c4t/t10_ico_twitter.jpg?rlkey=4w8fa0iekv79x2tmokb9bm950&st=vgkzvabc&dl=1" width="38" height="38" editable="true" border="0" alt="" /></a></td>
<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left; border-radius: 50%;"><a href="#" target="_blank"><img src="https://www.dropbox.com/scl/fi/kxssnbvc42zpdf4rowhde/t10_ico_instagram.jpg?rlkey=pba9aus4xg7k1s45x9yvw9ndw&st=88p9zvf7&dl=1" width="38" height="38" editable="true" border="0" alt="" /></a></td>
</tr>
</table>
</td>
</tr>-->
<tr>
<td class="text-footer1 pb10" style="color:#fff; font-family:'Poppins', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;"><multiline>BodyDynamix</multiline></td>
</tr>
<tr>
<td class="text-footer2 pb30" style="color:#fff; font-family:'Poppins', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:30px;"><multiline>East Pixel Bld. 99, Beach City 90210, California USA</multiline></td>
</tr>
<tr>
<!--<td class="text-footer3" style="color:#999999; font-family:'Poppins', Arial,sans-serif; font-size:12px; line-height:18px; text-align:center;"><unsubscribe class="link2" style="color:#999999; text-decoration:none;"><span class="link2-u" style="color:#999999; text-decoration:underline;">Unsubscribe</span> from this mailing list.</unsubscribe></td>-->
</tr>
<tr>
    <td style="text-align: center;
  background-color: white;
  padding: 1rem;">
    <img style="width: 50%; margin: 0 auto;" src="https://www.dropbox.com/scl/fi/ywti325ik85k3dhsgssrc/Q8774_BDX-1-1.png?rlkey=h8h60vf32dmc5mkyfl4eqcf4h&st=44bimnxk&dl=1" width="300" height="300" editable="true" border="0" alt="" />
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
  `;

  // ********************************
  // Return Email Template Artifacts
  // ********************************
  const emailHTMLProps = { title: subject, body: htmlBody },
    htmlTemplate = buildHTMLBodyEmail(emailHTMLProps);

  return { subject, textBody, htmlTemplate };
};
