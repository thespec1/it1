/* Script generici sito */
$(document).ready(function() {

	var is_mobile = $("body").hasClass("phone");
		
	$.fn.flash_message = function(options) {
      
      options = $.extend({
        text: 'Done',
        time: 3000,
        how: 'before',
        class_name: '',
        center: 'center'
      }, options);
      
      return $(this).each(function() {
        if( $(this).parent().find('.flash_message').get(0) )
          return;
        
        //console.log($(this));
        $(this).css("visibility", "visible");        
        var message = $('<span />', {
          'class': 'flash_message ' + options.class_name,
          html: options.text
        }).hide().fadeIn('fast');
        
        $(this)[options.how](message);
        if(options.center == 'center'){
        	$(this).center();
        } else if(options.center == 'center_horiz'){
        	$(this).center_horiz();
        }
        
        message.delay(options.time).fadeOut('normal', function() {
        		$(this).parent().css("visibility", "hidden");
         	$(this).remove();
        });
        
      });
    };
    
	jQuery.fn.center = function () {
    	this.css("position","absolute");
    	this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    	this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
   	return this;
	}  
	
	jQuery.fn.center_horiz = function () {
    	this.css("position","absolute");
    	this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
   	return this;
	}  	

// 	$("#tree").treeview({
// 		animated		: "fast",
// 		persist		: "location",
// 		collapsed	: true,
// 		unique		: true
// 	});


	$("a.dettaglio_ordine").click(function(e){
		e.preventDefault();

		var idOrdine = $(this).attr("idord");
		var selector = ".dettaglio_" + idOrdine;

		$(".dettaglio").not(selector).hide();
		$(selector).toggle();
		
	});
	
	

	$("a.popup_login").live('click', function(e){

		e.preventDefault();
		$.fancybox({
			'overlayColor': '#333',
			'overlayOpacity': 0.8,
			'height': 600,
			'width': 960,
			'padding': 0,
			'type': 'iframe',
			'href': $(this).attr("href"),
			'onComplete': function(){
				$("body").addClass("popup_opened");
			},
		});


	});

	$("a.categoria").live('click', function(e){
		e.preventDefault();
		var valore = $(this).attr("cid");
		var pagina = $(this).attr("pagina");
		
		$("a.categoria").removeClass("selected");
		$(this).addClass("selected");
		
		if(!pagina) pagina = 1;
		if($("input.categoriaAttuale").val() != valore){
			$("input.categoriaAttuale").val(valore);
			$("#likeFilter").val("");
		}
		$("input.paginaAttuale").val(pagina);
		
		
		$.post(linkAjax, {action:'getArticoliCategoria', categoria:valore, pagina:pagina, like:$("#likeFilter").val()},
			function(data){

				var obj = $.parseJSON(data);
				
				if(obj && obj.ret == 1){
					$(".articoli").html(obj.html);	
				} else {
					alert('Errore di comunicazione con il server');
				}
				
			}
		);
	});
	
	function cercato(){
		// var valore 	= $("input.categoriaAttuale").val();//faccio cercare in tutte le categorie fino a che non metto un feedback visivo vicino al cerca che indica che sto filtrando
		var valore 	= null;
		var pagina 	= 1;
		var like 	= $("#likeFilter").val();
		$("#filterLoading").fadeIn('fast');
		$.post(linkAjax, {action:'getArticoliCategoria', categoria:valore, pagina:pagina, like:like},
			function(data){
				$("#filterLoading").fadeOut('fast');
				var obj = $.parseJSON(data);
				var ret = obj.ret;
				if(obj.ret == 1){
					if($("main").length) $("html, body").animate({ scrollTop: $("main").offset().top });
					$(".articoli").html(obj.html);	
				} else {
					alert('Errore di comunicazione con il server');
				}
				
			}
		);
	}
	
	$("#likeFilter").live('keyup', cercato);
	if($("#likeFilter").val()) cercato();
	
	
	function cercato(){
		// var valore 	= $("input.categoriaAttuale").val();//faccio cercare in tutte le categorie fino a che non metto un feedback visivo vicino al cerca che indica che sto filtrando
		var valore 	= null;
		var pagina 	= 1;
		var like 	= $("#likeFilter").val();
		$("#filterLoading").fadeIn('fast');
		$.post(linkAjax, {action:'getArticoliCategoria', categoria:valore, pagina:pagina, like:like},
			function(data){
				$("#filterLoading").fadeOut('fast');
				var obj = $.parseJSON(data);
				var ret = obj.ret;
				if(obj.ret == 1){
					
					$(".articoli").html(obj.html);	
				} else {
					alert('Errore di comunicazione con il server');
				}
				
			}
		);
	}
	
	function preventDefaultAndGetArticoloFromName(e, el){
		e.preventDefault();
		var n = $(el).attr("name");
		
		return n.substr("articolo_".length);
	}
	
	$(".aggiungi_articolo").live('click', function(e){
		
		$.post(linkAjax, {action:"aggiungiCarrello", articolo:preventDefaultAndGetArticoloFromName(e, this)},
			function(data){
				var obj = $.parseJSON(data);
				var ret = obj.ret;			
				if(obj.ret == 1){
					aggiornaCarrelloHtml(obj);
					// $(".carrello").html(obj.html);
					// $('#status-area').flash_message({
				        // text: '<img src="_pics/conferma.png" />',
				        // how: 'append',
				        // time: 1000,
				        // center: 'center_horiz'
				   // });
				} else {
					alert('Errore di comunicazione con il server');
				}			
			}
		);
	});
	
	
	
	window.onpopstate = function(a){
		if(a.state && a.state.ordinalo) apriPopupOrdinalo(a.state.ordinalo[0], a.state.ordinalo[1], true);
		else jQuery.fancybox.close();
	};
	function apriPopupOrdinalo(id, href, fromHistory){
		
		var su = shareUrlArticolo.replace("--ID--", id);
		if(!fromHistory) window.history.pushState({ordinalo:[id, href]}, "", su);
		
		$.fancybox({
			'href': href+"?popup=1",
			'overlayColor': '#333',
			'overlayOpacity': 0.8,
			'padding': 0,
			'height': is_mobile ? "100%" : 500,
			'width': is_mobile ? "100%" : 940,
			'margin': is_mobile ? 0 : undefined,
			'type': 'iframe',
			'afterClose': function(){
				
				window.history.pushState(null, "", defaultHistoryUrl);
				aggiornaCarrello();
			},
		});
		
		if(typeof(gtag) != 'undefined') gtag('event', 'view_item', {
		  items: [{
			item_id: id,
			item_name: $("[name=articolo_"+id+"]").attr("title"),//brutto
		  }]
		});
	}
	
	
	$(".dettaglio_articolo").live('click', function(e){
		var id = preventDefaultAndGetArticoloFromName(e, this);
		apriPopupOrdinalo(id, $(this).attr("href"));
		
	});

	

	$("#apriSceltaPuntoVendita").click(function(){
		$.fancybox({
			'content' : $("#sceltaPuntoVendita").html()
		});
	});
	setTimeout(function(){
		$("#apriSceltaPuntoVendita.aprimi").click();
	}, 100);
	// console.log($("#sceltaPuntoVendita").html());
	
	// setTimeout(function(){
		// $("#apriSceltaPuntoVendita").click();
	// }, 100);
	
	$("#cart-opener").live('click', function(e){

		var fancybox_params = {
			'content' : $("#cart").html(),
			'overlayColor' : '#333',
			'overlayOpacity' : 0.8,
			'width' : "auto",
			'height' : "auto",
			'padding' : 0,
			'margin' : 0,
			
		};
		
		// if(!$(this).hasClass("noupdate")){
			// fancybox_params["afterClose"] = function(){ aggiornaCarrello(); };
		// }
		
		$.fancybox(fancybox_params);

		e.preventDefault();
	});	

	
	$("a.add_preferita").live('click', function(e){
		e.preventDefault();
		var rigaOrdine = $(this).attr("rigaord");

		$.post(linkAjax, {action:"aggiungiPreferita", riga:rigaOrdine},
			function(data){
				var obj = $.parseJSON(data);
				if(obj && obj.ret == 1){
					// console.log(obj);
					aggiornaCarrelloHtml(obj);
				} else {
					alert('Errore di comunicazione con il server');
				}			
			}
		);
	});
	
	
	function aggiornaCarrelloHtml(obj){
		$(".carrello").html(obj.html);

		// console.log(obj);
		
		$(".button_riepilogo_ordine .testo").html(obj.pulsante_carrello_html);

		$("#cart-opener span.testo").html(obj.pulsante_carrello_html);

		$("#header a.button_cart span.counter").html(obj.totale_prodotti);
		/*
		if(obj.totale_prodotti > 0){
			$(".button_cart").show();
		} else {
			$(".button_cart").hide();
		}
		*/
	}
	
	function aggiornaCarrello(checkOut, autoCoupon){
		
		if(checkOut){
			spedizioneCerta = isDomicilio();
		}
		else{
			spedizioneCerta = false;
		}
		$.post(
			linkAjax, 
			{
				action:"aggiornaCarrello",
				spedizioneCerta:spedizioneCerta?1:0,//altrimenti passa la stringa "false" che in php è true
				checkOut:checkOut?1:0,
				autoCoupon:autoCoupon?1:0,
				coupon:!couponInput ? '' : couponInput.val(),
				data_consegna:!data_consegna_hidden ? '' : data_consegna_hidden.val(),
				orario_consegna:!orario_consegna_select ? '' : $("option:selected", orario_consegna_select).text(),
			},
			function(data){
				var obj = $.parseJSON(data);
				
					
				if(checkOut){
					if(obj.couponAlert) alert(obj.couponAlert);
					
					if(couponInput.val()) couponValidationInfo = obj.coupon ? obj.coupon.descrizione : "";
					//else autocoupon
					aggiornaInfoCoupon();
				}
				
				aggiornaCarrelloHtml(obj);
					
		
			}
		);
	}
	
	if($("#formCheckout").length){//pagina checkout
	
	
		var submitted = false;
		$("#formCheckout").submit(function(){
			if(submitted) return false;
			submitted = true;
			$("body").css("cursor", "progress");
			$("#checkout").addClass("loading");
			return true;
		});
		
		$.datepicker.setDefaults($.datepicker.regional["<?=$DATI[lang2]?>"]);
		function aggiornaOrari(){
			$(".orario").attr("disabled", "disabled");
			$.post(linkAjax, {action:"selectOrari", data:$("#datepicker").val()},
			function(data){
				$(".orario").attr("disabled", null);
				var obj = $.parseJSON(data);
				var ret = obj.ret;			
				if(obj.ret == 1){
					$(".orario").html(obj.html);
					var o = $(".orario option");
					var v = '';
					if(o.length < 2) alert(giorno_senza_orari_di_consegna_messaggio);
					else v = o.eq(1).val();
					$(".orario").val(v);
					
					var dataSave 	= obj.data_ret;
					$(".data_consegna").val(dataSave).trigger('change');
					//$.uniform.update(".orario");
				} else {
					alert('errore nella lettura degli orari');
				}			
			}
			);
		}
		
		$("#datepicker").datepicker({
			dateFormat	: "dd-mm-yy",
			minDate		: checkoutMinDate,
			maxDate		: checkoutMaxDate,
			onSelect:aggiornaOrari,
			beforeShowDay:function(date){
				return [giorniConOrari.indexOf(date.getDay()) != -1, '', ''];
			}
		});
		$('#citta').change(function() {
			$('.destinazione').val('');
			$('.civico').val('');
		});
		var service = new google.maps.places.AutocompleteService(null, {types:['geocode']});
		//var servicePlaces = new google.maps.places.PlacesService();
		//"CjQhAAAAaUBWGXPfc_2Zjhp8YB8vSSiEPibXnc7aztgOLPC0_f2YxPgMCtM18jSAIuB8Y1DpEhBK99uH9TW4mltzyk5dU3yaGhRDmRpLmXt18WATUYG11fiM5_l_Rw"
		//https://maps.googleapis.com/maps/api/place/details/json?reference=CjQhAAAAaUBWGXPfc_2Zjhp8YB8vSSiEPibXnc7aztgOLPC0_f2YxPgMCtM18jSAIuB8Y1DpEhBK99uH9TW4mltzyk5dU3yaGhRDmRpLmXt18WATUYG11fiM5_l_Rw&sensor=true&key=AIzaSyATeyTQXZajqzRX6hRuN0LosLupJoOO7Jk
		$(".destinazione").autocomplete({
			source: function( request, response ) {
				var citta = $("#citta").val();
				var q = "Italy, "+citta+", " + request.term;
				// console.log("maps query: "+q);
				service.getPlacePredictions({ input: q}, function(predictions, status) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						// console.log(predictions);
						var ret = new Array();
						for (var i = 0; i < predictions.length; i++) {
							var p = predictions[i];
							// console.log(p);
							if ($.isArray(p.terms) && p.terms.length >= 3) {
								if (p.types[0].indexOf("route")!=-1 || p.types[0].indexOf("town_square")!=-1) {
									//console.log("res google add:" + p.terms[0].value);
									ret.push(p.terms[0].value);
								}				    					
							}
						}
						// console.log(ret);
						response(ret); 
					} else {
						//alert('Errore: ' + status);
					}
				});
			},
			minLength: 1
		});
	
	
		var couponInput = $("#coupon");
		var couponInfo = $("#couponInfo");
		var couponUpdate = $("#couponUpdate");
		var couponValidationInfo = "";

		couponUpdate.click(function(e){
			e.preventDefault();
			if(!couponInput.val()) alert("Inserisci un codice");
			if(couponValidationInfo){
				couponInput.val('');
				couponValidationInfo = "";
				aggiornaInfoCoupon();
			}

			aggiornaCarrello(true);
		});

		var aggiornaInfoCoupon = function(){
			couponInfo.text(couponValidationInfo ? couponValidationInfo : "");

			couponUpdate.parent()[couponValidationInfo?"addClass":"removeClass"]("couponRemove");
			couponUpdate.parent()[!couponValidationInfo?"addClass":"removeClass"]("couponAdd");
			

			couponInput.attr("readonly", !couponValidationInfo ? false : true);
		};


		var data_consegna_hidden = $("input[name=FORM_CHECKOUT\\[data_consegna\\]]");
		var orario_consegna_select = $("select[name=FORM_CHECKOUT\\[ora_consegna\\]]");

		data_consegna_hidden.change(function(e){aggiornaCarrello(true);});//lo triggero manualmente perchè è un hidden
		orario_consegna_select.change(function(e){aggiornaCarrello(true);});
		aggiornaCarrello(true, true);//calcola la spedizione se la consegna a domicilio è preselezionata
	}
	
	// $(".add_carrello").live('click', function(e){
		// e.preventDefault();
		// var link = $(this).attr("href");
		// $.get(link);
		// aggiornaCarrello();
	// });
	
	var delay = (function(){
	  var timers = {};
	  return function(callback, ms, id){
		 if(!id) id = 'generic';
	    clearTimeout (timers[id]);
	    timers[id] = setTimeout(callback, ms);
	  };
	})();
	
	function quantitaInc(tasto, diff){
		var data = $(".inc_value", $(tasto).parent());
		var quantita = parseInt(data.text());
		if(quantita == 0) return;
		quantita += diff;
		
		
		$(".vaiAlCheckout").click(function(e) {
			e.preventDefault();
		});
		
		data.text(quantita);
		delay(function(){
			aggiornaQuantita(data.data("riga"), quantita);
		}, 500, "inc"+data.data("riga"));	
	}
	
	function aggiornaQuantita(riga, quantita){
		var loading = $(".carrello");
		loading.addClass("loading");
		
		$.post(linkAjax, {action:"aggiornaQuantita", riga:riga,quantita:quantita},
			function(data){
				var obj = $.parseJSON(data);		
				loading.removeClass("loading");
				if(obj.ret == 1){
					aggiornaCarrelloHtml(obj);
				} else {
					alert('Errore di comunicazione con il server');
				}			
			}
		);
	}
	
	$(".inc_less").live('click', function(e){quantitaInc(this, -1)});
	$(".inc_more").live('click', function(e){quantitaInc(this, 1)});
	
	// $(".inc_more").live('click', function(e){
	$(".quantita").live('keyup', function(e){
		e.preventDefault();
		var t = $(this);
			
		var quantita = t.val();
	
		if(quantita != ''){
			aggiornaQuantita(t.attr("riga"), quantita);
		}
	});
		
	$(".rimuovi").live('click', function(e){
		e.preventDefault();
		
		var riga = $(this).attr("riga");

		$.post(linkAjax, {action:"rimuoviArticolo", riga:riga},
			function(data){
				var obj = $.parseJSON(data);
				var ret = obj.ret;			
				if(obj.ret == 1){
					aggiornaCarrelloHtml(obj);
				} else {
					alert('Errore di comunicazione con il server');
				}			
			}
		);		
	});
	
	function isDomicilio(){
		var v = $("#indirizzi_spedizioni option:selected").attr("data-tipo");
		// console.log(v);
		return v && v != 'sede';
	}
	function nuovoIndirizzoToggle(){
		
		var o = $("#indirizzi_spedizioni option:selected");
		
		if(o.length == 0) return;//non c'è la tendina (ritiro in sede unica), non va svuotato
		
		if(o.val() != 'nuovo'){
			$("#nuovo_indirizzo").hide('fast');
		}
		else{
			$("#nuovo_indirizzo").show('fast');
		}
		
		if($(this).data('aggiorna-carrello')) aggiornaCarrello(true);
		
		
		$("#sede").val(isDomicilio() ? '' : o.val().substr(4));
		
		
		if(o.attr("data-tipo") == 'dest'){
			$(".destinatario").val(o.attr("data-note_indirizzo"));
			$(".destinazione").val(o.attr("data-indirizzo"));
			$(".civico").val(o.attr("data-civico"));
			$("#citta").val(o.attr("data-citta"));
		}
		else if(o.val() != 'nuovo'){//se è nuovo potrebbe essere un post con errori e non svuoto ciò che l'utente ha inserito
			//ritiro in sede (non deve svuotare citta se ce n'è una sola è un input hidden)
			$(".destinatario").val('');
			$(".destinazione").val('');
			$(".civico").val('');
		}
			
		// setLatLon("", "", "");
			
	}
	
	$(window).bind("pageshow", nuovoIndirizzoToggle);//in questa maniera funziona correttamente anche con un history back (es: seleziono carta e poi torno indietro per scegliere altro, se il default è "consegna a domicilio" e ho scelto ritiro al punto vendita senza bind("pageshow") mi verrebbe richiesto l'indirizzo)
	
	$("#indirizzi_spedizioni").change(nuovoIndirizzoToggle);

	
		
	$(".chiudi_popup").click(function(e){
		var link = $(this).attr('href');
		if(link != '' && link != '#') parent.document.location = link;									
		parent.jQuery.fancybox.close();
	});	
	
	
	
	
	
	$(".hover-toggle > *").each(function () {				   
			if($(this).index() == 1) $(this).hide();
	});
	$(".hover-toggle").bind("mouseenter mouseleave",function () {
			$(this).children().toggle();

	});
	
	
	$(".hover-toggle-fade").css("position","relative");				   
	$(".hover-toggle-fade > *").css("position","absolute");				   

	$(".hover-toggle-fade > *").each(function () {				   
			if($(this).index() == 1) $(this).toggle();
	});
	$(".hover-toggle-fade").bind("mouseenter mouseleave",function (event) {
		$(this).children().fadeToggle();
	});
	
	
	
	$(".hover-fade-1").hover(function (e) {				   
			$(this).stop().animate({"opacity":0.5},250);
	},function (e) {				   
			$(this).stop().animate({"opacity":1},250);
	});
	
	//parte da un opacità del 50%
	$(".hover-fade-05").css({"opacity":0.5},250);
	$(".hover-fade-05").hover(function (e) {				   
			$(this).stop().animate({"opacity":1},250);
	},function (e) {				   
			$(this).stop().animate({"opacity":0.5},250);
	});
	
	//parte da un opacità del 80%
	$(".hover-fade-08").css({"opacity":0.8},250);
	$(".hover-fade-08").hover(function (e) {				   
			$(this).stop().animate({"opacity":1},250);
	},function (e) {				   
			$(this).stop().animate({"opacity":0.8},250);
	});
	
	$("a.limite_minimo").live('click', function(e){
		e.preventDefault();
		$(".limite").show();
	});


	
});	


