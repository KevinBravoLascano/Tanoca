# Tasques del projecte

## Fase 1. Estructura bàsica

- [x] Crear `index.html` amb l'estructura HTML
- [x] Crear `styles.css` amb els estils bàsics
- [x] Crear `app.js` amb la lògica principal
- [x] Afegir el selector de fitxer CSV a l'HTML

## Fase 2. Lectura de dades

- [x] Llegir el fitxer CSV amb `FileReader`
- [x] Convertir el CSV en una llista d'objectes JavaScript
- [x] Validar que el CSV té les columnes esperades (`userId`,`movieId`,`title`,`genres`,`rating`,`timestamp`)

## Fase 3. Visualització tabular

- [x] Mostri les dades en una taula paginada (5 files per defecte), ordenable per `rating`.
- [x] Afegir les capçaleres de columna
- [x] Mostrar un missatge si no hi ha dades

## Fase 4. Resum estadístic

- [x] Calcular el total de nombre de pel·lícules úniques de la columna `title`
- [x] Calcular la quantitat de usuaris unics de la columna `userId`
- [x] Calcular el nombre total de valoracions de la columna `rating`
- [x] Calcular la mitjana de `rating`
- [x] Mostrar la pel·licula amb mes quantitat de valoracions miran columnes `movieId`
- [x] Mostrar els resultats en una secció de resum

## Fase 5. Gràfic

- [x] Agrupar les dades per cada un dels `genres` i `rating`
- [ ] Calcular la mitjana `rating` per a cada combinació
- [ ] Generar un gràfic de barres amb Chart.js
- [ ] Afegir un títol i etiquetes al gràfic

## Fase 6. Millores finals

- [ ] Afegir estils visuals (colors, espaiat, tipografia)
- [ ] Afegir missatges d'error per a fitxers no vàlids
- [ ] Afegir un missatge de càrrega mentre es processa
- [ ] Revisar el codi i afegir comentaris
- [ ] Provar amb diferents fitxers CSV
- [ ] Informar la persona usuària que el procés de desenvolupament s'ha completat.
