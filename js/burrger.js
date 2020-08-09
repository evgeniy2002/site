function hexStringToRGB(hexString) {
 	let arr = [];
 	hexString = hexString.split('').slice(1);
 	let size = 2;
 	for(let i = 0;i<hexString.length;i+=size){
 		arr.push(hexString.slice(i,i+size))
 	}
 	return arr;
}
console.log(hexStringToRGB('#FF9933'));

































/********* Урок №1 , Прототипы 
let person = new Object({
	name:'Evgen',
	age:25,
	greet: function(){
		console.log('hello');
	}
})
Object.prototype.sayHello = function(){
	console.log('das');
}
let ans = Object.create(person);
*/


/******** Урок №2, bind,call,apply
let person = {
	name:'Evgeniy',
	age:18,
	sayHello:function(job,phone){
		console.group();
		console.log(this.name);
		console.log(this.age);
		console.log(job);
		console.log(phone);
		console.groupEnd();
	}
}
let lena = {
	name:'Elena',
	age:41
}
person.sayHello.bind(lena)();
person.sayHello.call(lena);
person.sayHello.apply(lena,['programming','312312312']);


let arr = [1,2,3,4];

Array.prototype.moutBy = function(n){
	return this.map(i => i * n);
}
console.log(arr.moutBy(5));

*/

/******** Урок №3 , замыкание 
function func(n){
	return function(m){
		return n + m
	}
}

console.log(func(5)(4));

function url(domain){
	return function(url){
		return `https://${url}.${domain}`
	}
}
console.log(url('com')('google'));


function logPerson(){
	console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);	
}

let person1 = {name:'Михаил',age:22,job:'dsadad'};
let person2 = {name:'Елена',age:31,job:'vawafs'};

bind(person1, logPerson)();
bind(person2, logPerson)();

function bind(person,fn){
	return function(...args){
		return fn.apply(person,args)
	}
}
 
*/



/******** Урок №5, Промисы
/*console.log('request data...')

setTimeout(() => {
	console.log('prepering data...');

	const backend = {
		server:'aws',
		port:2000,
		status:'working'
	}
	setTimeout( () => {
		backend.modifed = true;
		console.log('data recived',backend)
	},2000)
},2000)
*/

/*
let p = new Promise(function(resolve,reject){
	setTimeout( () => {
		console.log('prepering data...');

		const backend = {
		server:'aws',
		port:2000,
		status:'working'
	}
	resolve(backend);
	},2000)
})

p.then((data) => {
	return new Promise((resolve,reject) =>{
		setTimeout( () => {
			data.modifed = true;
			reject(data);
			//console.log('data recived',backend)
		},2000)
	})
}).then(clienData => {
	clienData.fromPoints = true;
	return clienData;
}).then(data => {
	console.log(data); 
})
.catch(err => console.log('Error:',err))
.finally(() => console.log('Finally'));


 let sleep = ms => {
 	return new Promise(resolve => {
 		setTimeout(() => resolve(),ms)
	})
}


Promise.all([sleep(2000),sleep(5000)]).then(() => {
	console.log('All promises')
})
*/

/******* Урок №6, Object.create 
let person = Object.create({},{
	name:{
		value:'evgen'
	},
	year:{
		value:2002
	}
})
console.log(person)

*/

/******* Урок №7, Классы 

class Animal{
	static type = 'Evgeniy'

	constructor(options){
		this.name = options.name;
		this.age = options.age;
		this.hasTail = options.hasTail;
	}
	speak(){
		console.log(`${this.name},speak 'I am Animal`)
	}
}

let animal = new Animal({
	name:'Animal',
	age:5,
	hasTail:true
});


class Cat extends Animal {
	constructor(options){
		super(options)
			this.color = options.color
	}
	voice(){
		super.voice()
		console.log('I am cat');
	}
	get ageInfo(){
		return this.age * 8
	}
	set ageInfo(newAge){
		return this.age = newAge;
	}
}

let cat = new Cat({
	name:'Cat',
	age:2,
	hasTail:true,	
	color:'red'
})

class Compot{
	constructor(selector){
		this.$el = document.querySelector(selector)
	}
	hide(){
		this.$el.style.display = 'none'
	}
	show(){
		this.$el.style.display = 'block'
	}
}
class Box extends Compot{
	constructor(options){
		super(options.selector)
		this.$el.style.width = this.$el.style.height = options.size + 'px'
		this.$el.style.color = options.color
	}
}
let box1 = new Box({
	selector:'#box1',
	size:100,
	color:'red'
})
*/

/** Урок 8. JavaScript. Как работает Async, Await. Работа с сервером c fetch

let delay = ms => {
	return new Promise(resolve => {
		setTimeout(() => resolve(),ms)
	})
}
let url = 'https://jsonplaceholder.typicode.com/todos/1'

function fetchToDo(){
	console.log('Fetch started...')
	return delay(2000).then(() => {
		return fetch(url)
	}).then(response => response.json())
}
fetchToDo()
	.then(date => {
		console.log('Date',date)
	})
	.catch(e => console.error(e));



async function fetchAsyncTodos(){
	console.log('Fetch start...')
	await delay(2000)
	const response = await fetch(url)
	const data = await response.json()
	console.log(data);
}
fetchAsyncTodos();

*/

