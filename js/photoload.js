'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__input');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoBoxTemplate = photoContainer.querySelector('.ad-form__photo--template');

  var onPhotoChooserLoad = function () {
    var loadedFiles = fileChooser.files;
    loadedFiles = Array.prototype.slice.call(loadedFiles, 0);

    loadedFiles.forEach(function (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          if (photoBoxTemplate) {
            photoBoxTemplate.style.display = 'none';
          }
          photoContainer.appendChild(renderPreview(evt.target.result));
        });
        reader.readAsDataURL(file);
      }
    });
  };

  fileChooser.addEventListener('change', onPhotoChooserLoad);

  var renderPreview = function (link) {
    var previewElement = document.createElement('div');
    previewElement.classList.add('ad-form__photo');
    previewElement.draggable = true;
    previewElement.innerHTML = '<img src="" width="60" height="55" alt="Фото помещения">';
    previewElement.querySelector('img').src = link;
    return previewElement;
  };

  window.resetPhotos = function () {
    while (photoContainer.lastChild.tagName === 'DIV') {
      photoContainer.removeChild(photoContainer.lastChild);
    }
    photoBoxTemplate.style.display = 'block';
  };

})();
