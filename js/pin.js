'use strict';

(function () {
  window.createMapPin = function (arrAdverts) {
  var mapPinTemplate = document.querySelector('#map__card').content.querySelector('.map__pin');
  var mapPin = mapPinTemplate.cloneNode(true);
  var pinIcon = mapPin.children[0];
  mapPin.style = 'left: ' + (arrAdverts.location.x +  window.constants.PIN_WIDTH / 2) + 'px; top: ' + (arrAdverts.location.y +  window.constants.PIN_HEIGHT) + 'px';
  pinIcon.src = arrAdverts.author.avatar;
  pinIcon.alt = arrAdverts.offer.title;
  return mapPin;
};
})();
