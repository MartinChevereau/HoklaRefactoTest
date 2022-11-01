# HOKLA CODE QUALITY TEST

## Instructions

Ce test est une mise en situation, tu arrives sur un nouveau projet avec un code de mauvaise qualité et ton client te demande de rajouter une fonctionnalité pour demain. Tu es conscient que tu ne seras plus sur ce projet après-demain, tu dois donc aussi faire en sortes que le prochain développeur puisse reprendre la main sur ce projet très facilement. A toi de jouer pour ajouter la fonctionnalité et rendre le code plus compréhensible.

Tu es totalement libre sur la manière de faire, tu devras justifier tes choix lors du debrief.

Note : Attention ce code est actuellement en production et fonctionne correctement selon les attentes actuelles du client

Bon courage!

---

## Enoncé

Bonjour et bienvenue dans l'équipe de la Rose dorée.

Comme vous le savez, notre petite taverne située à proximité d'une cité importante est dirigée par l'amicale aubergiste Allison.

Nous achetons et vendons uniquement les meilleurs produits. Malheureusement, la qualité de nos marchandises se dégrade constamment à l'approche de leur date de péremption.

Un système a été mis en place pour mettre à jour notre inventaire. Il a été développé par Leeroy, une personne pleine de bon sens qui est parti pour de nouvelles aventures.

Votre mission est d'ajouter une nouvelle fonctionnalité à notre système pour que nous puissions commencer à vendre un nouveau type de produit.

Mais d'abord, laissez-moi vous présenter notre système :

- Tous les éléments ont une valeur `sellIn` qui désigne le nombre de jours restant pour vendre l'article.
- Tous les articles ont une valeur `quality` qui dénote combien l'article est précieux.
- A la fin de chaque journée, notre système diminue ces deux valeurs pour chaque produit.

Plutôt simple, non ?

Attendez, ça devient intéressant :

- Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
- La qualité (quality) d'un produit ne peut jamais être négative.
- "Aged Brie" augmente sa qualité (quality) plus le temps passe.
- La qualité d'un produit n'est jamais de plus de 50.
- "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)
- "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.

Nous avons récemment signé un partenariat avec un fournisseur de produit invoqué ("Conjured"). Cela nécessite une mise à jour de notre système :

- Les éléments "Conjured" voient leur qualité se dégrader de deux fois plus vite que les objets normaux.
