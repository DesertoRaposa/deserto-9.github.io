class Card {

  constructor(name, link, id, is_my_card, likeCount, isLiked, api) {
    this.name = name;
    this.link = link;
    this.id = id;
    this.deletable = is_my_card;
    this.api = api;
    this.likeCount = likeCount;
    this.isLiked = isLiked;
    this.create();
  }

  like() {
    let isLiked = this.likeIcon.classList.contains('place-card__like-icon_liked'); // является ли карточка лайкнутой

    let root = this;
    this.api.setUnsetLike(this.id, !isLiked, function (data) {
      root.likeIcon.classList.toggle('place-card__like-icon_liked');
      root.likeIcon.textContent = data.likes.length;
    });
  }

  remove() {
    let root = this;
    if (window.confirm("Do you really want удалить карточку?")) {
      this.api.deleteCard(this.id, function () {
        root.html.remove();
      });
    }
  }

  create() {
    /* 
    Альтернативный способ создания карточки. При нем не требуется создавать вручную все
    элементы с помощью createElement и пользовательские данные не вставляются через innerHTML
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.innerHTML = `
     <div class="place-card__image">
     <button class="place-card__delete-icon"></button>
     </div>
     <div class="place-card__description">
     <h3 class="place-card__name"></h3>
     <button class="place-card__like-icon"></button>
     </div>`;
    placeCard.querySelector(".place-card__name").textContent = place.name;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${place.link
    })`;
   */
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('place-card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image'); //добавить класс
    cardImage.style.backgroundImage = 'url(' + this.link + ')';
    cardDiv.appendChild(cardImage);

    const cardDescr = document.createElement('div');
    cardDescr.classList.add('place-card__description'); //добавить класс
    cardDiv.appendChild(cardDescr);

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name'); //добавить класс
    cardName.textContent = this.name;
    cardDescr.appendChild(cardName);

    const likeIcon = document.createElement('button');
    likeIcon.classList.add('place-card__like-icon'); //добавить класс
    if (this.isLiked) {
      likeIcon.classList.add('place-card__like-icon_liked');
    }
    likeIcon.textContent = this.likeCount;
    cardDescr.appendChild(likeIcon);
    this.likeIcon = likeIcon;

    this.html = cardDiv;
    likeIcon.addEventListener('click', this.like.bind(this));
    if (this.deletable) {
      const deleteIcon = document.createElement('button');
      deleteIcon.classList.add('place-card__delete-icon'); //добавить класс
      cardImage.appendChild(deleteIcon);

      deleteIcon.addEventListener('click', this.remove.bind(this));
    }
  }
}
