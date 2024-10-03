export const buildHTMLBodyEmail = (emailProps) => `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en"  xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <title>
            ${emailProps.title}
        </title>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Poppins:400,400i,700,700i" rel="stylesheet" />
        <!--<![endif]-->
        <!--[if gte mso 9]>
            <style type="text/css" media="all">
                sup { font-size: 100% !important; }
            </style>
        <![endif]-->
        <style type="text/css" media="screen">
/* Linked Styles */
body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#919295; -webkit-text-size-adjust:none }
a { color:#104b7d; text-decoration:none }
p { padding:0 !important; margin:0 !important } 
img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
.mcnPreviewText { display: none !important; }

/* Mobile styles */
@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
.mobile-shell { width: 100% !important; min-width: 100% !important; }
.bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
.text-nav,
.text-header,
.m-center { text-align: center !important; }

.center { margin: 0 auto !important; }
.container { padding: 10px 10px 10px 10px !important }
.td { width: 100% !important; min-width: 100% !important; }

.mbr img { border-radius: 8px !important; }
.brl  { border-radius: 10px !important; }
.brr  { border-radius: 10px !important; }

.text-nav { line-height: 28px !important; }
.p30 { padding: 15px !important; }

.m-br-15 { height: 15px !important; }
.p30-15 { padding: 30px 15px !important; }
.p40 { padding: 20px !important; }

.m-td,
.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

.m-block { display: block !important; }

.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

.column,
.column-dir, 
.column-top,
.column-empty,
.column-empty2,
.column-dir-top { float: left !important; width: 100% !important; display: block !important; }
.column-empty { padding-bottom: 10px !important; }
.column-empty2 { padding-bottom: 20px !important; }
.content-spacing { width: 15px !important; }
}
</style>
</head>
<body>
    ${emailProps.body}    
</body>
</html>
`;
