---
title: Optimisation de l'image Docker Ubuntu pour WSL
summary: Faire le ménage sur son disque peut être intéressant, car on en apprend beaucoup sur ce qu’il peut contenir.
tags:
  - wsl
  - windows
  - TIL
  - docker
date: 2022-07-19
---

Dans l’entreprise où je travaille, il m’a été fourni un ordinateur sous _Windows 10_. Personnellement, je bosse sur _OsX_. Je n’ai pas plus d’attirance que cela pour Windows. Et pour le développement Web, je suis plus à l’aise avec _Linux_. Tout cela pour dire, que j’ai cherché une alternative à utiliser uniquement Windows. J’ai donc opté pour _Windows Subsytem for Linux_ (<abbr>WSL</abbr>). Cela commence à faire un bon moment maintenant et c'est assez performant (surtout depuis WSL2).

L’autre jour, j’ai eu une alerte, car mon espace disque restant, était très faible. J’ai trouvé des endroits où faire le ménage, mais durant mes recherches, quelque chose a attiré mon attention. Dans le répertoire `MyUserFolder/AppData/Local/Docker/wsl/data/`, il y avait un fichier `ext4.vhdx` faisant plusieurs gigaoctets.

::: info
**NOTE:** VHDX signifie Virtual Hard Disk
:::

Ok, donc ce fichier fait référence à un disque dur virtuel et comme le mentionnait le contenu du chemin que j'ai fourni précédement, ceci est associé au sous-système Linux.

Le problème est que ce fichier ne fait que grossir même si des données sont supprimées au sein de la machine virtuelle.

En faisant une recherche, je suis tombé sur [ce fil de discussion de StackOverflow](https://stackoverflow.com/questions/70946140/docker-desktop-wsl-ext4-vhdx-too-large){hreflang="en"} et notamment, sur un possible moyen de réduire la taille de ce fichier. Pour ce faire, il m’a simplement fallu utiliser _Docker Desktop_, et comme le message du fil de discussion l’indiquait, de cliquer sur le bouton pour purger les données. Je suis ainsi passé de _28Go_ à _1.1Go_. Pas mal comme cure de minceur.

Je ne sais pas à quel rythme ce fichier grossit, mais je sais qu’il va rester sous mon radar un petit moment, afin d’être sûr qu’il ne me prenne pas à nouveau énormément de place.

Voilà, si vous aussi, vous utilisez WSL et Windows 10 (pas sûr que ce soit le même fonctionnement pour Windows 11), vous pouvez peut-être vérifier à cet endroit si vous n’avez pas un fichier volumineux qui pourrait traîner aussi et gagner quelques gigaoctets.
