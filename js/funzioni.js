

function showPage(id = 'utente') {
	$('#utente').hide();
	$('#progettista').hide();
	$('#marketing').hide();
	$('#'+id).fadeIn();
}

function setSegmentoSelected(num = null) {
	segmento_selected = num;
	somethingChanged();
}

function printSelectFuzzy(val = 5, classe = '') {
	val9 = (val == 9 ? " selected " : "");
	val7 = (val == 7 ? " selected " : "");
	val5 = (val == 5 ? " selected " : "");
	val3 = (val == 3 ? " selected " : "");
	val1 = (val == 1 ? " selected " : "");
	document.write('<select class=\' form-control ' + classe + '\'  onchange="somethingChanged();">\n\
		<option value="9"' + val9 + '>Molto bene</option>\n\
		<option value="7"' + val7 + '>Bene</option>\n\
		<option value="5"' + val5 + '>Sufficiente</option>\n\
		<option value="3"' + val3 + '>Male</option>\n\
		<option value="1"' + val1 + '>Molto Male</option>\n\
		</select>');
}

function aggiornaPesiGlobal() {
	aggiornaPesiSingolo('rog');
	aggiornaPesiSingolo('surface');
	aggiornaPesiSingolo('zen');
	aggiornaPesiSingolo('xps');
	aggiornaPesiSingolo('macbook');
	aggiornaPesiSingolo('hp');
	//calcolaRisultatoGlobal();
}

function aggiornaPesiSingolo(id = '') {
	var cpu = parseInt($('#' + id + " .prestazioni .cpu option:selected").val());
	var gpu = parseInt($('#' + id + " .prestazioni .gpu option:selected").val());
	var ram = parseInt($('#' + id + " .prestazioni .ram option:selected").val());

	var rumore = parseInt($('#' + id + " .comfort .rumore option:selected").val());
	var autonomia = parseInt($('#' + id + " .comfort .autonomia option:selected").val());
	var schermo = parseInt($('#' + id + " .comfort .schermo option:selected").val());

	var peso = parseInt($('#' + id + " .generale .peso option:selected").val());
	var prezzo = parseInt($('#' + id + " .generale .prezzo option:selected").val());
	var estetica = parseInt($('#' + id + " .generale .estetica option:selected").val());
	
	valutazioni[id].cpu = cpu;
	valutazioni[id].gpu = gpu;
	valutazioni[id].ram = ram;

	valutazioni[id].rumore = rumore;
	valutazioni[id].autonomia = autonomia;
	valutazioni[id].schermo = schermo;
	
	valutazioni[id].peso = peso;
	valutazioni[id].prezzo = prezzo;
	valutazioni[id].estetica = estetica;
	
//	valutazioni[id].pt = (cpu + gpu + ram)/6; // PESO = 1/6
//	valutazioni[id].comfort = (rumore+autonomia+schermo)/6;  // PESO = 1/6
	

}

function calcolaRisultatoGlobal() {
	calcolaRisultatoSingolo('rog');
	calcolaRisultatoSingolo('surface');
	calcolaRisultatoSingolo('zen');
	calcolaRisultatoSingolo('xps');
	calcolaRisultatoSingolo('macbook');
	calcolaRisultatoSingolo('hp');
//	calcolaVincitore();
//	aggiornaGrafico();
	printDebug();
}

function calcolaRisultatoSingolo(id = '') { //Calcola il totale
	var pc = valutazioni[id];
	var mercato = segmenti[segmento_selected];
	
	pc.pt = (pc.cpu*mercato.cpu + pc.gpu*mercato.gpu + pc.ram*mercato.ram);
	pc.comfort = (pc.rumore*mercato.rumore + pc.autonomia*mercato.autonomia + pc.schermo*mercato.schermo);
	
	var peso = mercato.peso * pc.peso;
	var prezzo = mercato.prezzo * pc.prezzo;
	var prestazioni = mercato.pt * pc.pt;
	var estetica = mercato.estetica * pc.estetica;
	var comfort = mercato.comfort * pc.comfort;
	
	var risultato =  peso + prezzo + prestazioni + estetica + comfort;
	valutazioni[id].totale = risultato;
	
	//alert("VOTO " + id +": " + risultato);
//	console.log("id: " + id);
//	console.log("peso " + peso);
//	console.log("prezzo " + prezzo);
//	console.log("pt " + prestazioni);
//	console.log("pt2 " + mercato.pt * pc.pt);
//	console.log("estetica " + estetica);
//	console.log("comfort " + comfort);
	
}

function calcolaVincitore() {
	max = 0; 
	id = '';
	pc.forEach(function(item) {
		if (valutazioni[item].totale > max) {
			max = valutazioni[item].totale;
			vincitore_selected = item;
			
		}
	});
}

