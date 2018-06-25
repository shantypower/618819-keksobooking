'use strict';

(function () {
  window.getSimilarAdvert = function () {
    var similarAdvert = {};

    var author = {};
    similarAdvert.author = author;
    author.avatar = 'img/avatars/user' + window.util.getUniqueArrayElement(window.constants.AVATARS) + '.png';

    var location = {};
    similarAdvert.location = location;
    location.x = window.util.getRandomNumber(300, 900);
    location.y = window.util.getRandomNumber(130, 630);

    var offer = {};
    similarAdvert.offer = offer;
    offer.title = window.util.getUniqueArrayElement(window.constants.OFFER_TITLES);
    offer.address = location.x + ', ' + location.y;
    offer.price = window.util.getRandomNumber(1000, 1000000);
    offer.type = window.util.getRandomArrayElement(window.constants.OFFER_TYPES);
    offer.rooms = window.util.getRandomNumber(1, 5);
    offer.guests = window.util.getRandomNumber(1, 10);
    offer.checkin = window.util.getRandomArrayElement(window.constants.OFFER_CHECKS);
    offer.checkout = window.util.getRandomArrayElement(window.constants.OFFER_CHECKS);
    offer.features = window.util.getRandomArray(window.constants.OFFER_FEATURES);
    offer.description = '';
    offer.photos = window.util.getShuffledArray(window.constants.OFFER_PHOTOS);

    return similarAdvert;
  };
})();
