'use strict';

(function () {
  window.getSimilarAdvert = function () {
    var similarAdvert = {};

    var author = {};
    similarAdvert.author = author;
    author.avatar = 'img/avatars/user' + window.getRandomFunctions.getUniqueArrayElement(window.constants.AVATARS) + '.png';

    var location = {};
    similarAdvert.location = location;
    location.x = window.getRandomFunctions.getRandomNumber(300, 900);
    location.y = window.getRandomFunctions.getRandomNumber(130, 630);

    var offer = {};
    similarAdvert.offer = offer;
    offer.title = window.getRandomFunctions.getUniqueArrayElement(window.constants.OFFER_TITLES);
    offer.address = location.x + ', ' + location.y;
    offer.price = window.getRandomFunctions.getRandomNumber(1000, 1000000);
    offer.type = window.getRandomFunctions.getRandomArrayElement(window.constants.OFFER_TYPES);
    offer.rooms = window.getRandomFunctions.getRandomNumber(1, 5);
    offer.guests = window.getRandomFunctions.getRandomNumber(1, 10);
    offer.checkin = window.getRandomFunctions.getRandomArrayElement(window.constants.OFFER_CHECKS);
    offer.checkout = window.getRandomFunctions.getRandomArrayElement(window.constants.OFFER_CHECKS);
    offer.features = window.getRandomFunctions.getRandomArray(window.constants.OFFER_FEATURES);
    offer.description = '';
    offer.photos = window.getRandomFunctions.getShuffledArray(window.constants.OFFER_PHOTOS);

    return similarAdvert;
  };
})();
