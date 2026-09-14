# Arquitectura del projecte

## Estructura de fitxers

```
exercici/
├── architecture.md    # Com està organitzat
├── movielens.csv      # Dades
├── reglesIA.md        # Regles de responsabilitat de la IA
├── spec.md            # Què ha de fer el sistema
├── tasks.md           # Tasques pendents
└── html/              # Directori de l'aplicació
    ├── index.html     # Pàgina principal
    ├── styles.css     # Estils visuals
    ├── app.js         # Lògica de l'aplicació
    └── exemple.csv    # Còpia de les dades d'exemple
```

## Responsabilitat de cada fitxer de l'aplicació

### `index.html`

Conté l'estructura de la pàgina:

- títol de la pàgina,
- selector del fitxer CSV,
- àrea de resum amb valors calculats,
- taula de dades,
- contenidor del gràfic.

### `styles.css`

Conté l'estil visual:

- tipografia llegible,
- marges i espaiat adequats,
- colors diferenciats per a les seccions,
- format de taula amb capçaleres destacades,
- disseny responsiu.

### `app.js`

Conté la lògica de l'aplicació:

- lectura del fitxer CSV amb `FileReader`,
- conversió del text CSV en objectes JavaScript,
- validació de les columnes esperades,
- generació de la taula HTML,
- càlcul de totals i resums,
- generació del gràfic amb Chart.js.

## Llibreries

Per mantenir el projecte senzill, farem servir:

- **JavaScript natiu** (vanilla JS) per llegir el fitxer i manipular el DOM.

- **Chart.js** (versió 4.x) per generar el gràfic de barres.
  
  - Es carregarà des d'un CDN al fitxer HTML:
    
    ```html
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    ```

## Decisions de disseny

- No farem servir cap backend — tot s'executa al navegador.
- No farem servir frameworks com React o Vue — JavaScript natiu.
- El projecte ha de ser fàcil d'entendre per a estudiants que tot just comencen.
- El CSV es processa manualment (sense llibreries externes de parsing).
- El gràfic es regenera cada vegada que es carrega un fitxer nou.
