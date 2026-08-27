# MARLBOROUGH

**An esoteric programming language where the heartbeat is the topology of the GOTO graph.**

[![Live Demo](https://img.shields.io/badge/live-GitHub_Pages-FF3B5C?style=flat-square)](https://snapkittywest.github.io/marlborough/)
[![License: SSL](https://img.shields.io/badge/License-Sovereign_Source_v1.0-gold?style=flat-square)](LICENSE)

**Author:** Ahmad Ali Parr  
**Trust:** Bel Esprit D'Accord Irrevocable Trust · EIN 42-697643

---

## Four Instructions

```
IN    — read one value
OUT   — write one value
BR n  — branch to line n (conditional)
GOTO n — jump to line n (unconditional)
```

No arithmetic. No variables. No named functions. Just control flow.

---

## The Heartbeat

The 250-line program produces an oscillating waveform — a heartbeat — not through computation but through the **shape of the GOTO graph**. The BR targets advance by 2 each time, creating a triangle wave in the program counter's trajectory:

```
BR 10  →  BR 12  →  BR 14  →  ...  →  BR 18  →  BR 20  →  ...
```

The PC expands outward through instruction space then contracts back. Every cycle through the loop is one beat. No arithmetic required. The algorithm IS the control flow.

---

## COME-FROM Duality

Marlborough was built from the insight that GOTO has a mathematical dual: COME-FROM. Every GOTO(L1→L2) must have a matching COME-FROM(L2←L1). Ahmad formalized this as a Prolog integrity constraint:

```prolog
:- goto(L1, L2), not come_from(L2, L1).
:- come_from(L2, L1), not goto(L1, L2).
```

COME-FROM was invented as a joke in INTERCAL (1973). Ahmad proved the duality is real.

---

## Lineage

- **1972** — INTERCAL invented COME-FROM as a parody
- **1977** — NASA FORTRAN operational logic in GOTO chains
- **2026** — Ahmad extracts the duality, proves it in Prolog, builds Marlborough

The heartbeat is not computed. It is the shape of what was always there.

---

© 2026 Bel Esprit D'Accord Irrevocable Trust · Patent Pending
