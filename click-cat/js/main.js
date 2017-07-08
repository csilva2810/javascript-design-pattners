document.addEventListener('DOMContentLoaded', function () {

  document.body.innerHTML = '';

  var cats = [
    { name: 'Felino', image: 'images/cat-1.jpg', counter: 0 },
    { name: 'Alfredo', image: 'images/cat-2.jpg', counter: 0 },
    { name: 'Godofredo', image: 'images/cat-3.jpg', counter: 0 },
    { name: 'Harry & Potter', image: 'images/cat-4.jpg', counter: 0 },
    { name: 'Peludo', image: 'images/cat-5.jpg', counter: 0 }
  ];

  var buildCatList = function (cats) {
    
    var list = document.createElement('ul');
    
    for (var i = 0, len = cats.length; i < len; i++) {
      list.appendChild(buildCatItem(cats[i]));
    }

    list.classList.add('cat-list');

    document.body.appendChild(list);

  }

  var buildCatItem = function (cat) {

    var item = document.createElement('li');
    item.textContent = cat.name;
    item.addEventListener('click', function () {
      console.log(cat);
      showDetails(cat);
    });

    return item;

  }

  var buildDetails = function () {
    var details = document.createElement('div');
    details.classList.add('cat-details');
    details.classList.add('hidden');
    details.classList.add('card');
    document.body.appendChild(details);
  }

  var showDetails = function (cat) {

    var details = document.querySelector('.cat-details');

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

    details.classList.add('hidden');

    setTimeout(function () {
      details.innerHTML = '';
      details.appendChild(name);
      details.appendChild(image);
      details.appendChild(clicks);
      details.classList.remove('hidden');
    }, 300);

  }

  buildCatList(cats);
  buildDetails();

});
