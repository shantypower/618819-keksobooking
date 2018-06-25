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

    for (var i = 0; i < advert.offer.features.length; i++) {
      advertFeatures.querySelector('.popup__feature--' + advert.offer.features[i]).textContent = advert.offer.features[i];
    }

    for (i = 0; i < advertFeatures.children.length; i++) {
      if (advertFeatures.children[i].textContent === '') {
        advertFeatures.removeChild(advertFeatures.children[i]);
      }
    }

    advertDescription.textContent = advert.offer.description;

    for (i = 0; i < advert.offer.photos.length; i++) {
      var photo = advertPhotos.children[0].cloneNode();
      photo.src = advert.offer.photos[i];
      advertPhotos.appendChild(photo);
    }

    advertPhotos.removeChild(advertPhotos.children[0]);
    advertAvatar.src = advert.author.avatar;

    document.addEventListener('keydown', window.map.onKeyEscPress);

    return mapCard;
  };

})();
