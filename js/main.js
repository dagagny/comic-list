$(document).ready(function() {
  var html;
  var comicsLocalStorage = localStorage.getItem('comics');
  //já tem o objeto no localstorage e monta o html a partir dele
  if (comicsLocalStorage != null) {
    if (comicsLocalStorage.length > 0) {
      var comics = JSON.parse(comicsLocalStorage);
      $.each(comics, function() {
        html += '<li id= "' + this.id + '" class="' + this.status + '"><figure><a href="javascript:;" class="clickable"><img src="' + this.cover + '" alt="' + this.name + ' - ' + this.edicao + '"></a><figcaption class="cap"><span>' + this.comics + ': ' + this.name + ' - ' + this.edicao + '<br> Valor: ' + this.valor + '</span> <div><p>Comprou a HQ ?</p><button href="javascript:;" class="fechar btn btn-2 btn-2j">Não</button> <button href="javascript:;" class="comprei btn btn-2 btn-2j">Sim</button></div></figcaption></figure></li>';
      });
      $('.catalogue').append(html);
      handlers();
    }
    //primeira vez pega do arquivo .json
  } else {
    var jsonURL = 'comics.json';
    $.getJSON(jsonURL, function(json) {
      var html = '';
      //armazena json no local storage
      localStorage.setItem('comics', JSON.stringify(json.comics));

      $.each(json.comics, function() {
        html += '<li id= "' + this.id + '" class="' + this.status + '"><figure><a href="javascript:;" class="clickable"><img src="' + this.cover + '" alt="' + this.name + ' - ' + this.edicao + '"></a><figcaption class="cap"><span>' + this.comics + ': ' + this.name + ' - ' + this.edicao + '<br> Valor: ' + this.valor + '</span> <div><p>Comprou a HQ ?</p><button href="javascript:;" class="fechar btn btn-2 btn-2j">Não</button> <button href="javascript:;" class="comprei btn btn-2 btn-2j">Sim</button></div></figcaption></figure></li>';
      });
      $('.catalogue').append(html);
      handlers();
    });
  }
});

handlers = () => {
  $('.clickable').click(function(e) {
    e.preventDefault();
    var $this = $(this).closest('li');

    if ($this.hasClass('hqq')) {
      $this.removeClass('hqq');
    } else {
      $('li.hqq').removeClass('hqq');
      $this.addClass('hqq');
    }
  });

  $('.comprei').click(function(e) {
    e.preventDefault();
    comprado($(this).closest('li'));
  });

  $('.fechar').click(function(e) {
    e.preventDefault();
    var $this = $(this).closest('li');
    $this.removeClass('hqq');
  });
};

comprado = hq => {
  hq.addClass('deactived');
  let id = hq.attr('id');

  //atualiza local storage
  let comics = JSON.parse(localStorage.getItem('comics'));
  findObjectByKey(comics, 'id', id).status = 'deactived';
  localStorage.setItem('comics', JSON.stringify(comics));
};

function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
};
