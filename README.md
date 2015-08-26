# Email Template Generator  
Provides a simple way to template and turn around responsive, analytic-enabled emails  

# Features:  
Integrations with Email Service Provider (ESP) API's (SOAP and REST) for one-click submission to external platform  
Fetches RSS information for specified sites. Pulls content, link, title, and image  
Add stories to an email template with the click of a button  
The user is presented with 9 RSS stories by clicking "Get Stories"  
Per-client RSS fetching  
Per-client email templates  
Variable linking practices  
Highly customizable utm-campaign tracking  
Automatic date/client/advertisement keycode generation  
Custom advertisement insertion  
Fully responsive emails  
Styles and link tracking are inlined - no need to ever touch HTML!   
Users can also open a preview window, automatically copy the Keycode and/or the full HTML (useful when copy pasting to email clients!) to their clipboard, or download the .html file to their desktop.   

# How To Use This Tool  

You can make a responsive email in less than 30 seconds with this tool. Here's how.  

###Step 1: Assembling the Keycode  

*We need a keycode in order to track our email clicks with our analytics tools. This lets us identify high-performing emails and stories.* 

Keycode format: [YYMMDD][Client][Template][*Optional: Advertisement Code*]  
For example: 150523SAMPLEDBCAMPAIGN3  

1. Select the mailing date using the calendar  
2. Select the client name  
3. Select the type of email (these are your different templates for each client)  
4. (Optional) Select the advertisement you'd like to include in the email  

###Step 2: Making The Content  
1. Click the **Get Recent Stories** button   
  * This reads the RSS feed for the site you've selected.   
  * You will be shown the last 9 stories. 
2. Let's add our first story. Find a headline that you like, and click the **Add to Story 1** button underneath it.  
  * This will load the story's headline, description, image, and link into the Story 1 input form.  
  * The description will automatically be stripped of stray HTML tags, and in-line links will be removed.  
3. That was pretty easy! Go ahead and add 3 more stories, until all of the story forms are full.  
4. If you need to, modify the headlines or descriptions now.  
5. Fill in the **Subject Line**. This will be the first thing people see in their inbox - make it good!  
6. Click the **Generate HTML** button.  
  * All links will be appended with UTM's. The UTM string will use the Keycode.
  * The template will be rendered with the appropriate information.  
  
###Step 3: You're Done  

##### Congratulations. You can now:  

 * Copy the keycode to your clipboard by clicking **Copy Keycode**  
 * Copy the email HTML to your clipboard by clicking **Copy HTML**  
 * Download the .HTML file to your hard drive by clicking **Download**  
 * Preview the window in a new window by clicking **Preview**  
 * Submit the email to the DMS Database by clicking **Send to DMS**  
   * The subject line will be prepended with "[TEST]"   
   * The "To", "From", etc. headers are submitted to DMS along with the email.  
   * The email will automatically be submitted to the correct list  
   * The plaintext version of the email is generated using html2text  
 * Submit the email to the SmartFocus Database by clicking **Send to SmartFocus**  
   * The "To", "From", etc. headers are submitted to SmartFocus along with the email.  
   * The plaintext version is automatically generated using html2text  

# Tips  

**If something isn't working, clear your cache!**

If you make changes to any of the input fields (date, descriptions, etc), click "Generate HTML" to view your updated changes.    
Links will be formatted like this: www.sample.com/?utm_source=150523SAMPLEDBCAMPAIGN2&utm_medium=email&utm_campaign=150523SAMPLEDBCAMPAIGN2  

# Known Issues:  
1.) In SmartFocus, you may see {cke_protected} or {C} appear at the top of your email.   
Switch to source and remove the following two blocks of text: <!-- SUBJECT LINE: --> and <!-- KEYCODE: -->  


# Technologies Used  
HTML/CSS/Javascript/PHP/MySQL  
jQuery/jQuery UI  
[JSRender by Boris Moore](https://github.com/borismoore/jsrender)  for template rendering  
[string.js](http://stringjs.com/#methods/times-n)  for string manipulation  
[html2text](http://www.chuggnutt.com/html2text) for plain-text conversion  
[Sweet Alert](http://t4t5.github.io/sweetalert/)  
SOAP/RESTful API Integrations for [SmartFocus](http://www.smartfocus.com/) and [DMS](http://dmsgs.com/) (Email Service Providers)  
[SimplePie](http://simplepie.org/)  for RSS scraping  
[Mandrill](https://mandrillapp.com/) for email testing    
[wysihtml](https://github.com/Voog/wysihtml) for rich text support  
[ZeroClipboard](https://github.com/zeroclipboard/zeroclipboard) for "click to copy" function  
[Bootstrap](http://getbootstrap.com/)  

# Why This Tool Was Created  

Making responsive, unique, properly-tracked emails is hard work, especially when you make a lot of them on a tight deadline. There's a better way.  

##Here's the typical workflow to create an email before I made this tool:  

We typically make daily emails with 3-4 stories per email. The emails are typically formatted with a headline (linked) followed by a short teaser. Next, there are CTA (call to action) buttons (linked as well). Finally, there is an image that accompanies each story, which (you guessed it) also needed to be linked.  

We also needed to generate "Keycodes" to track our mailing patterns. A sample keycode goes YYMMDD/CLIENTNAME/EMAILTYPE (150523ALPACDB = ALPAC Daily Bulletin). Writing those keycodes by hand is annoying and prone to error. To top it off, the keycodes had to be entered into the UTM codes! This was creating hours of extra work.  

It was taking hours to assemble emails. Between formatting, pictures, updating links, checking UTM codes, making UTM codes, etc. - it was horrible.  

Open Dreamweaver, open up Chrome, open Notepad++, browse to the site I needed, open four different tabs. Then I needed to copy and paste relevant information back and forth across the screen. I had to get the headline, description, image, and link from each page. I also needed to be sure I generated and attached the correct Keycode/UTM pairing to each link. This was a pain in the ass.  

I am pretty quick with my mouse and keyboard, and it was still taking me 17-20 minutes to assemble these emails by hand. It was annoying, error-prone, monotonous work. I felt like I was trying to dig a hole with a Swiss Army knife.  
