'use strict';

(function(){
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var URL = 'https://js.dump.academy/keksobooking';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  var load = function (onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.constants.LOAD_TIME;
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {

    xhr.responseType = 'json';
    xhr.timeout = window.constants.LOAD_TIME;

    xhr.addEventListener('load', function (evt) {
      try {
        if (evt.target.status === window.constants.SUCCESS_STATUS) {
          onLoad();
        } else {
          onError('Статус загрузки ' + evt.target.status);
        }
      } catch (err) {
        onError('Ошибка - ' + err.name + ' : ' + err.message);
      }
    });

    xhr.addEventListener('timeout', function (evt) {
      onError('Загрузка не успела произойти за ' + evt.target.timeout + 'ms');
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка загрузки данных');
    });

    xhr.open('POST', URL);

    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
