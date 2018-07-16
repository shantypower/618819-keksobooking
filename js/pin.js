'use strict';

(function () {
  var createMapPin = function (arrAdverts) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var mapPinTemplate = document.querySelector('#map__card').content.querySelector('.map__pin');
    var mapPin = mapPinTemplate.cloneNode(true);
    var pinIcon = mapPin.children[0];
    mapPin.style = 'left: ' + (arrAdverts.location.x - PIN_WIDTH / 2) + 'px; top: ' + (arrAdverts.location.y + PIN_HEIGHT) + 'px';
    pinIcon.src = arrAdverts.author.avatar;
    pinIcon.alt = arrAdverts.offer.title;
    return mapPin;
  };

  var removePins = function () {
    var mapPins = document.querySelector('.map__pins');
    var allPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      mapPins.removeChild(item);
    });
  };

  var getPinDeactivated = function () {
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    createMapPin: createMapPin,
    removePins: removePins,
    getPinDeactivated: getPinDeactivated
  };
})();
