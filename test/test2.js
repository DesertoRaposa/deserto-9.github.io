
const array = ['Котенок','Щеночек','Енотик','Пингвиненок','Медвежонок'];


const list = document.getElementById('items');

for (let i = 0; i < array.length; i++) { 
	const listItem = document.createElement('div'); 
	listItem.classList.add('box'); //добавить класс
	//listItem.textContent = array[i]; 
	list.appendChild(listItem); 
	
	
	const imageBlock = document.createElement('div'); 
	imageBlock.classList.add('imgblock'); //добавить класс
	imageBlock.textContent = 'картинка'; 
	listItem.appendChild(imageBlock); 
	
	
	const textBlock = document.createElement('div'); 
	imageBlock.classList.add('txtblock'); //добавить класс
	textBlock.textContent = array[i];
	listItem.appendChild(textBlock); 
}