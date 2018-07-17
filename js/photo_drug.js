'use strict';

(function () {
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photo = document.querySelector('.ad-form__photo');
  var photoDragged;

  function isPhotoMoved(element) {
    var rect = element.getBoundingClientRect();
    return (element.clientX - rect.left) / (rect.right - rect.left) > 0.5;
  }

  var moveElement;

  function onDragOver(evt) {
    evt.preventDefault();
    var target = evt.target;
    var element = target.closest(".ad-form__photo");
    if (element) {
      photoContainer.insertBefore(moveElement, (isPhotoMoved(element) && element.nextSibling) || element );
    }
  }

  function onDragEnd(evt) {
    evt.preventDefault();
    photoContainer.removeEventListener("dragover", onDragOver);
    photoContainer.removeEventListener("dragend", onDragEnd);
  }

  function onDragStart(evt) {
    var target = evt.target;
    var element = target.closest(".ad-form__photo");
    if (element) {
      moveElement = element;
      evt.dataTransfer.setData("text/html", moveElement.textContent);
      photoContainer.addEventListener("dragover", onDragOver);
      photoContainer.addEventListener("dragend", onDragEnd);
    }
  }

  photoContainer.addEventListener("dragstart", onDragStart);

})();
