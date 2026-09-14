# Especificació del projecte

## Objectiu

Crear un artefacte HTML que permeti carregar el fitxer CSV `exemple.csv` situat en aquest directori i visualitzar-ne les dades d'una manera clara i intuïtiva.

## Format del CSV

El fitxer CSV ha de tenir les columnes següents:

| Columna | Descripció                      |
| ------- | ------------------------------- |
| Any     | Any de les dades (enter)        |
| Lloc    | Categoria o territori (text)    |
| Sexe    | Categoria de gènere (text)      |
| Valor   | Valor numèric (enter o decimal) |

Exemple de contingut vàlid:

```csv
Any,Lloc,Sexe,Valor
2026,Catalunya,Dona,1200
2026,Catalunya,Home,1150
2026,Espanya,Dona,800
2026,Espanya,Home,750
2026,Estranger,Dona,600
2026,Estranger,Home,650
```

## Funcionalitats principals

1. La persona usuària ha de poder seleccionar el fitxer CSV del seu ordinador.
2. El sistema ha de llegir el contingut del CSV i validar-lo.
3. El sistema ha de mostrar les dades en una taula HTML.
4. El sistema ha de calcular valors de resum de les columnes numèriques (mitjana, desviació).
5. El sistema ha de generar un gràfic de barres agrupat per `Lloc` i `Sexe`.
6. El sistema ha de mostrar missatges d'error si el fitxer no és vàlid.

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
