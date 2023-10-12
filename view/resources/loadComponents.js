const includeComp = ({path, tag}) => {
  fetch(path)
    .then(res => res.text())
    .then(res => {
      try {
        document.querySelector(tag).innerHTML += res;
      } catch (err) {
        if(!/(sign)/.test(tag)){ // omitiendo errores de carga de carteles
          console.error(`No se encontro el elemento ${tag}`);
        }
      }
    })
}

fetch('/view/resources/components.json')
  .then(res => res.json())
  .then(components => {
    components.forEach(comp => includeComp(comp));
  })
