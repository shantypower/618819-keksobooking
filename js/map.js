'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');

  var mapPinsContainer = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var currentPopup = null;

  var getPageEnabled = function () {
    map.classList.remove('map--faded');
    window.form.getFormEnabled();
  };

  var getPageDisabled = function () {
    map.classList.add('map--faded');
    window.form.getFormDisabled();
  };

  var isMapActive = function () {
    return !(map.classList.contains('map--faded'));
  };

  var calculatePinAddress = function () {
    var pinX = Math.round(parseInt(mapPinMain.style.left, 10) + window.constants.MAIN_PIN_WIDTH / 2);
    var pinY = Math.round(parseInt(mapPinMain.style.top, 10) + window.constants.MAIN_PIN_WIDTH / 2);
    if (isMapActive()) {
      pinY += Math.round(window.constants.MAIN_PIN_HEIGHT / 2 + window.constants.MAIN_PIN_TAIL_HEIGHT);
    }
    return pinX + ', ' + pinY;
  };

  var getPinAddressToForm = function () {
    window.form.addressInput.value = calculatePinAddress();
  };

  var createPinsArray = function (arrAdverts) {
    var pinsArray = [];
    for (var i = 0; i < arrAdverts.length; i++) {
      pinsArray.push(window.createMapPin(arrAdverts[i]));
    }
    return pinsArray;
  };

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
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeCurrentPopup();
    }
    document.removeEventListener('keydown', onKeyEscPress);
  };

  var onCloseAdvertClick = function (closePopup) {
    closePopup.querySelector('.popup__close').addEventListener('click', onCloseBtnClick);
  };

  var onMainPinClick = function () {
    if (!isMapActive()) {
      getPageEnabled();
      getPinAddressToForm();
      window.backend.load(successHandler, errorHandler);
    }
  };

  getPageDisabled();
  getPinAddressToForm();

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
        top: window.constants.TOP_LIMIT - window.constants.MAIN_PIN_HEIGHT - window.constants.MAIN_PIN_TAIL_HEIGHT,
        bottom: window.constants.BOTTOM_LIMIT - window.constants.MAIN_PIN_HEIGHT - window.constants.MAIN_PIN_TAIL_HEIGHT,
        left: mapPinParent.offsetLeft - window.constants.MAIN_PIN_WIDTH / 2,
        right: mapPinParent.offsetWidth - window.constants.MAIN_PIN_WIDTH / 2
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

      getPinAddressToForm();
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

  var successHandler = function (data) {
    var pinsNodesArray = createPinsArray(data);
    var pinsNodes = createPinsNodes(pinsNodesArray);
    addPinsToMap(pinsNodes);
    for (var i = 0; i < pinsNodesArray.length; i++) {
      pinsNodesArray[i].addEventListener('click', onPinClick(data[i]));
    }
  };

  var errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; margin-left: -200px; background-color: #fefefe; border-radius: 10px; box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);';
    node.style.position = 'fixed';
    node.style.top = '30px';
    node.style.left = '50%';
    node.style.width = '400px';
    node.style.minHeight = '150px';
    node.style.padding = '18px 25px 25px 25px';
    node.style.fontSize = '15px';
    node.style.color = 'red';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
    document.addEventListener('click', function () {
      node.remove();
    });
  };

  window.map = {
    calculatePinAddress: calculatePinAddress,
    getPinAddressToForm: getPinAddressToForm,
    getPageDisabled: getPageDisabled,
    onKeyEscPress: onKeyEscPress,
    mapPinMain: mapPinMain,
    mapPinsContainer: mapPinsContainer,
    currentPopup: currentPopup,
    closeCurrentPopup: closeCurrentPopup,
    errorHandler: errorHandler,
    successHandler: successHandler
  };
})();