/*** JavaScript. Proxy. Объекты, функции, классы. Часть 1 

// Object
let person = {
	name:'Evgen',
	age:18,
	job:'Frontend'
}
let op = new Proxy(person,{
	get(target,prop){
		console.log('Target',target);
		console.log('Prop',prop);
		return target[prop]
	},
	set(target,prop,value){
		if(prop in target){
			target[prop] = value;
		}else{
			throw new Error('No prop',prop)
		}
	},
	has(target,prop){
		return ['age','name','job'].includes(prop)
	},
	deleteProperty(target,prop){
		console.log('delete',prop);
		delete target[prop] 
	}
})


// Function

let func = text => `Log ${text}`

let fp = new Proxy(func,{
	apply(target,thisArgs, args){
		console.log('Calling fn...');

		return target.apply(thisArgs,args);
	}      // Ловушка проверяет когда данная функция будет вызываться
})

// Classes

class Person {
	constructor(name,age){
		this.name = name;
		this.age = age;
	}
}

let PersonProxy = new Proxy(Person,{
	construct(target,args){
		console.log('Construct..');

		return new target(...args)
	}
})

//  JavaScript. Proxy. Объекты, функции, классы. Часть 2

// Wrapper
let widthDefaultValue = (target,defaultvalue = 0) => {
	return new Proxy(target,{
		get: (obj,prop) => (prop in obj ? obj[prop] : defaultValue)
	})
}
let position = widthDefaultValue({
	x: 24,
	y: 42
},0)
console.log(position);

//Hidden Properies
let widthHiddenProps = (target,prefix = '_') => {
	return new Proxy(target,{
		has:(obj,prop) => (prop in obj) && (!prop.startsWith(prefix)),
		ownKeys: obj => Reflect.ownKeys(obj).filter(item => !item.startsWith(prefix)),
		get: (obj,prop,receiver) => (prop in receiver ? obj[prop] : void 0),
	})
}
*/

/* Урок 14. JavaScript. Запросы на сервер. Fetch, XMLHttpRequest (XHR), Ajax */

/*let requestURL = 'https://jsonplaceholder.typicode.com/users'

// XMLHttpRequest
function sendRequest(method,url,body = null){
	// Это асинхронный код, т.к мы отправляем какие-то данные на сервер и ждем пока они придут
	return new Promise((resolve,reject) => {

	let xhr = new XMLHttpRequest()
	xhr.open(method,url);

	xhr.responseType = 'json'
	xhr.setRequsetHeader('Content-Type','application/json')
	
	xhr.onload = () => { // Слушатель
	if(xhr.status >= 400){
		reject(xhr.response);
	}else{
		resolve(xhr.response); 
	}
}
	xhr.onerror = () => {
		reject(xhr.response);
	}
		xhr.send(JSON.stringify(body)); 
	})
}
sendRequest('GET',requestURL)
	.then(data => console.log(data))
	.catch(err => console.log(err))


let body = {
	name:'Evgeniy',
	age:18
}
sendRequest('POST',requestURL,{
	name:'Evgeniy',
	age:18
})
	.then(data => console.log(data))
	.catch(err => console.log(err))
*/
 // fetch






// XMLHttpRequest
/*function sendRequest(method,url,body = null){
	// Это асинхронный код, т.к мы отправляем какие-то данные на сервер и ждем пока они придут
	let headers = {
		'Content-Type':'application/json'
	}
	return fetch(url,{
		method:method,
		body:JSON.stringify(body),
		headers:headers
	}).then(response => {
		if(response.ok){
			return response.json();
		}
		return response.json().then(error => {
			let e = new Error('Что то пошло не так')
			e.data = error
			throw e
		})
	})
}
sendRequest('GET',requestURL)
	.then(data => console.log(data))
	.catch(err => console.log(err))



sendRequest('POST',requestURL,{
	name:'Evgeniy',
	age:18
})
	.then(data => console.log(data))
	.catch(err => console.log(err))*/

/* Урок № 15
// Spread

let arr  = [1,2,3,4];
let arr1 = [5,4,6]
console.log([...arr,...arr1])

//Rest
let num = [1,2,3,4,5];

function sum(a,b,...rest){
	return a + b + rest.reduce((x,y) => x + y,0);
}

console.log(sum(...num));

let [a,b,...other] = num;

console.log(a,b,other);

let obj = {
	name:'Evgeniy',
	age:18
}
localStorage.setItem('object',JSON.stringify(obj));
*/

