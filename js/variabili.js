/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var segmenti = [
	{}, //Parte da 0 così i segmenti di mercato sono ellineati col loro indice
	{categoria: "1 - PT-Comfort", peso: 0.0349, prezzo: 0.1291, pt: 0.5309, estetica: 0.0345, comfort: 0.2707, cpu:0.1, gpu: 0.57, ram: 0.33, autonomia: 0.48, schermo: 0.4, rumore: 0.12, persone: 9}, // PT - Comfort
	{categoria: "2 - PT-Prezzo", peso: 0.0787, prezzo: 0.2686, pt: 0.4686, estetica: 0.0445, comfort: 0.1397, cpu:0.1, gpu: 0.57, ram: 0.33, autonomia: 0.48, schermo: 0.4, rumore: 0.12, persone: 10}, // PT - Prezzo
	{categoria: "3 - PT-Peso", peso: 0.28, prezzo: 0.08, pt: 0.32, estetica: 0.18, comfort: 0.14, cpu:0.1, gpu: 0.57, ram: 0.33, autonomia: 0.48, schermo: 0.4, rumore: 0.12, persone: 1}, // PT - Peso
	{categoria: "4 - PT-Estetica", peso: 0.0344, prezzo: 0.0138, pt: 0.5849, estetica: 0.2982, comfort: 0.0688, cpu:0.1, gpu: 0.57, ram: 0.33, autonomia: 0.48, schermo: 0.4, rumore: 0.12, persone: 1}, // PT - Estetica
	{categoria: "5 - Prezzo-PT", peso: 0.0571, prezzo: 0.4762, pt: 0.2762, estetica: 0.0857, comfort: 0.1048, cpu:0.1, gpu: 0.57, ram: 0.33, autonomia: 0.48, schermo: 0.4, rumore: 0.12, persone: 3} // Prezzo - PT
];

var segmento_selected = 1;
var vincitore_selected = "rog";
var somma_segmenti = segmenti[1].persone + segmenti[2].persone + segmenti[3].persone + segmenti[4].persone + segmenti[5].persone;

var pc = ["rog", "surface", "zen", "xps", "macbook", "hp"];

var valutazioni = {
	"rog": {id: 'rog', totale: 0, peso: 0, prezzo: 0, pt: 0, estetica: 0, comfort: 0, cpu: 0, gpu: 0, ram: 0, rumore: 0, autonomia: 0, schermo: 0},
	"surface": {id: 'surface', totale: 0, peso: 0, prezzo: 0, pt: 0, estetica: 0, comfort: 0, cpu: 0, gpu: 0, ram: 0, rumore: 0, autonomia: 0, schermo: 0},
	"zen": {id: 'zen', totale: 0, peso: 0, prezzo: 0, pt: 0, estetica: 0, comfort: 0, cpu: 0, gpu: 0, ram: 0, rumore: 0, autonomia: 0, schermo: 0},
	"xps": {id: 'xps', totale: 0, peso: 0, prezzo: 0, pt: 0, estetica: 0, comfort: 0, cpu: 0, gpu: 0, ram: 0, rumore: 0, autonomia: 0, schermo: 0},
	"macbook": {id: 'macbook', totale: 0, peso: 0, prezzo: 0, pt: 0, estetica: 0, comfort: 0, cpu: 0, gpu: 0, ram: 0, rumore: 0, autonomia: 0, schermo: 0},
	"hp": {id: 'hp', totale: 0, peso: 0, prezzo: 0, pt: 0, estetica: 0, comfort: 0, cpu: 0, gpu: 0, ram: 0, rumore: 0, autonomia: 0, schermo: 0}
};

