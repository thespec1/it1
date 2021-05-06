/*
function _getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? _transformToAssocArray(prmstr) : {};
}

function _transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

function _getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
*/

//crea stile dinamicamente, da evitare per problemi di rendering
/*
function _createCSSSelector(selector, style) {
    if(!document.styleSheets) {
        return;
    }

    if(document.getElementsByTagName("head").length == 0) {
        return;
    }

    var stylesheet;
    var mediaType;
    if(document.styleSheets.length > 0) {
        for( i = 0; i < document.styleSheets.length; i++) {
            if(document.styleSheets[i].disabled) {
                continue;
            }
            var media = document.styleSheets[i].media;
            mediaType = typeof media;

            if(mediaType == "string") {
                if(media == "" || (media.indexOf("screen") != -1)) {
                    styleSheet = document.styleSheets[i];
                }
            } else if(mediaType == "object") {
                if(media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
                    styleSheet = document.styleSheets[i];
                }
            }

            if( typeof styleSheet != "undefined") {
                break;
            }
        }
    }

    if( typeof styleSheet == "undefined") {
        var styleSheetElement = document.createElement("style");
        styleSheetElement.type = "text/css";

        document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

        for( i = 0; i < document.styleSheets.length; i++) {
            if(document.styleSheets[i].disabled) {
                continue;
            }
            styleSheet = document.styleSheets[i];
        }

        var media = styleSheet.media;
        mediaType = typeof media;
    }

    if(mediaType == "string") {
        for( i = 0; i < styleSheet.rules.length; i++) {
            if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.rules[i].style.cssText = style;
                return;
            }
        }

        styleSheet.addRule(selector, style);
    } else if(mediaType == "object") {
        for( i = 0; i < styleSheet.cssRules.length; i++) {
            if(styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
        }

        styleSheet.insertRule(selector + "{" + style + "}", styleSheet.cssRules.length);
    }
}
*/
/*
function _cookie_infoCookies(cookie_name) {
	//testi
	var _cookie_info = {
			'it-it': {
				id_utente:"Test Descrizione 1 ITA"
				
			},
			'en-en': {
				id_utente:"Test Descrizione 1 ENG"
				
			},
		
		};



	//estraggo codice
	var cod =  cookie_name.split("=")[0];
	if(_cookie_info[_cookie_lang][cod]) return cod + ' ('+_cookie_info[_cookie_lang][cod]+')';
	
	return cod;

}
*/
/*
function _cookie_listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '<ol>';
    for (var i = 1 ; i <= theCookies.length; i++) {
      if(theCookies[i-1])  aString += '<li>' + ' ' + _cookie_infoCookies(theCookies[i-1]) + "</li>";
	
    }

    aString += '<ol>';
	
    return aString;
}
*/
/*
function _cookie_supportsRGBA()
{
	if(!('result' in arguments.callee))
	{
		var scriptElement = document.getElementsByTagName('script')[0];
		var prevColor = scriptElement.style.color;
		var testColor = 'rgba(0, 0, 0, 0.5)';
		if(prevColor == testColor)
		{
			arguments.callee.result = true;
		}
		else
		{
			try {
				scriptElement.style.color = testColor;
			} catch(e) {}
			arguments.callee.result = scriptElement.style.color != prevColor;
			scriptElement.style.color = prevColor;
		}
	}
	return arguments.callee.result;
}
*/
/*
function mod_pc_resize_box(elem) {
	//cecca per ridimensionare div/iframe (più che altro per iphone)
	return;
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);		
	elem.style.width = (w * elem.getAttribute("data-width-coeff")) + "px";
			
	if (document.getElementById("_cookie_popup_iframe")) {
		document.getElementById("_cookie_popup_iframe").style.width = (w * elem.getAttribute("data-width-coeff")) + "px";
		console.log(document.getElementById("_cookie_popup_iframe").contentDocument);
		console.log(document.getElementById("_cookie_popup_iframe").contentDocument.getElementById("mod_pc_iframe_interno"));
		if (document.getElementById("_cookie_popup_iframe").contentDocument.getElementById("mod_pc_iframe_interno")) {
			document.getElementById("_cookie_popup_iframe").contentDocument.getElementById("mod_pc_iframe_interno").style.width = (w * elem.getAttribute("data-width-coeff")) + "px";
		}
	}
	if (typeof _cookie_popup_cont_iframe !== 'undefined') {
		_cookie_popup_cont_iframe.style.width = (w * elem.getAttribute("data-width-coeff")) + "px";
	}
}
*/
//cecca, resize del box su resize window
/*
if(window.attachEvent) {
window.attachEvent('onresize', function() {
		mod_pc_resize_box(_cookie_popup);		
	});
} else if(window.addEventListener) {
window.addEventListener('resize', function() {
	mod_pc_resize_box(_cookie_popup);
	}, true);
} else {
	//The browser does not support Javascript event binding
}
*/