/*function toUnderscore(string) {
	let arr = [];
	if(typeof(string) == 'number'){
		return String(string);
	}else{
	string = string[0].toLowerCase() + string.slice(1);
	
	for(let i = 0;i<string.length;i++){
		if(string[i].toUpperCase() == string[i] && isNaN(string[i])){
			arr.push(string.indexOf(string[i]));			
		}
	}
	string = string.toLowerCase().split('');

	arr = arr.map(item => item + arr.indexOf(item));
	for(let i of arr){
		string.splice(i,0,'_');
	}
	return string.join('');
	}
}

console.log(toUnderscore('MoviesAndBooksCdfs'));
console.log(toUnderscore('App7TestFsa'));
console.log(toUnderscore('TestController'));
console.log(toUnderscore(7));


for(let i = 0;i < this.length; i++){
		str2 += (this[i - 1] == ' ') ? this[i].toUpperCase() : this[i]; 	
	}
*/





























/*let table = document.querySelector('table');
let butt = document.querySelectorAll('button');
let currenEdit = null // Текущий элемент
let textarea = null;

table.addEventListener('mouseover',function(event){
	
	if(currenEdit) return;

	let target = event.target.closest('td');

	if(!target) return;

	if(!table.contains(target)) return;

	currenEdit = target;
	currenEdit.style.background = 'red';

})
table.addEventListener('mouseout',function(event){
		
	if(!currenEdit) return;

	let relatedTarget = event.relatedTarget;

	while(relatedTarget){
		if(relatedTarget == currenEdit) return;

		relatedTarget = relatedTarget.parentNode;
	}


	currenEdit.style.background = '';
	currenEdit = null;
})
	table.addEventListener('click',function(event){
			let target = event.target;
			textarea = document.createElement('textarea');
			textarea.className = 'area';
			textarea.value  = target.innerHTML;

			target.style.position = 'relative';


			target.onblur = function(event){
				editEnd();
			}
			function editEnd(){
				target.innerHTML = textarea.value;
				textarea.replaceWith(target);
			}
			textarea.onclick = function(event){
				
				textarea.focus();

			}
			target.innerHTML = textarea.value;
			target.replaceWith(textarea);
			
	})
*/





























/*let polsunok = document.querySelector('#polsunok');
let div = document.querySelector('#div');
let opacity = document.querySelector('#opacity');

polsunok.ondragstart = function(){
	return false;
}
polsunok.onmousedown = function(event){
	let shiftX = event.clientX - polsunok.getBoundingClientRect().left;

	

	document.addEventListener('mousemove',OnMoveTo);
	document.addEventListener('mouseup',OnMouseUp);

	function OnMoveTo(event){
		let ans = event.clientX - shiftX - div.getBoundingClientRect().left;
		let val = 0.0;

		if(ans < 0) ans = 0;

		let right = div.offsetWidth - polsunok.offsetWidth;

		if(ans > right){
			ans = right;
		}

		opacity.style.opacity = val + 1;
		polsunok.style.left = ans + 'px';
	}
	function OnMouseUp(){
	document.removeEventListener('mouseup',OnMoveTo);
	document.removeEventListener('mousemove',OnMoveTo);
	}
}
*/































/*
let ball = document.querySelector('#ball');
let zona = document.querySelector('#vorota');
let currentDroppable = null;

ball.ondragstart = function(){
	return false;
}
ball.onmousedown = function(event){
	console.log(event.clientX);
	let shiftX = event.clientX - ball.getBoundingClientRect().left;
	let shiftY = event.clientY - ball.getBoundingClientRect().top;

	ball.style.position = 'absolute';

	document.body.append(ball);

	moveAt(event.pageX,event.pageY);

	function moveAt(pageX,pageY){
		ball.style.left = pageX - shiftX + 'px';
		ball.style.top  = pageY - shiftY + 'px';
	}

	function onMouseMove(event){

		moveAt(event.pageX,event.pageY);
	
		ball.hidden = true;
		let elemBelow = document.elementFromPoint(event.clientX,event.clientY);
		ball.hidden = false;

		if(!elemBelow) return;

		let droppleBelow = elemBelow.closest('#vorota');

		if(currentDroppable != droppleBelow){
			if(currentDroppable){
				leaveDrople(currentDroppable);//Вылетает
			}
			currentDroppable = droppleBelow;
			if(currentDroppable){
				enterDrople(currentDroppable);//Влетает
			}
		}
	}

	document.addEventListener('mousemove',onMouseMove);

	ball.onmouseup = function(event){
		document.removeEventListener('mousemove',onMouseMove);
		ball.onmouseup = null;
	}

	function leaveDrople(){
		zona.style.background = '';
	}
	function enterDrople(){
		zona.style.background = 'red';
	}
}
*/




























