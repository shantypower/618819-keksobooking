'use strict';

(function () {
  window.constants = {
    NUMBER_OF_ADVERTS: 8,
    LOAD_TIME: 100000,
    SUCCESS_STATUS: 200,
    AVATARS: ['01', '02', '03', '04', '05', '06', '07', '08'],
    OFFER_TITLES: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    OFFER_TYPES: [
      'palace',
      'flat',
      'house',
      'bungalo'
    ],
    OFFER_CHECKS: ['12:00', '13:00', '14:00'],
    OFFER_FEATURES: [
      'wifi',
      'dishwasher',
      'parking', 'washer',
      'elevator',
      'conditioner'
    ],
    OFFER_PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 65,
    MAIN_PIN_TAIL_HEIGHT: 22,
    MAIN_PIN_START_X: 570,
    MAIN_PIN_START_Y: 375,
    ESC_KEYCODE: 27,
    TOP_LIMIT: 130,
    BOTTOM_LIMIT: 630,
    MIN_PRICES: {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 100000
    }
  };
})();
