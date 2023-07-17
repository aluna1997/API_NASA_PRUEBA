const API_KEY_NASA = 'uy5i1ej5lGWPGMlvX9u9gl6jwJMDOZcBCe4TXKry';
const URL_APOD = 'https://api.nasa.gov/planetary/apod?api_key=' + API_KEY_NASA + '&date='

function obtenerFechaAleatoria() {
  const fechaInicio = new Date('2022-01-01').getTime();
  const fechaFin = new Date();
  const tiempoAleatorio = Math.random() * (fechaFin - fechaInicio) + fechaInicio;
  return new Date(tiempoAleatorio);
}

function llamaApiApod(){
  const fechaAleatoria = obtenerFechaAleatoria();
  const url = URL_APOD + fechaAleatoria.toISOString().slice(0, 10);

  fetch(url, {method: 'GET',headers: {'Content-Type': 'application/json'}})
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la petición');
    }
    return response.json();
  })
  .then(data => {
    // Aquí puedes trabajar con los datos obtenidos de la API
    document.getElementById('carousel1').src = data['url'];
    document.getElementById('carousel2').src = data['url'];
    document.getElementById('descripcion_apod_title').innerHTML = '<b>' + data['title'] + '</b>';
    document.getElementById('descripcion_apod_text').innerHTML = data['explanation'];
  })
  .catch(error => {
    // Manejo de errores
    console.error(error);
  });

}

function llamaApiEpic(id_card) {
  const url = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=' + API_KEY_NASA;

  fetch(url, {method: 'GET',headers: {'Content-Type': 'application/json'}})
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la petición');
    }
    return response.json();
  })
  .then(data => {
    // Aquí puedes trabajar con los datos obtenidos de la API
    let numeroAleatorio = Math.floor(Math.random() * data.length) - 1;
    
    let info = data[numeroAleatorio]['caption'] + ' latitud: ' + data[numeroAleatorio]['centroid_coordinates']['lat'] + ' longitud: ' + data[numeroAleatorio]['centroid_coordinates']['lon'];
    document.getElementById('cardp' + id_card).innerHTML = info;

    let nombreImagen = data[numeroAleatorio]['image'];
    let fechaImagen = data[numeroAleatorio]['date'];
    let fecha = fechaImagen.split(" ")[0];
    let componentesFecha = fecha.split("-");
    let nuevaFechaImagen = componentesFecha[0] + "/" + componentesFecha[1] + "/" + componentesFecha[2];

    let imgRes = 'https://api.nasa.gov/EPIC/archive/natural/' + nuevaFechaImagen + '/png/' + nombreImagen + '.png?api_key=' + API_KEY_NASA
    document.getElementById('card' + id_card).src = imgRes;

  })
  .catch(error => {
    // Manejo de errores
    console.error(error);
  });


}


