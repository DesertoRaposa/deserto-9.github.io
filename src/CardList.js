import Card from './Card';

export default class CardList {
	constructor(rootListElem) {
		this.rootListElem = rootListElem;
	}

	addcard(name, link, id, isDeletable, likeCount, isLiked) {
		//  Можно лучше: В качестве параметров передавайте не переменные, а объект
		//  если вы в ходе развития проекта захотите добавить переменных, то вам придётся менять код во многих местах 
		let card = new Card(name, link, id, isDeletable, likeCount, isLiked, this.api);
		this.rootListElem.appendChild(card.html);
	}

	render(data, myID) { //завожу аргумент, чтобы потом  в функцию передать result 
		/*для отрисовки карточек при загрузке страницы */
		/* 
		 можно лучше : используйте for of для перебора массива с объектами
		 https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of 
		 как пример:
		 
		 const array1 = ['a', 'b', 'c'];
		 for (const element of array1) {
		  console.log(element);
		 }
		 
		*/
		for (let i = 0; i < data.length; i++) {
			let likesArray = data[i].likes; // массив лайков
			let isLiked = false;
			for (let j = 0; j < likesArray.length; j++) { //идем по массиву лайков
				if (likesArray[j]._id == myID) {
					isLiked = true; // если хоть один лайк мой, то карточку  лайкала
				}
			}
			//  Можно лучше: В качестве параметров передавайте не переменные, а объект
			//  если вы в ходе развития проекта захотите добавить переменных, то вам придётся менять код во многих местах 
			this.addcard(
				data[i].name,
				data[i].link,
				data[i]._id,
				data[i].owner._id == myID,
				data[i].likes.length,
				isLiked
			);
		}
	}

	setApi(api) {
		this.api = api;
		this.myID = api.myID;

		let root = this;
		this.api.loadCardsData(function (cardsData) {
			root.render(cardsData, root.myID);
		});
	}
}
