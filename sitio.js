// Botón "Copiar" en los prompts y checklists marcables (se recuerdan en este navegador).
document.querySelectorAll('.admonition.prompt').forEach(function (bloque) {
  var boton = document.createElement('button');
  boton.className = 'copiar';
  boton.type = 'button';
  boton.textContent = 'Copiar';
  boton.addEventListener('click', function () {
    var partes = [];
    bloque.querySelectorAll(':scope > p:not(.admonition-title), :scope > ol, :scope > ul').forEach(function (el) {
      if (el.tagName === 'P') { partes.push(el.innerText); }
      else { el.querySelectorAll('li').forEach(function (li, i) { partes.push((el.tagName === 'OL' ? (i + 1) + '. ' : '- ') + li.innerText); }); }
    });
    navigator.clipboard.writeText(partes.join('\n\n')).then(function () {
      boton.textContent = 'Copiado';
      setTimeout(function () { boton.textContent = 'Copiar'; }, 1800);
    });
  });
  bloque.appendChild(boton);
});

document.querySelectorAll('.admonition.checklist').forEach(function (lista, n) {
  var clave = 'tfsst:' + location.pathname + ':' + n;
  var guardado = [];
  try { guardado = JSON.parse(localStorage.getItem(clave) || '[]'); } catch (e) {}
  lista.querySelectorAll('li').forEach(function (li, i) {
    if (guardado.indexOf(i) > -1) li.classList.add('hecho');
    li.addEventListener('click', function () {
      li.classList.toggle('hecho');
      var marcados = [];
      lista.querySelectorAll('li').forEach(function (x, j) { if (x.classList.contains('hecho')) marcados.push(j); });
      try { localStorage.setItem(clave, JSON.stringify(marcados)); } catch (e) {}
    });
  });
});

// Tablas anchas: envolver para desplazamiento horizontal en pantallas chicas.
document.querySelectorAll('.prosa table').forEach(function (t) {
  var w = document.createElement('div');
  w.className = 'tabla-scroll';
  t.parentNode.insertBefore(w, t);
  w.appendChild(t);
});
