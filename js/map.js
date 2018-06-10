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

var mapActive = document.querySelector('.map'); //временно делаем карту активной для тестов
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
var getSimilarOffer = function () {
  var advert = {};

  var author = {};
  advert.author = author;
  author.avatar = 'img/avatars/user' + getUniqueArrayElement(AVATARS) + '.png';

  var location = {};
  advert.location = location;
  location.x = getRandomNumber(300, 900);
  location.y = getRandomNumber(130, 630);

  var offer = {};
  advert.offer = offer;
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

  return advert;
};
//создание массива случайных похожих объявлений
var getGroupOfSimilarAdverts = function (counts) {
  var similarAdverts = [];
  for (var i = 0; i <= counts - 1; i++) {
    similarAdverts[i] = getSimilarOffer();
  }
  return similarAdverts;
}

var similarAdverts = getGroupOfSimilarAdverts(NUMBER_OF_ADVERTS);


//клонируем из шаблона 8 DOM-элементов в разметку без содержимого
var mapPins = document.querySelector('.map__pins'); //ищем блок в разметке, куда вставлять пины
//ищем в разметке шаблон и разметку кнопки-пина в нем
var mapPinTemplate = document.querySelector('#map__pins').content.querySelector('.map__pin');
var mapCard = document.querySelector('.map__card');
var map = document.querySelector('.map');
var mapContainer = map.querySelector('.map__filters-container');

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


var createSimilarAdvert = function (arrAdverts) {
  var similarAdvert = mapCard.cloneNode(true);
  var advertTitle = similarAdvert.querySelector('.popup__title');
  var advertAddress = similarAdvert.querySelector('.popup__text--address');
  var advertPrice = similarAdvert.querySelector('.popup__text--price');
  var advertType = similarAdvert.querySelector('.popup__type');
  var advertCapacity = similarAdvert.querySelector('.popup__text--capacity');
  var advertTime = similarAdvert.querySelector('.popup__text--time');
  var advertFeatures = similarAdvert.querySelector('.popup__features');
  var advertDescription = similarAdvert.querySelector('.popup__description');
  var advertPhotos = similarAdvert.querySelector('.popup__photos');
  var advertAvatar = similarAdvert.querySelector('.popup__avatar');

  advertTitle.textContent = similarAdverts.offer.title;
  advertAddress.textContent = similarAdverts.offer.address;
  advertPrice.textContent = similarAdverts.offer.price + '₽/ночь.';

  switch (similarAdverts.offer.type) {
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

  advertCapacity.textContent = similarAdverts.offer.rooms + ' комнаты для ' + similarAdverts.offer.guests + ' гостей';
  advertTime.textContent = 'Заезд после ' + similarAdverts.offer.checkin + ', выезд до ' + similarAdverts.offer.checkout;

  for (var i = 0; i < similarAdverts.offer.features.length; i++) {
    advertFeatures.querySelector('.popup__feature--' + similarAdverts.offer.features[i]).textContent = similarAdverts.offer.features[i];
  }

  for (i = 0; i < advertFeatures.children.length; i++) {
    if (advertFeatures.children[i].textContent === '') {
      advertFeatures.removeChild(advertFeatures.children[i]);
    }
  }

  advertDescription.textContent = similarAdverts.offer.description;

  for (i = 0; i < similarAdverts.offer.photos.length; i++) {
    var photo = advertPhotos.children[0].cloneNode();

    photo.src = similarAdverts.offer.photos[i];

    advertPhotos.appendChild(photo);
  }

  advertPhotos.removeChild(advertPhotos.children[0]);
  advertAvatar.src = similarAdverts.author.avatar;

  return similarAdvert;
};

fragment.innerHtml = '';
fragment.appendChild(createSimilarAdvert(similarAdverts[0]));
map.insertBefore(fragment, mapContainer);

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