var componenti = {
	"rog": {id: 'rog', peso: '2,6 Kg', prezzo: '1.399,00 €', gpu: '1050Ti GTX', cpu: 'i7-8750H', ram: '16 Gb', autonomia: '3 ore', schermo: 'Full HD', nome: 'Asus ROG 15GL503VL', img: 'https://www.notebookcheck.net/uploads/tx_nbc2/AsusStrixGL503VM-Hero__1_.JPG'},
	"surface": {id: 'surface', peso: '1,3 Kg', prezzo: '1.829,00 €', gpu: 'Integrata', cpu: 'i7', ram: '16 Gb', autonomia: '15 ore', schermo: '4k Touchscreen', nome: 'Surface Laptop 15', img: 'https://www.macitynet.it/wp-content/uploads/2017/10/surface-book-2-icon-740.jpg'},
	"zen": {id: 'zen', peso: '1,1 Kg', prezzo: '1.699,00 €', gpu: 'Integrata', cpu: 'i7-8550U', ram: '16 Gb', autonomia: '9 ore', schermo: 'Full HD', nome: 'Asus Zen UX 390 A', img: 'https://assets.hardwarezone.com/img/2016/08/ASUS_ZenBook_3_UX390UA.jpg'},
	"xps": {id: 'xps', peso: '1,8 Kg', prezzo: '2.199,00 €', gpu: '1050 Gtx', cpu: 'i7-7700HQ', ram: '16 Gb', autonomia: '3 ore', schermo: '4k Touchscreen', nome: 'XPS 15 9560', img: 'http://cdn.benchmark.pl/uploads/products/3972/dell-xps-15_1.jpg'},
	"macbook": {id: 'macbook', peso: '2,04 Kg', prezzo: '2.299,00 €', gpu: 'Intel Iris Pro Graphics', cpu: 'i7 quad-core 2.2', ram: '16 Gb', autonomia: '7 ore', schermo: 'Retina', nome: 'MacBook Pro 15', img: 'https://i5.walmartimages.com/asr/08f5c0a5-d45c-4b00-969e-75158b225af0_1.41822ef269d39eab6ab76c12a5d166cd.jpeg'},
	"hp": {id: 'hp', peso: '2,04 Kg', prezzo: '468,00 €', gpu: 'AMD Radeon R5 M430', cpu: 'i5 7200U', ram: '8 Gb', autonomia: '10 ore', schermo: 'HD SVA', nome: 'HP 15-AY144NL', img: 'https://images-na.ssl-images-amazon.com/images/I/817i4157AdL._SX466_.jpg'}
}

var grafico_torta_pc; // GRAFICO A TORTA CON I PC
var config_grafico_torta_pc = {
	type: 'pie',
	data: {
		datasets: [{
				data: [
					1,
					2,
					3,
					4,
					5
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.9)',
					'rgba(54, 162, 235, 0.9)',
					'rgba(255, 206, 86, 0.9)',
					'rgba(75, 192, 192, 0.9)',
					'rgba(153, 102, 255, 0.9)',
					'rgba(255, 159, 64, 0.9)'
				],
				label: 'Computer'
			}],
		labels: [
			'Rog',
			'Surface',
			'Zen',
			'XPS',
			'MacBook',
			'HP'
		]
	},
	options: {
		responsive: true
	}
};


var grafico_barre_pc;
var config_grafico_barre_pc = {
	type: 'bar',
	data: {
		datasets: [{
				data: [
					1,
					2,
					3,
					4,
					5
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.9)',
					'rgba(54, 162, 235, 0.9)',
					'rgba(255, 206, 86, 0.9)',
					'rgba(75, 192, 192, 0.9)',
					'rgba(153, 102, 255, 0.9)',
					'rgba(255, 159, 64, 0.9)'
				],
				label: 'Computer'
			}],
		labels: [
			'Rog',
			'Surface',
			'Zen',
			'XPS',
			'MacBook',
			'HP'
		]
	},
	options: {
		responsive: true,
		legend: {display: false},
		scales: {
			yAxes: [{
					ticks: {
						autoSkip: true
//						,
//						max: 35,
//						min: 0
					}
				}]
		}
	}
};


var grafico_barre_componenti;
var config_grafico_barre_componenti = {
	type: 'horizontalBar',
	data: {
		datasets: [{
				data: [
					1,
					2,
					3,
					4,
					5
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.9)',
					'rgba(54, 162, 235, 0.9)',
					'rgba(255, 206, 86, 0.9)',
					'rgba(75, 192, 192, 0.9)',
					'rgba(153, 102, 255, 0.9)',
					'rgba(255, 159, 64, 0.9)'
				],
				label: 'Punteggio'
			}],
		labels: [
			'Processore',
			'Scheda Video',
			'RAM',
			'Autonomia',
			'Prezzo'
		]
	},
	options: {
		responsive: true,
		legend: {display: false},
		scales: {
			xAxes: [{
					ticks: {
						max: 0,
						min: 9
					}
				}]
		}
	}
};

