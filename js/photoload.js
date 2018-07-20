'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form-header__input');
  var fileChooserApartment = document.querySelector('.ad-form__input');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoBoxTemplate = photoContainer.querySelector('.ad-form__photo--template');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');

  function showPhoto(inputFile, callback) {
    var file = inputFile.files[0];
    console.log(file);
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
  }

  function setAvatarLink(link) {
    preview.src = link;
  }

  var renderPreview = function (link) {
    var previewElement = document.createElement('div');
    previewElement.classList.add('ad-form__photo');
    previewElement.innerHTML = '<img src="" width="60" height="55" alt="Фото помещения">';
    previewElement.querySelector('img').src = link;
    photoContainer.appendChild(previewElement);
  };


  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    photoDropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  avatarDropZone.addEventListener('drop', function (event) {
    showPhoto(event.dataTransfer, setAvatarLink);
  });
  fileChooser.addEventListener('change', function () {
    showPhoto(fileChooser, setAvatarLink);
  });

  photoDropZone.addEventListener('drop', function (event) {
    showPhoto(event.dataTransfer, renderPreview);
  });
  fileChooserApartment.addEventListener('change', function () {
    showPhoto(fileChooserApartment, renderPreview);
  });


  window.resetPhotos = function () {
    while (photoContainer.lastChild.tagName === 'DIV') {
      photoContainer.removeChild(photoContainer.lastChild);
    }
    photoBoxTemplate.style.display = 'block';
  };

})();
