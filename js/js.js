$("#buildBigTable").bind("click", builder);

//Защита от ввода букв и дробных чисел
$(document).on("keyup", ".number1", function() {
	if (this.value.match(/[^0-9]/g)) {
		this.value = this.value.replace(/[^0-9]/g, '');
	}
});

//Защита от ввод букв
$(document).on("keyup", ".number2", function() {
	if(this.value.match(/[,]/g))this.value = this.value.replace(/,/g , ".");
	if (this.value.match(/[^0-9.,]/g)) {
		this.value = this.value.replace(/[^0-9.,]/g, '');
}});

var rows;
var collectorI = new Object();
var collectorT = new Object();

//Постройка таблицы
 function builder (){
 	$('#bigTable').empty();
	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	rows = $("#rows").val();
	var ij=1
	for(var i=0; i<rows; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
	    var row = $('<tr></tr>');
	    for(var j=0; j<4; j++){
	    	if(i === 0) {
	    		switch (j){
	    			case 0:
		    			var colHead = $('<td><h5>I<sub>k</sub></h5></td>');
		    			rowHead.append(colHead);
		    			break;
	    			case 1:
	    				var colHead = $('<td><h5>P<sub>cp</sub>(I<sub>k</sub>)</h5></td>');
		    			rowHead.append(colHead);
		    			break;
	    			case 2:
		    			var colHead = $('<td><h5>t</h5></td>');
		    			rowHead.append(colHead);
		    			break;
	    			case 3:
		    			var colHead = $('<td><h5>P<sub>cp</sub>(t)</h5></td>');
		    			rowHead.append(colHead);
		    			break;
	    		}
	    	}
	    	var col = $('<td><label class="tableLable"><input class="number2 tableInput col'+j+' row'+i+'"></label></td>');
	    	row.append(col);
	    }
	    tbody.append(row);
	}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
	$('#bigTable').append('<div><h1>Введите значения</h1></div>');
 	$('#bigTable').append(table); 	
 	$('#bigTable').append('<div><br><button id="censor" type="button" class="btn btn-success buttonSS"><i class="fa fa-cogs" aria-hidden="true"></i> Построить</button></div>');
 }

$(document).on("click", "#censor", censor);

