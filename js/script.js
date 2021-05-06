

function scrollToElement(el){
	$('html, body').animate({
        scrollTop: el.length ? el.offset().top : 0
    }, 300);
}
function scrollToA(aName){
	scrollToElement($("a[name="+aName+"]"));
}


function setCookie(cname, cvalue, exdays) {
	var expires = "";
	if(exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString() + ";";
   }
    document.cookie = cname + "=" + cvalue + ";" + expires + "path=/";
    console.log(document.cookie);
} 
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
} 
$("#appBannerAndroid").click(function(){
	$("body").removeClass("appBannerAndroid");
	var c = getCookie("appBannerAndroidDisabled");
	if(!c) c = 0;
	c++;
	setCookie("appBannerAndroidDisabled", c, 1);
});

var is_mobile = $("body").hasClass("phone");


/* Script generici sito */
$(document).ready(function() {
	
	
	$(".scrollTo").click(function(){
		var url = $(this).attr("href");
		scrollToA(url.substring(url.indexOf("#")+1));
		return false;
	});

	/*---------------------------- animazioni (con libreria animate.css) -------------------------------------- */
	$(".info-message.animated").addClass('animated-shake');	
	//$(".info-message.alert").addClass('animated  slideInDown');	

	/*---------------------------- messaggi  -------------------------------------- */


	$(".info-message.info-message[data-type=fade]").show(function() {
				$(this).delay($(this).attr("data-time")).fadeOut("slow");							  
												  
	});

	//da mettere js-close
	$('.info-message .close').click(function(e) {
			e.preventDefault();
			$(this).closest(".info-message").fadeOut();
	}); 

	var scrollMonitor = true;
	 
	 /* scroll manuale su link con ancora, è necessario dare la classe .scroll */
	$("a.scroll").click(function(event){     
		event.preventDefault();
		
		if($(this).hasClass("disabled")) return;
		var hhh = this.hash;
		var hhh2 = hhh.replace('#','');
		if(hhh == "" || hhh2 == "top")  $("html, body").animate({ scrollTop: "0" });
		
		var elemento  = $('a[name='+hhh2+']');
		if(!elemento.size()) elemento = $(hhh);
		
		$("a.scroll").removeClass("selected");
		$(this).addClass("selected");
		scrollMonitor = false;
		indi_scroll(elemento, function(){
			scrollMonitor = true;
		});
		history.pushState({}, null, this.href);
		// window.location.href = this.href;
		
	});
	
	
	var categoriaDaSelezionare = 0;
	var categorieInView = [];
	function updateNavigationLinks(){
		
		// console.log(categorieInView);
		// if(!categorieInView.length) return;//rimane visibile l'ultima
		$("a.scroll").removeClass("disabled");
		var categorieConArticoli = [];
		if(typeof tutteLeCategorie !== 'undefined'){
			for(var i in tutteLeCategorie){
				var id = tutteLeCategorie[i];
				// console.log($("#categoria_"+id+" .entry:visible"));
				if($("#categoria_"+id+" .entry:visible").length) categorieConArticoli.push(id);
				else $(".scroll_categoria_"+id).addClass("disabled");
				// console.log($(".scroll_categoria_"+id));
			}
		}
		
		if(!categorieConArticoli.length) $("#searchNoResults").show();
		else $("#searchNoResults").hide();
		
		
		var piuAlta = null;
		if(categoriaDaSelezionare) piuAlta = $(".scroll_categoria_"+categoriaDaSelezionare);
		else{
			var piuAltaPos = null;
			var piuAltaTop = null;
			for(var i in categorieInView){
				var e = $(".scroll_categoria_"+categorieInView[i]);
				//nelle categorieInView ci sono anche quelle display:none http://imakewebthings.com/waypoints/guides/debugging/
				var pos = categorieConArticoli.indexOf(categorieInView[i]);
				if(pos == -1) continue;
				
				/*
				var t = e.offset().top;
				if(!piuAltaTop || piuAltaTop > t){
					piuAlta = e;
					piuAltaTop = t;
				}
				*/
				
				if(piuAltaPos == null || piuAltaPos > pos){
					piuAlta = e;
					piuAltaPos = pos;
				}
				
			}
		}
		
		if(scrollMonitor && piuAlta){
			$("a.scroll").removeClass("selected");
			$(piuAlta).addClass("selected");
			// console.log(piuAlta);
		}
	}
	
	if(typeof tutteLeCategorie !== 'undefined'){

		for(var i in tutteLeCategorie){
			var id = tutteLeCategorie[i];
			// console.log(id);
			var a = $("#categoria_"+id)[0]; 
			
			if(a){
				var altezzaRicerca = $("#prodotti").css("padding-top");
				
				new Waypoint({
					element: a,
					offset:altezzaRicerca,
					handler: function(direction) {
						// if(direction == 'up'){
							categoriaDaSelezionare = this.element.id.substring(10);
							// console.log('entrato verso ' + direction +": "+$("#categoria_"+categoriaDaSelezionare+" h2 span").text());
							updateNavigationLinks();
						// }
					},
				});
				
				
				// new Waypoint({
					// element: a,
					// offset:altezzaRicerca,
					// handler: function(direction) {
						// if(direction == 'up'){
							// categorieInView.push(this.element.id.substring(10));
							// console.log('entrato verso ' + direction +": "+this.element.id);
							// updateNavigationLinks();
						// }
					// },
				// });
				// new Waypoint({
					// element: a,
					// offset: function() {
					  // return -this.adapter.outerHeight()+altezzaRicerca;
					// },
					// handler: function(direction) {
						// if(direction != 'up'){
							// var id = this.element.id.substring(10);
							// categorieInView = categorieInView.filter(function(value){
								// return value != id;
							// });
							// updateNavigationLinks();
							// console.log('uscito verso ' + direction +": "+this.element.id);
						// }
					// },
				// });
				
				
				// new Waypoint.Inview({
					// element: a,
					// enter: function(direction) {
						// categorieInView.push(this.element.id.substring(10));
						// // console.log('entrato verso ' + direction +": "+this.element.id);
						// updateNavigationLinks();
					// },
					// exited:function(direction){
						// var id = this.element.id.substring(10);
						// categorieInView = categorieInView.filter(function(value){
							// return value != id;
						// });
						// updateNavigationLinks();
						// // console.log('uscito verso ' + direction +": "+this.element.id);
					// },
				// });
			}
		}
	}
	
	
	
	
	if($("#carrello_waypoint_trigger").length > 0){
		
		var stickable = false;
		
		function updateStickyEnabled(){
			
			$("body").removeClass('cerca_sticky categorie_sticky carrello_sticky');
			if(stickable){
				var wH = $(window).height();
				var headerHeight = $("body").hasClass("navFixed") ? $("header").height() : 0;
				var toggleStickyClass = 'cerca_sticky';
				if(wH - headerHeight > $("#categorie").height()) toggleStickyClass += ' categorie_sticky';
				if(wH - headerHeight > $("#cart-cont").height()) toggleStickyClass += ' carrello_sticky';
				$("body").addClass(toggleStickyClass);
				
				if($(".header_scrolled").length > 0){
					// $(".header_scrolled").show();
					$("#categorie").css("top", ($(".header_scrolled").innerHeight() + scroll_top_offset) + "px");
					$("#cart-cont").css("top", ($(".header_scrolled").innerHeight() + scroll_top_offset) + "px");
					$("#filtraggio").css("top", ($(".header_scrolled").innerHeight() + scroll_top_offset) + "px");
				}
				
			}
			else{
				$("#categorie").css("top", scroll_top_offset + "px");
				$("#cart-cont").css("top", scroll_top_offset + "px");
				$("#filtraggio").css("top", scroll_top_offset + "px");	
			}
			
		}
	
		new Waypoint.Inview({
			element: document.getElementById("carrello_waypoint_trigger"),
			enter: function(direction) {
				stickable = false;
				updateStickyEnabled(true);
				setTimeout(updateStickyEnabled, 200);//scrollando velocemente a volte non fa il calcolo giusto alla prima
			},
			
			exited:function(direction){
				if(direction == "down"){
					stickable = true;
					updateStickyEnabled(true);
					setTimeout(updateStickyEnabled, 200);//scrollando velocemente a volte non fa il calcolo giusto alla prima
				}
			},
			
		});		
		
		updateStickyEnabled();
		$(window).resize(updateStickyEnabled);
		
	}

	var fullHtmlProdotti = $("#prodotti-cells").html();
	function cercatoLocal(){
		var like = $("#likeFilterLocal").val();
		
		$("#prodotti-cells").html(fullHtmlProdotti);
		
		if(like){
			for(var i in localFilter){
				var e = $("#prodotti .entry#"+i);
				if(localFilter[i].toLowerCase().indexOf(like.toLowerCase()) == -1) e.remove();
			}
			$("#prodotti .cell_group").each(function(i,e){
				var ee = $(e);
				ee.show();//altrimenti non posso usare .entry:visible
				if($(".entry:visible", ee).length){
					ee.show();
				}
				else ee.hide();
			});
		}
		$("html, body").animate({ scrollTop: $("main .wrap_main").offset().top + 1});/*+1 perchè con zero risultati faceva sparire il box di ricerca (non andava sticky)*/
		Waypoint.refreshAll();
		updateNavigationLinks();
	}
	$("#likeFilterLocal").live('keyup', cercatoLocal);
	if($("#likeFilterLocal").val()) cercatoLocal();

	// $(".wayPoint").each(function(i, e){
		
		// var classes = e.className.split(' ');
		// var target = '';
		// for(var i in classes) if(classes[i].substring(0, 15) == 'menu_categoria_') target = classes[i];
		
		
		// if(target) new Waypoint.Inview({
		  // element: e,
		  // enter: function(direction) {
			// console.log('enter ' + target)
		  // }
		// });
	// });	
	
	
});	