/*let div1 = document.querySelector('#div1');
let div2 = document.querySelector('#div2');
let a    = document.querySelectorAll('a');



div2.addEventListener('click',function(event){
	let target = event.target.closest('a');
	if(!target) return;
	func(target.href,target.title);
	event.preventDefault()
});
function func(href,title){
	document.querySelector('#largeImg').src = href;
	document.querySelector('#largeImg').alt = title;
}
*/
/*
let bool = Math.round(Math.random(0,1));
let a = document.querySelector('a');
let house = document.querySelector('#house');
let room  = document.querySelector('#room');
console.log(bool);
let div;
a.addEventListener('mouseover',function(event){
	bool = true;
	let target = event.target
	let selectId = event.target.dataset.tooltip;

	if(!selectId) return;

	div = document.createElement('div');
	div.className = 'select';
	div.innerHTML = selectId;
	a.append(div);
	let coords = target.getBoundingClientRect();

	let left = coords.left + (target.offsetWidth - div.offsetWidth) / 2 + 20;
	if(left < 0) left = 0;

	let top  = coords.top  - div.offsetHeight - 5;
	if(top < 0){
		top = coords.top + target.offsetHeight + 5;
	}
	console.log(div.offsetWidth);
	div.style.left += left + 'px';
	div.style.top  += top  + 'px';

});
a.addEventListener('mouseout',function(event){
	if(div){
		div.addEventListener('mouseover',function(e){
			if(bool == 1){
				document.body.append(house);
			}if(bool == 0){
				document.body.append(room);
			}

		});
		div.addEventListener('mouseout',function(e){
			div.remove();
		});
	}
});
*/



















/*let li = document.querySelectorAll('li');
let bool;

for(let i = 0; i < li.length;i++){
	li[i].addEventListener('click',function(e){
		let target = event.target;
		if (event.ctrlKey || event.metaKey){
			target.classList.add('selected');
		}
		else{
			func(target);
		}
	});
}
function func(target){
	for(let i of li){
		if(i.className == 'selected'){
			i.classList.remove('selected');
		}
	}
	target.classList.add('selected');
}*/






















/*
let i = 1;

function showNotification(obj){
	let div = document.createElement('div');
	div.className = 'notification';
	
	document.body.append(div);

	div.innerHTML = obj.html;
	div.style.top = obj.top + 'px';
	div.style.right = obj.right + 'px';
	div.style.backgroundColor = '#893623'
	div.style.width = '70px';
	div.style.paddingLeft = '35px';
	div.style.color = '#EDD417';

	
	setInterval(() => div.remove(),1000);
}

setInterval(() => {
	showNotification({
		top:10,
		right:10,
		html:'Hello ' + i++,
	});
},2000);
*/

//*******************************************МИГАЮЩАЯ ХРЕНЬ**************************************
/*
let nav = document.querySelector('#nav'),
	button = document.querySelector('button'),
	list = document.querySelector('#list');
	ans = 0;

setInterval(() => nav.style.backgroundColor ='black' ,500);
setInterval(() => nav.style.backgroundColor ='red' ,1000);

function func(){
let pos = 1;


	let ans = setInterval(frame,0.1);
	let ans1 = setInterval(frame1,10);
	
function frame(){
	if(pos == 170){
		clearInterval(ans);
	}else{
		pos++
		nav.style.top = pos + 'px';
		nav.style.left = pos + 'px';
		}
	}
function frame1(){
	if(pos == 0){
		clearInterval(ans1);
	}else{
		pos--
		nav.style.top = pos + 'px';
		nav.style.left = pos + 'px';
		}
	}
}
button.addEventListener('click',func);
nav.addEventListener('click',function(){
	ans += 1;
	alert(`Вы попали ${ans} раз`);
});	
*/
/*
function func(){
	let elem = new DocumentFragment();
	
	for(let i = 0 ; i < 3 ; i++){
		let li = document.createElement('li');
		li.append(i);
		elem.append(li);
	}
	return elem;
}
 */
/*
function validate(password){
	let sum  = 0,
			sum1 = 0,
			sum2 = 0,
			sum3 = 0;

		for(let k of password){
			if(password.split(k).length - 1 == password.length){
				return false;
			}
			if(k == ',' || k == '.' || k == '!' || k == ' '){
				continue;
			}else{
				if(password.length >= 6){
					sum += 1;
				}else{
					return false;
				}
				if(password == Number(password)){
					return false;
				}

					for(let i of password){
						if(isNaN(i) == true){
							if(i == i.toLowerCase() && i !== '.' && i !=='!' && i !== ' ' && i !== ','){
								sum1 += 1;
								break;
							}else if(i == i.toUpperCase() || i == Number(i)){
								continue;
							}
						}
					}
					for(let j of password){
						if(isNaN(j) == true){
							if(j == j.toUpperCase() && j !== '.' && j !=='!' && j !== ' ' && j !== ','){
								sum2 += 1;
								break;
							}else if(j == j.toLowerCase() || j == Number(j)){
								continue;
							}
						}
					}	
					for(let m of password){
						if(isNaN(m) == false){
							sum3 += 1;
							break;
						}else{
							continue;
						}
					}
				
					if(sum1 == sum && sum2 == sum3){
						return true;
					}else{
						return false;
					}
				}
			}
		}

console.log(validate('412421'))
console.log(validate('djI38D55'));
console.log(validate('a2.d412'));
console.log(validate('JDH5FJ53'));
console.log(validate('!!!'));
console.log(validate('123'));
console.log(validate('Df1!dsaD2W'))
console.log(validate('Password123'));
console.log(validate('!fdjn345'));
*/



