function censor (){

//Переписываем значения I и P из таблицы в объект
	var air1, air2, air3;
	for (var i=0; i<2;i++){
		air1 = ".col"+i;
		collectorI[i]= new Object();
		for (var j=0; j<rows;j++){
			air2 = ".row"+j;
			air3 = air1 + air2;
			collectorI[i][j] = $(air3).val();  
		}
	}

//Переписываем значения T и P из таблицы в объект
	for ( i=2; i<4;i++){
		air1 = ".col"+i;
		collectorT[i-2]= new Object();
		for (j=0; j<rows;j++){
			air2 = ".row"+j;
			air3 = air1 + air2;
			collectorT[i-2][j] = $(air3).val();  
		}
	}

//Сортируем обёект по I
	var sortic, exchange, exchange1;
	for (i=0; i<rows;i++){
		sortic = collectorI[0][i];
		for (j = i + 1; j < rows+1; j++) {
			if ((+collectorI[0][j]) < sortic) {
				exchange = collectorI[0][i];
				sortic = collectorI[0][j];
				collectorI[0][i] = sortic;
				collectorI[0][j] = exchange;

				exchange1 = collectorI[1][j];
				collectorI[1][j] = collectorI[1][i];;
				collectorI[1][i] = exchange1;
			}
		}
	}

//Сортируем обёект по T
	for (i=0; i<rows;i++){
		sortic = collectorT[0][i];
		for (j = i + 1; j < rows+1; j++) {
			if ((+collectorT[0][j]) < sortic) {
				exchange = collectorT[0][i];
				sortic = collectorT[0][j];
				collectorT[0][i] = sortic;
				collectorT[0][j] = exchange;

				exchange1 = collectorT[1][j];
				collectorT[1][j] = collectorT[1][i];;
				collectorT[1][i] = exchange1;
			}
		}
	}	

//Строим график P=f(I)
 	$('#bigTable2').empty();
	$('#bigTable2').append('<div class="nameOfShedule"><h3>График зависимости P=f(I<sub>K</sub>)</h3></div>');
	$('#bigTable2').append('<canvas height="500px" width="500px" id="schedule">schedule</canvas>');
	var schedule = document.getElementById("schedule");
	schedule.width = schedule.width;
	var graph = schedule.getContext("2d");
	var width = schedule.width, height = schedule.height;
	function valueToX (n,max) {return n*width/(max);}
	function valueToY (n,max) {return height-(n*height/max);}

	var maxX = (+collectorI[0][rows-1]);
	var maxY = (+collectorI[1][rows-1]);
	for(var i = 0; i<rows; i++){
		if(maxX < (+collectorI[0][i])) maxX = (+collectorI[0][i]);
		if(maxY < (+collectorI[1][i])) maxY = (+collectorI[1][i]);
	}
	graph.beginPath();
	for (i=0; i < rows; i++){
			if(i === 0) graph.moveTo(valueToX((+collectorI[0][i]),maxX), valueToY((+collectorI[1][i]),maxY));
			else graph.lineTo(valueToX((+collectorI[0][i]),maxX), valueToY((+collectorI[1][i]),maxY));
	}
	graph.strokeStyle = "red";
	graph.stroke();

//Нумеруем ось X
	graph.textAlign = "center";
    var y = valueToY(0,maxY);
    for (var mark = 0; mark <= 100; mark += 5) {
		var x = valueToX(mark,100);
		if (mark % 10 == 0) {
			graph.fillText(String((((maxX/100)*mark).toFixed(1))), x, y - 5);
			graph.fillRect(x - 0.5, y - 4, 1, 3);
		}
		else graph.fillRect(x - 0.5, y - 0.5, 1, 3);
	}

//Нумеруем ось Y
	graph.textAlign = "left";
	graph.textBaseline = "middle";
	var x = valueToX(0,maxX);
	for (var mark = 0; mark <=100; mark += 5) {
		var y = valueToY(mark,100);
		if (mark % 10 == 0) {
			graph.fillText(String((((maxY/100)*mark).toFixed(1))), x + 10, y);
			graph.fillRect(x + 4, y - 0.5, 3, 1);
		}
		else graph.fillRect(x + 2, y - 0.5, 3, 1);
	}

//Создаем ссылку на скачивание
	$('#bigTable2').append('<div><h5><a id="download"> Скачать</a></h5></div>');
    var a =  document.getElementById("download");
    a.download = "График P=f(I).png";
    a.href = schedule.toDataURL("png");

//Строим график P=f(T)
    $('#bigTable2').append('<div class="nameOfShedule"><h3>График зависимости P=f(t)</h3></div>');
	$('#bigTable2').append('<canvas height="500px" width="500px" id="schedule1">schedule</canvas>');
	var schedule1 = document.getElementById("schedule1");
	schedule1.width = schedule1.width;
	var graph = schedule1.getContext("2d");

	var maxX = (+collectorT[0][rows-1]);
	var maxY = (+collectorT[1][rows-1]);
	for(i = 0; i<rows; i++){
		if(maxX < (+collectorT[0][i])) maxX = (+collectorT[0][i]);
		if(maxY < (+collectorT[1][i])) maxY = (+collectorT[1][i]);
	}

	graph.beginPath();
	for (i=0; i < rows; i++){
			if(i === 0) graph.moveTo(valueToX((+collectorT[0][i]),maxX), valueToY((+collectorT[1][i]),maxY));
			else graph.lineTo(valueToX((+collectorT[0][i]),maxX), valueToY((+collectorT[1][i]),maxY));
	}
	graph.strokeStyle = "green";
	graph.stroke();

//Нумеруем ось X
	graph.textAlign = "center";
    var y = valueToY(0,maxY);
    for (var mark = 0; mark <= 100; mark += 5) {
		var x = valueToX(mark,100);
		if (mark % 10 == 0) {
			graph.fillText(String((((maxX/100)*mark).toFixed(1))), x, y - 5);
			graph.fillRect(x - 0.5, y - 4, 1, 3);
		}
		else graph.fillRect(x - 0.5, y - 0.5, 1, 3);
	}

//Нумеруем ось Y
	graph.textAlign = "left";
	graph.textBaseline = "middle";
	var x = valueToX(0,maxX);
	for (var mark = 0; mark <=100; mark += 5) {
		var y = valueToY(mark,100);
		if (mark % 10 == 0) {
			graph.fillText(String((((maxY/100)*mark).toFixed(1))), x + 10, y);
			graph.fillRect(x + 4, y - 0.5, 3, 1);
		}
		else graph.fillRect(x + 2, y - 0.5, 3, 1);
	}

//Создаем ссылку на скачивание
	$('#bigTable2').append('<div><h5><a id="download1"> Скачать</a></h5></div>');
    var a1 =  document.getElementById("download1");
    a1.download = "График P=f(t).png";
    a1.href = schedule1.toDataURL("png");

//Создаем поля ввода значений T и колличества P
    $('#bigTable3').empty();
    $('#bigTable3').append('<hr>');
    $('#bigTable3').append('<div><h3>Вычисление</h3></div>');
	$('#bigTable3').append('<label><input class="number2 inputBeforeSchedule" id="timeOld" type="" name="" placeholder="Время наработки"></label>');
	$('#bigTable3').append('<label><input class="number1 inputBeforeSchedule" id="quantity" type="" name="" placeholder="Количество измерений"></label>');
    $('#bigTable3').append('<div><button id="timeBuild" type="button" class="btn btn-success buttonSS"><i class="fa fa-cogs" aria-hidden="true"></i> Построить</button></div>');
}