/* ---------------------------- funzioni -------------------------- */


/* funzione generica di scroll */	
function indi_scroll(elemento, complete){
	var top = 0;
	if(elemento.length) top = elemento.offset().top;
	$("html, body").animate({scrollTop: top}, 500, 'swing', complete);	
}
 
 
/*
 * console.log risolve errore di consol.log lasciati per sbaglio
 */
 
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



/*
 * Track Google Analitycs Events
 */
	
if (typeof jQuery != 'undefined') {
	  jQuery(document).ready(function($) {
		var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
		var baseHref = '';
		if (jQuery('base').attr('href') != undefined) baseHref = jQuery('base').attr('href');
	 
		jQuery('a').on('click', function(event) {
		  var el = jQuery(this);
		  var track = true;
		 
	
		 
//		 var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') :"";
		var href = "";
		if (typeof(el.attr('href')) != 'undefined') {
			href = el.attr('href');
		} else {
			href = "";	
		}
		 
		 var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
		  if (!href.match(/^javascript:/i)) {
			var elEv = []; elEv.value=0, elEv.non_i=false;
			if (href.match(/^mailto\:/i)) {
			  elEv.category = "email";
			  elEv.action = href.replace(/^mailto\:/i, '');
			  elEv.label = href.replace(/^mailto\:/i, '');
			  elEv.loc = href;
			}
			
			else if (href.match(filetypes)) {
			  var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
			  elEv.category = "download";
			  elEv.action = extension[0];
			  elEv.label = href.replace(/ /g,"-");
			  elEv.loc = baseHref + href;
			
			}
			
			else if (href.match(/^tel\:/i)) {
			  elEv.category = "telephone";
			  elEv.action = "click";
			  elEv.label = href.replace(/^tel\:/i, '');
			  elEv.loc = href;
			} else {
				track = false;
			}

			if (track) {
			
				if (typeof _gaq !== 'undefined') {
					/* vecchia versione analytics */
			  		_gaq.push(['_trackEvent', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, elEv.non_i]);
			  	} else if (typeof ga !== 'undefined') {
			  		/* nuova versione analytics 30/09/2016 */
			  		ga('send', 'event', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, elEv.non_i);
			  	} else {
				  	console.log("errore non definto funzione event di analytics (vedi script.js)");
				}
		 
			 if ( el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank') {
				setTimeout(function() { location.href = elEv.loc; }, 400);
				return false;
		 	 }
			}
		  }
		});
	  });
}