//                   ***********КАРРИРОВАНИЕ**********
/*function func(f){
	return function(a){
		return function(b){
			return f(a,b);
		};
	};
}
function sum(a,b){
	return a + b;
}
let ans = func(sum);
alert(ans(1)(2));
*/

/*let user = {
	name:'Вася',
	_password:'*******',
	func(value){
		return value = this._password
	}
};
user = new Proxy(user,{
	get(target,prop){
		if(prop.startsWith('_')){
			throw new Error('Ошибка');
		}else{
			return (typeof target[prop] == 'function') ? prop.bind(target):prop;
		}
	},
	set(target,prop,value){
		if(prop.startsWith('_')){
			throw new Error('Ошибка');
		}else{
			target[prop] = value;
			return true;
		}
	},
	ownKeys(target){
		return Object.keys(target).filter(e => !e.startsWith('_'));
	},
	deleteProperty(target,prop){
		if(prop.startsWith('_')){
			throw new Error('Ошибка');
		}else{
			delete target[prop];
			return true;
		}
	},
	has(target,prop){
		if(prop.startsWith('_')){
			throw new Error('Ошибка');
		}else{
			return true;
		}
	}
});
try{
	alert(user._password in user);
}catch(e){
	alert(e.message);
}
*/
/*
let arr1 = [1,2,3];

arr1 = new Proxy(arr1, {
	get(arr1,prop){
		if(prop in arr1){
			return arr1[prop];
		}else{
			return 0;
		}
	}
});
alert(arr1[2]);
alert(arr1[123]);
*/

/*
let arr2 = [];

arr2 = new Proxy(arr2, {
	set(arr2,prop,value){
		if(typeof value == 'number'){
			arr2[prop] = value;
			return true;
		}else{
			return false;
		}
	}
});

arr2.push(1);
console.log(arr2);
arr2.push('asd');
*/
/*
let arr = [];
let sum = 0;
for(let i = 1; i <= 2; i++){
	arr.push(prompt('Введите число'));
}
function func(x){
	for(let j of x){
		if(Number(j) < 0){
			sum += Number(j);
		}else if(sum == 0){
			return 'Отрицательных чисел нет';
		}
	}
	return sum;
}
console.log(arr);
alert(func(arr));
*/

//setTimeout(() => document.body.style.background = 'red',3000);	
//let ans = [1,'[',']'];


/*
let ans  = [[[],[]]];
let ans1 = [[1,1],[]];
let sum,sum1,sum2,sum3;

console.log(ans1.includes('object'));

for(let i of ans){
	if(typeof i == 'object'){
		sum = i;
		break;
	}if(!ans.includes('object')){
		sum1 = 1;
	}
}
for(let j of ans1){
	if(typeof j == 'object'){
		sum3 = j;
		break;
	}if(!ans1.includes('object')){
		sum2 = 1;
	}
}
sum = ans.join('');
sum3 = ans1.join('');
console.log(ans);
for(let n of sum){
	if(n == ','){
		console.log(sum.indexOf(n));
	}
}
for(let m of sum3){
	if(m == ','){
		console.log(sum3.indexOf(m));
	}
}















Array.prototype.sameStructureAs = function(other){
	if(Array.isArray(this) && Array.isArray(other)){
	
	let ans = this;
	let sum,sum1,sum2,sum3;
	let other_1,this_1;


	for(let i of ans){
		if(typeof i == 'object'){
			ans = i;
			break;
		}if(!ans.includes('object')){
			sum1 = 1;
		}
	}
	for(let j of other){
		if(typeof j == 'object'){
			other = j;
			break;
		}if(!other.includes('object')){
			sum2 = 1;
		}
	}
	this_1   = ans.join('');
	other_1 = other.join('');

	for(let n of this_1){
		if(n == ','){
			sum = this_1.indexOf(n);
			console.log(sum);
		}
	}
	for(let m of other_1){
		if(m == ','){
			sum3 = other_1.indexOf(m);
			console.log(sum3);
		}
	}
	if(ans.includes('object') && (other.includes('object'))){
		if(sum1 == sum2){
			return(true);
		}else{
			return(false);
		}
	}

	if(!this_1.includes('object') && (!other_1.includes('object'))){
		if(sum == sum3){
			return(true);
		}else{
			return(false);
		}
	}		
}else{
	return false;
	}
}
console.log([[[],[]]].join(''));

console.log([1,[[[1]]]].sameStructureAs([2,[[[2]]]]))
console.log([1,1,1].sameStructureAs([2,2,2]));
console.log([1,[1,1]].sameStructureAs([2,[2,2]]));
console.log([1,[1,1]].sameStructureAs([[2,2],2]));
console.log([1,[1,1]].sameStructureAs([[2],2]));
console.log([[[],[]]].sameStructureAs([[[],[]]]));
console.log([[[],[]]].sameStructureAs([[1,1],[]]));
console.log([1,[1,1]].sameStructureAs([2,[2]]));
*/
/*
let arr  = [[[],[]]];
let arr1 = [[1,1]];

arr = arr.join('');
arr1 = arr1.join('');
console.log(arr,arr1);
for(let i of arr){
	if(i == ','){
		arr = arr.indexOf(i);
		console.log(arr);
	}
}
for(let j of arr1){
	if(j == ','){
		arr1 = arr1.indexOf(j);
		console.log(arr1);
	}
}
if(arr == arr1){
	console.log(true);
}else{
	console.log(false);
}

*/
/*let arr1 = [];
function func(x){
	for(let i of x){
		if (typeof i == 'object'){
			func(i);
		}else{
			arr1.push(i);
		}
	}
}*/
//(func(arr));
/*
for(var i = array.length - 1; i >= 0; i--) {
		if(array[i] === number) {
			 array.splice(i, 1);
		}
}
*/