function _isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function _cookie_scrivi (key, value, days) {
	var c = '';
	if(days) {
		var date = new Date();
		days = days || 365;
		date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
		c = key + "=" + value + "; expires=" + date.toGMTString();
		
		
	} else {
		c = key + "=" + value;
	}
	window.document.cookie = c+"; path=/;";
	return value;
	
};


//getElementsByClassName compatibile
function _gebcn(cn){
    if(document.getElementsByClassName) // Returns NodeList here
        return document.getElementsByClassName(cn);

    cn = cn.replace(/ *$/, '');

    if(document.querySelectorAll) // Returns NodeList here
        return document.querySelectorAll((' ' + cn).replace(/ +/g, '.'));

    cn = cn.replace(/^ */, '');

    var classes = cn.split(/ +/), clength = classes.length;
    var els = document.getElementsByTagName('*'), elength = els.length;
    var results = [];
    var i, j, match;

    for(i = 0; i < elength; i++){
        match = true;
        for(j = clength; j--;)
            if(!RegExp(' ' + classes[j] + ' ').test(' ' + els[i].className + ' '))
                match = false;
        if(match)
            results.push(els[i]);
    }

    // Returns Array here
    return results;
}

//funzione per leggere un cookie cross browser
function _cookie_readCookie(k,r){return(r=RegExp('(^|; )'+encodeURIComponent(k)+'=([^;]*)').exec(document.cookie))?r[2]:null;}

function _cookie_popup_iframe(src,ccc) {
	
	var _cookie_popup =  document.getElementById('_cookie_popup_iframe_wrapper');
	_cookie_popup.innerHTML="<iframe id='_cookie_popup_iframe' class='"+ccc+"' src='"+src+"' marginheight='0' marginwidth='0' frameborder='0'></iframe>";
	
}

//---------------------- STARTTTTTTTTTTTT -------------------------
		
		
//variabili default
if(typeof mod_pc_menu_template_class == "undefined") var mod_pc_menu_template_class 			= 	'';
if(typeof mod_pc_cookie_banner == "undefined") var mod_pc_cookie_banner 			= 	1;
if(typeof mod_pc_cookie_banner_bg == "undefined") var mod_pc_cookie_banner_bg 		= 	'';
if(typeof mod_pc_cookie_banner_template == "undefined") {
	var mod_pc_cookie_banner_template = '<div id = "_cookie_banner" style="text-align: left; font-family: Arial, sans-serif; font-size:16px; line-height: 1.2; color:#FFF; padding:20px 30px; margin:0; background-color:#000; background-color:rgba(0,0,0,0.8);" ><a id="_cookie_banner_close" style="float:right; margin:0px 0px 15px 15px; color:#000; background-color: #FFF; border: 0 none;border-radius: 4px;cursor: pointer;font-weight: bold;padding: 4px 10px;box-shadow: 0 0 5px rgba(0, 0, 0, 0.35);">X</a><span class="_cookie_banner_title" style="display:block;font-size:20px;font-weight:bold; margin:0 0 5px 0; padding:0">';
	if (typeof mod_pc_lang == "undefined" || mod_pc_lang == "ita") {
		mod_pc_cookie_banner_template 	+= 	'Utilizzo dei cookies</span>Utilizziamo cookie proprietari e di terze parti al fine di migliorare i nostri servizi. Navigando il sito o chiudendo questo banner, accetti di installare dei cookie da parte nostra. Per informazioni o per modificare la configurazione dei cookie, consulta la nostra pagina <a class="_cookie_popup_link" href="#" style = "color:#FFF; text-decoration:underline; font-weight:bold;">politica relativa ai cookie.</a></div>';
	} else {
		//eng 
		mod_pc_cookie_banner_template 	+= 	'Use of cookies</span>We use cookies, third party cookies in order to improve our services. Browsing the site, you accept the use of cookies by us. For more information or to find out how to change the configuration, please see our page <a class="_cookie_popup_link" href="#" style = "color:#FFF; text-decoration:underline; font-weight:bold;">policy on cookies.</a></div>';
	}
}