function mostraVincitore() {
	vincitore = componenti[vincitore_selected];
	$('#winner #winner-name').text(vincitore.nome);
	$('#winner #winner-img').attr('src', vincitore.img);
	$('#winner #winner-cpu').text(vincitore.cpu);
	$('#winner #winner-gpu').text(vincitore.gpu);
	$('#winner #winner-ram').text(vincitore.ram);
	$('#winner #winner-autonomia').text(vincitore.autonomia);
	$('#winner #winner-prezzo').text(vincitore.prezzo);
	
}

function aggiornaGrafici() {
	/* NORMALIZZAZIONE PUNTEGGI MACCHINE */
	var somma = valutazioni["rog"].totale+ valutazioni["surface"].totale+ valutazioni["zen"].totale+ valutazioni["xps"].totale + valutazioni["macbook"].totale + valutazioni["hp"].totale;
	somma = somma/100;
	var rog = (valutazioni["rog"].totale/somma).toFixed(2);
	var surface = (valutazioni["surface"].totale/somma).toFixed(2);
	var zen = (valutazioni["zen"].totale/somma).toFixed(2);
	var xps = (valutazioni["xps"].totale/somma).toFixed(2);
	var macbook = (valutazioni["macbook"].totale/somma).toFixed(2);
	var hp = (valutazioni["hp"].totale/somma).toFixed(2);
	
	/* CALCOLI CARATTERISTICHE PC VINCITORE */
	var cpu = valutazioni[vincitore_selected].cpu;
	var gpu = valutazioni[vincitore_selected].gpu;
	var ram = valutazioni[vincitore_selected].ram;
	var autonomia = valutazioni[vincitore_selected].autonomia;
	var prezzo = valutazioni[vincitore_selected].prezzo;
	
	/* AGGIORNAMENTO EFFETTIVO GRAFICO A BARRE CON I 4 PC*/
	config_grafico_barre_componenti.data.datasets[0].data = [cpu, gpu, ram, autonomia, prezzo];
	grafico_barre_componenti.update();
	
	/* AGGIORNAMENTO EFFETTIVO GRAFICO A TORTA CON I 4 PC*/
	config_grafico_torta_pc.data.datasets[0].data = [rog, surface, zen, xps, macbook, hp];
	grafico_torta_pc.update();
	
	/* AGGIORNAMENTO EFFETTIVO GRAFICO A BARRE CON I 4 PC*/
	config_grafico_barre_pc.data.datasets[0].data = [rog, surface, zen, xps, macbook, hp];
	grafico_barre_pc.update();
	
	/* AGGIORNAMENTO EFFETTIVO GRAFICO RADAR*/
	var pc = $('#pc_analysis option:selected').val();
	var peso = valutazioni[pc].peso;
	var prezzo = valutazioni[pc].prezzo;
	var pt = valutazioni[pc].pt;
	var estetica = valutazioni[pc].estetica;
	var comfort = valutazioni[pc].comfort;
	var totale = peso+prezzo+pt+estetica+comfort;
	config_grafico_radar_segmenti.data.datasets[5].data = [peso/totale, prezzo/totale, pt/totale, estetica/totale, comfort/totale];
	config_grafico_radar_segmenti.data.datasets[5].label = componenti[pc].nome;
	grafico_radar_segmenti.update();
}

function somethingChanged() {
	aggiornaPesiGlobal();
	calcolaRisultatoGlobal();
	calcolaVincitore();
	mostraVincitore();
	aggiornaGrafici();
}


$(document).ready(function () {
	showPage();
	$('[data-toggle="popover"]').popover();
	
	
	var ctx_1 = document.getElementById('grafico_torta_pc').getContext('2d'); // GRAFICO
	grafico_torta_pc = new Chart(ctx_1, config_grafico_torta_pc);
	
	var ctx_2 = document.getElementById('grafico_barre_pc').getContext('2d'); // GRAFICO
	grafico_barre_pc = new Chart(ctx_2, config_grafico_barre_pc);
	
	var ctx_3 = document.getElementById('grafico_barre_componenti').getContext('2d'); // GRAFICO
	grafico_barre_componenti = new Chart(ctx_3, config_grafico_barre_componenti);
	
	var ctx_4 = document.getElementById('grafico_radar_segmenti').getContext('2d'); // GRAFICO
	grafico_radar_segmenti = new Chart(ctx_4, config_grafico_radar_segmenti);
	
	var ctx_5 = document.getElementById('grafico_torta_segmenti').getContext('2d'); // GRAFICO
	grafico_torta_segmenti = new Chart(ctx_5, config_grafico_torta_segmenti);
	
	somethingChanged(); // Calcolo di tutti i valori
});

function printDebug() {
	console.log("###################################");
	console.log("Segmenti di mercato:");
	console.log(segmenti);
	console.log("Selezionato: " + segmenti[segmento_selected].categoria);
	console.log("Pesi e valutazione pc:");
	console.log(valutazioni);
	console.log("###################################");
}