/*function arrayDiff(a,b){
	let arr  = [];
	let ans;
	for(let i = 0;i < a.length; i++){
		for(let j = 0;j < b.length; j++){
			if(a[i] == b[j]){
				delete a[i];
			}else{
				continue;
			}
		}
	}
	ans = a;
	for(let m of ans){
		if(m == NaN || m == undefined){
			delete m;
		}else{
			arr.push(m);
		}
	}
	return arr;
}


console.log(arrayDiff([3,4],[3]));
console.log(arrayDiff([1,2],[2]));
console.log(arrayDiff([1,2,2,2],[2]));
console.log(arrayDiff([1,8,2],[]));
console.log(arrayDiff([],[4,5]));
console.log(arrayDiff([],[]));
console.log(arrayDiff([1,25,6,12,5,2,13],[25,12,13,2]));
console.log(arrayDiff([-12,-42,421,5],[-12,-42,5]));
console.log(arrayDiff([-4,2,51,21,-51,-12,412,0,4,5, ],[51,-12,4]));

*/



	
/*
function twosDifference(input){ 
	let arr = [];
	for(let i = 0;i < input.length;i++){
		for(let j = 0;j < input.length;j++){
			if((input[i] - input[j]) == 2){
				arr.push([input[i],input[j]]);
			}
		}
	}
	for(let m of arr){
		m.sort(function(a,b){return a - b});
	}
	return arr;
}
console.log(twosDifference([1,2,3,4]));
console.log(twosDifference([1,23,3,4,7]));
console.log(twosDifference([4,3,1,5,6]));
console.log(twosDifference([1,3,4,6]));
*/

























/*class HttpError extends Error{
	constructor(response){
		super(`${response.status} for ${response.url}`);
		this.name = 'HttpError';
		this.response = response;
	}
}

async function loadJson(url){
	let response = await fetch(url);
	
	if(response.status == 200) {
		let json = await response.json();
		return json;
	}

	throw new Error(response.status);
}

async function demoGithubUser(){
	let name = prompt("Введите логин?",'');

	let user;
	while(true){
		let name = prompt("Введите логин?",'');

		try{
			let user = await loadJson(`https://api.github.com/users/${name}`);
			break;
		}catch(err){
			if(err instanceof HttpError && err.response.status == 404){
				alert('Такого пользователя нет');
			}else{
				throw err;
			}
		}
	}	
	return user; 
}
demoGithubUser();
*/
/*
async function wait(){
	await new Promise(resolve => setTimeout(resolve,1000));

	return 10;
}
function f(){
		 return wait().then(alert);
}
f();




function list(names){
	let arr = [];
			arr1 = [];

	for(let i of names){
		for(let j of Object.values(i)){
			arr.push(j);
		}
	}
	if(arr.length == 1){
		return String(`${arr}`);
	}
	if(arr.length == 0){
		return '';
	}
	arr1 = arr[arr.length - 1];
	arr.pop();
	arr = arr.join(', ');
	return (`${arr} & ${arr1}`);
}
alert(list([]))
alert(list([{name:'evgen'},{name:'Lisa'},{name:'Bart'}]));
alert(list([{name:'evgen'},{name:'Lisa'},{name:'Bart'},{name:'Bart'}]));
alert(list([{name:'evgen'},{name:'Lisa'},{name:'Bart'}]));
alert(list([{name:'evgen'}]))
alert(list([{name:'Lisa'},{name:'Bart'}]))

*/


























