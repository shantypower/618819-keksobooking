'use strict';
// 1. Активировать кару при возникновении события - перетаскивание центральной метки .map__pin--main
//Для этого нужно добавить обработчик события mouseup на элемент .map__pin--main
// 2.Обработчик события mouseup должен вызывать функцию, которая будет отменять изменения DOM-элементов, описанные в пункте «Неактивное состояние» технического задания:
//**Блок с картой .map содержит класс map--faded;
//**Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
//**Поля формы .ad-form заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset
//в обработчике события mouseup на элементе метки, кроме вызова метода, переводящего страницу в активное состояние, должен находиться вызов метода, который устанавливает значения поля ввода адреса.
//Нажатие на метку похожего объявления на карте, приводит к показу карточки с подробной информацией об этом объявлении. Получается, что для меток должны быть созданы обработчики событий, которые вызывают показ карточки с соответствующими данными.

var NUMBER_OF_ADVERTS = 8;
var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var mapActive = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = adForm.querySelector('.ad-form-header');
var adFormElement = adForm.querySelectorAll('.ad-form__element');

adFormHeader.disabled = true;
for (i = 0; i <= adFormElement.length - 1; i++) {
  adFormElement[i].disabled = true;
}

mapPinMain.addEventListener('mousedown', function() {
  mapActive.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
});

var getRandomNumber = function (min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);

  return randomNumber;
};

var getRandomArrayElement = function (arr) {
  var randomElementIndex = getRandomNumber(0, arr.length - 1);

  return arr[randomElementIndex];
};

var getUniqueArrayElement = function (array) {
  return array.splice(getRandomNumber(0, array.length - 1), 1).toString();
};

var getRandomArray = function (array) {
  var sourceArray = getShuffledArray(array);
  var randomArray = [];
  var randomLength = getRandomNumber(1, (array.length - 1));
  for (var i = 0; i <= randomLength; i++) {
    randomArray[i] = sourceArray[i];
  }

  return randomArray;
};

var getShuffledArray = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var j = getRandomNumber(0, arr.length - 1);
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr;
};

var getSimilarAdvert = function () {
  var similarAdvert = {};

  var author = {};
  similarAdvert.author = author;
  author.avatar = 'img/avatars/user' + getUniqueArrayElement(AVATARS) + '.png';

  var location = {};
  similarAdvert.location = location;
  location.x = getRandomNumber(300, 900);
  location.y = getRandomNumber(130, 630);

  var offer = {};
  similarAdvert.offer = offer;
  offer.title = getUniqueArrayElement(OFFER_TITLES);
  offer.address = location.x + ', ' + location.y;
  offer.price = getRandomNumber(1000, 1000000);
  offer.type = getRandomArrayElement(OFFER_TYPES);
  offer.rooms = getRandomNumber(1, 5);
  offer.guests = getRandomNumber(1, 10);
  offer.checkin = getRandomArrayElement(OFFER_CHECKS);
  offer.checkout = getRandomArrayElement(OFFER_CHECKS);
  offer.features = getRandomArray(OFFER_FEATURES);
  offer.description = '';
  offer.photos = getShuffledArray(OFFER_PHOTOS);

  return similarAdvert;
};

var similarAdverts = [];
for (var i = 0; i <= NUMBER_OF_ADVERTS - 1; i++) {
  similarAdverts[i] = getSimilarAdvert();
}

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#map__card').content.querySelector('.map__pin');

var createMapPin = function (arrAdverts) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var pinIcon = mapPin.children[0];
  mapPin.style = 'left: ' + (arrAdverts.location.x + PIN_WIDTH / 2) + 'px; top: ' + (arrAdverts.location.y + PIN_HEIGHT) + 'px';
  pinIcon.src = arrAdverts.author.avatar;
  pinIcon.alt = arrAdverts.offer.title;
  return mapPin;
};
/*
var fragment = document.createDocumentFragment();
for (var j = 0; j < similarAdverts.length; j++) {
  fragment.appendChild(createMapPin(similarAdverts[j]));
}
mapPins.appendChild(fragment);*/

var mapCardTemplate = document.querySelector('#map__card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

var createSimilarAdvert = function () {
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

  advertTitle.textContent = similarAdverts[0].offer.title;
  advertAddress.textContent = similarAdverts[0].offer.address;
  advertPrice.textContent = similarAdverts[0].offer.price + ' денежек /ночь.';

  switch (similarAdverts[0].offer.type) {
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

  advertCapacity.textContent = similarAdverts[0].offer.rooms + ' комнаты для ' + similarAdverts[0].offer.guests + ' гостей';
  advertTime.textContent = 'Заезд после ' + similarAdverts[0].offer.checkin + ', выезд до ' + similarAdverts[0].offer.checkout;

  for (i = 0; i < similarAdverts[0].offer.features.length; i++) {
    advertFeatures.querySelector('.popup__feature--' + similarAdverts[0].offer.features[i]).textContent = similarAdverts[0].offer.features[i];
  }

  for (i = 0; i < advertFeatures.children.length; i++) {
    if (advertFeatures.children[i].textContent === '') {
      advertFeatures.removeChild(advertFeatures.children[i]);
    }
  }

  advertDescription.textContent = similarAdverts[0].offer.description;

  for (i = 0; i < similarAdverts[0].offer.photos.length; i++) {
    var photo = advertPhotos.children[0].cloneNode();
    photo.src = similarAdverts[0].offer.photos[i];
    advertPhotos.appendChild(photo);
  }

  advertPhotos.removeChild(advertPhotos.children[0]);
  advertAvatar.src = similarAdverts[0].author.avatar;

  return mapCard;
};
/*
fragment.innerHtml = '';
fragment.appendChild(createSimilarAdvert(similarAdverts[0]));
map.insertBefore(fragment, mapFilters);*/