var grafico_torta_segmenti; // GRAFICO A TORTA CON I SEGMENTI DI MERCATO
var config_grafico_torta_segmenti = {
	type: 'pie',
	data: {
		datasets: [{
				data: [
					(segmenti[1].persone/somma_segmenti).toFixed(4)*100,
					(segmenti[2].persone/somma_segmenti).toFixed(4)*100,
					(segmenti[3].persone/somma_segmenti).toFixed(4)*100,
					(segmenti[4].persone/somma_segmenti).toFixed(4)*100,
					(segmenti[5].persone/somma_segmenti).toFixed(4)*100,
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.9)',
					'rgba(54, 162, 235, 0.9)',
					'rgba(255, 206, 86, 0.9)',
					'rgba(75, 192, 192, 0.9)',
					'rgba(153, 102, 255, 0.9)',
					'rgba(255, 159, 64, 0.9)'
				],
				label: 'Computer'
			}],
		labels: [
			'PT-Comfort',
			'PT-Prezzo',
			'PT-Peso',
			'PT-Estetica',
			'Prezzo-PT'
		]
	},
	options: {
		responsive: true,
		title: {display: true, text: 'Distribuzione segmenti di mercato'},
	}
};

var colors = {
	red: 'rgba(200,0,0,0.2)',
	blue: 'rgba(40, 122, 255, 0.2)',
	green: 'rgba(0, 193, 12, 0.2)',
	yellow: 'rgba(216, 183, 0, 0.2)',
	azure: 'rgba(0, 255, 242, 0.3)',
	purple: 'rgba(250, 0, 255, 0.3)',
	black: 'rgba(0,0,0,0.3)'
}
var grafico_radar_segmenti;
var config_grafico_radar_segmenti = {
	type: 'radar',
	data: {
		labels: ["Peso", "Prezzo", "Prestazioni", "Estetica", "Comfort"],
		datasets: [
			{
				data: [segmenti[1].peso, segmenti[1].prezzo, segmenti[1].pt, segmenti[1].estetica, segmenti[1].comfort],
				backgroundColor: colors.red,
				label: 'PT-Comfort',
				borderColor: colors.red,
				borderWidth: 5,
				pointBackgroundColor:  'rgba(200,0,0,0.5)',
				pointBorderColor:  colors.black,
				pointBorderWidth:  colors.red,
				pointRadius: 5
			},
			{
				data: [segmenti[2].peso, segmenti[2].prezzo, segmenti[2].pt, segmenti[2].estetica, segmenti[2].comfort],
				backgroundColor: colors.blue,
				label: 'PT-Prezzo',
				borderColor: colors.blue,
				borderWidth: 5,
				pointBackgroundColor:  'rgba(40, 122, 255, 0.5)',
				pointBorderColor:  colors.black,
				pointBorderWidth:  colors.blue,
				pointRadius: 5
			},
			{
				data: [segmenti[3].peso, segmenti[3].prezzo, segmenti[3].pt, segmenti[3].estetica, segmenti[3].comfort],
				backgroundColor: colors.green,
				label: 'PT-Peso',
				borderColor: colors.green,
				borderWidth: 5,
				pointBackgroundColor:  'rgba(0, 193, 12, 0.5)',
				pointBorderColor:  colors.black,
				pointBorderWidth:  colors.green,
				pointRadius: 5
			},
			{
				data: [segmenti[4].peso, segmenti[4].prezzo, segmenti[4].pt, segmenti[4].estetica, segmenti[4].comfort],
				backgroundColor: colors.yellow,
				label: 'PT-Estetica',
				borderColor: colors.yellow,
				borderWidth: 5,
				pointBackgroundColor:  'rgba(216, 183, 0, 0.5)',
				pointBorderColor:  colors.black,
				pointBorderWidth:  colors.yellow,
				pointRadius: 5
			},
			{
				data: [segmenti[5].peso, segmenti[5].prezzo, segmenti[5].pt, segmenti[5].estetica, segmenti[5].comfort],
				backgroundColor: colors.azure,
				label: 'Prezzo-PT',
				borderColor: colors.azure,
				borderWidth: 5,
				pointBackgroundColor:  'rgba(0, 255, 242, 0.5)',
				pointBorderColor:  colors.black,
				pointBorderWidth:  colors.azure,
				pointRadius: 5
			},
			{
				data: [], //Da riempire dinamicamente
				backgroundColor: colors.purple,
				label: 'Computer',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 5,
				pointBackgroundColor:  'rgba(0,0,0,1)',//'rgba(127, 255, 235, 0.5)',
				pointBorderColor:  colors.black,
				pointBorderWidth:  colors.purple,
				pointRadius: 5
			}
			
		]
	},
	options: {
		responsive: true,
		scaleOverride: true,
		scale: {
			ticks: {
				autoSkip: true,
				beginAtZero: true,
				min: 0,
				max: 0.6,
				stepSize: 0.1
			}
		}
	}
};
