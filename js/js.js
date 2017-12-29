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

//Построение таблицы
function builder (){
 	$("#second").empty();
 	$("#third").empty();
 	$("#fourth").empty();
 	$("#fifth").empty();
 	$("#second").hide();

	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	rows = $("#rows").val();
	cols = $("#cols").val();
	var ij=1;
	for(var i=0; i<rows; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
	    var row = $('<tr></tr>');
	    for(var j=0; j<(cols*2+1); j++){
	    	if(i === 0) {
	    		if(j === 0){
	    			var colHead = $('<td><h5>№ экземпляра</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    		else if(j % 2 === 0){
	    			var colHead = $('<td><h5>Клаcс K для Х'+ij+'</h5></td>');
	    			rowHead.append(colHead);
	    			ij++;
	    		}
	    		else {
	    			var colHead = $('<td><h5>Значение X'+ij+' при t=0</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    	}
	    	if(j === 0) {
	    		var col = $('<td><h5>'+(i+1)+'</h5></td>');
	    		row.append(col);
	    	}
	    	else if(j % 2 === 0) {
	    		var col = $('<td><label class="tableLable"><input class="number3 tableInput col'+(j-1)+' row'+i+'"></label></td>');
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
	$('#second').append('<p>Производим запись результатов обучающего эксперимента.</p>');
	$('#second').append('<div><h2>Введите значения</h2></div>');
 	$('#second').append(table);
 	$('#second').append('<div class="row"><button id="secondBut" type="button" class="butForAll btn btn-primary"><i class="fa fa-cogs" aria-hidden="true"></i> Ввод</button></div>');

 	$("#buildTable").removeClass().addClass("btn btn-default");
 	$("#buildSchedule").removeClass().addClass("btn btn-default");
 	$("#logicTable").removeClass().addClass("btn btn-default");

	$("#buildTable").attr('disabled',true);
	$("#buildSchedule").attr('disabled',true);
	$("#logicTable").attr('disabled',true);

 	$("#entry").removeClass().addClass("btn btn-success");
 	$("#entry").attr('disabled',false);
 }

$(document).on("click", "#planing", function() {
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
});

$(document).on("click", "#entry", function() {
	$("#entry").removeClass("btn-success").addClass("btn-warning active");

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
});

$(document).on("click", "#secondBut", refinement);

var massX = new Object();
var massK = new Object();
var massZ = new Object();

function refinement(){

 	$("#third").empty();
 	$("#fourth").empty();
 	$("#fifth").empty();

//Переписывание значений из таблицы в объект
	var air1, air2, air3, forX=0, forK=0;
	for (var i=0; i<cols*2;i++){
		air1 = ".col"+i;
		collector[i]= new Object();
		if(i % 2 === 0) {
			massX[forX] = new Object();
			forX++;
		}
		else {
			massK[forK] = new Object();
			forK++;
		}
		for (var j=0; j<rows;j++){
			air2 = ".row"+j;
			air3 = air1 + air2;
			if(i % 2 === 0) {
				massX[forX-1][j] = $(air3).val();  
			}
			else { 
				massK[forK-1][j] = $(air3).val(); 
			}
		}
	}

//Находим МО
	var sumK1 = new Object();	//сумма значений K1
	var sumK2 = new Object();	//сумма значений K2
	var summK1 = new Object();  //колличество значений K1
	var summK2 = new Object();	//колличество значений K2

	for (i=0; i<cols; i++){
		sumK1[i] = 0;
		sumK2[i] = 0;
		summK1[i] = 0;
		summK2[i] = 0;
		for (var j = 0; j<rows; j++){
			if ((+massK[i][j]) === 1){
				summK1[i]++;
				sumK1[i] += (+massX[i][j]);
			}
			else{
				summK2[i]++;
				sumK2[i] += (+massX[i][j]);
			}
		}
	}

//Рассчёт средних значений
	var sum = new Object();
	for (i=0; i<cols; i++){
		sumK1[i]=sumK1[i]/summK1[i];
		sumK2[i]=sumK2[i]/summK2[i];
		sum[i] = ((+sumK1[i])+(+sumK2[i]))/2;
	}

//Присвоение точности Z
	var crutch;
	var z0 = new Object(); //количество значений с z0
	var z1 = new Object(); //количество значений с z1
	for (i=0; i<cols; i++){
		z0[i]=0;
		z1[i]=0;
		massZ[i] = new Object();
		if ( sumK1[0] >= sumK2[0] ){
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
			if(+massZ[i][j] === 1 && +massK[i][j] === 1) z1k1[i]++;
			if(+massZ[i][j] === 0 && +massK[i][j] === 1) z0k1[i]++;
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
	$('#third').append('<div"><h1>Сводня таблица</h1></div>');
	$('#third').append('<div><h4>При необходимости выделите и скопируйте таблицу в документ</h4></div>');
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	ij=1;
	var crutch1, crutch9;
	for(var i=0; i<rows; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
		var row = $('<tr></tr>');
		crutch1=0; 
		crutch9=3; 
		for(var j=0; j<cols*3+2; j++){
		    if (i === 0){
		    	if(j === cols*3+1){
		    		var colHead = $('<td><h5>F</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if(j === 0){
		    		var colHead = $('<td><h5>№ экземпляра</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if(j % 3 === 0){
		    		var colHead = $('<td><h5>Z'+ij+' </h5></td>');
		    		rowHead.append(colHead);
		    		ij++;
		    	}
		    	else if((j+1) % crutch9 === 0){
		    		var colHead = $('<td><h5>K'+ij+' </h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else {
		    		var colHead = $('<td><h5>X'+ij+' при t=0</h5></td>');
		    		rowHead.append(colHead);
		    		}
		    }
		    if(j === cols*3+1){
		    	var col = $('<td>'+((+sumF[i]).toFixed(3))+'</td>');
		    	row.append(col);
		    }
		    else if(j === 0){
		    	var col = $('<td><h5>'+(i+1)+'</h5></td>');
		    	row.append(col);
		    }
		    else if(j % 3 === 0){
		    	var col = $('<td>'+massZ[crutch1][i]+'</td>');
		    	row.append(col);
		    	crutch1++;
		    }
		    else if((j+1) % crutch9 === 0){
		    	var col= $('<td>'+massK[crutch1][i]+'</td>');
		    	row.append(col);
		    	crutch9+=3;
		    }
		    else {
		    	var col = $('<td>'+massX[crutch1][i]+'</td>');
		    	row.append(col);
		    	}
		}
		tbody.append(row);
		}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
 	$('#third').append(table);

 	$("#buildSchedule").removeClass().addClass("btn btn-default");
 	$("#logicTable").removeClass().addClass("btn btn-default");

	$("#buildSchedule").attr('disabled',true);
	$("#logicTable").attr('disabled',true);

 	$("#buildTable").removeClass().addClass("btn btn-success");
 	$("#buildTable").attr('disabled',false);

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
 				crutch=0; 
 				crutch1=0;
 				for(iter=0; iter<cols; iter++){
 					if (+massK[iter][j] === 1) crutch++; 
 					if (+massK[iter][j] === 2) crutch1++; 
 				}
 				if(crutch >= cols/2) n12[itertatorForN]++; 
 				if(crutch1 >= cols/2) n21[itertatorForN]++;
 			}
 			else if(sumF[j]*10 < i){
 				crutch=0; 
 				crutch1=0;
 				for(iter=0; iter<cols; iter++){
 					if (+massK[iter][j] === 1) crutch++; 
 				}
 				if(crutch >= cols/2) n12[itertatorForN]++; 
 			}
 			else {
 				crutch=0; 
 				crutch1=0;
 				for(iter=0; iter<cols; iter++){
 					if (+massK[iter][j] === 2) crutch1++; 
 				}
 				if (crutch1 >= cols/2) n21[itertatorForN]++;
 			}
 		}
 	itertatorForN++;
	}

//Поиск общего колличества К1 и К2
	var nK1=0, nK2=0;
	for(i=0; i<rows; i++){
		crutch=0;
		crutch1=0;
		for(j=0; j<cols; j++){
			+massK[j][i] === 1 ? crutch++ : crutch1++; 
		}
		crutch >= crutch1 ? nK1++ : nK2++;
	}
	var maxY=1;
	for(i=0;i<itertatorForN; i++){
		if(n12[itertatorForN]/nK2 > maxY) maxY = n12[itertatorForN]/nK2;
		if(n21[itertatorForN]/nK1 > maxY) maxY = n21[itertatorForN]/nK1;
	}
	maxY = maxY.toFixed(3);

//Строим график, где пересечение 2-х линий и есть р0
	$('#fourth').append('<hr><div class="forP"><h2>График нахождения p<sub>0</sub></h2></div>');
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
			if(j === 0) graph.moveTo(valueToX(i,maxF*10), valueToY((n12[j]/nK2,maxY)));
			else graph.lineTo(valueToX(i,maxF*10), valueToY((n12[j]/nK2),maxY));
 		j++;
	}
	graph.strokeStyle = "red";
	graph.stroke();
	j=0;
	graph.beginPath();
	for (i=(+minF); i <= maxF*10; i+=1){
			if(j === 0) graph.moveTo(valueToX(i,maxF*10), valueToY((n21[j]/nK1)),maxY);
			else graph.lineTo(valueToX(i,maxF*10), valueToY((n21[j]/nK1),maxY));
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
 	$('#fourth').append('<div><label><input id="threshold" class="number2 lastInput" type="" name="" placeholder="пороговое P0"></label></div>');

//Just for shedule
 	justForShedule=0;
}

$(document).on("click", "#buildTable", function() {
	$("#buildTable").removeClass("btn-success").addClass("btn-warning active");

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

 	if(justForShedule === 0){
 		$("#buildSchedule").removeClass().addClass("btn btn-success");
 		$("#buildSchedule").attr('disabled',false);
 		justForShedule++;
 	}
});


$(document).on("click", "#buildSchedule", function() {
	$("#buildSchedule").removeClass("btn-success").addClass("btn-warning active");

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
});


$(document).on("change", "#threshold", threshold);

function threshold(){
	threshold = $("#threshold").val();

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
		    		var colHead = $('<td><h5>K</h5></td>');
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
		    	var col = $('<td><h5>'+(b[i]<=threshold?0:1)+'</h5></td>');
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
	$('#fifth').append('<div><h4>Логическая таблица</h4></div>');
 	$('#fifth').append(table);

 	$("#logicTable").removeClass().addClass("btn btn-success");
 	$("#logicTable").attr('disabled',false);
}

$(document).on("click", "#logicTable", function() {
	$("#logicTable").removeClass("btn-success").addClass("btn-warning active");

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
});

















