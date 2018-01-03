$("#firstBut").bind("click", builder);


//Защита от ввода букв и дробных чисел
$(document).on("keyup", ".number1", function() {
this.value = this.value.replace(/[^0-9]/g, '');
});

//Для ввода К, позволяет ввести только 1 или 2
$(document).on("keyup", ".number3", function() {
this.value = this.value.replace(/[^1-2]/g, '');
});

//Защиты от ввода букв
$(document).on("keyup", ".number2", function() {
this.value = this.value.replace(/,/g , ".")
						.replace(/[^\d.]*/g, '')
                       .replace(/([.])[.]+/g, '$1')
                       .replace(/^[^\d]*(\d+([.]\d{0,5})?).*$/g, '$1');
});

var rows, cols;
var p11 = new Object();
var p10 = new Object();
var collector = new Object();
var limit = new Object();
var sumF = new Object();
var justForShedule=0;
var tooglerner=0;
var toogleCheck=0;
var checkaner = 0;



//Построение таблицы
function builder (){

 	$("#second").empty();

 	$("#thirdZero").empty();
 	$("#thirdFirst").empty();
 	$("#thirdSecond").empty();
 	
 	$("#fourth").empty();
 	$("#fifth").empty();
 	$("#second").hide();

	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	rows = $("#rows").val();
	cols = $("#cols").val();
	if(rows === "" || cols === "" ){
		alert("Введите значения!");
		return;
	}
	var ij=1;
	for(var i=0; i<rows; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
	    var row = $('<tr></tr>');
	    for(var j=0; j<((+cols)+2); j++){
	    	if(i === 0) {
	    		if(j === 0){
	    			var colHead = $('<td><h5>№ экземпляра</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    		else if(j  === ((+cols)+1)){
	    			var colHead = $('<td><h5>Номер клаcса K (1 или 2)</h5></td>');
	    			rowHead.append(colHead);
	    			
	    		}
	    		else {
	    			var colHead = $('<td><h5>Признак X'+ij+' при t=0</h5></td>');
	    			rowHead.append(colHead);
	    			ij++;
	    		}
	    	}
	    	if(j === 0) {
	    		var col = $('<td><h5>'+(i+1)+'</h5></td>');
	    		row.append(col);
	    	}
	    	else if(j === ((+cols)+1)) {
	    		var col = $('<td><label class="tableLable"><input class="number3 tableInput classK'+i+'"></label></td>');
	    		row.append(col);
	    	}
	    	else{
	    		var col = $('<td><label class="tableLable"><input class="number2 tableInput col'+(j-1)+' row'+i+'"></label></td>');
	    		row.append(col);
	   		}
	    }
	    tbody.append(row);
	}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
	$('#second').append('<p><h4>Производим запись результатов обучающего эксперимента.</h4></p>');
	$('#second').append('<p>Для проведения обучающего эксперимента отбирается случайным образом из одной и той же партии ИЭТ n экземпляров. Проверяется соответствие параметров этих экземпляров требованиям технических условий (ТУ). Экземпляры, не соответствующие требованиям ТУ, отсеиваются.</p>'); 
	$('#second').append('<p>У каждого экземпляра перед проведением испытаний измеряются значения признаков, и обеспечивается взаимосвязь их с номерами экземпляров обучающей выборки. На основе анализа электрического режима работы ИЭТ в составе аппаратуры и других факторов, выбираемых с позиций потребителей ИЭТ,  выбираются критерии отказа ИЭТ. Отказавшие ИЭТ будут соответствовать экземплярам класса K2.</p>'); 
	$('#second').append('<div><h2>Введите данные обучающего эксперимента</h2></div>');
 	$('#second').append(table);
 	$('#second').append('<div class="row"><button id="secondBut" type="button" class="butForAll btn btn-primary"><i class="fa fa-cogs" aria-hidden="true"></i> Ввод</button></div>');

 	$("#buildTable").removeClass().addClass("btn btn-default");
 	$("#buildSchedule").removeClass().addClass("btn btn-default");
 	$("#logicTable").removeClass().addClass("btn btn-default");

	$("#buildTable").attr('disabled',true);
	$("#buildSchedule").attr('disabled',true);
	$("#logicTable").attr('disabled',true);

 	$("#entry").removeClass().addClass("btn btn-warning");
 	$("#entry").attr('disabled',false);

 	$("#nextLi").removeClass("disabled");
 	tooglerner = 1;
 	toogleCheck=1;
 	toogleCheck=2;

 	checkaner = 1;

 	alert("Этап успешно завершён!")

 }

$(document).on("click", "#planing", planing);

function planing() {

	$("#first").show();
	$("#second").hide();
	$("#third").hide();
 	$("#fourth").hide();
 	$("#fifth").hide();

 	$("#planing").addClass("active");
 	$("#entry").removeClass("active");
 	$("#buildTable").removeClass("active");
 	$("#buildSchedule").removeClass("active");
 	$("#logicTable").removeClass("active");

 	$("#prevLi").addClass("disabled");
 	$("#nextLi").removeClass("disabled");
 	if (toogleCheck <= 1){
 		$("#nextLi").addClass("disabled");
 	}
 	tooglerner = 1;
 }

$(document).on("click", "#entry", entry);

function entry() {
	$("#entry").removeClass("btn-warning").addClass("btn-default active");
	$("#planing").removeClass("btn-default").addClass("btn-success");

	$("#first").hide();
	$("#second").show();
	$("#third").hide();
 	$("#fourth").hide();
 	$("#fifth").hide();

 	$("#planing").removeClass("active");
 	$("#entry").addClass("active");
 	$("#buildTable").removeClass("active");
 	$("#buildSchedule").removeClass("active");
 	$("#logicTable").removeClass("active");

 	$("#prevLi").removeClass("disabled");
 	$("#nextLi").removeClass("disabled");
 	if (toogleCheck <= 2){
 		$("#nextLi").addClass("disabled");
 	}
 	tooglerner = 2;
}

$(document).on("click", "#secondBut", refinement);

var massX = new Object();
var massK = new Object();
var massZ = new Object();

function refinement(){

 	$("#thirdZero").empty();
 	$("#thirdFirst").empty();
 	$("#thirdSecond").empty();

 	$("#fourth").empty();
 	$("#fifth").empty();

//Переписывание значений из таблицы в объект
	var air1, air2, air3;
	for (var i=0; i<cols;i++){
		air1 = ".col"+i;
		massX[i] = new Object();
		for (var j=0; j<rows;j++){
			air2 = ".row"+j;
			air3 = air1 + air2;
			massX[i][j] = $(air3).val(); 
			if(massX[i][j] === "" ){
				alert("Проверьте ввод значений X! Этап не завершен.");
				return; 
			}
		}
	}

	for (var j=0; j<rows;j++){
		air1 = ".classK"+j;
		massK[j] = $(air1).val();
		if(massK[j] === "" ){
			alert("Проверьте ввод значений K! Этап не завершен.");
			return; 
		}
	}

	$('#thirdZero').append('<p>Для выполнения обучения используется алгоритм МПЛ. В соответствии с этим методом объект прогнозирования (ИЭТ) представляется моделью устройства с одним выходным двоичным сигналом R, соответствующим решению о классе K1 или K2, и k входными двоичными сигналами z1, z2, …, zk, отображающими в соответствии с определенными правилами признаки x1, x2, …, xk, измеренные в момент времени t = 0.</p>');
	$('#thirdZero').append('<p><b>Выберите метод определения хi0</b></p>');
  	$('#thirdZero').append('<p><input class="rad" name="metod" type="radio" checked> Среднее значение МО</p>');
   	$('#thirdZero').append('<p><input class="rad" name="metod" type="radio"> Средняя точка зоны перекрытия (при наличии зоны перекрытия)</p>');
  	$('#thirdZero').append('<p><input class="rad" name="metod" type="radio"> Информационный подход</p>');
  	$('#thirdZero').append('<p><input class="rad" name="metod" type="radio"> Максимум вероятности правильных решений по x<sub>i</sub> </p>');
   	$('#thirdZero').append('<div class="row"><button id="thirdBut" type="button" class="butForAll btn btn-primary"><i class="fa fa-cogs" aria-hidden="true"></i> Ввод</button></div>');

	$("#nextLi").removeClass("disabled");
 	toogleCheck=3;
 	alert("Этап успешно завершен!");
 	$("#buildTable").removeClass().addClass("btn btn-warning");
 	$("#buildTable").attr('disabled',false);

}

$(document).on("click", "#thirdBut", newf);

function newf(){

//Находим МО
	var sumK1 = new Object();	 //сумма значений K1 (нас строке 261 становиться МО)
	var sumK2 = new Object();	 //сумма значений K2 (нас строке 262 становиться МО)
	var summK1;  //колличество значений K1
	var summK2;	 //колличество значений K2

	summK1 = 0;
	summK2 = 0;
	for (var j = 0; j<rows; j++){
		if ((+massK[j]) === 1) summK1++;
		else summK2++;
	}

	for (var i=0; i<cols;i++){
		sumK1[i] = 0;
		sumK2[i] = 0;
		for (j = 0; j<rows; j++){
			if ((+massK[j]) === 1){
				sumK1[i] += (+massX[i][j]);
			}
			else{
				sumK2[i] += (+massX[i][j]);
			}
		}
	}

	for (i=0; i<cols; i++){
		sumK1[i]=sumK1[i]/summK1; 	//МO для всех значений K1
		sumK2[i]=sumK2[i]/summK2;	//МO для всех значений K2
	}

	var sum = new Object();

	$("#fourth").empty();
	$("#thirdFirst").empty();
 	$("#thirdSecond").empty();
 	$('#thirdSecond').hide();

  	var metod = document.getElementsByName('metod');
    switch(true){
        case(metod[0].checked):
            case1();
            break;
        case(metod[1].checked):
            case2();
            break;
        case(metod[2].checked):
            case3();
            break;
        case(metod[3].checked):
            case4();
            break;
    }

	function case1(){

	//Рассчёт средних значений
		for (var i=0; i<cols; i++){
			sum[i] = ((+sumK1[i])+(+sumK2[i]))/2;
		}
	}

	function case2(){

		var maxXK1 = new Object();
		var minXK1 = new Object();
		var maxXK2 = new Object();
		var minXK2 = new Object();

		for(var i=0; i < cols; i++){
			maxXK1[i] = 0;
			minXK1[i] = 0;
			maxXK2[i] = 0;
			minXK2[i] = 0;
			for(var j=0; j<rows;j++){
				if((+massK[j]) == 1){
					if (maxXK1[i] == 0 && minXK1[i] == 0){
						maxXK1[i] = (+massX[i][j]);
						minXK1[i] = (+massX[i][j]);
					}
					if((+maxXK1[i]) < (+massX[i][j])) maxXK1[i] = (+massX[i][j]);
					if((+minXK1[i]) > (+massX[i][j])) minXK1[i] = (+massX[i][j]);
				}

				else{
					if (maxXK2[i] == 0 && minXK2[i] == 0){
						maxXK2[i] = (+massX[i][j]);
						minXK2[i] = (+massX[i][j]);
					}
					if((+maxXK2[i]) < (+massX[i][j])) maxXK2[i] = (+massX[i][j]);
					if((+minXK2[i]) > (+massX[i][j])) minXK2[i] = (+massX[i][j]);
				}
			}
		}

		var maxBL = new Object();
		var minBL = new Object();
		for(var i=0; i < cols; i++){
			maxBL[i] = 0;
			minBL[i] = 0;
			for(var j=0; j<rows;j++){
				if((+massK[j]) == 1){
					if((+massX[i][j]) <= maxXK2[i]){
						if (maxBL[i] == 0) maxBL[i] = (+massX[i][j]);
						else if ((+massX[i][j]) > maxBL[i]) maxBL[i] = (+massX[i][j]);
					}
				}
				else{
					if((+massX[i][j]) >= minXK1[i]){
						if (minBL[i] == 0) minBL[i] = (+massX[i][j]);
						else if ((+massX[i][j]) < minBL[i]) minBL[i] = (+massX[i][j]);
					}
				}
			}
		}

	//Рассчёт средних значений
		for (i=0; i<cols; i++){
			sum[i] = ((+maxBL[i])+(+minBL[i]))/2;
		}
	}

	function case3(){
		var minValueSumK = new Object();
		var piece = new Object();
		var pieceFromPice = new Object();
		var megaBigMassZ = new Object();		  //Хранит всё!
		var megaBigCounterForZ1 = new Object();	  //общее число экземпляров с z=1
		var megaBigCounterForZ0 = new Object();    //общее число экземпляров с z=0
		var megaBigCounterForK1Z1 = new Object();
		var megaBigCounterForK1Z0 = new Object();
		var megaBigCounterForK2Z1 = new Object();
		var megaBigCounterForK2Z0 = new Object();
		for (var i=0; i<cols; i++){
			megaBigMassZ[i] = new Object();			 
			megaBigCounterForZ1[i] = new Object();   
			megaBigCounterForZ0[i] = new Object();	
			megaBigCounterForK1Z1[i] = new Object();   
			megaBigCounterForK1Z0[i] = new Object();	
			megaBigCounterForK2Z1[i] = new Object();   
			megaBigCounterForK2Z0[i] = new Object();	 
			if (sumK1[i] >= sumK2[i]) {               //используем правило if(xi>+x0)z=1;
				piece[i] = (+sumK1[i])-(+sumK2[i]);
				pieceFromPice[i] = (+piece[i])/100;
				minValueSumK[i] = (+sumK2[i]);

				for (var seven = 0; seven<100; seven++){
					megaBigMassZ[i][seven] = new Object();
					megaBigCounterForZ1[i][seven] = 0;
					megaBigCounterForZ0[i][seven] = 0;
					megaBigCounterForK1Z1[i][seven] = 0;
					megaBigCounterForK1Z0[i][seven] = 0;
					megaBigCounterForK2Z1[i][seven] = 0;
					megaBigCounterForK2Z0[i][seven] = 0;
					for (var j = 0; j<rows; j++){
						if((+massX[i][j]) >= (+minValueSumK[i])+((+pieceFromPice[i])*(seven+1))) {
							megaBigMassZ[i][seven][j] = 1;
							megaBigCounterForZ1[i][seven]++;
							if ((+massK[j]) === 1) megaBigCounterForK1Z1[i][seven]++;
							else megaBigCounterForK2Z1[i][seven]++;
						} 
						else {
							megaBigMassZ[i][seven][j] = 0;
							megaBigCounterForZ0[i][seven]++;
							if ((+massK[j]) === 1) megaBigCounterForK1Z0[i][seven]++;
							else megaBigCounterForK2Z0[i][seven]++;
						}
					}
				}
			}
			else {									//используем правило if(xi<=x0)z=1;
				piece[i] = (+sumK2[i])-(+sumK1[i]);
				pieceFromPice[i] = (+piece[i])/100;
				minValueSumK[i] = (+sumK1[i]);

				for (var seven = 0; seven<100; seven++){
					megaBigMassZ[i][seven] = new Object();
					megaBigCounterForZ1[i][seven] = 0;
					megaBigCounterForZ0[i][seven] = 0;
					megaBigCounterForK1Z1[i][seven] = 0;
					megaBigCounterForK1Z0[i][seven] = 0;
					megaBigCounterForK2Z1[i][seven] = 0;
					megaBigCounterForK2Z0[i][seven] = 0;
					for (var j = 0; j<rows; j++){

						if((+massX[i][j]) <= (+minValueSumK[i])+((+pieceFromPice[i])*(seven+1))) {
							megaBigMassZ[i][seven][j] = 1;
							megaBigCounterForZ1[i][seven]++;
							if ((+massK[j]) === 1) megaBigCounterForK1Z1[i][seven]++;
							else megaBigCounterForK2Z1[i][seven]++;
						} 
						else {
							megaBigMassZ[i][seven][j] = 0;
							megaBigCounterForZ0[i][seven]++; 
							if ((+massK[j]) === 1) megaBigCounterForK1Z0[i][seven]++;
							else megaBigCounterForK2Z0[i][seven]++;
						}
					}
				}
			}
		}

		var megaPK1Z1 = new Object();
		var megaPK1Z0 = new Object();
		var megaPK2Z1 = new Object();
		var megaPK2Z0 = new Object();
		var megaP1 = new Object();
		var megaP0 = new Object();
		for (i=0; i<cols; i++){
			megaPK1Z1[i] = new Object();
			megaPK1Z0[i] = new Object();
			megaPK2Z1[i] = new Object();
			megaPK2Z0[i] = new Object();
			megaP1[i] = new Object();
			megaP0[i] = new Object();
			for (seven = 0; seven<100; seven++){
				megaPK1Z1[i][seven] = (+megaBigCounterForK1Z1[i][seven])/(+megaBigCounterForZ1[i][seven]);
				megaPK1Z0[i][seven] = (+megaBigCounterForK1Z0[i][seven])/(+megaBigCounterForZ0[i][seven]);
				megaPK2Z1[i][seven] = (+megaBigCounterForK2Z1[i][seven])/(+megaBigCounterForZ1[i][seven]);
				megaPK2Z0[i][seven] = (+megaBigCounterForK2Z0[i][seven])/(+megaBigCounterForZ0[i][seven]);
				megaP1[i][seven] = (+megaBigCounterForZ1[i][seven])/((+megaBigCounterForZ1[i][seven])+(+megaBigCounterForZ0[i][seven]));
				megaP0[i][seven] = (+megaBigCounterForZ0[i][seven])/((+megaBigCounterForZ1[i][seven])+(+megaBigCounterForZ0[i][seven]));
			}
		}

		var megaPK1 = summK1/(summK2+summK1);
		var megaPK2 = summK2/(summK2+summK1);

		var megaHKS = (0-1)*((megaPK1*Math.log(megaPK1))+(megaPK2*Math.log(megaPK2)));

		var megaK1Xi0 = new Object();
		var megaK2Xi0 = new Object();
		var megaBigSuperI = new Object();
		for (i=0; i<cols; i++){
			megaK1Xi0[i] = new Object();
			megaK2Xi0[i] = new Object();
			megaBigSuperI[i] = new Object();
			for (seven = 0; seven<100; seven++){
				(1-Math.pow(0.05, (1/(+summK1))))
				if((+megaPK1Z1[i][seven]) === 0) {megaPK1Z1[i][seven] = (1-Math.pow(0.05, (1/(+summK1))));}
				if((+megaPK2Z1[i][seven]) === 0) {megaPK2Z1[i][seven] = (1-Math.pow(0.05, (1/(+summK2))));} 
				if((+megaPK1Z0[i][seven]) === 0) {megaPK1Z0[i][seven] = (1-Math.pow(0.05, (1/(+summK1))));}
				if((+megaPK2Z0[i][seven]) === 0) {megaPK2Z0[i][seven] = (1-Math.pow(0.05, (1/(+summK2))));}
				megaK1Xi0[i][seven] = (0-1)*((+megaP1[i][seven])*(((+megaPK1Z1[i][seven])*Math.log10((+megaPK1Z1[i][seven])))+((+megaPK2Z1[i][seven])*Math.log10((+megaPK2Z1[i][seven])))))-((+megaP0[i][seven])*(((+megaPK1Z0[i][seven])*Math.log10((+megaPK1Z0[i][seven])))+((+megaPK2Z0[i][seven])*Math.log10((+megaPK2Z0[i][seven])))));
				megaBigSuperI[i][seven] = megaHKS - (+megaK1Xi0[i][seven]);
			}
		}

		var summMeg = new Object();
		for (i=0; i<cols; i++){
			summMeg[i] = (+megaBigSuperI[i][0]);
			sum[i] = (+minValueSumK[i])+((+pieceFromPice[i])*(1));
			for (seven = 0; seven<100; seven++){
				if ((+summMeg[i]) < (+megaBigSuperI[i][seven])){  
					summMeg[i] = (+megaBigSuperI[i][seven]);
					sum[i] = (+minValueSumK[i])+((+pieceFromPice[i])*(seven+1));
				}
			}
		}

		for (var trator = 0; trator<cols; trator++){
			$('#thirdSecond').append('<h4>Таблица двоичных сигналов для '+(trator+1)+' признака</h4>');
			var table = $('<table></table>');
			var thead = $('<thead></thead>');
			var tbody = $('<tbody></tbody>');
			for(var i=0; i<rows; i++){
					if(i === 0) var rowHead = $('<tr></tr>');
				    var row = $('<tr></tr>');
				    for(var j=0; j<102; j++){
				    	if(i === 0) {
				    		if(j === 0){
				    			var colHead = $('<td><h5>№ экземпляра</h5></td>');
				    			rowHead.append(colHead);
				    		}
				    		else if(j  === 1){
				    			var colHead = $('<td><h5>Номер класса K (1 или 2)</h5></td>');
				    			rowHead.append(colHead);
				    			
				    		}
				    		else {
				    			var colHead = $('<td><h5>Точка'+(j-1)+'</h5></td>');
				    			rowHead.append(colHead);
				    		}
				    	}
				    	if(j === 0) {
				    		var col = $('<td><h5>'+(i+1)+'</h5></td>');
				    		row.append(col);
				    	}
				    	else if(j === 1) {
				    		var col = $('<td>'+((+massK[i]).toFixed(0))+'</td>');
				    		row.append(col);
				    	}
				    	else{
				    		var col = $('<td>'+((+megaBigMassZ[trator][j-2][i]).toFixed(0))+'</td>');
				    		row.append(col);
				   		}
				    }
				    tbody.append(row);
				}
				thead.append(rowHead);
				table.append(thead);
				table.append(tbody);
			 	$('#thirdSecond').append(table);
		}
		var pieceOfpice;
		for (var trator = 0; trator<cols; trator++){
			pieceOfpice = 0;
			$('#thirdSecond').append('<h4>Таблица вероятностных характеристик '+(trator+1)+' признака</h4>');
			var table = $('<table></table>');
			var thead = $('<thead></thead>');
			var tbody = $('<tbody></tbody>');
			for(var i=0; i<9; i++){
					if(i === 0) var rowHead = $('<tr></tr>');
				    var row = $('<tr></tr>');
				    for(var j=0; j<101; j++){
				    	switch (i){
				    	case 0:
				    		if(j === 0){
				    			var colHead = $('<td><h5>Определяемая характеристика</h5></td>');
				    			rowHead.append(colHead);
				    			var col = $('<td><h5>P(K1/1)</h5></td>');
				    			row.append(col);
				    		}
				    		else {
				    			var colHead = $('<td><h5>Точка'+(j)+'</h5></td>');
				    			rowHead.append(colHead);
				    			var col = $('<td>'+((+megaPK1Z1[trator][j-1]).toFixed(3))+'</td>');
				    			row.append(col);
				    		}
				    		break;
				    	case 1:
				    		if(j === 0) {
				    			var col = $('<td><h5>P(K1/0)</h5></td>');
				    			row.append(col);
				    		}
				    		else{
				    			var col = $('<td>'+((+megaPK1Z0[trator][j-1]).toFixed(3))+'</td>');
				    			row.append(col);
				   			}
				   			break;
				   		case 2:
				    		if(j === 0) {
				    			var col = $('<td><h5>P(K2/1)</h5></td>');
				    			row.append(col);
				    		}
				    		else{
				    			var col = $('<td>'+((+megaPK2Z1[trator][j-1]).toFixed(3))+'</td>');
				    			row.append(col);
				   			}
				   			break;
				   		case 3:
				    		if(j === 0) {
				    			var col = $('<td><h5>P(K2/0)</h5></td>');
				    			row.append(col);
				    		}
				    		else{
				    			var col = $('<td>'+((+megaPK2Z0[trator][j-1]).toFixed(3))+'</td>');
				    			row.append(col);
				   			}
				   			break;
				   		case 4:
				    		if(j === 0) {
				    			var col = $('<td><h5>P(1)</h5></td>');
				    			row.append(col);
				    		}
				    		else{
				    			var col = $('<td>'+((+megaP1[trator][j-1]).toFixed(3))+'</td>');
				    			row.append(col);
				   			}
				   			break;
				   		case 5:
				    		if(j === 0) {
				    			var col = $('<td><h5>P(0)</h5></td>');
				    			row.append(col);
				    		}
				    		else{
				    			var col = $('<td>'+((+megaP0[trator][j-1]).toFixed(3))+'</td>');
				    			row.append(col);
				   			}
				   			break;
				   		case 6:
				    		if(j === 0) {
				    			var col = $('<td><h5>I(x<sub>i0</sub>)</h5></td>');
				    			row.append(col);
				    		}
				    		else{
				    			var col = $('<td>'+((+megaBigSuperI[trator][j-1]).toFixed(3))+'</td>');
				    			row.append(col);
				   			}
				   			break;
				   		case 7:
				    		if(j === 0) {
				    			var col = $('<td><h5>x<sub>i0</sub></h5></td>');
				    			row.append(col);
				    		}
				    		else{
				    			var col = $('<td>'+(((+minValueSumK[trator])+((+pieceFromPice[trator])*(pieceOfpice+1))).toFixed(3))+'</td>');
				    			row.append(col);
				    			pieceOfpice++;
				   			}
				   			break;
				   		case 8:
				    		if(j === 0) {
				    			var col = $('<td><h5>H(K<sub>S</sub>/x<sub>i0</sub>)</h5></td>');
				    			row.append(col);
				    		}
				    		else{
				    			var col = $('<td>'+((+megaK1Xi0[trator][j-1]).toFixed(3))+'</td>');
				    			row.append(col);
				   			}
				   			break;
				   		}
				    }
				    tbody.append(row);
				}
				thead.append(rowHead);
				table.append(thead);
				table.append(tbody);
			 	$('#thirdSecond').append(table);
		

		$('#thirdSecond').append('<div class="forP"><h2>График зависимости I(xo)=f(x0) для признака '+(trator+1)+'</h2></div>');
		$('#thirdSecond').append('<canvas height="500px" width="500px" id="schedule'+(trator+1)+'">schedule</canvas>');
		var schedule = document.getElementById('schedule'+(trator+1)+'');
		schedule.width = schedule.width;
		var graph = schedule.getContext("2d");
		var width = schedule.width, height = schedule.height;
		function valueToX (n,max) {return n*width/max;}
		function valueToY (n,max) {return height-(n*height/max);}

		graph.beginPath();
		j=0;
		var maxY = (+megaBigSuperI[trator][0]);
		for (var qq = 0; qq<100; qq++){
			if ((+megaBigSuperI[trator][qq]) > maxY) maxY = (+megaBigSuperI[trator][qq]);
		}
		maxF = ((+minValueSumK[trator])+((+pieceFromPice[trator])*(100)));

		for (i=0; i < 100; i++){
				if(j === 0) graph.moveTo(valueToX(((+minValueSumK[trator])+((+pieceFromPice[trator])*(i+1))),maxF), valueToY(((+megaBigSuperI[trator][i]),maxY)));
				else graph.lineTo(valueToX(((+minValueSumK[trator])+((+pieceFromPice[trator])*(i+1))),maxF), valueToY(((+megaBigSuperI[trator][i])),maxY));
	 		j++;
		}
		graph.strokeStyle = "red";
		graph.stroke();

	//Разбиение оси X
	    graph.textAlign = "center";
	    var y = valueToY(0,maxY);
	    for (var mark = 0; mark <= 100; mark += 5) {
			var x = valueToX(mark,100);
			if (mark % 10 == 0) {
				graph.fillText(String((((maxF/100)*mark).toFixed(1))), x, y - 4);
				graph.fillRect(x - 0.5, y - 4, 1, 3);
			}
			else graph.fillRect(x - 0.5, y - 0.2, 1, 3);
		}

		graph.beginPath();
		graph.strokeStyle = "black";
		graph.moveTo(valueToX(0,maxF*10), valueToY(maxY,maxY));
		graph.lineTo(valueToX(0,maxF*10), valueToY(0,maxY));
		graph.stroke();

	//Разбиение оси Y
		graph.textAlign = "left";
		graph.textBaseline = "middle";
		var x = valueToX(0,maxF*10);
		for (var mark = 0; mark <=100; mark += 5) {
			var y = valueToY(mark,100);
			if (mark % 10 == 0) {
				graph.fillText(String((((maxY/100)*mark).toFixed(1))), x + 10, y);
				graph.fillRect(x + 4, y - 0.5, 3, 1);
			}
			else graph.fillRect(x + 2, y - 0.5, 3, 1);
	 	}

	 	graph.beginPath();
		graph.strokeStyle = "black";
		graph.moveTo(valueToX(0,maxF*10), valueToY(0,maxY));
		graph.lineTo(valueToX(maxF*10,maxF*10), valueToY(0,maxY));
		graph.stroke();

	//Добавляем подписи к осям
		graph.font="bold 15px sans-serif";
	    graph.fillStyle="black";
	    graph.fillText("I", 30, 10);
	    graph.fillText("x", 490, 480);
	    
	//Создаем ссылку на скачивание
		$('#thirdSecond').append('<div><h5> <a id="download'+(trator+1)+'"> Скачать</a></h5></div>');
	    var a =  document.getElementById('download'+(trator+1)+'');
	    a.download = "График.png";
	    a.href = schedule.toDataURL("png");
	}
}

function case4(){

	var maxMM = new Object();
	var minMM = new Object();

	var piceMM = new Object();
	for (var i=0; i<cols; i++){
		maxMM[i] = massX[i][0];
		minMM[i] = massX[i][0];
		for (var j = 0; j<rows; j++){
			if((+maxMM[i]) < (+massX[i][j])) maxMM[i] = (+massX[i][j]); 
			if((+minMM[i]) > (+massX[i][j])) minMM[i] = (+massX[i][j]); 
		}
	}
	var sumMM = new Object();
	var massZMM = new Object();
	var z0MM = new Object(); //количество значений с z0
	var z1MM = new Object(); //количество значений с z1

	for (i=0; i<cols; i++){
		piceMM[i] = ((+maxMM[i])-(+minMM[i]))/16;
	}
	var mMmMmM = new Object();

	for (i=0; i<cols; i++){
		for(var qq=0; qq<16;qq++){
			sumMM[i] = (+minMM[i])+((+piceMM[i])*(qq+1));
			mMmMmM[qq]=0;
			z0MM[i]=0;
			z1MM[i]=0;
			massZMM[i] = new Object();
			if ( sumK1[i] >= sumK2[i] ){
				for (var j = 0; j<rows; j++){
					if(massX[i][j] >= sumMM[i]) {
						if ((+massK[j])==1) z1MM[i]++;
					} 
					else {
						if ((+massK[j])==2) z0MM[i]++;
					}
				}
				
			}
			else {
				for (var j = 0; j<rows; j++){
					if(massX[i][j] <= sumMM[i]) {
						if ((+massK[j])==1) z1MM[i]++;
					} 
					else {
						if ((+massK[j])==2) z0MM[i]++;
					}
				}
			}
			mMmMmM[qq] = z1MM[i] + z0MM[i]; 
			if(qq === 0) {
				sum[i] = sumMM[i]; 
			}
			if(qq !== 0 && mMmMmM[qq] > mMmMmM[qq-1]){
				sum[i] = sumMM[i];
			}
		}
	}

}



//////////////////////////////////////////////////////////////!!!!!!!!!!!!1
//Присвоение точности Z
	var crutch;
	var z0 = new Object(); //количество значений с z0
	var z1 = new Object(); //количество значений с z1
	for (i=0; i<cols; i++){
		z0[i]=0;
		z1[i]=0;
		massZ[i] = new Object();
		if ( sumK1[i] >= sumK2[i] ){
			for (var j = 0; j<rows; j++){
				if(massX[i][j] >= sum[i]) {
					massZ[i][j] = 1;
					z1[i]++;
				} 
				else {
					massZ[i][j] = 0;
					z0[i]++;
				}
			}
			
		}
		else {
			for (var j = 0; j<rows; j++){
				if(massX[i][j] <= sum[i]) {
					massZ[i][j] = 1;
					z1[i]++;
				} 
				else {
					massZ[i][j] = 0;
					z0[i]++;
				}
			}
		}
	}

//Рассчёт количств значенией с K=1,Z=1 и K=1,Z=0
	var z1k1 = new Object(); 
	var z0k1 = new Object();
	for (i=0; i<cols; i++){
		z1k1[i]=0;
		z0k1[i]=0;
		for (var j = 0; j<rows; j++){
			if(+massZ[i][j] === 1 && +massK[j] === 1) z1k1[i]++;
			if(+massZ[i][j] === 0 && +massK[j] === 1) z0k1[i]++;
		}
	}

//Поиск значений а(альфа(р11,р10))
	for (i=0; i<cols; i++){
		p11[i]=0;
		p10[i]=0;
		p11[i] = (+z1k1[i])/(+z1[i]);
		p10[i] = (+z0k1[i])/(+z0[i]);
	}

//Поиск значений суммарного F для кажого образца
	for (i=0; i<rows; i++){
		sumF[i]=0;
		for (var j = 0; j<cols; j++){
			if (+massZ[j][i] === 1) {
				sumF[i]+=(+p11[j]);
			}
			else{
				sumF[i]+=(+p10[j]);
			}
		}
	}

//Построение сводной таблицы
	$('#thirdFirst').append('<div><h1>Сводня таблица</h1></div>');
	$('#thirdFirst').append('<div><h4>При необходимости выделите и скопируйте таблицу в документ</h4></div>');
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	ij=1;
	var crutch1;
	for(var i=0; i<rows; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
		var row = $('<tr></tr>');
		crutch1=0; 
		for(var j=0; j<cols*2+3; j++){
		    if (i === 0){
		    	if(j === cols*2+2){
		    		var colHead = $('<td><h5>F</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if(j === cols*2+1){
		    		var colHead = $('<td><h5>Номер класса К (1 или 2)</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if(j === 0){
		    		var colHead = $('<td><h5>№ экземпляра</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if(j % 2 === 0){
		    		var colHead = $('<td><h5>Z'+ij+' </h5></td>');
		    		rowHead.append(colHead);
		    		ij++;
		    	}
		    	else {
		    		var colHead = $('<td><h5>X'+ij+' при t=0</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    }
		    if(j === cols*2+2){
		    	var col = $('<td>'+((+sumF[i]).toFixed(3))+'</td>');
		    	row.append(col);
		    }
		    else if(j === cols*2+1){
		    	var col = $('<td><h5>'+((+massK[i]).toFixed(0))+'</h5></td>');
		    	row.append(col);
		    }
		    else if(j === 0){
		    	var col = $('<td><h5>'+(i+1)+'</h5></td>');
		    	row.append(col);
		    }
		    else if(j % 2 === 0){
		    	var col = $('<td>'+((+massZ[crutch1][i]).toFixed(0))+'</td>');
		    	row.append(col);
		    	crutch1++;
		    }
		    else {
		    	var col = $('<td>'+((+massX[crutch1][i]).toFixed(3))+'</td>');
		    	row.append(col);
		    	}
		}
		tbody.append(row);
		}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
 	$('#thirdFirst').append(table);

 	$("#buildSchedule").removeClass().addClass("btn btn-default");
 	$("#logicTable").removeClass().addClass("btn btn-default");

	$("#buildSchedule").attr('disabled',true);
	$("#logicTable").attr('disabled',true);

//Таблицы промежуточных рассчётов 
	
	$('#thirdSecond').append('<div><h4>Таблица значений МО</h4></div>');
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	for(var i=0; i<2; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
	    var row = $('<tr></tr>');
	    for(var j=0; j<((+cols)+1); j++){
	    	if(i === 0) {
	    		if(j === 0){
	    			var colHead = $('<td><h5>Мат. ожидание</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    		else {
	    			var colHead = $('<td><h5>Признак X'+j+'</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    	}
	    	if(j === 0 && i === 0) {
	    		var col = $('<td><h5>МО для К1</h5></td>');
	    		row.append(col);
	    	}
	    	else if(j === 0 && i === 1) {
	    		var col = $('<td><h5>МО для К2</h5></td>');
	    		row.append(col);
	    	}
	    	else if(i === 0){
	    		var col = $('<td>'+((+sumK1[j-1]).toFixed(3))+'</td>');
	    		row.append(col);
	   		}
	   		else {
	    		var col = $('<td>'+((+sumK2[j-1]).toFixed(3))+'</td>');
	    		row.append(col);
	   		}
	    }
	    tbody.append(row);
	}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
 	$('#thirdSecond').append(table);

 	$('#thirdSecond').append('<div><h5>Количество экземпляров с K1: '+summK1+'</h5></div>');
 	$('#thirdSecond').append('<div><h5>Количество экземпляров с K2: '+summK2+'</h5></div>');

	$('#thirdSecond').append('<div><h4>Таблица значений x<sub>0</sub></h4></div>');
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	for(var i=0; i<1; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
	    var row = $('<tr></tr>');
	    for(var j=0; j<((+cols)+1); j++){
	    	if(i === 0) {
	    		if(j === 0){
	    			var colHead = $('<td><h5></h5></td>');
	    			rowHead.append(colHead);
	    		}
	    		else {
	    			var colHead = $('<td><h5>Признак X'+j+'</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    	}
	    	if(j === 0) {
	    		var col = $('<td><h5>x<sub>0</sub></h5></td>');
	    		row.append(col);
	    	}
	   		else {
	    		var col = $('<td>'+((+sum[j-1]).toFixed(3))+'</td>');
	    		row.append(col);
	   		}
	    }
	    tbody.append(row);
	}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
 	$('#thirdSecond').append(table);

 	$('#thirdSecond').append('<div><h4>Таблица значений веса двоичных сигналов</h4></div>');
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	for(var i=0; i<2; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
	    var row = $('<tr></tr>');
	    for(var j=0; j<((+cols)+1); j++){
	    	if(i === 0) {
	    		if(j === 0){
	    			var colHead = $('<td><h5>Двоичный сигнал</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    		else {
	    			var colHead = $('<td><h5>Признак X'+j+'</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    	}
	    	if(j === 0 && i === 0) {
	    		var col = $('<td><h5>P(K1/z=1)</h5></td>');
	    		row.append(col);
	    	}
	    	else if(j === 0 && i === 1) {
	    		var col = $('<td><h5>P(K1/z=0)</h5></td>');
	    		row.append(col);
	    	}
	    	else if(i === 0){
	    		var col = $('<td>'+((+p11[j-1]).toFixed(3))+'</td>');
	    		row.append(col);
	   		}
	   		else {
	    		var col = $('<td>'+((+p10[j-1]).toFixed(3))+'</td>');
	    		row.append(col);
	   		}
	    }
	    tbody.append(row);
	}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
 	$('#thirdSecond').append(table);

 //Поиск максимального и минимального F для каждой выборки
 	var maxF=0, minF=sumF[0], iter, itertatorForN;
 	for (i=0; i<rows; i++){
 		sumF[i] = (+sumF[i]).toFixed(3);
 		if(maxF < sumF[i]) maxF = (+sumF[i]);
 		if(minF > sumF[i]) minF = (+sumF[i]);
 	}
 	minF = minF.toFixed(3);
 	maxF = maxF.toFixed(3);

 //Считаем колличество значенией K2 причисленных к K1, и значений К1 причисленных к К2
	var n12 = new Object(); //К1 которое причислили к К2
 	var n21 = new Object(); //К2 которое причислили к К1
 	itertatorForN=0;
 	for (i=(+minF); i <= maxF*10; i+=1){
 		n12[itertatorForN]=0;
 		n21[itertatorForN]=0;
 		for(j=0; j<rows; j++){
 			if(sumF[j]*10 == i){
 				if (+massK[j] === 1) n12[itertatorForN]++; 
 				if (+massK[j] === 2) n21[itertatorForN]++; 
 			}
 			else if(sumF[j]*10 < i){
 				if (+massK[j] === 1) n12[itertatorForN]++; 
 			}
 			else {
 				if (+massK[j] === 2) n21[itertatorForN]++; 
 			}
 		}
 	itertatorForN++;
	}

	var maxY=1;
	for(i=0;i<itertatorForN; i++){
		if(n12[itertatorForN]/summK2 > maxY) maxY = n12[itertatorForN]/summK2;
		if(n21[itertatorForN]/summK1 > maxY) maxY = n21[itertatorForN]/summK1;
	}
	maxY = maxY.toFixed(3);

	$('#thirdFirst').append('<h4>Ниже находится дополнительная информация, по промежуточным рассчётам.</h4>');
	$('#thirdFirst').append('<div class="row"><button id="information" type="button" class="butForAll btn btn-primary"><i class="fa fa-cogs" aria-hidden="true"></i> Показать</button></div>');





//Строим график, где пересечение 2-х линий и есть р0
	$('#fourth').append('<p>Экзамен состоит в определении лучшего (оптимального) значения порога в прогнозирующем правиле, в предположении применения его к экземплярам обучающей выборки, истинный класс (K1 или K2) которых известен из результатов испытания.<p>');
	$('#fourth').append('<p>На этапе экзамена оценивают также ошибки прогнозирования, то есть экзаменуют полученное прогнозирующее правило.</p>'); 
	$('#fourth').append('<p>Порог разделения в прогнозирующем правиле выбирают из условия обеспечения минимума ошибок прогнозирования.</p>');
	$('#fourth').append('<p>р21 – риск потребителя</p>'); 
	$('#fourth').append('<p>р12 – риск производителя</p>'); 
	$('#fourth').append('<p>Если при допустимом риске потребителя р21 требования относительно риска изготовителя р12 не выполняется, то следует изменить пороговые уровни признаков (одного или нескольких) таким образом, чтобы обеспечивался меньший риск изготовителя, приходящийся на каждый признак и снова повторить процесс обучения и экзамена. Если этот способ не даст желаемых результатов, то следует найти более информативные признаки, либо использовать бóльшее число признаков.<p>');

	$('#fourth').append('<div class="forP"><h2>График нахождения p<sub>0</sub></h2></div>');
	$('#fourth').append('<canvas height="500px" width="500px" id="schedule">schedule</canvas>');
	var schedule = document.getElementById("schedule");
	schedule.width = schedule.width;
	var graph = schedule.getContext("2d");
	var width = schedule.width, height = schedule.height;
	function valueToX (n,max) {return n*width/max;}
	function valueToY (n,max) {return height-(n*height/max);}

	graph.beginPath();
	j=0;
	for (i=(+minF); i <= maxF*10; i+=1){
			if(j === 0) graph.moveTo(valueToX(i,maxF*10), valueToY((n12[j]/summK2,maxY)));
			else graph.lineTo(valueToX(i,maxF*10), valueToY((n12[j]/summK2),maxY));
 		j++;
	}
	graph.strokeStyle = "red";
	graph.stroke();
	j=0;
	graph.beginPath();
	for (i=(+minF); i <= maxF*10; i+=1){
			if(j === 0) graph.moveTo(valueToX(i,maxF*10), valueToY((n21[j]/summK1)),maxY);
			else graph.lineTo(valueToX(i,maxF*10), valueToY((n21[j]/summK1),maxY));
 		j++;
	}
	graph.strokeStyle = "green";
	graph.stroke();

//Разбиение оси X
    graph.textAlign = "center";
    var y = valueToY(0,maxY);
    for (var mark = 0; mark <= 100; mark += 5) {
		var x = valueToX(mark,100);
		if (mark % 10 == 0) {
			graph.fillText(String((((maxF/100)*mark).toFixed(1))), x, y - 4);
			graph.fillRect(x - 0.5, y - 4, 1, 3);
		}
		else graph.fillRect(x - 0.5, y - 0.2, 1, 3);
	}

	graph.beginPath();
	graph.strokeStyle = "black";
	graph.moveTo(valueToX(0,maxF*10), valueToY(maxY,maxY));
	graph.lineTo(valueToX(0,maxF*10), valueToY(0,maxY));
	graph.stroke();
//Разбиение оси Y
	graph.textAlign = "left";
	graph.textBaseline = "middle";
	var x = valueToX(0,maxF*10);
	for (var mark = 0; mark <=100; mark += 5) {
		var y = valueToY(mark,100);
		if (mark % 10 == 0) {
			graph.fillText(String((((maxY/100)*mark).toFixed(1))), x + 10, y);
			graph.fillRect(x + 4, y - 0.5, 3, 1);
		}
		else graph.fillRect(x + 2, y - 0.5, 3, 1);
 	}
	
	graph.beginPath();
	graph.strokeStyle = "black";
	graph.moveTo(valueToX(0,maxF*10), valueToY(0,maxY));
	graph.lineTo(valueToX(maxF*10,maxF*10), valueToY(0,maxY));
	graph.stroke();

//Добавляем подписи к осям
	graph.font="bold 15px sans-serif";
    graph.fillStyle="black";
    graph.fillText("p21,p12", 30, 10);
    graph.fillText("F", 490, 480);
    graph.fillStyle="red";
    graph.fillText("p12 - красный", 390, 10);
    graph.fillStyle="green";
    graph.fillText("p21 - зелёный", 390, 25);
    
//Создаем ссылку на скачивание
	$('#fourth').append('<div><h5> <a id="download"> Скачать</a></h5></div>');
    var a =  document.getElementById("download");
    a.download = "График.png";
    a.href = schedule.toDataURL("png");

	$('#fourth').append('<div><h4>Введите наибоее подходящее пороговое значение разделения классов</h4></div>');
 	$('#fourth').append('<div><label><input id="thresholdInp" class="number2 lastInput" type="" name="" placeholder="пороговое P0"></label></div>');
	$('#fourth').append('<div class="row"><button id="threshold" type="button" class="butForAll btn btn-primary"><i class="fa fa-cogs" aria-hidden="true"></i> Ввод</button></div>');

//Just for shedule
 	justForShedule=0;

 	$("#nextLi").removeClass("disabled");
 	
 	toogleCheck=4;

 	if(justForShedule === 0){
 		$("#buildSchedule").removeClass().addClass("btn btn-warning");
 		$("#buildSchedule").attr('disabled',false);
 		justForShedule++;
 	}



//////////////Table//////////////

	$('#fourth').append('<div><h4>Таблица сигналов</h4></div>');
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	ij=1;
	var crutch1;
	for(var i=0; i<rows; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
		var row = $('<tr></tr>');
		crutch1=0; 
		for(var j=0; j<((+cols)+2); j++){
		    if (i === 0){
		    	if(j === 0){
		    		var colHead = $('<td><h5>№ экземпляра</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if(j === 1){
		    		var colHead = $('<td><h5>Номер класса К (1 или 2)</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if(j === ((+cols)+3)){
		    		var colHead = $('<td><h5>F</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else {
		    		var colHead = $('<td><h5>Z'+ij+' </h5></td>');
		    		rowHead.append(colHead);
		    		ij++;
		    	}
		    }
		    if(j === 0){
		    	var col = $('<td><h5>'+(i+1)+'</h5></td>');
		    	row.append(col);
		    }
		    else if(j === 1){
		    	var col = $('<td><h5>'+((+massK[i]).toFixed(0))+'</h5></td>');
		    	row.append(col);
		    }
		    else if(j === ((+cols)+3)){
		    	var col = $('<td>'+((+sumF[i]).toFixed(3))+'</td>');
		    	row.append(col);
		    }
		    else {
		    	var col = $('<td>'+((+massZ[crutch1][i]).toFixed(0))+'</td>');
		    	row.append(col);
		    	crutch1++;
		    }
		}
		tbody.append(row);
		}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
 	$('#fourth').append(table);







//////////end Table/////////////////////////////



}


$(document).on("click", "#information", information);

function information(){
	$('#thirdSecond').show();
}


$(document).on("click", "#buildTable", buildTable);

function buildTable() {
	$("#buildTable").removeClass("btn-warning").addClass("btn-default active");
	$("#entry").removeClass("btn-default").addClass("btn-success");

	$("#first").hide();
	$("#second").hide();
	$("#third").show();
 	$("#fourth").hide();
 	$("#fifth").hide();

 	$("#planing").removeClass("active");
 	$("#entry").removeClass("active");
 	$("#buildTable").addClass("active");
 	$("#buildSchedule").removeClass("active");
 	$("#logicTable").removeClass("active");

 	$("#prevLi").removeClass("disabled");
 	$("#nextLi").removeClass("disabled");
 	if (toogleCheck <= 3){
 		$("#nextLi").addClass("disabled");
 	}
 	tooglerner = 3;
}


$(document).on("click", "#buildSchedule", buildSchedule);

function buildSchedule() {
	$("#buildSchedule").removeClass("btn-warning").addClass("btn-default active");
	$("#buildTable").removeClass("btn-default").addClass("btn-success");

	$("#first").hide();
	$("#second").hide();
	$("#third").hide();
 	$("#fourth").show();
 	$("#fifth").hide();

 	$("#planing").removeClass("active");
 	$("#entry").removeClass("active");
 	$("#buildTable").removeClass("active");
 	$("#buildSchedule").addClass("active");
 	$("#logicTable").removeClass("active");

 	$("#prevLi").removeClass("disabled");
 	$("#nextLi").removeClass("disabled");
 	if (toogleCheck <= 4){
 		$("#nextLi").addClass("disabled");
 	}
 	tooglerner = 4;
}


$(document).on("click", "#threshold", threshold);

function threshold(){
	threshold = $("#thresholdInp").val();
	if(threshold === "" ){
		alert("Введите значения!");
		return;
	}
//Ищем повторяющиеся значения
	var a = new Object();
	var b = new Object();
	var air1, crutch, crutch1, crutch2;
	for (var i = 0; i<rows; i++){
		crutch1 = 0;
		crutch2 = 0;
		if (i === 0){
			a[i] = new Object();
			for (var j = 0; j<cols; j++){
				a[i][j] = massZ[j][i];
			}
			crutch = 0;
			crutch++;
			b[i] = sumF[i];
		}
		else {
			for (var x = 0; x<crutch; x++){
				crutch1 = 0;
				for (var y = 0; y<cols; y++){
					if ((+a[x][y]) === (+massZ[y][i])) crutch1++;
					if (crutch1 === (+cols)) crutch2++;
				}
			}
			if (crutch2 === 0){
				a[crutch] = new Object();
				for (j = 0; j<cols; j++){
					a[crutch][j] = massZ[j][i];
				}
				b[crutch] = sumF[i];
				crutch++;
			}
		}
	}

//Строим сводную логическую таблицу
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	for(var i=0; i<crutch; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
		var row = $('<tr></tr>');
		for(var j=0; j<((+cols)+2); j++){
		    if (i === 0){
		    	if(j == ((+cols)+1)){
		    		var colHead = $('<td><h5>Номер класса K (1 или 2)</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if(j == (+cols)){
		    		var colHead = $('<td><h5>F</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else {
		    		var colHead = $('<td><h5>Z'+(j+1)+'</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    }
		    if(j == ((+cols)+1)){
		    	var col = $('<td><h5>'+(b[i]<=threshold?2:1)+'</h5></td>');
		    	row.append(col);
		    }
		    else if(j == (+cols)){
		    	var col = $('<td><h5>'+b[i]+'</h5></td>');
		    	row.append(col);
		    }
		    else {
		    	var col = $('<td>'+(+a[i][j])+'</td>');
		    	row.append(col);
		    	}
		}
		tbody.append(row);
		}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
	$("#fifth").empty();

	$('#fifth').append('<p>Прогнозирование нового экземпляра заключается в измерении у этого экземпляра признаков x1, x2, …, xk в момент времени t = 0, преобразовании их в двоичные сигналы z1, z2, …, zk и принятии решения о принадлежности экземпляра к классу K1 или K2 по прогнозирующему правилу.</p>');
	$('#fifth').append('<p>Прогнозирующее правило представлено логической таблицей не повторяющихся двоичных сигналов.</p>');

	$('#fifth').append('<div><h4>Логическая таблица</h4></div>');
 	$('#fifth').append(table);

 	$("#logicTable").removeClass().addClass("btn btn-warning");
 	$("#logicTable").attr('disabled',false);

 	$("#nextLi").removeClass("disabled");
 	toogleCheck=5;

 	alert("Этап успешно завершен!");
}

$(document).on("click", "#logicTable", logicTable);


function logicTable() {
	$("#logicTable").removeClass("btn-warning").addClass("btn-default active");
	$("#buildSchedule").removeClass("btn-default").addClass("btn-success");

	$("#first").hide();
	$("#second").hide();
	$("#third").hide();
 	$("#fourth").hide();
 	$("#fifth").show();

 	$("#planing").removeClass("active");
 	$("#entry").removeClass("active");
 	$("#buildTable").removeClass("active");
 	$("#buildSchedule").removeClass("active");
 	$("#logicTable").addClass("active");

 	$("#prevLi").removeClass("disabled");
 	$("#nextLi").addClass("disabled");
 	tooglerner = 5;
}

$(document).on("click", "#next", function next(){
	switch (tooglerner){
		case 1:
			$("#prevLi").removeClass("disabled");
			if (toogleCheck >= 2)entry();
			break;
		case 2:
			if (toogleCheck >= 3)buildTable();
			break;
		case 3:
			if (toogleCheck >= 4)buildSchedule();
			break;
		case 4:
			if (toogleCheck >= 5){
				logicTable();
				$("#nextLi").addClass("disabled");
				}
			break;
	}

});

$(document).on("click", "#prev", function(){
	switch (tooglerner){
		case 2:
			$("#prevLi").addClass("disabled");
			planing();
			break;
		case 3:
			entry();
			break;
		case 4:
			buildTable();
			break;
		case 5:
			$("#nextLi").removeClass("disabled");
			buildSchedule();
			break;
	}

});








