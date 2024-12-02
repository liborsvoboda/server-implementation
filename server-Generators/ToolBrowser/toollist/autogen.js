/* 
- GROUPWARE SOLUTION GENERATORS 
- PREPARED 1000+ INTERACTIVE SOLUTIONS as EIC&ESB DATA LIBRARY
- EASY USE BY READ/WRITE of DB->WEB, WEB->DB over EDITORS/STUDIOS/VIEWERS/ETC..
- ALL SOLUTIONS can USE by COPY/PASTE ONLINE ONLY
- IMPLEMENTED Extentsions of AI, AUTOTRANSLATE FOR EASY HOW TO

 Format Description
 autogen[0] = server SUBPATH or FULLPATH value, for Server READ or INTERNET 
 autogen[1] = server SUBSHOT or FULLSHOT, FOR Take ScreenShot on Server OR INTERNET
 autogen[2-4] = dataset of [some.html],[some.md],[some.png]
 
 -THIS WILL BE Html Code Result
 autogen[5] = hard string AUTOSTART prefix of generated Html code
 autogen[6] = AUTOTEMPLATE template with "GENSHOW" for Show Name, GENPATH for Server or INTERNET path
 autogen[7] = hard string suffix of generated Html code
 autogen[8] = #elName for set $("#elName").html(newcode) in prepared Template.html 
 autogen[9] = [TRANSGEN-L] RTLB for position on TOP menu
 
 HTMLfiles/MDfiles/Gallery You can Change SHOW BY appended MENU
 Template.html after UPDATE is Renamed to Index.html
 
 let gsgendata=[
	["/distribute-library/WEB-APPS"],
	["/distribute-library/WEB-APPS"],
	["index.html,readme.html],
	["index.md,readme.md],
	["index.png,logo.png],
	["<ul id='test'>"],
	["<li href='GENSHOW' >GENPATH</li>"],
	["</ul>"],
	["#elementName"]
];

 */
let gsgendata=[
	[SUBPATH],
	[AUTOSHOT],
	
	[HTMLDATA],
	[MDDATA],
	[IMAGEDATA],
	
	[AUTOSTART],
	[AUTOTEMPLATE],
	[AUTOEND],
	[GENELEMENT],
	[TRANSGEN-L]
];
let generated="";
let autoprefix=""; 
let autotemplate=""; 

function autogenerate(){
	
}