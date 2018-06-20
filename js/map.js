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
];
var OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking', 'washer',
  'elevator',
  'conditioner'
];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
for (var j = 0; j <= NUMBER_OF_ADVERTS - 1; j++) {
  similarAdverts[j] = getSimilarAdvert();
}

var mapPinTemplate = document.querySelector('#map__card').content.querySelector('.map__pin');

var createMapPin = function (arrAdverts) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var pinIcon = mapPin.children[0];
  mapPin.style = 'left: ' + (arrAdverts.location.x + PIN_WIDTH / 2) + 'px; top: ' + (arrAdverts.location.y + PIN_HEIGHT) + 'px';
  pinIcon.src = arrAdverts.author.avatar;
  pinIcon.alt = arrAdverts.offer.title;
  return mapPin;
};

var mapCardTemplate = document.querySelector('#map__card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

var createSimilarAdvert = function (advert) {
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

  document.addEventListener('keydown', onKeyEscPress);

  return mapCard;
};
// module4-task1
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_TAIL_HEIGHT = 22;
var ESC_KEYCODE = 27;
var mapPinsContainer = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = adForm.querySelector('.ad-form-header');
var adFormElement = adForm.querySelectorAll('.ad-form__element');
var addressInput = adForm.querySelector('#address');

var currentPopup = null;

var getFormDisabled = function () {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.disabled = true;
  for (var i = 0; i < adFormElement.length; i++) {
    adFormElement[i].disabled = true;
  }
};

var getFormEnabled = function () {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  for (var t = 0; t < adFormElement.length; t++) {
    adFormElement[t].removeAttribute('disabled');
  }
};

var getPageEnabled = function () {
  map.classList.remove('map--faded');
  getFormEnabled();
};

var getPageDisabled = function () {
  map.classList.add('map--faded');
  getFormDisabled();
};

var isMapActive = function () {
  return !(map.classList.contains('map--faded'));
};

var calculatePinAddress = function () {
  var pinX = Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2);
  var pinY = Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_WIDTH / 2);
  if (isMapActive()) {
    pinY += Math.round(MAIN_PIN_HEIGHT / 2 + MAIN_PIN_TAIL_HEIGHT);
  }
  return pinX + ', ' + pinY;
};

var getPinAddressToForm = function () {
  addressInput.value = calculatePinAddress();
};

var createPinsArray = function (arrAdverts) {
  var pinsArray = [];
  for (var i = 0; i < similarAdverts.length; i++) {
    pinsArray.push(createMapPin(arrAdverts[i]));
  }
  return pinsArray;
};

var pinsNodesArray = createPinsArray(similarAdverts);

var createPinsNodes = function (arrPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrPins.length; i++) {
    fragment.appendChild(arrPins[i]);
  }
  return fragment;
};

var addPinsToMap = function (fragment) {
  mapPinsContainer.appendChild(fragment);
};

var addAdvertToMap = function (currentAdvert) {
  var fragment = document.createDocumentFragment();
  fragment.innerHtml = '';
  fragment.appendChild(currentAdvert);
  map.insertBefore(fragment, mapFilters);
};

var closeCurrentPopup = function () {
  currentPopup.remove();
  currentPopup = null;

  document.removeEventListener('click', onCloseBtnClick);
};

var onPinClick = function (advert) {
  return function () {
    if (currentPopup !== null) {
      closeCurrentPopup();
    }
    currentPopup = createSimilarAdvert(advert);
    onCloseAdvertClick(currentPopup);
    addAdvertToMap(currentPopup);
  };
};

var onCloseBtnClick = function () {
  closeCurrentPopup();
};

var onKeyEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCurrentPopup();
  }
  document.removeEventListener('keydown', onKeyEscPress);
};

var onCloseAdvertClick = function (closePopup) {
  closePopup.querySelector('.popup__close').addEventListener('click', onCloseBtnClick);
};

var onPinClicks = function () {
  for (var i = 0; i < pinsNodesArray.length; i++) {
    pinsNodesArray[i].addEventListener('click', onPinClick(similarAdverts[i]));
  }
};

var onMainPinClick = function () {
  if (!isMapActive()) {
    getPageEnabled();
    getPinAddressToForm();
    addPinsToMap(createPinsNodes(pinsNodesArray));
    onPinClicks();
  }
};

getPageDisabled();
getPinAddressToForm();
mapPinMain.addEventListener('mouseup', onMainPinClick);

//
var inputTitle = adForm.querySelector('#title');
var inputPrice = adForm.querySelector('#price');
var selectHouseType = adForm.querySelector('#type');
var selektCheckIn = adForm.querySelector('#timein');
var selektCheckOut = adForm.querySelector('#timeout');
var selectRooms = adForm.querySelector('#room_number');
var selectCapacity = adForm.querySelector('#capacity');
var resetButton = adForm.querySelector('.ad-form__reset');

var MIN_PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 100000
};

var onSelectHouseTypeChange = function() {
  var minPrice = MIN_PRICES[selectHouseType.value];
  inputPrice.setAttribute('min', minPrice);
  inputPrice.setAttribute('placeholder', minPrice);
};

var onInputChange = function () {
  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Необходимо ввести минимум 30 символов');
  }
  else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Максимально можно ввести 100 символов');
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Обязательное поле');
  } else {
    inputTitle.setCustomValidity('');
  }

  if (inputPrice.validity.rangeOverflow) {
    inputPrice.setCustomValidity('Значение цены не должно превышать 1000000');
  } else if (inputPrice.validity.valueMissing) {
    inputPrice.setCustomValidity('Обязательное поле');
  } else {
    inputPrice.setCustomValidity('');
  }
}

function onSelectRoomsChange() {
  var selectedCapacity = Number(selectCapacity.value);
  var selectedRooms = Number(selectRooms.value);
  var errorMessage = '';
  switch (selectedRooms) {
    case (1): {
      if (selectedCapacity > 1) {
        errorMessage = 'При выборе "1 комната" можно выбрать количество мест: для 1 гостя';
      }
      break;
    }
    case (2): {
      if (selectedCapacity > 2) {
        errorMessage = 'При выборе "2 комнаты" можно выбрать количество мест: для 1 гостя; для 2 гостей';
      }
      break;
    }
    case (3): {
      if (selectedCapacity > 3) {
        errorMessage = 'При выборе "3 комнаты" можно выбрать количество мест: для 1 гостя; для 2 гостей; для 3 гостей';
      }
      break;
    }
    case (100): {
      if (selectedCapacity !== 100) {
        errorMessage = 'При выборе "100 комнат" можно выбрать количество мест: не для гостей';
      }
      break;
    }
  }
  selectCapacity.setCustomValidity(errorMessage);
}

var onResetButtonClick = function (event) {
  event.preventDefault();
  adForm.reset();
}

var initiateValidation = function () {
  inputTitle.addEventListener('input', onInputChange);
  inputPrice.addEventListener('input', onInputChange);
  selectCapacity.addEventListener('change', onSelectRoomsChange);
  selectHouseType.addEventListener('change', onSelectHouseTypeChange);
  selectRooms.addEventListener('change', onSelectRoomsChange);
  selektCheckIn.addEventListener('change', function () {
  selektCheckOut.value = selektCheckIn.value;
  });
  selektCheckOut.addEventListener('change', function () {
    selektCheckIn.value = selektCheckOut.value;
  });
  resetButton.addEventListener('click', onResetButtonClick);
};

window.addEventListener('load', initiateValidation);