/*function iqTest(numbers){
	let sum  = 0,//ЧЕТ
		sum1 = 0;//НЕ ЧЕТ

	numbers = numbers.split(' ');
	//numbers.splice(0,0,'');

	for(let i = 0; i < numbers.length; i++){
		if( numbers[i] % 2 == 1){
			sum1 += 1;
		}if( numbers[i] % 2 == 0){
			sum += 1;
		}
	}
	if(sum > sum1){
		for(let j of numbers){
			if( j % 2 == 1){
				return (Number(`${numbers.indexOf(j) + 1}`));
			}
		}
	}
	if(sum1 > sum){
		for(let m of numbers){
			if( m % 2 == 0){
				return (Number(`${numbers.indexOf(m) + 1}`));
			}
		}
	}
}
alert(iqTest('2 4 7 8 10'));
alert(iqTest('1 2 1 1'));
alert(iqTest('1 1 1 1 10'));
alert(iqTest('1 2 2'));
alert(iqTest('3 4 5 7 9'))
alert(iqTest('3 5 7 9 1 2'))
*/

















/*
function firstNonRepeatingLetter(s){
	function func(){
		s = s.toLowerCase();
		for(let i of s){
			if(s.split(i).length - 1 == 1){
				return i;
			}
		}
	}	
	for(let j of s){
		if(j == func()){
			return j;
		}if (j == func().toUpperCase()){
			return j.toUpperCase();
		}	
	}
}
alert(firstNonRepeatingLetter(''))
alert(firstNonRepeatingLetter('stress'));
alert(firstNonRepeatingLetter('a'));
alert(firstNonRepeatingLetter('moonmen'));
alert(firstNonRepeatingLetter('sTreSS'));
alert(firstNonRepeatingLetter('AaaT'));
alert(firstNonRepeatingLetter('aYewAA'));
alert(firstNonRepeatingLetter('yyyY'))
*/



















/*String.prototype.camelCase=function(){
	let str1 = '',str2 = '';
	if (this == ''){
		return '';
	}

	for(let i = 0;i < this.length; i++){
		str2 += (this[i - 1] == ' ') ? this[i].toUpperCase() : this[i]; 	
	}

	str1 = this[0].toUpperCase() + str2.slice(1);
	str1 = str1.replace(/\s/g,'');
	
	return(str1);
}
alert('say hello'.camelCase());
alert('dsadasd das dsad'.camelCase());
alert('test case'.camelCase());
alert('camel case world'.camelCase());
alert(''.camelCase());
alert('aaaaaa bbbbbb cccccc dddddd'.camelCase());
*/


/*
function isPangram(string){
	let str      =  'abcdefghijklmnopqrstuvwxyz',
		str2     =  '',
		p,count  =  0;

	string = string.toLowerCase();
	string = string.replace(/\s/g,'');
	
	for(let i of string){
		if(str2.includes(i) && str2.split(i).length - 1 == 1){
			continue;
		}if(i == '.' || isFinite(i) || i == ',' ){
			continue;
		}else{
			str2 += i;
		}
	}
	return str2.split('').sort().join('') == str;
}
alert(isPangram('The quick brown fox jumps over the lazy dog'));
alert(isPangram('This is not a panagram'));
alert(isPangram('dsads dsad'));
alert(isPangram('abcdefghijklmnopqrstuvwxyz sadsadsadsa'));
alert(isPangram('Pack my box with five dozen liquor jugs.'));
alert(isPangram('ABCD45EFGH,IJK,LMNOPQR56STUVW3XYZ'));

*/









/*function DNAtoRNA(dna) {
	let str = '';
	for(let i of dna){
		if(i == 'T'){
			str = dna.replace(/T/g,'U');
		}
	}
	if (str.length == 0){
		return dna;
	}else{
		return str;
	}
}
alert(DNAtoRNA("GACCGCCGCC"));
alert(DNAtoRNA('TTTT'));
*/














/* function findUniq(arr) {
	let arr1 = arr.sort(function(x,y){return x - y;});
	console.log(arr1);
	if(arr1[0] == arr[1]){
		return arr1[arr1.length - 1];
	}
	return arr1[0];
}
alert(findUniq([ 0, 1, 0 ]));
alert(findUniq([ 1, 1, 1, 2, 1, 1 ]));
alert(findUniq([ 3, 10, 3, 3, 3 ]));
alert(findUniq([ 1, 1, 1, 2, 1, 1 ]));
alert(findUniq([ 0, 0, 0.55, 0, 0 ]));
alert(findUniq([ 1, 1, 1, 0, 1, 1 ]));
 */





// ****************************КУРСАВАЯ*********************************************

/*
let n = +prompt('Введите кол-во строк','');
let m = +prompt('Введите кол-во столбцов','');
let arr = [],sum = 0;	
for(let i = 0; i < m; i++){
	arr[i] = [];
	for(let j = 0; j < n;j++){
		arr[i][j] = +prompt('Введите число','');
		if (arr[i][j] < 0){
			sum += 1;
		}
	}
}	
for (let k of arr){
	k.sort(function(a,b){return a - b});
	let sum = 0;
	console.log(k);
	console.log(k[0] + k[1]);
}

console.log(arr);
console.log(sum);
*/

