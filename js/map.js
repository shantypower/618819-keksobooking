'use strict';

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

var getRandomArray = function (array) {
  var sourceArray = getShuffledArray(array);
  var randomArray = [];
  var randomLength = getRandomNumber(1, (array.length - 1));
  for (var i = 0; i <= randomLength; i++) {
    randomArray[i] = sourceArray[i];
  }
  return randomArray;
};


var NUMBER_OF_ADVERTS = 8;
var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']; //Значения не должны повторяться.
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
//var offerCheckOuts = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; //массив строк случайной длины из предложенных
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var getShuffledArray = function (arr) {

  for (var i = 0; i < arr.length; i++) {
    var j = getRandomNumber(0, arr.length - 1);
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
};

var getSimilarOffer = function () {
  var advert = {};

  var author = {};
  author.avatar = 'img/avatars/user' + getUniqueArrayElement(AVATARS) + '.png';

  var location = {};
  location.x = getRandomNumber(300, 900);
  location.y = getRandomNumber(130, 630);

  var offer = {};
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

  advert.author = author;
  advert.offer = offer;
  advert.location = location;

  return advert;
};

var getGroupOfSimilarAdverts = function (counts) {
  var similarAdverts = [];
  for (var i = 0; i <= counts - 1; i++) {
    similarAdverts[i] = getSimilarOffer();
  }
  return similarAdverts;
}

var pinsGroup = getGroupOfSimilarAdverts(NUMBER_OF_ADVERTS);

var mapActive = document.querySelector('.map'); //временно делаем карту активной для тестов
mapActive.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins'); //ищем блок в разметке, куда вставлять пины
//ищем в разметке шаблон и разметку кнопки-пина в нем
var mapPinTemplate = document.querySelector('#map__pins').content.querySelector('.map__pin');
//клонируем из шаблона 8 DOM-элементов в разметку без содержимого

var createMapPin = function (arrAdverts) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var pinIcon = mapPin.children[0];
  var pinWidth = +pinIcon.getAttribute('height');
  var pinHeight = +pinIcon.getAttribute('width');
  mapPin.style = 'left: ' + arrAdverts.location.x + 'px; top: ' + arrAdverts.location.y + 'px';
  pinIcon.src = arrAdverts.author.avatar;
  pinIcon.alt = arrAdverts.offer.title;
  return mapPin;
};


//заполняем новые элементы данными из сгенерированного массива объявлений


//Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку.
/*

/*function generateArrayRandomNumber (min, max) {
02
    var totalNumbers        = max - min + 1,
03
        arrayTotalNumbers   = [],
04
        arrayRandomNumbers  = [],
05
        tempRandomNumber;
06

07
    while (totalNumbers--) {
08
        arrayTotalNumbers.push(totalNumbers + min);
09
    }
10

11
    while (arrayTotalNumbers.length) {
12
        tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
13
        arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
14
        arrayTotalNumbers.splice(tempRandomNumber, 1);
15
    }
16

17
    return arrayRandomNumbers;
18
}
19

20
//  Нужно учесть что в диапазоне участвуют и минимальное и максимальное число
21
//  тоесть если задать (0, 100) то на выходе получим массив из 101-го числа
22
//  от 1 до 100 и плюс число 0
23

24
alert(generateArrayRandomNumber(45, 67));
 */

/*

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var getRandomArrayElement = function (arr) {
  var randomElementIndex = Math.floor(Math.random() * arr.length);
  return arr[randomElementIndex];
};

var getWizardsImage = function (arrNames, arrSurnames, arrCoats, arrEyes) {
  var randomName = getRandomArrayElement(arrNames) + ' ' + getRandomArrayElement(arrSurnames);
  var randomCoat = getRandomArrayElement(arrCoats);
  var randomEyes = getRandomArrayElement(arrEyes);
  var wizardsImage = {};

  wizardsImage.name = randomName;
  wizardsImage.coatColor = randomCoat;
  wizardsImage.eyesColor = randomEyes;
  return wizardsImage;
};

var getWizardsGroup = function (arrNames, arrSurnames, arrCoats, arrEyes) {
  var wizardsImages = [];
  for (var i = 0; i <= 3; i++) {
    wizardsImages[i] = getWizardsImage(arrNames, arrSurnames, arrCoats, arrEyes);
  }
  return wizardsImages;
};

var wizards = getWizardsGroup(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATS, WIZARD_EYES);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');*/
