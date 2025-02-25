#!/bin/bash

# Aller dans le dossier du projet
cd ~/Dido-Quantum/BackEnd-Quantum 

# Activer l'environnement virtuel
source new_venv/bin/activate

# Lancer le serveur Uvicorn
uvicorn src.main:app --reload
