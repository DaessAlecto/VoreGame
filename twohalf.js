﻿/*
===========
Базовые подключения.. ну... переменные 
===========
*/

	var x = +localStorage.getItem('x'); //вес сьеденного 
	var f = +localStorage.getItem('f'); //вес Жира 
	var m = +localStorage.getItem('m'); //Вес мышц 
	var a = 0; // Это на сколько алон в заднице, он офисный планктон 
	var playerPosition = 'зал';
	/*
	Эвенты собранные в кучку для проверки.
	с 0 до 8 касаются сьеденных жертв (х)
	*/ 
	
	var arrET = [true, true, true, true, true, true, true, true, true];
	var arrEH = [true];
	var arrHTT1 = ['Переидти', 'Алон', '5 кг', '10 кг', 'Отдых', 'Спорт', 'Самца', 'Телефон'];
	var arrHTE1 = ['Переидти', 'Играться с Алоном', 'Дать 5 кг еды', 'Дать 10 кг еды', 'Отдых', 'Спорт', 'Дать льву самца ', ' '];
	var arrHTT2 = ['Переидти', 'Алон', '5 кг', '10 кг', 'Отдых', 'Спорт', 'Самца', 'Телефон'];
	var arrHTE2 = ['Переидти', 'Играться с Алоном', 'Дать 5 кг еды', 'Дать 10 кг еды', 'Отдых', 'Спорт', 'Дать льву самца ', ' '];
	var inputValue;
	
	/*
	=============
	Сеторы 
	=============
	*/
	
	//задать вес Жира 
	function setF(n){
		localStorage.setItem('f', n);
		f = n;
	}
	//задать вес сьеденного 
	function setX(n){
		localStorage.setItem('x', n);
		x = n;
	}
	//задаит Вес мышц 
	function setM(n){
		localStorage.setItem('m', n);
		m = n;
	}
	//временно не юза.
	function setA(n){
		//localStorage.setItem('a', n);
		a = n;
	}
	//Сунуть в глобальную переменную (типо то что лежит в Input.... на данный момент сую )
	function setInputValue(str){
		inputValue = str;
	}

	/*
	=============
	уже функции игровой механники 
	=============
	*/

	/*
	Тут огранечеитель 
	i1 - какое число смотрим которое не должно привышать или быть ровно i2
	i2 - число до какого мы ограничиваем
	text - текст что мы выводим при срабатывании 
	Пакачто обнуляет сьеденное и жир но после сделаю более обстрактное 
	*/ 
	function cap(i1, i2, text){
		if (i1 >= i2 ){
			println(text);
			setF(0);
			setX(0);
			arrET = [true, true, true, true, true, true, true, true, true];
			arrEvents[numE] = true;
		}
	}
	//Эвент при достижении цифры выдаёт текст и 
	function eventText(i1, i2, text, arrEvents, numE){
		if (i1 >= i2 && arrEvents[numE]){
			println(text);
			arrEvents[numE] = false;
		}
	}
	/*
	i1 - это то на что смотрим, по дефолту вес.
	i2 - после какого числа реагировать.
	arrEvents - массив эвентов.
	numE - номер поля в массиве 
	*/
	function eventHyperText(i1, i2, text, arrEvents, numE){
		if (i1 >= i2 && arrEvents[numE]){
			println(text);
			setHyperText (arrHTT2);
			setHyperTitle (arrHTE2);
			arrEvents[numE] = false;
		}
	}
	
	//передвижение 
	
	/*
			
	*/
	
	/*
	==================
	Кнопочки исполняют то что им скажут
	==================
	*/
	function options(str){
		switch (str) {
			case 'алон':
				if(a >= 100){
					println('Пора выпускать алона? ');
					setHyperText (['Выпускать']);
					setHyperTitle (['...']);
				} else {
					println('Алон хочет побыть у вас в попке. ');
					setHyperText (['Согласиться', 'Согласиться']);
					setHyperTitle (['Согласиться', 'Согласиться']);
				}
			break;
			case '5 кг':
				setX(x+5);
			break;
			case '10 кг':
				setX(x+10);
			break;
			case 'отдых':
			if (x > 0 ){
				setX(x-1);
				setF(f+1);
				println('\n' + 'Лев отдыхает и стал жирнее. жира в льве ' + f + ' кг');
			} else {
				setM(m-1);
			}
				
			break;
			//case 'самци':
				//println('Лев видит несколько возбуждённых самцов и хочет предложить им свою попку. какому из  самцов предложить? ');
				//setHyperText (['Небольшой', 'Средний', 'Большой' ]);
				//setHyperTitle (['В попку', 'В пасть', 'В член']);
			//break;
			case 'самца':
				println('Лев хочет развлечений! отправить жертву в попку, в пасть или в член. ');
				setHyperText (['В попку', 'В пасть', 'В член' ]);
				setHyperTitle (['В попку', 'В пасть', 'В член']);
			break;
			case 'спорт':
				if (x >= 1){
					setM(m+1);
					setX(x-1);
				}
				
			break;
			case 'переидти':
				println("вы сейчас находитесь в " + 	playerPosition );
				setHyperText (['Кухня', 'Коридор', 'Туалет', 'Зал' ]);
				setHyperTitle (['Кухня', 'Коридор', 'Туалет', 'Зал' ]);
			break;
			case 'телефон':
				println('Лев берёт телефон и выбирает кому позвонить. ');
				setHyperText (['Пиццерия' ]);
				setHyperTitle (['Пиццерия']);
			break;
			case 'пиццерия':
				println('Лев заказывает пиццу и ожидает, в дверь постучали. открыть дверь?');
				setHyperText (['Открыть']);
				setHyperTitle (['Открыть']);
			break;
			case 'открыть':
				println('Лев открыл дверь и видит за ей разнощика пицци ');
				setHyperText (['Сьесть']);
				setHyperTitle (['Сьесть']);
			break;
			case 'сьесть':
				println('Лев открыл пасть и заглотил пиццу что в лапах самца а после и самого самца вместе с пицей и закрыв дверь вернулся к своим делам. ');
				setX(x+100);
				setHyperText (arrHTT1);
				setHyperTitle (arrHTE1);
			break;
		}
	}
	/*
	==========
	Двидение!!
	==========
	*/
	function optionMove(str){
		switch (str){
			case 'туалет':
				//из зал в туалет
				switch (playerPosition) {
					case 'зал':
						println('Топ топ топ в туалет ');
						playerPosition = 'туалет';
					break;
					default:
						println('Вы некуда не топаете ');
					break;
				}
			break;
			case 'коридор':
				//из зал в коридор
				switch (playerPosition) {
					case 'зал':
						println('Топ топ топ в Коридор ');
						playerPosition = 'коридор';
					break;
					default:
						println('Вы некуда не топаете ');
					break;
				}
			break;
			case 'кухня':
				//из зал в кухня
				switch (playerPosition) {
					case 'зал':
						println('Топ топ топ на Кухню ');
						playerPosition = 'кухня';
					break;
					default:
						println('Вы некуда не топаете ');
					break;
				}
			break;
			case 'зал':
				//в зал
				switch (playerPosition) {
					case 'кухня':
					case 'коридор':
					case 'туалет':
						println('Топ топ топ в Зал ');
						playerPosition = 'зал';
					break;
					default:
						println('Вы некуда не топаете ');
					break;
				}
			break;
		}
		setHyperText (arrHTT1);
		setHyperTitle (arrHTE1);
	}