/*
$(function() {
	$("#p_abilita_debug").dblclick(function(e) {
		$("#div_debug").fadeIn();			
	});
});
function localizza() {
	var address = $(".destinazione").val();
	if ($.trim($(".civico").val()) != "") {
		address += ", " + $.trim($(".civico").val());
	}
	address += ", "+$("#citta").val();
	
	var appbug = "<br><a target='_blank' href='https://maps.google.com/maps?q=" + encodeURIComponent(address) + "'>test link su maps</a>"; 
	
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			//console.log(results[0]);
			if (results[0].geometry.location_type != "APPROXIMATE") {
				var cap = '';
				for(var i in results[0].address_components) if(results[0].address_components[i].types.indexOf('postal_code') != -1) cap = results[0].address_components[i].long_name;
				// console.log(cap);
				setLatLon(results[0].geometry.location.lat(), results[0].geometry.location.lng(), cap);
				if ($("#geodebug").length > 0) {
					$("#geodebug").val("geocode con address:" + address + " result:" + results[0].geometry.location.lat() + "/" + results[0].geometry.location.lng());
				}
				if ($("#div_debug").length > 0) {
					$("#div_debug").html("geocode con address:<br><strong>" + address + "</strong><br>result: " + results[0].geometry.location.lat() + " / " + results[0].geometry.location.lng() + appbug);
				} 
			} else {
				//console.log("aprrox");
				//APPROXIMATE salvo a 0, detto da carlo
				setLatLon(0, 0, 0);
				if ($("#geodebug").length > 0) {
					$("#geodebug").val("geocode con address:" + address + " result:APPROX quindi 0");
				}
				if ($("#div_debug").length > 0) {
					$("#div_debug").html("geocode con address:<br>" + address + "<br>result: APPROXIMATE quindi 0" + appbug);
				}
			}
	   } else {
	   	//console.log("no res");
	   	//nessun risultato, salvo a 0, detto da carlo
			setLatLon(0, 0, 0);
			if ($("#geodebug").length > 0) {
				$("#geodebug").val("geocode con address:" + address + " result:NO RESULT quindi 0");
			}			
			if ($("#div_debug").length > 0) {
				$("#div_debug").html("geocode con address:<br>" + address + "<br>result: NO RESULT quindi 0" + appbug);
			}			
		}
	});
}

function setLatLon(lat, lon, cap) {
	$("#lat").val(lat);
	$("#lon").val(lon);
	$("#cap").val(cap);
}
*/