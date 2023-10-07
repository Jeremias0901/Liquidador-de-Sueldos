const includeComp = ({path, tag}) => {
  fetch(path)
    .then(res => res.text())
    .then(res => document.querySelector(tag).innerHTML += res);
}

fetch('/view/resources/components.json')
  .then(res => res.json())
  .then(components => {
    components.forEach(comp => includeComp(comp));
  })