$(document).on("click", "#timeBuild", timeBuild);

var quantity;

function timeBuild(){
	var time = $("#timeOld").val();
	var crutch=0;
	var massP =0;
	var x,y,z;

//Находим соответствующее заданному времени P
	for(var j = 0; j<rows; j++){
		if (j === 0 ){
			if ((+collectorT[0][j]) > time){
				massP = (+collectorT[1][j]);
				crutch++;
			}
		}
		else if (j === rows-1){
			if ((+collectorT[0][j]) <= time){
				massP = (+collectorT[1][j]);
				crutch++;
			}
		}
		if (crutch === 0) {
			if ((+collectorT[0][j]) == time){
				massP = (+collectorT[1][j]);
			}
			else if ((+collectorT[0][j]) < time){
				z = time - (+collectorT[0][j]);
				x = ((+collectorT[0][j+1])-(+collectorT[0][j]))/100;
				y = ((+collectorT[1][j+1])-(+collectorT[1][j]))/100;
				massP = (+collectorT[1][j])+((z/x)*y);
			}
		}
	}

//Находим найденому P соответствующее I
	var current;
	crutch=0;
	for(var j = 0; j<rows; j++){
		if (j === 0 ){
			if ((+collectorI[1][j]) > massP){
				current = (+collectorI[0][j]);
				crutch++;
			}
		}
		else if (j === rows-1){
			if ((+collectorI[1][j]) <= massP){
				current= (+collectorI[0][j]);
				 crutch++;
			}
		}
		if (crutch === 0) {
			if ((+collectorI[1][j]) == massP){
				current = (+collectorI[0][j]);
			}
			else if ((+collectorI[1][j]) < massP){
				z = massP - (+collectorI[1][j]);
				x = ((+collectorI[1][j+1])-(+collectorI[1][j]))/100;
				y = ((+collectorI[0][j+1])-(+collectorI[0][j]))/100;
				current = (+collectorI[0][j])+((z/x)*y);
			}
		}
	}

//Выводим найденной значение тока I
	$("#bigTable4").empty();
	$('#bigTable4').append('<div><h4>Ток I<sub>Kим</sub> = '+((+current).toFixed(3))+'</h4></div>');
	
//Строим таблицу для внесения параметров P
	$('#bigTable4').append('<div><h3>Таблица сравнения</h3></div>');

	var table = $('<table></table>');
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	quantity =  $("#quantity").val();
	for(i=0; i<quantity; i++){
		if(i === 0) var rowHead = $('<tr></tr>');
	    var row = $('<tr></tr>');
	    for(var j=0; j<2; j++){
	    	if(i === 0) {
	    		switch (j){
	    			case 0: 
	    				var colHead = $('<td><h4>Значения P<sub>пр</sub></h4></td>');
	    				rowHead.append(colHead);
	    				break;
	    			case 1:
	    				var colHead = $('<td><h4>Значения P<sub>ист</sub></h4></td>');
	    				rowHead.append(colHead);
	    				break;
	    		}
	    	}
	    	switch (j){
	    		case 0:
	    			var col = $('<td><label class="tableLable"><input class="number2 tableInput forecastP'+i+'"></label></td>');
	    			row.append(col);
	    			break;
	    		case 1:
	    		var col = $('<td><label class="tableLable"><input class="number2 tableInput trueP'+i+'"></label></td>');
	    			row.append(col);
	    			break;
	    	}
	    }
	    tbody.append(row);
	}
	thead.append(rowHead);
	table.append(thead);
	table.append(tbody);
 	$('#bigTable4').append(table);
 	$('#bigTable4').append('<div><br><button id="comparator" type="button" class="btn btn-success buttonSS"><i class="fa fa-cogs" aria-hidden="true"></i> Построить</button></div>');
}

