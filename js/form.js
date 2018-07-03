'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputTitle = adForm.querySelector('#title');
  var inputPrice = adForm.querySelector('#price');
  var selectHouseType = adForm.querySelector('#type');
  var selectCheckIn = adForm.querySelector('#timein');
  var selectCheckOut = adForm.querySelector('#timeout');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElement = adForm.querySelectorAll('.ad-form__element');
  var addressInput = adForm.querySelector('#address');
  var successPopup = document.querySelector('.success');

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

  var onSelectHouseTypeChange = function () {
    var minPrice = window.constants.MIN_PRICES[selectHouseType.value];
    inputPrice.setAttribute('min', minPrice);
    inputPrice.setAttribute('placeholder', minPrice);
  };

  var onInputChange = function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Необходимо ввести минимум 30 символов');
    } else if (inputTitle.validity.tooLong) {
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
  };

  function onSelectRoomsChange() {
    var selectedCapacity = Number(selectCapacity.value);
    var selectedRooms = Number(selectRooms.value);
    var errorMessage = '';
    switch (selectedRooms) {
      case (1): {
        if (selectedCapacity > 1 || selectedCapacity === 0) {
          errorMessage = 'При выборе "1 комната" можно выбрать количество мест: для 1 гостя';
        }
        break;
      }
      case (2): {
        if (selectedCapacity > 2 || selectedCapacity === 0) {
          errorMessage = 'При выборе "2 комнаты" можно выбрать количество мест: для 1 гостя; для 2 гостей';
        }
        break;
      }
      case (3): {
        if (selectedCapacity > 3 || selectedCapacity === 0) {
          errorMessage = 'При выборе "3 комнаты" можно выбрать количество мест: для 1 гостя; для 2 гостей; для 3 гостей';
        }
        break;
      }
      case (100): {
        if (selectedCapacity > 0) {
          errorMessage = 'При выборе "100 комнат" можно выбрать количество мест: не для гостей';
        }
        break;
      }
    }
    selectCapacity.setCustomValidity(errorMessage);
  }

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = pins.length - 1; i > 0; i--) {
      if (pins[i] !== window.map.mapPinMain) {
        window.map.mapPinsContainer.removeChild(pins[i]);
      }
    }
  };

  var onResetButtonClick = function () {
    //  event.preventDefault();
    removePins();
    if (window.map.currentPopup !== null) {
      window.map.closeCurrentPopup();
    }
    window.map.getPageDisabled();
    adForm.reset();
    window.map.mapPinMain.style.left = window.constants.MAIN_PIN_START_X + 'px';
    window.map.mapPinMain.style.top = window.constants.MAIN_PIN_START_Y + 'px';
    window.map.getPinAddressToForm();
  };

  var initiateValidation = function () {
    inputTitle.addEventListener('invalid', onInputChange);
    inputPrice.addEventListener('input', onInputChange);
    inputPrice.addEventListener('invalid', onInputChange);
    selectCapacity.addEventListener('change', onSelectRoomsChange);
    selectHouseType.addEventListener('change', onSelectHouseTypeChange);
    selectRooms.addEventListener('change', onSelectRoomsChange);
    selectCheckIn.addEventListener('change', function () {
      selectCheckOut.value = selectCheckIn.value;
    });
    selectCheckOut.addEventListener('change', function () {
      selectCheckIn.value = selectCheckOut.value;
    });
    resetButton.addEventListener('click', onResetButtonClick);
  };

  window.addEventListener('load', initiateValidation);

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), function () {
      successPopup.classList.remove('hidden');
      onResetButtonClick();
      window.map.closeCurrentPopup();
    }, window.map.errorHandler);
  };

  adForm.addEventListener('submit', onSubmitClick);
  document.addEventListener('click', function () {
    successPopup.classList.add('hidden');
  });

  window.form = {
    getFormEnabled: getFormEnabled,
    getFormDisabled: getFormDisabled,
    addressInput: addressInput
  };
})();
