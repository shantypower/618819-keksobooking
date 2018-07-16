'use strict';

(function () {
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photo = document.querySelector('.ad-form__photo-container img');
  var photoDragged;

  if (photo) {
    photo.addEventListener('drag', function (evt) {
      evt.preventDefault();
      return false;
    });
  }

  photoContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.closest('img')) {
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setDragImage(evt.target, 35, 35);
      photoDragged = evt.target;
    }
  });

  photoContainer.addEventListener('dragend', function () {
    return false;
  });
  photoContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  document.addEventListener('drop', function (evt) {
    evt.preventDefault();
    photoDragged.parentNode.removeChild(photoDragged);
    evt.target.appendChild(photoDragged);
    if (evt.stopPropagation) {
      evt.stopPropagation();
    }
    return false;
  });

  photoContainer.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    return true;
  });

  photoContainer.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
  });
})();
