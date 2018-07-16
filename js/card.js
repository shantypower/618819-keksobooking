'use strict';

(function () {
  window.createSimilarAdvert = function (advert) {
    var mapCardTemplate = document.querySelector('#map__card').content.querySelector('.map__card');
    var mapCard = mapCardTemplate.cloneNode(true);
    var advertTitle = mapCard.querySelector('.popup__title');
    var advertAddress = mapCard.querySelector('.popup__text--address');
    var advertPrice = mapCard.querySelector('.popup__text--price');
    var advertType = mapCard.querySelector('.popup__type');
    var advertCapacity = mapCard.querySelector('.popup__text--capacity');
    var advertTime = mapCard.querySelector('.popup__text--time');
    var advertFeatures = mapCard.querySelector('.popup__features');
    var advertDescription = mapCard.querySelector('.popup__description');
    var advertPhotos = mapCard.querySelector('.popup__photos');
    var advertAvatar = mapCard.querySelector('.popup__avatar');

    advertTitle.textContent = advert.offer.title;
    advertAddress.textContent = advert.offer.address;
    advertPrice.textContent = advert.offer.price + ' денежек /ночь.';

    switch (advert.offer.type) {
      case ('flat'):
        advertType.textContent = 'Квартира';
        break;

      case ('bungalo'):
        advertType.textContent = 'Бунгало';
        break;

      case ('house'):
        advertType = 'Дом';
        break;

      case ('palace'):
        advertType = 'Дворец';
        break;
    }

    advertCapacity.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    advertTime.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

    advert.offer.features.forEach(function (element) {
      advertFeatures.querySelector('.popup__feature--' + element).textContent = element;
    });

    Array.prototype.slice.apply(advertFeatures.children).forEach(function (element) {
      if (element.textContent === '') {
        advertFeatures.removeChild(element);
      }
    });

    advertDescription.textContent = advert.offer.description;

    advert.offer.photos.forEach(function (element) {
      var photo = advertPhotos.children[0].cloneNode();
      photo.src = element;
      advertPhotos.appendChild(photo);
    });

    advertPhotos.removeChild(advertPhotos.children[0]);
    advertAvatar.src = advert.author.avatar;

    document.addEventListener('keydown', window.map.onKeyEscPress);

    return mapCard;
  };

})();