/*
==============
тут вроде сцена сьедания жертвы или типо того, когото кудато сунуть 
==============
*/
	function options2(str){
		switch (str) {
			case 'в попку':
				println('Лев доволен, жертва отправилась в попку!');
				setX(x+100);
				setHyperText (arrHTT2);
				setHyperTitle (arrHTE2);
			break;
			case 'в пасть':
				println('Лев доволен, жертва отправилась в пасть!');
				setX(x+100);
				setHyperText (arrHTT2);
				setHyperTitle (arrHTE2);
			break;
			case 'в член':
				println('Лев доволен, жертва отправилась в член!');
				setX(x+100);
				setHyperText (arrHTT2);
				setHyperTitle (arrHTE2);
			break;
		}
	}
	/*
	=============
	сцена игрулек с алоном
	=============
	*/
	function options3(str){
		switch (str) {
			case 'согласиться':
				println('Лев подставляет алону попку и алон начинает проникать волечко пальчиками обеих лап. ');
				//setA(a+10);
				setHyperText (['Втягивать']);
				setHyperTitle (['Втягивать']);
			break;
			case 'втягивать':
				if (a < 100){
				println('Лев напрагает попку втягивая алона, алон внутри на '+ a + ' %');
				setA(a+10);
				setHyperText (['Втягивать']);
				setHyperTitle (['Втягивать']);
				} else {
					println('Алан целиком скрылся в попке льва. ');
					setHyperText (arrHTT2);
					setHyperTitle (arrHTE2);
				}
			break;
		}
	}
	function options4(str){
		switch (str) {
			case 'выпускать':
				println('Лев сел на кортачки и начал тажиться. ');
				//setA(a+10);
				setHyperText (['Напрячься']);
				setHyperTitle (['...']);
			break;
			case 'напрячься':
				if (a > 0){
					println('Лев напрягает живот иколечко от чего алан вышел на ' + (100 - a) + '%');
					setA(a-10);
				} else {
					println('Лев смог выпустить алона и ему понравилось, он не против ещё ');
					setHyperText (arrHTT2);
					setHyperTitle (arrHTE2);
				}
				
			break;
		}
	}
	/*
	function optionsDefault(str){
		switch (str) {
			case 'Невозможный вариант':
				throw 'Ooopss...' ;
			break;
			default:
				setX(x+1);
		}
	}
	*/
	
	
	/*
	===============
	Основная плей часть где идёт начало 
	===============
	*/
	function play() { // ну, тут начинается колдовство
		setDocInput();
        setInputValue(docInput.value.toLowerCase());
		optionMove(inputValue);
		options(inputValue);
		options2(inputValue);
		options3(inputValue);
		options4(inputValue);
		//optionsDefault(inputValue);
		let mass = m + x + f;
		println('\n' + '>' + docInput.value + '\n' + 'Теперь лев весит ' + mass + ' кг' + ' (' + m + ' кг. '+ x + ' кг в животе. ' + f + ' кг жира.');
		eventText(x, 10, 'Слышен небольшой треск. ',arrET ,0 );
		eventText(x, 20, 'Треск становится громче . ',arrET ,1 );
		eventText(x, 30, 'Животик льва начал выпирать активнее и футболка начала рваться . ',arrET ,2 );
		eventText(x, 40, 'Футболка разорвалась на льва но треск продолжился . ',arrET ,3 );
		eventText(x, 50, 'Ширинка на штанах лва порвалась обнажив трусы и крупные львинные яички . ',arrET ,4 );
		eventText(x, 60, 'Треск продолжился и бёдра льва активно расширяясь рвали штаны а трусы были ведны как и передок льва в их . ',arrET ,5 );
		eventText(x, 70, 'Штаны окончательно лопнули и лев остался в одних трусах . ',arrET ,6 );
		eventText(x, 80, 'Трусы начинают тагже трещять и надрываться . ',arrET ,7 );
		eventText(x, 90, 'Трусы льва окончательно порвались и теперь видно большой львинный *инзура* а тагже львинные *цинзура*. (для полного контента приобретите подписку Daess+ х)  ) ',arrET ,8 );
		eventHyperText(x, 100, 'кажется льву мало обычной еды и лев желает расширить рацион. ', arrEH, 0 );
		cap(x, 1000, ' \n лев настолько растолстел и лёг спать, а когда проснулся - был как прежде. (временное игровое ограничение)');
		cap(50, 100 + x, ' \n Кажется лев сильно потерял мышечную массу, от чего направился это исправлять и вернулся как прежде.');
		cap(f, 50, ' \n Кажется лев сильно растолстел и отправился сбрасывать жир. (временное игровое ограничение)');
		docInput.value = '';
		scrollTextArea();
    }
	
	/*
	====================
	Вроде сетится гипертекст
	====================
	*/
	
	function start(){
		//localStorage.clear(); //Типо чтобы почистить кеш дял проверок
		if	(m == 0 ){
			m = 100;
		}
		textStartDialog = 'Хотите покормить льва?';
		println(textStartDialog);
		setHyperText (arrHTT1);
		setHyperTitle (arrHTE1);
	};
	gotHyperText = function(){
		return ['Войти в деревянную дверь'];
	}
	gotHyperTitle = function(){
		return ['Тут будут игровые подсказки'];
	}
	function load(){
		start();
		myIn.value = 'Дать';
		console.log(+localStorage.getItem('x'));
	}
	window.addEventListener("load", function(event) {
		load();
		console.log("All resources finished loading!");
	});
	
	
	/*
	после 100 - шланг в попку или жертв 
	
	
	Отложить яйцо 
	
	проникнуь в жертву и в зависимости от её распорядка дня чтото делать 
	есоли нечего не придпренять то чтобы нормализовать - придётся предпринимать в 4 раза больше (типо гв2 и локальные задания ) (можно пордолжать игнорить но будет не комфортно )
	парикмахерская?
	сопративляться насилию или мериться с беременностью? 	
	нутренние не бесполезные ошушения от жертвы 
	Нехватка ресурса вынуждает с умом отнестись куда ресурс вложить 
	модифициовать перса? покупать улчшения?
	Лев в рабстве и его ебут или он держет раба, геймплей в этих рамках 
	Персонаж готовит о возможностях, истории, причинах (мы культ воре, дотронься до алторя чтобы получить силу )
	непрямые приказы (типо мэджэсти?)
	Как в крайзис (режим брони. силы и скорости? инвиз?)
	В коопе с нпс против чегото? 
	Босс в конце? ради его кач и тд 
	злой перс? гильдии? (ведьмы превращение? воре?) (клан превращяющихся в пантер против превращяющихся в волковили демонов? (оборотней)(проклятие? временное? Вылечиться?)(превращение навсегда?))
	тьма сильнее - но шмотки не получиш - побеждать надо чесно (шмотки не уничтожатся )
	Событие иногда управляет или мы под разными состояниями реагирем по разному на тоже самое событие (нпс можетб ыть чувствительнее к раздражителю и внутри себя иметь подробности и больше гродаций )
	смотрим что у нас есть - отталкиваться от этого (есть земля  -строим ров и тд или чтото из земли )
	сделать 20 разных нпс
	симуляци жизни (расписание нпс)
	*/