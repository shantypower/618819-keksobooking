'use strict';

(function () {
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

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    getUniqueArrayElement: getUniqueArrayElement,
    getRandomArray: getRandomArray,
    getShuffledArray: getShuffledArray
  };
})();
