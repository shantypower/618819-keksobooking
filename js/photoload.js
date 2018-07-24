'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DRUG_DROP_EVENTS = ['dragenter', 'dragover', 'dragleave', 'drop'];

  var fileChooser = document.querySelector('.ad-form-header__input');
  var fileChooserApartment = document.querySelector('.ad-form__input');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoBoxTemplate = photoContainer.querySelector('.ad-form__photo--template');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');

  var showPhoto = function (inputFile, callback) {
    Array.from(inputFile.files).forEach(function (it) {
      var file = it;
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (element) {
        return fileName.endsWith(element);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          callback(reader.result);
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var setAvatarLink = function (link) {
    preview.src = link;
  };

  var renderPreview = function (link) {
    var previewElement = document.createElement('div');
    previewElement.classList.add('ad-form__photo');
    previewElement.innerHTML = '<img src="" width="60" height="55" alt="Фото помещения">';
    previewElement.querySelector('img').src = link;
    photoContainer.appendChild(previewElement);
  };


  DRUG_DROP_EVENTS.forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, function (evt) {
      preventDefaults(evt);
    }, false);
  });

  DRUG_DROP_EVENTS.forEach(function (eventName) {
    photoDropZone.addEventListener(eventName, function (evt) {
      preventDefaults(evt);
    }, false);
  });

  var preventDefaults = function (event) {
    event.preventDefault();
    event.stopPropagation();
  };

  avatarDropZone.addEventListener('drop', function (event) {
    showPhoto(event.dataTransfer, setAvatarLink);
  });

  fileChooser.addEventListener('change', function () {
    resetAvatar();
    showPhoto(fileChooser, setAvatarLink);
  });

  photoDropZone.addEventListener('drop', function (event) {
    fileChooserApartment.files = event.dataTransfer.files;
  });

  fileChooserApartment.addEventListener('change', function () {
    resetPhotos();
    showPhoto(fileChooserApartment, renderPreview);
    photoBoxTemplate.style.display = 'none';
  });

  var resetPhotos = function () {
    while (photoContainer.lastChild.tagName === 'DIV') {
      photoContainer.removeChild(photoContainer.lastChild);
    }
    photoBoxTemplate.style.display = 'block';
  };

  var resetAvatar = function () {
    var defaultSrc = 'img/muffin-grey.svg';
    preview.src = defaultSrc;
  };

  window.photoload = {
    resetAvatar: resetAvatar,
    resetPhotos: resetPhotos
  };

})();
