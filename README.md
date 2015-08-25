# Email Template Generator
Provides a simple way to template and turn around emails

# Features:
Fetches RSS information for specified sites. Pulls content, link, title, and image  
Add stories to an email template with the click of a button  
The user is presented with 9 RSS stories by clicking "Get Stories"  
Per-client RSS fetching  
Per-client email templates  
Variable linking practices  
Highly customizable utm-campaign tracking  
Automatic date-based keycode generation  
Custom advertisement insertion  
Fully responsive emails  
Styles and link tracking are inlined - no need to ever touch HTML!  

# Known Issues:
1.) In SmartFocus, you may see {cke_protected} or {C} appear at the top of your email.   
Switch to source and remove the following two blocks of text: <!-- SUBJECT LINE: --> and <!-- KEYCODE: -->  




# Technologies Used  
jQuery/jQuery UI  
[JSRender by Boris Moore](https://github.com/borismoore/jsrender)  for template rendering  
[string.js](http://stringjs.com/#methods/times-n)  for string manipulation  
[Sweet Alert](http://t4t5.github.io/sweetalert/)  
SOAP/RESTful API Integrations for [SmartFocus](http://www.smartfocus.com/) and [DMS](http://dmsgs.com/) (Email Service Providers)  
[SimplePie](http://simplepie.org/)  for RSS scraping  
[Mandrill](https://mandrillapp.com/) for email testing    
[wysihtml](https://github.com/Voog/wysihtml) for rich text support  
[ZeroClipboard](https://github.com/zeroclipboard/zeroclipboard) for "click to copy" function  
[Bootstrap](http://getbootstrap.com/)
