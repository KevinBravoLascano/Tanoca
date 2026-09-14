# Tasques del projecte

## Fase 1. Estructura bàsica

- [x] Crear `index.html` amb l'estructura HTML
- [x] Crear `styles.css` amb els estils bàsics
- [ ] Crear `app.js` amb la lògica principal
- [ ] Afegir el selector de fitxer CSV a l'HTML

## Fase 2. Lectura de dades

- [ ] Llegir el fitxer CSV amb `FileReader`
- [ ] Convertir el CSV en una llista d'objectes JavaScript
- [ ] Validar que el CSV té les columnes esperades (`userId`,`movieId`,`title`,`genres`,`rating`,`timestamp`)

## Fase 3. Visualització tabular

- [ ] Mostrar les dades en una taula HTML ordenada per la columna `rating`
- [ ] Afegir les capçaleres de columna
- [ ] Mostrar un missatge si no hi ha dades

## Fase 4. Resum estadístic

- [ ] Calcular el total de nombre de pel·lícules úniques de la columna `title`
- [ ] Calcular la quantitat de usuaris unics de la columna `userId`
- [ ] Calcular el nombre total de valoracions de la columna `rating`
- [ ] Calcular la mitjana de `rating`
- [ ] Mostrar pel·licules amb mes quantitat de valoracions miran columnes `movieId` i `rating`
- [ ] Mostrar els resultats en una secció de resum

## Fase 5. Gràfic

- [ ] Agrupar les dades per `genres` i `rating`
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
