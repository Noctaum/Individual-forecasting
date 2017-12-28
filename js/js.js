$("#buildBigTable").bind("click", builder);

//Защита от ввода букв и дробных чисел
$(document).on("keyup", ".number1", function() {
if (this.value.match(/[^0-9]/g)) {
this.value = this.value.replace(/[^0-9]/g, '');
}
});

//Защиты от ввода букв
$(document).on("keyup", ".number2", function() {
if(this.value.match(/[,]/g))this.value = this.value.replace(/,/g , ".");
if (this.value.match(/[^0-9.,]/g)) {
this.value = this.value.replace(/[^0-9.,]/g, '');
}});

var rows, cols;
var p11 = new Object();
var p10 = new Object();
var collector = new Object();
var limit = new Object();
var sumF = new Object();

//Построение таблицы
 function builder (){
 	$("#bigTable2").empty();
 	$("#bigTable").empty();
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	rows = $("#rows").val();
	cols = $("#cols").val();
	var ij=1
	for(var i=0; i<rows; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
	    var row = $('<tr></tr>');
	    for(var j=0; j<cols*2; j++){
	    	if(i === 0) {
	    		if(j % 2 === 0){
	    			var colHead = $('<td><h5>X'+ij+' при t=0</h5></td>');
	    			rowHead.append(colHead);
	    		}
	    		else {
	    			var colHead = $('<td><h5>X'+ij+' при t=t<sub>пр</sub></h5></td>');
	    			rowHead.append(colHead);
	    			ij++;
	    		}
	    	}
	    	var col = $('<td><label class="tableLable" ><input class="number2 tableInput col'+j+' row'+i+'"></label></td>');
	    	row.append(col);
	    }
	    tbody.append(row);
	}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
	$('#bigTable').append('<div><h2>Введите значения</h2></div>');
 	$('#bigTable').append(table);
 	$('#bigTable2').append('<hr>');
 	$('#bigTable2').append('<h2>Промежутки ликвидных значений</h2>');
 	for (i = 0; i<cols; i++){
 		$('#bigTable2').append('<h4 class="fromTo">для параметра X'+(i+1)+'</h4>');
 		$('#bigTable2').append('<label class="from"><input class="number2 from'+i+' fromIn" type="" name="" placeholder="от"> </label>');
 		$('#bigTable2').append('<label class="to"><input class="number2 to'+i+' toIn" type="" name="" placeholder="до"></label>');
		}		
	$('#bigTable2').append('<div class="row"><button id="refinement" type="button" class="btn btn-primary buttonS"><i class="fa fa-cogs" aria-hidden="true"></i> Записать</button></div>');
 }

$(document).on("click", "#refinement", refinement);


