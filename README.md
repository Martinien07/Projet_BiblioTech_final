# Projet_BiblioTech

## Gestionnaire de Livres (Application Web)
**1. Présentation du projet**

Ce projet est une application web simple permettant de gérer une petite base de données de livres directement dans le navigateur.
L’utilisateur peut ajouter un livre, le rechercher, lister tous les enregistrements et réinitialiser la base.
Aucune base de données externe n’est nécessaire : tout est sauvegardé localement via localStorage.

L’objectif du projet est de fournir un exemple clair de :

manipulation du DOM en JavaScript ;

gestion et stockage de données en local ;

interface utilisateur simple mais fonctionnelle ;

séparation propre entre HTML, CSS et JavaScript ;

architecture modulée en plusieurs fichiers.

**2. Fonctionnalités principales**

Ajout d’un livre

L’utilisateur peut enregistrer un livre en fournissant :

un titre,

un auteur,

une année,

une catégorie.

Chaque livre se voit attribuer un identifiant unique.

Recherche instantanée

À mesure que l’utilisateur tape dans la barre de recherche, la liste des livres est filtrée en temps réel.

Sauvegarde automatique

La base de données des livres est enregistrée dans localStorage, ce qui permet de retrouver tous les enregistrements même après fermeture de la page.

Réinitialisation

Un bouton permet de supprimer complètement les données enregistrées.

Interface dynamique

La liste des livres est mise à jour automatiquement après chaque action :

ajout,

suppression,

réinitialisation,

recherche.


**3. Structure du projet**

Le projet est organisé en plusieurs fichiers pour une meilleure lisibilité :

/
|-- index.html
|-- css/
|     └── style.css
|-- js/
|     ├── app.js
|     ├── helpers.js
|     └── components/
|            └── bookRow.js
|-- README.md

index.html

Contient la structure de la page, les formulaires, la zone d’affichage, et les liens vers les fichiers CSS et JS.

style.css

Définit l’apparence générale : couleurs, mise en page, tableaux, boutons et typographie.

app.js

Contient la logique principale :

gestion des événements,

ajout d’un livre,

recherche,

sauvegarde dans localStorage,

rafraîchissement de l’affichage.

helpers.js

Inclut les fonctions utilitaires comme :

affichage des messages,

validation,

génération des UID.

bookRow.js

Composant responsable de la génération HTML d’une ligne de tableau représentant un livre.


**4. Technologies utilisées**

HTML5 pour la structure

CSS3 pour le style

JavaScript ES6 pour la logique

localStorage pour la persistance

Aucune bibliothèque externe n’est nécessaire.

**5. Installation et utilisation**

1. Télécharger ou cloner le projet
git clone https://github.com/tareq92i/Projet_BiblioTech.git

2. Ouvrir l’application

Ouvrez simplement index.html dans n’importe quel navigateur moderne.

Aucun serveur n’est requis.

3. Utiliser l’interface

Remplissez le formulaire pour ajouter un livre.

Tapez dans la barre de recherche pour filtrer les résultats.

Cliquez sur le bouton de réinitialisation pour remettre l’application à zéro.

**6. Notes importantes**

L’application n’utilise aucune base de données externe.

La suppression de la base via le bouton réinitialise définitivement le contenu de localStorage.

La logique suit les normes modernes ES6 et n’utilise pas de méthodes dangereuses comme eval.

**7. Améliorations possibles**

Le projet peut être enrichi avec :

export CSV ou PDF de la base de livres ;

pagination de la liste ;

ajout de catégories personnalisées ;

édition d’un livre existant ;

design responsive avancé.
