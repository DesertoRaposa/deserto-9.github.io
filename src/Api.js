export default class APIClass {
	constructor(myToken, baseURL) {
		this.baseURL = baseURL;
		this.myToken = myToken;
	}

	loadProfile(callback) {
		fetch(this.baseURL + 'users/me', {
			headers: {
				authorization: this.myToken
			}
		})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((result) => {
			// не нашёл где используется myID
			this.myID = result._id; // <---- заводим myID
			callback(result);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	editInfo(myName, myAbout, callback) {
		fetch(this.baseURL + 'users/me', {
			method: 'PATCH',
			headers: {
				authorization: this.myToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: myName,
				about: myAbout
			})
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then((result) => {
				callback(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	loadCardsData(callback) {
		// переменная не используется, лучше удалить cardspromise
		let cardspromise = fetch(this.baseURL + 'cards', {
			headers: {
				authorization: this.myToken
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then((result) => {
				callback(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	deleteCard(cardID, callback) {
		fetch(this.baseURL + 'cards/' + cardID, {
			method: 'DELETE',
			headers: {
				authorization: this.myToken,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then((result) => {
				callback(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	addNewCard(myName, myLink, callback) {
		fetch(this.baseURL + 'cards', {
			method: 'POST',
			headers: {
				authorization: this.myToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: myName,
				link: myLink
			})
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then((result) => {
				callback(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	setUnsetLike(cardID, setUnset, callback) {
		fetch(this.baseURL + 'cards/like/' + cardID, {
			method: setUnset ? 'PUT' : 'DELETE',
			headers: {
				authorization: this.myToken,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then((result) => {
				callback(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