function refinement(){

//Переписывание значений из таблицы в объект
	var air1, air2, air3;
	for (var i=0; i<cols*2;i++){
		air1 = ".col"+i;
		collector[i]= new Object();
		for (var j=0; j<rows;j++){
			air2 = ".row"+j;
			air3 = air1 + air2;
			collector[i][j] = $(air3).val();  
		}
	}

//Переписывание пределов в оюъект
	$("#bigTable3").empty();
	limit["from"] = new Object();
	limit["to"] = new Object();
	for (var i=0; i<cols;i++){
		air1 = ".from"+i;
		air2 = ".to"+i;
		limit["from"][i]=$(air1).val(); 
		limit["to"][i]=$(air2).val(); 
	}
	var sumK1 = new Object();
	var sumK2 = new Object();
	var summK1 = new Object();
	var summK2 = new Object();
	var ij=1, sum=0;

//Сравнение значений с пределами и присвоение точности K
	for (i=0; i<cols*2; i++){
		if(i % 2 !== 0){
			air1 = "objK"+ij;
			sumK1[ij-1]=0;
			sumK2[ij-1]=0;
			summK1[ij-1]=0;
			summK2[ij-1]=0;
			collector[air1] = new Object();
			for (var j = 0; j<rows; j++){
				if(+collector[i][j] >= +limit["from"][ij-1] && +collector[i][j] <= +limit["to"][ij-1]) {
					collector[air1][j] = 1;
					sumK1[ij-1]=(+sumK1[ij-1])+(+collector[i][j]);
					summK1[ij-1]++;
				}
				else {
					collector[air1][j] = 2;
					sumK2[ij-1]=(+sumK2[ij-1])+(+collector[i][j]);
					summK2[ij-1]++;
				}
			}
			ij++;
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
	var z0 = new Object();
	var z1 = new Object();
	ij=1;
	crutch = 0;
	for (i=0; i<cols*2; i++){
		if(i % 2 !== 0){
			z0[crutch]=0;
			z1[crutch]=0;
			air1 = "objZ"+ij;
			collector[air1] = new Object();
			if ( sumK1[ij-1] >= sumK2[ij-1] ){
				for (var j = 0; j<rows; j++){
					if(collector[i][j] >= sum[ij-1]) {
						collector[air1][j] = 1;
						z1[crutch]++;
					} 
					else {
						collector[air1][j] = 0;
						z0[crutch]++;
					}
				}
			
			}
			else {
				for (var j = 0; j<rows; j++){
					if(collector[i][j] <= sum[ij-1]) {
						collector[air1][j] = 1;
						z1[crutch]++;
					} 
					else {
						collector[air1][j] = 0;
						z0[crutch]++;
					}
				}
			}
			ij++;
			crutch++;
		}
	}

//Рассчёт количств значенией с K=1,Z=1 и K=1,Z=0
	var z1k1 = new Object();
	var z0k1 = new Object();
	for (i=0; i<cols; i++){
		z1k1[i]=0;
		z0k1[i]=0;
		air1 = "objZ"+(i+1);
		air2 = "objK"+(i+1);
		for (var j = 0; j<rows; j++){
			if(+collector[air1][j] === 1 && +collector[air2][j] === 1) z1k1[i]++;
			if(+collector[air1][j] === 0 && +collector[air2][j] === 1) z0k1[i]++;
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
				air1 = "objZ"+(j+1);
				if (+collector[air1][i] === 1) {
					sumF[i]+=(+p11[j]);
				}
				if (collector[air1][i] === 0) {
					sumF[i]+=(+p10[j]);
				}
		}
	}

//Построение сводной таблицы
	$('#bigTable3').append('<div"><h1>Сводня таблица</h1></div>');
	$('#bigTable3').append('<div><h4>При необходимости выделите и скопируйте таблицу в документ</h4></div>');
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	ij=1;
	var crutch1, crutch9;
	for(var i=0; i<rows; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
		var row = $('<tr></tr>');
		crutch1=1; 
		crutch9=3; 
		for(var j=0; j<cols*3+1; j++){
		    if (i === 0){
		    	if(j === cols*3){
		    		var colHead = $('<td><h5>F</h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else if((j+1) % 3 === 0){
		    		var colHead = $('<td><h5>Z'+ij+' </h5></td>');
		    		rowHead.append(colHead);
		    		ij++;
		    	}
		    	else if((j+2) % crutch9 === 0){
		    		var colHead = $('<td><h5>K'+ij+' </h5></td>');
		    		rowHead.append(colHead);
		    	}
		    	else {
		    		var colHead = $('<td><h5>X'+ij+' при t=t<sub>пр</sub></h5></td>');
		    		rowHead.append(colHead);
		    		}
		    }
		    if(j === cols*3){
		    	var col = $('<td>'+((+sumF[i]).toFixed(3))+'</td>');
		    	row.append(col);
		    }
		    else if((j+1) % 3 === 0){
		    	air1 = "objZ"+crutch1;
		    	var col = $('<td>'+collector[air1][i]+'</td>');
		    	row.append(col);
		    	crutch1++;
		    }
		    else if((j+2) % crutch9 === 0){
		    	air2 = "objK"+crutch1;
		    	var col= $('<td>'+collector[air2][i]+'</td>');
		    	row.append(col);
		    	crutch9+=3;
		    }
		    else {
		    	var col = $('<td>'+collector[crutch1*2-1][i]+'</td>');
		    	row.append(col);
		    	}
		}
		tbody.append(row);
		}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
 	$('#bigTable3').append(table);

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
	var n12 = new Object();
 	var n21 = new Object();
 	itertatorForN=0;
 	for (i=(+minF); i <= maxF*10; i+=1){
 		n12[itertatorForN]=0;
 		n21[itertatorForN]=0;
 		for(j=0; j<rows; j++){
 			if(sumF[j]*10 == i){
 				crutch=0; 
 				crutch1=0;
 				for(iter=0; iter<cols; iter++){
 					air1 = "objK"+(iter+1);
 					if (+collector[air1][j] === 1) crutch++; 
 					if (+collector[air1][j] === 2) crutch1++; 
 				}
 				if(crutch >= cols/2) n12[itertatorForN]++; 
 				if(crutch1 >= cols/2) n21[itertatorForN]++;
 			}
 			else if(sumF[j]*10 < i){
 				crutch=0; 
 				crutch1=0;
 				for(iter=0; iter<cols; iter++){
 					air1 = "objK"+(iter+1);
 					if (+collector[air1][j] === 1) crutch++; 
 				}
 				if(crutch >= cols/2) n12[itertatorForN]++; 
 			}
 			else {
 				crutch=0; 
 				crutch1=0;
 				for(iter=0; iter<cols; iter++){
 					air1 = "objK"+(iter+1);
 					if (+collector[air1][j] === 2) crutch1++; 
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
			air1 = "objK"+(j+1);
			+collector[air1][i] === 1 ? crutch++ : crutch1++; 
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
	$('#bigTable3').append('<hr><div class="forP"><h2>График нахождения p<sub>0</sub></h2></div>');
	$('#bigTable3').append('<canvas height="500px" width="500px" id="schedule">schedule</canvas>');
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

//Создаем ссылку на скачивание
	$('#bigTable3').append('<div><h5> <a id="download"> Скачать</a></h5></div>');
    var a =  document.getElementById("download");
    a.download = "График.png";
    a.href = schedule.toDataURL("png");

	$('#bigTable3').append('<div><h4>Введите наибоее подходящее пороговое значение разделения классов</h4></div>');
 	$('#bigTable3').append('<div><label><input id="threshold" class="number2 lastInput" type="" name="" placeholder="пороговое P0"></label></div>');
}

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
				air1 = "objZ"+(j+1);
				a[i][j] = collector[air1][i];
			}
			crutch = 0;
			crutch++;
			b[i] = sumF[i];
		}
		else {
			for (var x = 0; x<crutch; x++){
				crutch1 = 0;
				for (var y = 0; y<cols; y++){
					air1 = "objZ"+(y+1);
					if ((+a[x][y]) === (+collector[air1][i])) crutch1++;
					if (crutch1 === (+cols)) crutch2++;
				}
			}
			if (crutch2 === 0){
				a[crutch] = new Object();
				for (j = 0; j<cols; j++){
					air1 = "objZ"+(j+1);
					a[crutch][j] = collector[air1][i];
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
	$('#bigTable3').append('<div><h4>Логическая таблица</h4></div>');
 	$('#bigTable3').append(table);
}


	















