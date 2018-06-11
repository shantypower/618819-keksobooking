'use strict';

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
]; //Значения не должны повторяться.
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
//var offerCheckOuts = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; //массив строк случайной длины из предложенных
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);

  return randomNumber;
}

var getRandomArrayElement = function (arr) {
  var randomElementIndex = getRandomNumber(0, arr.length - 1);

  return arr[randomElementIndex];
};

var getUniqueArrayElement = function (array) {
  return array.splice(getRandomNumber(0, array.length - 1), 1).toString();
};

// Генерация перемешанного массива случайной длины
var getRandomArray = function (array) {
  var sourceArray = getShuffledArray(array);
  var randomArray = [];
  var randomLength = getRandomNumber(1, (array.length - 1));
  for (var i = 0; i <= randomLength; i++) {
    randomArray[i] = sourceArray[i];
  }

  return randomArray;
};

//перемешивание элементов в массиве
var getShuffledArray = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var j = getRandomNumber(0, arr.length - 1);
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr;
};
//генерация похожего объявления
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
//создание массива случайных похожих объявлений
  var similarAdverts = [];
  for (var i = 0; i <= NUMBER_OF_ADVERTS - 1; i++) {
    similarAdverts[i] = getSimilarAdvert();
  }

var mapPins = document.querySelector('.map__pins'); //ищем блок в разметке, куда вставлять пины
//ищем в разметке шаблон и разметку кнопки-пина в нем
var mapPinTemplate = document.querySelector('#map__card').content.querySelector('.map__pin');

var createMapPin = function (arrAdverts) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var pinIcon = mapPin.children[0];
  var pinWidth = +pinIcon.getAttribute('height');
  var pinHeight = +pinIcon.getAttribute('width');
  mapPin.style = 'left: ' + (arrAdverts.location.x + pinWidth / 2) + 'px; top: ' + (arrAdverts.location.y + pinHeight) + 'px';
  pinIcon.src = arrAdverts.author.avatar;
  pinIcon.alt = arrAdverts.offer.title;
  return mapPin;
};

//ищем блок в разметке, куда вставлять объявление
//ищем в разметке шаблон объявления

var fragment = document.createDocumentFragment();
for (var i = 0; i < similarAdverts.length; i++) {
  fragment.appendChild(createMapPin(similarAdverts[i]));
}
mapPins.appendChild(fragment);

var mapCardTemplate = document.querySelector('#map__card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

var createSimilarAdvert = function (arrAdverts) {
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
  advertPrice.textContent = similarAdverts[0].offer.price + '₽/ночь.';

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

  for (var i = 0; i < similarAdverts[0].offer.features.length; i++) {
    advertFeatures.querySelector('.popup__feature--' + similarAdverts[0].offer.features[i]).textContent = similarAdverts[0].offer.features[i];
  }
/*
  for (i = 0; i < advertFeatures.children.length; i++) {
    if (advertFeatures.children[i].textContent === '') {
      advertFeatures.removeChild(advertFeatures.children[i]);
    }
  }*/

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

fragment.innerHtml = '';
fragment.appendChild(createSimilarAdvert(similarAdverts[0]));
map.insertBefore(fragment, mapFilters);

/*function generateArrayRandomNumber (min, max) {
var totalNumbers = max - min + 1,
arrayTotalNumbers   = [],
arrayRandomNumbers  = [],
tempRandomNumber;
while (totalNumbers--) {
arrayTotalNumbers.push(totalNumbers + min);
}
while (arrayTotalNumbers.length) {
tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
arrayTotalNumbers.splice(tempRandomNumber, 1);
}
return arrayRandomNumbers;

}
//  Нужно учесть что в диапазоне участвуют и минимальное и максимальное число
//  тоесть если задать (0, 100) то на выходе получим массив из 101-го числа
//  от 1 до 100 и плюс число 0
alert(generateArrayRandomNumber(45, 67));
 */
