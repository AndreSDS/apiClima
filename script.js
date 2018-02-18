document.addEventListener("DOMContentLoaded", function(event) {

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    }else{
      alert("Geolocalizção não suportada neste navegador");
    }//verifica geolocalizaçã0

  function showPosition(position){
    var lon = "&lon="+position.coords.longitude;
    var lat = "?lat="+position.coords.latitude;

    var url = "https://fcc-weather-api.glitch.me/api/current"+lat+lon;

      fetch(url,{
        method: 'get',
        mode: 'cors'
      })
        .then(function(response){
          response.json()
          .then(function(data){
            console.log(data);

            document.getElementById('local').innerHTML = data.name;//setando nome do lugar
            document.getElementById('temp').innerHTML = data.main.temp+" &deg;c";//setando temperatura atual
            document.getElementById('temp-min').innerHTML = "Min - "+data.main.temp_min+" &deg;c";//setando temperatura mínima
            document.getElementById('temp-max').innerHTML = "Max - "+data.main.temp_max+" &deg;c";//setando temperatura máxima
            document.getElementById('fundo').style.backgroundImage = "url("+data.weather[0].icon+")";//setando ícone do clima

            switch (data.weather[0].main) {
              case "Clouds":
                document.getElementById('desc').innerHTML = "Nublado";
                document.getElementById('container').style.backgroundImage = "url("+"http://www.freephotosbank.com/photographers/photos1/15/med_ap104s4104.jpg"+")";
                break;
             case "Drizzle":
                document.getElementById('desc').innerHTML = "Garoando";
                document.getElementById('container').style.backgroundImage = "url("+"https://images.freeimages.com/images/large-previews/2a0/lake-view-the-rain-fades-1390648.jpg"+")";
               break;
            case "Rain":
                document.getElementById('desc').innerHTML = "Chuva fina";
                document.getElementById('container').style.backgroundImage = "url("+"https://images.freeimages.com/images/large-previews/1b3/raindrops-3-1197575.jpg"+")";
              break;
            case "Clear":
                document.getElementById('desc').innerHTML = "Céu limpo";
                document.getElementById('container').style.backgroundImage = "url("+"http://www.freephotosbank.com/photographers/photos1/34/med_ap104s4017.jpg"+")";
              break;
              default:
              console.log("Sem imagens");
            }//alterando imagem de fundo de acordo com o clima

            document.getElementById('changeF').addEventListener('click',function () {
              document.getElementById('temp').innerHTML = Math.floor(data.main.temp * 33.8) + "&deg;f";//transformando em farenheit
              document.getElementById('temp-min').innerHTML ="Min - " + Math.floor(data.main.temp_min * 33.8) + "&deg;f";//transformando em farenheit
              document.getElementById('temp-max').innerHTML ="Min - " + Math.floor(data.main.temp_max *33.8) + "&deg;f";//transformando em farenheit

              document.getElementById('changeF').style.display = 'none';
              document.getElementById('changeC').style.display = 'inline';
            });//botão para mudar para farenheit

            document.getElementById('changeC').addEventListener('click',function () {
              document.getElementById('temp').innerHTML = data.main.temp+" &deg;c";//setando temperatura atual
              document.getElementById('temp-min').innerHTML = "Min - "+data.main.temp_min+" &deg;c";//setando temperatura mínima
              document.getElementById('temp-max').innerHTML = "Max - "+data.main.temp_max+" &deg;c";//setando temperatura máxima

              document.getElementById('changeC').style.display = 'none';
              document.getElementById('changeF').style.display = 'inline';
            });//botão retorna para graus celcius
          });//fim do function data
        })//fim do response
        .catch(function(err) {
        console.log(err);
      });//fim da requisição fetch
  }//fim da função mostraPosicao
});
