# Explication du fonction de la sidebar de la Page1

## Création de sous-composants ``H2`` et ``H3``

Je n'ai fait que ``H2`` et ``H3``, mais il aurait été possible d'aller jusqu'à ``H6``.

```tsx
<H2>Installation</H2>
```

Ces sous-composants ont 2 fonctionnalités.

### Ajouter un id

L'id nous servira pour faire le lien entre la sidebar et le titre, d'une part pour aller vers l'élément en cliquant sur le lien de la sidebar et d'autre part pour savoir si l'utilisation parcours cet élément afin d'ajouter un effect visuel dans la sidebar.

```ts
const id = children.toString().replace(/\s+/g, "-").toLowerCase();
```
Celui ci est généré à partir du titre. ``Installation`` devient ``installation``. ``Mise en place`` devient ``mise-en-place``.

### Ajouter un dataset

```tsx
<h2 id={id} data-anchor>{children}</h2>
```
``data-anchor`` nous servir plus tard pour ajouter cet élément à la liste des éléments à observer.

## La méthode ``buildNavigationStructure()``

La méthode a pour but de générer automatiquement le contenu de la navigation à partir du contenu de la page.
La méthode respecte scrupuleusement la structure de la page, pour retourner un tableau d'Item qui a ce format :
```ts
export type Item = {
  // Label affiché
  name: string;
  // Lien vers l'ancre
  href: string;
  // Sous-éléments.
  // Par exemple, si on est dans le h2, il contient les h3 du bloc
  items?: Item[];
};
```
Chaque page a sa propre sidebar, on ajoute donc la sidebar dans la page avec son propre contenu.
```tsx
<Sidebar items={nav} />
```

## Le composant ``Sidebar``

Ce composant est assez simple. Il génère la liste des items en fonction de la variable ``nav`` passée en props.
```tsx
<Navigation items={items} level={1} active={activeHeading} />
```
La navigation prend plusieurs props :
- ``items`` : correspond aux éléments contenus dans la navigation
- ``level`` : correspond au niveau. Plus le niveau est élevé, plus le texte sera décalé pour avoir un visuel d'imbrication. Le niveau est limité aux valeurs entre 1 et 5 ce qui permet d'avoir un navigation qui accepte les h2 au h6.
- ``active`` : contient la valeur du menu en cours de visualisation. Cela permet de styliser l'élément différemment si celui-ci est actif.

Pour styler le tout, j'ai utiliser ``tailwind-merge`` qui permet facilement d'avoir un style de base, ainsi que de variations. 

## Le custom hook ``useActiveItem``

Comme dit plus haut, les éléments à observer sont récupérer à partir de la prop ``data-anchor``. On récupère ainsi la liste des id de ces éléments afin de faire le lien avec la navigation.

A l'aide d'un ``useEffect`` on ajoute un observer sur chacun de ses éléments, sans oublier de supprimer celui-ci une fois que l'on change de page.

# Améliorations possibles

