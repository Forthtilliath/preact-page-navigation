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

### Composants H2 et H3

Simplification via composants intermédiaires pour les headings.

```tsx
<H2>Installation</H2>
```

#### Composant H2

Génère un ID à partir du titre et ajoute un attribut `data-anchor`.

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

## Custom Hook `useNavigation()`

Gère la navigation. Accepte un paramètre pour personnaliser l'attribut observé.

### Méthodes internes

- `buildNavigationStructure()`: Génère la structure de navigation à partir des headings.
- `useActiveItem()`: Observe les éléments pour mettre à jour l'élément actif.

## Composant Sidebar

Génère la liste de navigation récursivement à partir des items fournis.

```tsx
<Navigation items={items} level={1} active={activeHeading} />
```

Utilise `tailwind-merge` pour le style.

# Améliorations possibles

- Commencer un article avec d'autres éléments que `<h2>`.
