Document.prototype.myCreateElement = function (elem, attrs) {

  var newElement = document.createElement(elem);
  
  if (attrs) {
    for (var attr in attrs) {
      newElement.setAttribute(attr, attrs[attr]);
    }
  }

  return newElement;

}

document.addEventListener('DOMContentLoaded', function () {

  var app = document.querySelector('#app');

  var model = {
    cats: [],
    selectedCat: null,

    init: function () {
      this.cats = [
        { 
          name: 'Felino', 
          image: 'https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg',
          counter: 0 
        },
        { 
          name: 'Alfredo', 
          image: 'https://s-media-cache-ak0.pinimg.com/736x/e8/90/0a/e8900a07923cafc72c252e982163af0f.jpg',
          counter: 0 
        },
        { 
          name: 'Godofredo', 
          image: 'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg',
          counter: 0 
        },
        { 
          name: 'Harry & Potter', 
          image: 'https://www.petfinder.com/wp-content/uploads/2012/11/125950112-adopt-second-cat-632x475.jpg',
          counter: 0 
        },
        { 
          name: 'Peludo', 
          image: 'http://www.hillspet.com/HillsPetUS/v1/portal/en/us/cat-care/images/HP_PCC_md_0130_cat53.jpg',
          counter: 0 
        }
      ];
    }
  }

  var octopus = {

    showEditForm: false,

    getCats: function () {
      return model.cats;
    },

    selectCat: function (cat) {
      model.selectedCat = cat;
      catDetailView.render(cat);
    },

    getSelectedCat: function () {
      return model.selectedCat;
    },

    updateCat: function (cat) {
      var index = this.getCats().findIndex(function (c) {
        return c.name === model.selectedCat.name; 
      });
      console.log(cat);
      model.cats[index] = cat;
      this.toggleEditForm();
      catListView.render();
      catDetailView.render();
      editFormView.render();
    },

    increment: function () {
      model.selectedCat.counter++;
    },

    toggleEditForm: function () {
      this.showEditForm = !this.showEditForm;
      editFormView.render();
    },

    init: function () {
      model.init();
      catListView.init();
      catDetailView.init();
      editFormView.init();
    }

  }

  var catListView = {

    init: function () {
      this.view = document.myCreateElement('ul', {
        class: 'cat-list'
      });
      this.render();
    },

    renderCat: function (cat) {
      var item = document.createElement('li');
      
      item.textContent = cat.name;
      item.addEventListener('click', function () {
        octopus.selectCat(cat);
      });

      return item;
    },

    render: function () {
      var cats = octopus.getCats();
      
      this.view.innerHTML = '';
      cats.forEach(function (cat) {
        this.view.appendChild(this.renderCat(cat));
      }.bind(this));

      document.body.appendChild(this.view);
    }

  }

  var catDetailView = {

    init: function () {
      this.view = document.myCreateElement('div', {
        class: 'cat-details card'
      });
      this.render();
    },

    render: function (cat) {
      
      if (!cat) {
        this.view.innerHTML = '<h1>Select a cat</h1>'
        return document.body.appendChild(this.view);
      }

      var name = document.createElement('h1');
      var image = document.createElement('img');
      var clicks = document.createElement('h3');
      var editButton = document.myCreateElement('button', {
        class: 'button'
      });

      name.textContent = cat.name;
      image.src = cat.image;
      clicks.textContent = cat.counter;
      editButton.textContent = 'edit';

      image.addEventListener('click', function () {
        octopus.increment();
        clicks.textContent = cat.counter;
      });
      editButton.addEventListener('click', function () {
        octopus.toggleEditForm();
      });

      this.view.innerHTML = '';
      this.view.appendChild(name);
      this.view.appendChild(image);
      this.view.appendChild(clicks);
      this.view.appendChild(editButton);

      document.body.appendChild(this.view);

    }

  }

  var editFormView = {

    init: function () {
      this.view = document.myCreateElement('form', {
        class: 'edit-form'
      });

      this.view.addEventListener('submit', function (e) {
        
        e.preventDefault();
        var cat = {};
        
        this.view.querySelectorAll('input').forEach(function (input) {
          cat[input.name] = input.value;
        });
        
        octopus.updateCat(cat);
        
      }.bind(this));

      this.render();
    },

    render: function () {

      var cat = octopus.getSelectedCat();
      if (!cat) {
        return;
      }
      
      var nameInput = document.myCreateElement('input', {
        name: 'name',
        class: 'form-control',
        placeholder: 'Cat Name',
        value: cat.name
      });
      var imageInput = document.myCreateElement('input', {
        name: 'image',
        class: 'form-control',
        placeholder: 'Cat Image',
        value: cat.image
      });
      var countInput = document.myCreateElement('input', {
        name: 'counter',
        class: 'form-control',
        placeholder: 'Click Counter',
        value: cat.counter
      });
      var cancelButton = document.myCreateElement('button', {
        type: 'button',
        class: 'button'
      });
      var submitButton = document.myCreateElement('button', {
        type: 'submit',
        class: 'button'
      });
      cancelButton.textContent = 'Cancel';
      submitButton.textContent = 'Save';

      cancelButton.addEventListener('click', function () {
        octopus.toggleEditForm();
      });

      this.view.innerHTML = '';
      this.view.appendChild(nameInput);
      this.view.appendChild(imageInput);
      this.view.appendChild(countInput);
      this.view.appendChild(cancelButton);
      this.view.appendChild(submitButton);

      if (!octopus.showEditForm) {
        this.view.classList.add('hidden');
      } else {
        this.view.classList.remove('hidden');
      }

      catDetailView.view.appendChild(this.view);

    }

  }

  octopus.init();

});