/*
mod_pc_cookie_iframe_src
mod_pc_privacy_iframe_src
mod_pc_dsa_iframe_src
mod_pc_menu_template
mod_pc_menu_template_class
*/



//---------------------- MENU E POPUP -------------------------
//attacco i link per i popup alle classi relative
	
if(typeof mod_pc_menu_template != "undefined" && mod_pc_menu_template_class ) {
		
	var _pc_menu 			=  _gebcn(mod_pc_menu_template_class);
	_pc_menu[0].innerHTML	=	_pc_menu[0].innerHTML + mod_pc_menu_template;
		
}


//---------------------- popup (sempre) -------------------------
		
if(typeof mod_pc_baseurl == "undefined") var mod_pc_baseurl = '';

//sistemo baseurl
if(mod_pc_baseurl.indexOf("?") == -1) {
	mod_pc_baseurl = mod_pc_baseurl+"?";
} else {
	mod_pc_baseurl = mod_pc_baseurl+"&";
}

//loop popup privacy
if(typeof mod_pc_cookie_iframe_src == "undefined") var mod_pc_cookie_iframe_src = mod_pc_baseurl+'t=cookie';
var _privacy_popup_link =  _gebcn('_privacy_popup_link');

//loop popup cookie
if(typeof mod_pc_privacy_iframe_src == "undefined") var mod_pc_privacy_iframe_src = mod_pc_baseurl+'t=privacy';
var _cookie_popup_link =  _gebcn('_cookie_popup_link');

//loop popup dsa
if(typeof mod_pc_dsa_iframe_src == "undefined") var mod_pc_dsa_iframe_src = mod_pc_baseurl+'t=dsa';
var _dsa_popup_link =  _gebcn('_dsa_popup_link');

//--------------- BANNER ------------
if(!_cookie_readCookie("_cookie_ok") && typeof mod_pc_cookie_iframe_src != "undefined") {

			
		//faccio popup
		if(mod_pc_cookie_banner && mod_pc_cookie_banner_template && mod_pc_cookie_iframe_src) {
			
		
				
			var _cookie_banner_cont=document.createElement("div");
			
				_cookie_banner_cont.id = "_cookie_banner_cont";
				//aggiungo template
				_cookie_banner_cont.innerHTML=mod_pc_cookie_banner_template;

				document.body.appendChild(_cookie_banner_cont);

				//bottone di chiusura banner e funzione javascript
				var _cookie_banner_close =  document.getElementById('_cookie_banner_close');
					_cookie_banner_close.onclick = function() {
						
							//scrivo cookie
							_cookie_scrivi('_cookie_ok',1,5*365);
						
							//chiudo banner e popup
							_cookie_banner_cont.style.display = "none";
							
							document.getElementsByTagName("html")[0].style.overflow = "auto";
					
							return false;
					}
		}
}



