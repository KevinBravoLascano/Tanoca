---
nom: reglesIA.md
versió: 1.0
descripció: Regles d'ús de l'assistent d'IA per a la pràctica de visualització de CSV
---

## Propòsit

Aquest document descriu com utilitzar l'assistent d'IA en aquest projecte concret.
Ha de garantir que la feina sigui coherent amb els fitxers existents i que la persona desenvolupadora mantingui la responsabilitat sobre el codi.

Se suposa que **la persona desenvolupadora és responsable de cada línia que entra al repositori**. La IA és un assistent, no qui pren les decisions.

---

## Principi fonamental

Accepta només codi que puguis:

1. Explicar.
2. Modificar.
3. Depurar.
4. Mantenir.

Si no es compleix alguna d'aquestes condicions: **ATURA'T.**

---

## Fitxers necessaris al repositori

```
spec.md
architecture.md
tasks.md
reglesIA.md
```

Aquest document s'aplica exclusivament a aquesta estructura.

---

## Rol de cada fitxer

- `spec.md`: requisits funcionals i criteris d'acceptació.
- `architecture.md`: estructura del projecte, components i decisions de disseny.
- `tasks.md`: tasques a dur a terme, fase a fase.

---

## Flux de treball per a aquest projecte

### Fase 1 — Revisió de l'especificació

Abans de programar, llegeix `spec.md` i confirma:

- Quins són els requisits funcionals.
- Quins són els criteris d'acceptació.
- Quin format ha de tenir el CSV.

Si alguna expectativa no és clara, pregunta abans de continuar.

---

### Fase 2 — Revisió de l'arquitectura

Llegeix `architecture.md` i confirma:

- Quina estructura de fitxers ha de tenir el projecte.
- Quina és la responsabilitat de cada fitxer.
- Quines tecnologies s'han de fer servir (HTML/CSS/JS, Chart.js).

Si la proposta no encaixa amb la pràctica, corregeix el fitxer abans d'implementar.

---

### Fase 3 — Planificació

Llegeix `tasks.md` i tria una tasca concreta per implementar.
Implementa sempre una sola tasca a la vegada.

Abans de generar codi, explica:

- Què fa la tasca.
- Quins fitxers toca.
- Quines funcions cal escriure.
- Com es verificarà.

---

### Fase 4 — Implementació

Genera només el codi necessari per a la tasca seleccionada.
No implementis tot el projecte de cop.

Per a cada canvi, comprova que:

- Encaixa amb `spec.md`.
- Respecta `architecture.md`.
- Es manté senzill i llegible.

---

### Fase 5 — Revisió immediata

Després d'implementar una tasca, revisa:

- Correcció: compleix el requisit?
- Validació: gestiona les entrades no vàlides?
- Llegibilitat: és clar el codi?

Si falta alguna cosa, refactoritza o elimina el codi incorrecte.

---

### Fase 6 — Tancament de la tasca

Després de completar i revisar cada tasca:

1. Marca la tasca com a `[x]` a `tasks.md`.
2. Informa la persona usuària de:
   - Quina tasca s'ha completat.
   - Quins fitxers s'han tocat i per què.
   - Com pot verificar que funciona.
3. **ATURA'T. No continuïs amb la tasca següent fins que la persona usuària ho confirmi explícitament.**

---

## Requisits addicionals per a l'assistent d'IA

- Llegeix sempre `spec.md`, `architecture.md` i `tasks.md` abans de generar cap codi.
- No afegeixis fitxers nous sense que t'ho demanin explícitament.
- No canviïs l'estructura del projecte sense autorització.
- Proposa canvis només quan estiguin justificats pel requisit.
- Prioritza la claredat i la simplicitat.
