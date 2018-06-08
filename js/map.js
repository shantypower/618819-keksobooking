'use strict';

var getRandomNumber = function (min, max) {
  var randomNumber = Math.ceil(Math.random() * (max - min) + min);
  return randomNumber;
}

var getRandomArrowElement = function (arr) {
  var randomElementIndex = Math.floor(Math.random() * arr.length);
  return arr[randomElementIndex];
};

var authorAvatars = 'img/avatars/user' + '0' + getRandomNumber(0, 8) + '.png'; //строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']; //Значения не должны повторяться.
var offerAddress = ''+ ', ' + '';  //строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
var offerPrices = getRandomNumber(999, 1000000); //число, случайная цена от 1000 до 1 000 000
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerRooms = getRandomNumber(0, 5);
var offerGuests = getRandomNumber(0, 15); //число, случайное количество гостей, которое можно разместить
var offerChecks = ['12:00', '13:00', '14:00'];
//var offerCheckOuts = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; //массив строк случайной длины из предложенных
var offerDescription = '';
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var locationPosition = {}; // "location": {
                           // "x": случайное число, координата x метки на карте от 300 до 900,
                          // "y": случайное число, координата y метки на карте от 130 до 630


//Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку.
/*
var getSimilarOffer = function (arrAvatars, arrTitles, arrTypes, arrRooms, arrGuests, arrCheckIns, arrChecks, arrFeatures, arrPhotos) {
  var randomName = getRandomArrowElement(arrNames) + ' ' + getRandomArrowElement(arrSurnames);
  var randomCoat = getRandomArrowElement(arrCoats);
  var randomEyes = getRandomArrowElement(arrEyes);
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

/*
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var getRandomArrowElement = function (arr) {
  var randomElementIndex = Math.floor(Math.random() * arr.length);
  return arr[randomElementIndex];
};

var getWizardsImage = function (arrNames, arrSurnames, arrCoats, arrEyes) {
  var randomName = getRandomArrowElement(arrNames) + ' ' + getRandomArrowElement(arrSurnames);
  var randomCoat = getRandomArrowElement(arrCoats);
  var randomEyes = getRandomArrowElement(arrEyes);
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
