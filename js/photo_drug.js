'use strict';

(function () {
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var moveElement;

  var isPhotoMoved = function (element) {
    var rect = element.getBoundingClientRect();
    return (element.clientX - rect.left) / (rect.right - rect.left) > 0.5;
  };

  var onDragOver = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var element = target.closest('.ad-form__photo');
    if (element) {
      photoContainer.insertBefore(moveElement, (isPhotoMoved(element) && element.nextSibling) || element);
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