if(_privacy_popup_link || _cookie_popup_link || _cookie_banner_cont) {
	
	var _pc_css = "\
				\
				#_cookie_banner_cont {\
				\
					width: 100%;\
					padding: 0px;\
					margin: 0px;\
					box-shadow: 0 0 15px rgba(0,0,0,0.25);\
					position: fixed;\
					z-index: 10000000;\
					bottom: 0;\
				}\
				#_cookie_popup_cont {\
					\
					 background:rgb(128, 128, 128);\
					 background:rgba(0, 0, 0, 0.65);\
					display: none;\
					font-family: Arial,sans-serif;\
					font-size: 14px;\
					height: 100%;\
					left: 0;\
					line-height: 1.4;\
					position: fixed;\
					top: 0;\
					width: 100%;\
					z-index: 11000000;\
				}\
				\
				#_cookie_popup {\
					\
					border: 0 none;\
					border-radius: 6px;\
					background-color: white;\
					box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);\
					color: gray;\
					line-height: 1.6;\
					padding: 14px;\
					position: relative;\
					width: 90%;\
					height: 80%;\
					margin: 5% auto;\
				}\
				\
				#_cookie_popup_iframe_wrapper {\
				\
					border: 0 none;\
					height: 100%;\
					margin: 0;\
					padding: 0;\
					width: 100%;\
  					overflow-x: hidden;\
					overflow-y: auto;\
					-webkit-overflow-scrolling: touch;\
				}\
				\
				#_cookie_popup_iframe {\
					border: 0 none;\
					height: 98%;\
					margin: 0;\
					padding: 0;\
					position: relative;\
					width: 100%;\
					\
				}\
				\
				#_cookie_popup_cont_close {\
				\
			   		background-color: #000;\
					border: 0 none;\
					padding:4px 10px;\
					border-radius: 4px;\
					box-shadow: 0 0 5px rgba(0, 0, 0, 0.35);\
					color: white;\
					font-family: Arial,sans-serif;\
					font-size: 16px;\
					font-weight: bold;\
					margin: 0;\
					position: absolute;\
					top:-18px;\
					right:-18px;\
					z-index: 12000000;\
					cursor:pointer;\
				\
				}\
				\
				@media (max-width: 768px) {\
					#_cookie_popup_cont_close {\
						top:10px;\
						right:10px;\
					}\
				}\
	\
	";
	
	head = document.head || document.getElementsByTagName('head')[0],
	_pc_style = document.createElement('style');
	
	_pc_style.type = 'text/css';
	if (_pc_style.styleSheet){
		_pc_style.styleSheet.cssText = _pc_css;
	} else {
		_pc_style.appendChild(document.createTextNode(_pc_css));
	}
	
	head.appendChild(_pc_style);

	
	var _cookie_popup_cont=document.createElement("div");
		_cookie_popup_cont.id = "_cookie_popup_cont";
		_cookie_popup_cont.innerHTML="<div id=\"_cookie_popup\"><a id=\"_cookie_popup_cont_close\">X</a><div id=\"_cookie_popup_iframe_wrapper\"></div></div>";
		document.body.appendChild(_cookie_popup_cont);

		
	//bottone chiusura popup da dentro il popup
	var _cookie_popup_cont_close =  document.getElementById('_cookie_popup_cont_close');
		_cookie_popup_cont_close.onclick = function() {
			
				_cookie_popup_cont.style.display = "none";
				document.getElementsByTagName("html")[0].style.overflowY = "auto";

				return false;
		}
					
		
		
	if(_privacy_popup_link) {	
		for (var i = 0; i < _privacy_popup_link.length; i++) {
		
			//popup modale
			_privacy_popup_link[i].onclick = function() {
				
						//cerco di capire se sono in un popup
						
						
						
						parent.document.getElementsByTagName("html")[0].style.overflowY = "hidden";  //tolgo la scrollbare, e faccio un popup modale
						parent._cookie_popup_iframe(mod_pc_privacy_iframe_src,'privacy');
						parent._cookie_popup_cont.style.display = "block";
					
						return false;
			}
		}
	}
	
	if(_cookie_popup_link) {	
		for (var i = 0; i < _cookie_popup_link.length; i++) {
			//popup modale
			_cookie_popup_link[i].onclick = function() {
				
						parent.document.getElementsByTagName("html")[0].style.overflowY = "hidden";  //tolgo la scrollbare, e faccio un popup modale
						parent._cookie_popup_iframe(mod_pc_cookie_iframe_src,'cookie');
						parent._cookie_popup_cont.style.display = "block";
				
						return false;
			}
		}
	}
	
		
	if(_dsa_popup_link) {	
		for (var i = 0; i < _dsa_popup_link.length; i++) {
			//popup modale
			_dsa_popup_link[i].onclick = function() {
				
						parent.document.getElementsByTagName("html")[0].style.overflowY = "hidden";  //tolgo la scrollbare, e faccio un popup modale
						parent._cookie_popup_iframe(mod_pc_dsa_iframe_src, 'dsa');
						parent._cookie_popup_cont.style.display = "block";
				
						return false;
			}
		}
	}
						
	if(_isIE() > 8 || !_isIE()) {
		//click fuori dal popup	(non compatibile ie8)
		document.onclick = function(e) {
			if(e.target == document.getElementById('_cookie_popup_cont')) {
					_cookie_popup_cont.style.display = "none"; 
					document.getElementsByTagName("html")[0].style.overflow = "auto";
			} 
		}
	}
	
	
}
