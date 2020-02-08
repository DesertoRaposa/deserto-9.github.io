class Popup {

	constructor(typeOfPopup, cardList, api) {
		this.typeOfPopup = typeOfPopup;
		this.cardList = cardList;
		this.api = api;
		if (this.typeOfPopup == 0) {
			this.nameField = document.querySelector('.popup__input.popup__input_type_name');
			this.linkField = document.querySelector('.popup__input.popup__input_type_link-url');
			this.submit_button = document.querySelector('.button.popup__button');
			this.close_button = document.querySelector('.popup__close');
		} else {
			this.nameField = document.querySelector('.newpopup__input.newpopup__input_type_name');
			this.linkField = document.querySelector('.newpopup__input.newpopup__input_type_link-url');
			this.nameField_error = document.querySelector(".editformnameerror");
			this.linkField_error = document.querySelector(".editformjoberror");

			this.submit_button = document.querySelector('.button.submit__button');
			this.close_button = document.querySelector('.newpopup__close');
		}

		this.submit_button.addEventListener('click', this.submit.bind(this));
		this.close_button.addEventListener('click', this.close.bind(this));

		this.nameField.addEventListener('input', this.validate.bind(this));
		this.linkField.addEventListener('input', this.validate.bind(this));

		this.prepare();
	}

	submit(event) {
		event.preventDefault();

		if (this.typeOfPopup == 0) {
			let root = this;
			this.api.addNewCard(this.nameField.value, this.linkField.value, function (data) {
				root.cardList.addcard(data.name, data.link, data._id, true, 0, false, root.api);
			});
		} else {
			this.api.editInfo(this.nameField.value, this.linkField.value, function (data) {
				const userInfoName = document.querySelector('.user-info__name');
				const userInfoJob = document.querySelector('.user-info__job');

				userInfoName.textContent = data.name;
				userInfoJob.textContent = data.about;
			});
		}

		this.close();
	}

	open() {
		if (this.typeOfPopup == 0) {
			const popUp = document.querySelector(".popup");
			popUp.classList.add('popup_is-opened');
		} else {
			const newpopUp = document.querySelector('.newpopup');
			newpopUp.classList.add('newpopup_is-opened');
		}
	}

	close() {
		//Можно лучше: используйте строгое равенство ===, не используйте ==
		// Более подробно можите почитать здесь https://habr.com/ru/post/138272/ 
		if (this.typeOfPopup == 0) {
			const popUp = document.querySelector(".popup");
			popUp.classList.remove('popup_is-opened');
		} else {
			const newpopUp = document.querySelector('.newpopup');
			newpopUp.classList.remove('newpopup_is-opened');
		}
	}

	validate() {
		let nameCheckField = this.checkField(this.nameField, this.nameField_error);
		let linkCheckField = this.checkField(this.linkField, this.linkField_error);

		if (nameCheckField && linkCheckField) {
			this.submit_button.removeAttribute('disabled', true);
			this.submit_button.classList.remove('popup__button_disabled');

		} else {
			this.submit_button.setAttribute('disabled', true);
			this.submit_button.classList.add('popup__button_disabled');
		}
	}

	checkField(field, field_error_span) {
		let error_text = '';

		if (field.value.length === 0) {
			// Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов' 
			// выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
			// Для примера : const words = { validationLenght: 'Должно быть от 2 до 30 символов'	} 
			// Далее words передаётся в функцию и используется.
			error_text = "Это обязательное поле";
		} else if (field.value.length < 2 || field.value.length > 30) {
			error_text = "Должно быть от 2 до 30 символов";
		}

		if (field == this.linkField && this.typeOfPopup == 0) { // убираем ограничение в 30 символов для первого попапа
			if (field.value.length > 30) {
				error_text = '';
			}
		}

		if (field_error_span != undefined) {
			field_error_span.textContent = error_text;
		}
		// достаточно просто возвращать так
		// return (error_text == '');
		if (error_text == '') {
			return true;
		} else {
			return false;
		}
	}

	prepare() {
		if (this.typeOfPopup != 0) {
			const userInfoName = document.querySelector('.user-info__name');
			const userInfoJob = document.querySelector('.user-info__job');

			this.nameField.value = userInfoName.textContent;
			this.linkField.value = userInfoJob.textContent;
		}
	}

}