$(document).on("click", "#comparator", comparator);

function comparator(){
	var air1, air2, mistake;
	var forecastP = new Object();
	var trueP = new Object();

//Считываем значения параметров P c таблицы
	for (var i=0; i<quantity;i++){
		forecastP[i] = 0;  
		trueP[i] = 0;  
		air1 = ".forecastP"+i;
		air2 = ".trueP"+i;
		forecastP[i] = $(air1).val();  
		trueP[i] = $(air2).val();  
	}

//Рассчитываем среднюю ошибку прогнозирования
	var intermediate = new Object();
	for (i=0; i<quantity; i++){
		intermediate[i]=0;
		intermediate[i] = ((+forecastP[i]) - (+trueP[i]))/(+trueP[i]);
	}
	var amount=0;
	for (i=0; i<quantity; i++){
		amount+= ((+intermediate[i])*(+intermediate[i]));
	}
	amount = amount/quantity;
	mistake = (Math.sqrt(amount)).toFixed(3);

//Выводим среднюю ошибку прогнозирования
	$('#bigTable5').empty();
	$('#bigTable5').append('<hr>');	
	$('#bigTable5').append('<div><h3>Cредняя ошибка прогнозирования = '+mistake+'</h3></div>');
	$('#bigTable5').append('<div><label><input id="first" class="number2 inputBeforeSchedule2" placeholder="Время наработки"></label><p id="second"></p></div>');
}

$(document).on("change", "#first", function() {
	var time = this.value;
	var crutch=0;
	var massP =0;
	var x,y,z;

//Рассчитываем значение P в зависимости от заданного значения T
	for(var j = 0; j<rows; j++){
		if (j === 0 ){
			if ((+collectorT[0][j]) > time){
				massP = (+collectorT[1][j]);
				crutch++;
			}
		}
		else if (j === rows-1){
			if ((+collectorT[0][j]) <= time){
				massP = (+collectorT[1][j]);
				crutch++;
			}
		}
		if (crutch === 0) {
			if ((+collectorT[0][j]) == time){
				massP = (+collectorT[1][j]);
			}
			else if ((+collectorT[0][j]) < time){
				z = time - (+collectorT[0][j]);
				x = ((+collectorT[0][j+1])-(+collectorT[0][j]))/100;
				y = ((+collectorT[1][j+1])-(+collectorT[1][j]))/100;
				massP = (+collectorT[1][j])+((z/x)*y);
			}
		}
	}

//Рассчитываем значение I в зависимости от найденного значения P
	var current;
	crutch=0;
	for(var j = 0; j<rows; j++){
		if (j === 0 ){
			if ((+collectorI[1][j]) > massP){
				current = (+collectorI[0][j]);
				crutch++;
			}
		}
		else if (j === rows-1){
			if ((+collectorI[1][j]) <= massP){
				current= (+collectorI[0][j]);
				 crutch++;
			}
		}
		if (crutch === 0) {
			if ((+collectorI[1][j]) == massP){
				current = (+collectorI[0][j]);
			}
			else if ((+collectorI[1][j]) < massP){
				z = massP - (+collectorI[1][j]);
				x = ((+collectorI[1][j+1])-(+collectorI[1][j]))/100;
				y = ((+collectorI[0][j+1])-(+collectorI[0][j]))/100;
				current = (+collectorI[0][j])+((z/x)*y);
			}
		}
	}

//Выводим найденное значение I
	$('#second').empty();
	$('#second').append('<div><h3>Ток = '+((+current).toFixed(3))+'</h3></div>');
});


















