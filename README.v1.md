# Explication du fonction de la sidebar de la Page1

## Librairies Utilisées

Dans ce projet, nous avons utilisé les librairies suivantes :

- **Preact**: Une alternative plus légère à React pour construire des interfaces utilisateur.
- **Tailwind CSS**: Un framework CSS utilitaire-first pour styliser rapidement les composants.
- **TypeScript**: Un sur-ensemble typé de JavaScript qui ajoute des types statiques optionnels.
- **tailwind-variants**: Permet d'ajouter facilement des variants personnalisés à Tailwind CSS.
- **tailwindcss-animate**: Intègre les animations de animate.css dans Tailwind CSS.

Ces outils ont été choisis pour leur performance, leur flexibilité et leur facilité d'intégration dans un projet Preact.


## Structure du composant

```tsx
import { useNavigation } from "@/lib/hooks/useNavigation";
import { H2, H3, Sidebar } from "@/components/layout";

export default function Page1() {
  const [articleRef, nav, activeHeading] = useNavigation();

  return (
    <>
      <article class="space-y-4" ref={articleRef}>
        {/* Contenu de la page */}
      </article>

      <Sidebar items={nav} active={activeHeading} />
    </>
  );
}
```

La page est simplifiée au maximum. Dans un premier temps, nous utilisons un customHook afin de récupérer 3 variables :
- articleRef qui sert contient une référence, afin de lier la navigation à l'article
- nav qui contient le contenu de la navigation qui sera affichée dans la sidebar
- activeHeading qui contient l'id de l'élément actif

Commençons par analyser le contenu de l'élément `article`. Celui-ci doit être composé de heading ``h2`` à ``h6``. De plus, les headings doivent avoir ``data-anchor`` en attribut afin de pouvoir être récupéré comme ancres pour la navigation en sidebar.

### Création de sous-composants ``H2`` et ``H3``

Pour simplifier tout cela, nous pouvons créer des composants intermédiares.

Je n'ai fait que ``H2`` et ``H3``, mais il aurait été possible d'aller jusqu'à ``H6``. Voici comment nous l'utilisons :

```tsx
<H2>Installation</H2>
```

#### Composant H2

```tsx
type Props = React.PropsWithChildren<{}>;

export function H2({ children }: Props) {
  if (!children) return null;

  const id = children.toString().replace(/\s+/g, "-").toLowerCase();

  return (
    <h2
      className="mt-12 mb-6 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
      id={id}
      data-anchor
    >
      {children}
    </h2>
  );
}
```
Le composant est très simple. Ces sous-composants ont 2 fonctionnalités.

##### Ajouter un id

L'id nous servira pour faire le lien entre la sidebar et le titre, d'une part pour aller vers l'élément en cliquant sur le lien de la sidebar et d'autre part pour savoir si l'utilisation parcours cet élément afin d'ajouter un effect visuel dans la sidebar.

```ts
const id = children.toString().replace(/\s+/g, "-").toLowerCase();
```
Celui ci est généré à partir du titre. ``Installation`` devient ``installation``. ``Mise en place`` devient ``mise-en-place``.

##### Ajouter un dataset

```tsx
<h2 id={id} data-anchor>{children}</h2>
```
``data-anchor`` nous servira plus tard pour ajouter cet élément à la liste des éléments à observer.

## Le custom hook ``useNavigation()``

Comme vu précédemment, ``useNavigation()`` va tout gérer pour vous. Il accepte un paramètre dans le cas où vous souhaiteriez utiliser une prop différente que ``data-anchor``, libre à vous de la changer dans le composant en lui-même, ou lors de son appel.
De plus, vous pouvez bien entendu avoir plusieurs navigations dans la même page :
```ts
const [articleRef1, nav1, activeHeading1] = useNavigation("data-nav-1");
const [articleRef2, nav2, activeHeading2] = useNavigation("data-nav-2");
```

Le hook en lui-même est très simple. Il utilise 2 méthodes, ``buildNavigationStructure()`` pour générer les structures de la navigation et ``useActiveItem()`` pour récupérer l'élément actif.

### La méthode ``buildNavigationStructure()``

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
Pour cela, nous parcourons l'ensemble des headings. En fonction de son niveau, ``2`` pour un ``h2``, ``3`` pour un ``h3`` et ainsi de suite, cela nous permet de générer un tableau récurcif qui servira de structure pour notre navigation.

> Il est essentiel que le premier ``heading`` soit un ``h2`` afin de débuter la structure.

### Le custom hook ``useActiveItem``

A l'aide d'un ``useEffect`` nous ajoutons un observer sur chacun de éléments de l'article, sans oublier de supprimer celui-ci une fois que l'on change de page.

A chaque fois qu'un élément est intercepté par l'observer, le hoom met à jour l'``activeId``.

## Le composant ``Sidebar``

Ce composant est assez simple. Il génère la liste des items en fonction de la variable ``nav`` passée en props.
```tsx
<Navigation items={items} level={1} active={activeHeading} />
```
La navigation prend plusieurs props :
- ``items`` : correspond aux éléments contenus dans la navigation
- ``level`` : correspond au niveau. Plus le niveau est élevé, plus le texte sera décalé pour avoir un visuel d'imbrication. Le niveau est limité aux valeurs entre 1 et 5 ce qui permet d'avoir un navigation qui accepte les h2 au h6.
- ``active`` : contient la valeur du menu en cours de visualisation. Cela permet de styliser l'élément différemment si celui-ci est actif.

Pour styler le tout, nous utilisons la librairie ``tailwind-merge`` qui permet facilement d'avoir un style de base, ainsi que des variations.

Le composant va se générer de façon récurcive à partir d'``items``.

# Améliorations possibles

Le projet pourrait être encore mieux. Voici une liste de possibilités d'améliorations :
- permettre de commencer son article par autre chose qu'un h2