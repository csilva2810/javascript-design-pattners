document.addEventListener('DOMContentLoaded', function () {

  var model = {
    cats: [],
    selectedCat: null,

    getCats: function () {
      return this.cats;
    },

    setSelectedCat: function (cat) {
      this.selectedCat = cat;
    },

    getSelectedCat: function () {
      return this.selectedCat;
    },

    init: function () {
      this.cats = [
        { name: 'Felino', image: 'images/cat-1.jpg', counter: 0 },
        { name: 'Alfredo', image: 'images/cat-2.jpg', counter: 0 },
        { name: 'Godofredo', image: 'images/cat-3.jpg', counter: 0 },
        { name: 'Harry & Potter', image: 'images/cat-4.jpg', counter: 0 },
        { name: 'Peludo', image: 'images/cat-5.jpg', counter: 0 }
      ];
    }
  }

  var octopus = {

    getCats: function () {
      return model.getCats();
    },

    selectCat: function (cat) {
      model.setSelectedCat(cat);
      catDetailView.render(cat);
    },

    init: function () {
      model.init();
      catListView.init();
      catDetailView.init();
    }

  }

  var catListView = {

    init: function () {
      var list = document.createElement('ul');
      list.classList.add('cat-list');
      this.list = list;
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
      var _self = this;
      var cats = octopus.getCats();
      cats.forEach(function (cat, index) {
        _self.list.appendChild(
          _self.renderCat(cat)
        );
      });
      document.body.appendChild(_self.list);
    }

  }

  var catDetailView = {

    init: function () {
      var details = document.createElement('div');
      details.classList.add('cat-details');
      details.classList.add('card');
      this.details = details;
      this.render();
    },

    render: function (cat) {

      if (!cat) {
        this.details.innerHTML = '<h1>Select a cat</h1>'
        return document.body.appendChild(this.details);
      }

      var name = document.createElement('h1');
      var image = document.createElement('img');
      var clicks = document.createElement('h3');

      name.textContent = cat.name;
      image.src = cat.image;
      clicks.textContent = cat.counter;

      image.addEventListener('click', function () {
        cat.counter++;
        clicks.textContent = cat.counter;
      });

      this.details.innerHTML = '';
      this.details.appendChild(name);
      this.details.appendChild(image);
      this.details.appendChild(clicks);

      document.body.appendChild(this.details);

    }

  }

  octopus.init();

});
