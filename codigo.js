const pantalla = document.getElementById("pantalla");
function add(valor) {
  if (pantalla.value == "0") {
    pantalla.value = valor;
  } else {
    pantalla.value += valor;
  }
}
