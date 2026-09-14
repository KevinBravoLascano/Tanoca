# Especificació del projecte

## Objectiu

Crear un artefacte HTML que permeti carregar el fitxer CSV `movielens.csv` situat en aquest directori i visualitzar-ne les dades d'una manera clara i intuïtiva.

## Format del CSV

El fitxer CSV ha de tenir les columnes següents:

| Columna | Descripció                          |
| ------- | ------------------------------------|
| userId  | nombre del usuari (enter)           |
| movieId | nombre identificador peli(enter)    |  
| title   | titol de la peli (text)             |
| genres  | Clasificacio de tipo de peli (text) |
| rating  | puntuacio numeric (etner o decimal) |
| timestamp| puntuacio numeric (etner o decimal)|

Exemple de contingut vàlid:

``` csv
userId,movieId,title,genres,rating,timestamp
1,1,Toy Story (1995),Adventure|Animation|Children|Comedy|Fantasy,4.0,964982703
1,3,Grumpier Old Men (1995),Comedy|Romance,4.0,964981247
1,6,Heat (1995),Action|Crime|Thriller,4.0,964982224
1,47,Seven (a.k.a. Se7en) (1995),Mystery|Thriller,5.0,964983815
1,50,"Usual Suspects, The (1995)",Crime|Mystery|Thriller,5.0,964982931
```


## Funcionalitats principals

1. La persona usuària ha de poder seleccionar el fitxer CSV del seu ordinador.
2. El sistema ha de llegir el contingut del CSV i validar-lo.
3. El sistema ha de mostrar les dades en una taula HTML ordenable per rating.
4. Mostri un resum estadístic del dataset.
5. Mostri un gràfic de barres amb la valoració mitjana per gènere.

## Requisits

- L'aplicació ha de funcionar en un navegador web modern.
- No cal cap servidor backend.
- Tot ha de funcionar amb HTML, CSS i JavaScript.
- El codi ha de ser senzill i llegible.
- S'ha de fer servir Chart.js per als gràfics.


## Criteris d'acceptació

El projecte es considerarà complet si:

- Es pot carregar un fitxer CSV amb el format esperat.
- Les dades apareixen correctament en una taula HTML.
- Els valors de resum es calculen correctament.
- El gràfic de barres es genera correctament.
- Es mostren missatges d'error clars si el fitxer no és vàlid.
- El codi està organitzat i comentat.

## Procés d'implementació amb IA

Aquest projecte s'implementa seguint el procediment definit a `reglesIA.md`.
Abans de generar codi, l'assistent d'IA ha de llegir `spec.md`, `architecture.md` i `tasks.md`.

La implementació s'ha de fer tasca a tasca. Després de cada tasca:
marca-la com a feta a `tasks.md`, informa la persona usuària i espera la confirmació
abans de continuar.