//***************************************************************************************************************



/* function logPerson(){
	console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}
const person1 = {name: 'Михаил', age:22, job:'Frontend'}
const person2 = {name: 'Елена', age:19, job:'SMM'}

bind(person1,logPerson)();
bind(person2,logPerson)();

function bind(person,fn){
	return function(...args){
		fn.apply(person,args);
	}
}
		

 */




















 /*function duplicateEncode(str){
	let str1 = '';

	str = str.toLowerCase();
	for(let i of str){
		str1 += i;
		if(str.split(i).length - 1 == 1){
			str1 = str1.replace(i,'(');
		}
		else{
			str1 = str1.replace(i,')');
		}
	}
	return str1;
}
alert(duplicateEncode(")))))("));
alert(duplicateEncode("din"));
alert(duplicateEncode("recede"));
alert(duplicateEncode("Success"));  
alert(duplicateEncode("(( @"));
*/



/*
 function duplicateEncode(str){
	let str_1 = str.toLowerCase();
	let str_2 = '',p;
	for(let i of str_1){
		if( i != p){
			str_2 += i;
			p = i;
		}else{
			str_2 += i;
		}
		if(str_1.split(i).length - 1 > 1){
			str_2 = str_2.replace(i,')');
		}else{
			str_2 = str_2.replace(i,'(');
		}
	}
	return str_2;
}
alert(duplicateEncode(")))))("));
alert(duplicateEncode("din"));
alert(duplicateEncode("recede"));
alert(duplicateEncode("Success"));  
alert(duplicateEncode("(( @"));
*/






























/* ***************************************************************************/

/*  class Clock {
		constructor({ template }) {
			this.template = template;
		}
	
		render() {
			let date = new Date();
	
			let hours = date.getHours();
			if (hours < 10) hours = '0' + hours;
	
			let mins = date.getMinutes();
			if (mins < 10) mins = '0' + mins;
	
			let secs = date.getSeconds();
			if (secs < 10) secs = '0' + secs;
	
			let output = this.template
				.replace('h', hours)
				.replace('m', mins)
				.replace('s', secs);
	
			console.log(output);
		}
	
		stop() {
			clearInterval(this.timer);
		}
	
		start() {
			this.render();
			this.timer = setInterval(() => this.render(), 3000);
		}
	}
	class ExtendedClock extends Clock{
		constructor(options,prevet = 1000){
			super(options);
			
			this.prevet = prevet;
		}
		start(){
			this.render();
			setInterval(() => this.render(),this.prevet);
		}
	}
	
	let clock = new ExtendedClock({template: 'h:m:s'});
	clock.start(); */

/* ***************************************************************************** */
 

 /*let work = {
	call: [],
	slow(a,b){
		alert( a + b );
		this.call.push([a,b]);
	}
};


function spy(func){
	return function(){
		func.apply(this,arguments);
	}
	
}

work.slow = spy(work.slow);

work.slow(1,5);
work.slow(4,5);

for (let args of work.call){
	alert('call' + ' ' + args);
}

let ans = JSON.stringify(work.call);
console.log(ans);  
*/


/* ***************************************************************************** */

/* let  hamster = {
	eat(food){
		this.stomach.push(food);
	}
};

let speedy = {
	stomach: [],
	__proto__: hamster
};

let lazy = {
	stomach: [],
	__proto__: hamster
};

speedy.eat('apple');
lazy.eat('banan');
alert(speedy.stomach);

alert(lazy.stomach);

 */

/* ****************************************************************************** */

/* function f(x){
	alert(x);
}
function delay(func,ms){
	return function(){
		setTimeout(() => func.apply(this,arguments),ms);
	}
}

let f1000 = delay(f, 3000);

f1000("test");
*/


/* *************************************************************************** */

/*
 function printNumbers(from,to){
	let ans = from;
	
	let id = setTimeout(function click(){
		alert(ans);
		if(ans < to){
			setTimeout(click,1000);
		}
		ans++;
	},1000);
}	
printNumbers(1,11);
*/

/* *************************************************************************** */

/*
function makeCounter() {
		let count = 0;
	
	
	
	function counter(){
		return count++;
	}
	
	counter.set = value => count = value;
	
		counter.decrease = () => count--;
	
	
	
	return counter;
	// ... ваш код ...
	}
	
	let counter = makeCounter();
	
	alert( counter() ); // 0
	alert( counter() ); // 1
	
	counter.set(10);
	alert(counter());  
	
	counter.set(10); // установить новое значение счётчика
	
	alert( counter() ); // 10
	
	counter.decrease(); // уменьшить значение счётчика на 1
	
	alert( counter() ); // 10 (вместо 11)
	*/
	