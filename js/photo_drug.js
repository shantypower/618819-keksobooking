'use strict';

(function () {
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var moveElement;

  var onDragOver = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var element = target.closest('.ad-form__photo');
    if (element) {
      if (photoContainer.lastElementChild === element) {
        photoContainer.appendChild(moveElement);
      } else {
        photoContainer.insertBefore(moveElement, element);
      }
    }
  };

  var onDragEnd = function (evt) {
    evt.preventDefault();
    photoContainer.removeEventListener('dragover', onDragOver);
    photoContainer.removeEventListener('dragend', onDragEnd);
  };

  var onDragStart = function (evt) {
    var target = evt.target;
    var element = target.closest('.ad-form__photo');
    if (element) {
      moveElement = element;
      evt.dataTransfer.setData('text/html', moveElement.textContent);
      photoContainer.addEventListener('dragover', onDragOver);
      photoContainer.addEventListener('dragend', onDragEnd);
    }
  };

  photoContainer.addEventListener('dragstart', onDragStart);

})();
