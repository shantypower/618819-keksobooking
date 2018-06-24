'use strict';

var getSimilarAdvert = function () {
  var similarAdvert = {};

  var author = {};
  similarAdvert.author = author;
  author.avatar = 'img/avatars/user' + window.getRandomFunctions.getUniqueArrayElement(window.constants.AVATARS) + '.png';

  var location = {};
  similarAdvert.location = location;
  location.x =  window.getRandomFunctions.getRandomNumber(300, 900);
  location.y =  window.getRandomFunctions.getRandomNumber(130, 630);

  var offer = {};
  similarAdvert.offer = offer;
  offer.title = window.getRandomFunctions.getUniqueArrayElement( window.constants.OFFER_TITLES);
  offer.address = location.x + ', ' + location.y;
  offer.price =  window.getRandomFunctions.getRandomNumber(1000, 1000000);
  offer.type =  window.getRandomFunctions.getRandomArrayElement( window.constants.OFFER_TYPES);
  offer.rooms =  window.getRandomFunctions.getRandomNumber(1, 5);
  offer.guests =  window.getRandomFunctions.getRandomNumber(1, 10);
  offer.checkin =  window.getRandomFunctions.getRandomArrayElement( window.constants.OFFER_CHECKS);
  offer.checkout =  window.getRandomFunctions.getRandomArrayElement( window.constants.OFFER_CHECKS);
  offer.features = window.getRandomFunctions.getRandomArray( window.constants.OFFER_FEATURES);
  offer.description = '';
  offer.photos = window.getRandomFunctions.getShuffledArray( window.constants.OFFER_PHOTOS);

  return similarAdvert;
};

var similarAdverts = [];
for (var j = 0; j <=  window.constants.NUMBER_OF_ADVERTS - 1; j++) {
  similarAdverts[j] = getSimilarAdvert();
}

var mapPinTemplate = document.querySelector('#map__card').content.querySelector('.map__pin');

var createMapPin = function (arrAdverts) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var pinIcon = mapPin.children[0];
  mapPin.style = 'left: ' + (arrAdverts.location.x +  window.constants.PIN_WIDTH / 2) + 'px; top: ' + (arrAdverts.location.y +  window.constants.PIN_HEIGHT) + 'px';
  pinIcon.src = arrAdverts.author.avatar;
  pinIcon.alt = arrAdverts.offer.title;
  return mapPin;
};

var mapCardTemplate = document.querySelector('#map__card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
/*
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
};*/

var mapPinsContainer = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var currentPopup = null;

var getPageEnabled = function () {
  map.classList.remove('map--faded');
  window.form.getFormEnabled();
};

var isMapActive = function () {
  return !(map.classList.contains('map--faded'));
};

var calculatePinAddress = function () {
  var pinX = Math.round(parseInt(mapPinMain.style.left, 10) +  window.constants.MAIN_PIN_WIDTH / 2);
  var pinY = Math.round(parseInt(mapPinMain.style.top, 10) +  window.constants.MAIN_PIN_WIDTH / 2);
  if (isMapActive()) {
    pinY += Math.round( window.constants.MAIN_PIN_HEIGHT / 2 +  window.constants.MAIN_PIN_TAIL_HEIGHT);
  }
  return pinX + ', ' + pinY;
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
    currentPopup = window.createSimilarAdvert(advert);
    onCloseAdvertClick(currentPopup);
    addAdvertToMap(currentPopup);
  };
};

var onCloseBtnClick = function () {
  closeCurrentPopup();
};

var onKeyEscPress = function (evt) {
  if (evt.keyCode ===  window.constants.ESC_KEYCODE) {
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
    window.form.getPinAddressToForm();
    addPinsToMap(createPinsNodes(pinsNodesArray));
    onPinClicks();
  }
};

window.form.getPageDisabled();
window.form.getPinAddressToForm();


mapPinMain.addEventListener('mousedown', function (downEvt) {
  downEvt.preventDefault();

  var startCoords = {
    x: downEvt.clientX,
    y: downEvt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    var mapPinParent = mapPinMain.offsetParent;
    var limits = {
      top:  window.constants.TOP_LIMIT -  window.constants.MAIN_PIN_HEIGHT -  window.constants.MAIN_PIN_TAIL_HEIGHT,
      bottom:  window.constants.BOTTOM_LIMIT -  window.constants.MAIN_PIN_HEIGHT -  window.constants.MAIN_PIN_TAIL_HEIGHT,
      left: mapPinParent.offsetLeft -  window.constants.MAIN_PIN_WIDTH / 2,
      right: mapPinParent.offsetWidth -  window.constants.MAIN_PIN_WIDTH / 2
    };

    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };


    var calculateNewCoords = function () {
      var newCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };
      if (mapPinMain.offsetLeft - shift.x > limits.right) {
        newCoords.x = limits.right;
      }
      if (mapPinMain.offsetLeft - shift.x < limits.left) {
        newCoords.x = limits.left;
      }
      if (mapPinMain.offsetTop - shift.y > limits.bottom) {
        newCoords.y = limits.bottom;
      }
      if (mapPinMain.offsetTop - shift.y < limits.top) {
        newCoords.y = limits.top;
      }
      return newCoords;
    };

    mapPinMain.style.left = calculateNewCoords().x + 'px';
    mapPinMain.style.top = calculateNewCoords().y + 'px';

    window.form.getPinAddressToForm();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    onMainPinClick();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        mapPinMain.removeEventListener('click', onClickPreventDefault);
      };
      mapPinMain.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
