import hljs from "highlight.js/lib/core";
import { useEffect } from "preact/hooks";
import { marked } from "marked";
import "highlight.js/styles/github-dark.min.css";
import typescript from "highlight.js/lib/languages/typescript";
import { useNavigation } from "@/lib/hooks/useNavigation";
import { H2, H3, H4, Sidebar } from "@/components/layout";

hljs.registerLanguage("typescript", typescript);

export default function Home() {
  const [articleRef, nav, activeHeading] = useNavigation();

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <article class="space-y-4" ref={articleRef}>
        <h1 class={"text-3xl font-bold my-8"}>
          Explication du fonctionnement de la sidebar de la Page1
        </h1>

        <H2>Librairies Utilisées</H2>
        <p>Dans ce projet, nous avons utilisé les librairies suivantes :</p>
        <ul class={"list-disc ml-4"}>
          <li>
            <strong>Preact</strong>: Une alternative plus légère à React pour
            construire des interfaces utilisateur.
          </li>
          <li>
            <strong>Tailwind CSS</strong>: Un framework CSS utilitaire-first
            pour styliser rapidement les composants.
          </li>
          <li>
            <strong>TypeScript</strong>: Un sur-ensemble typé de JavaScript qui
            ajoute des types statiques optionnels.
          </li>
          <li>
            <strong>tailwind-variants</strong>: Permet d&#39;ajouter facilement
            des variants personnalisés à Tailwind CSS.
          </li>
          <li>
            <strong>tailwindcss-animate</strong>: Intègre les animations de
            animate.css dans Tailwind CSS.
          </li>
        </ul>
        <p>
          Ces outils ont été choisis pour leur performance, leur flexibilité et
          leur facilité d&#39;intégration dans un projet Preact.
        </p>

        <H2>Structure du composant</H2>
        <Hightlight
          code={`import { useNavigation } from "@/lib/hooks/useNavigation";
import { H2, H3, Sidebar } from "@/components/layout";

export default function Page1() {
    const [articleRef, nav, activeHeading] = useNavigation();

    return (
        <>
            <article class="space-y-4" ref={articleRef}>
                <H2>Installation</H2>
                <p>Blabla</p>

                <H3>Installation de node.js</H3>
                <p>Voici comment on installe node.js</p>
            </article>

            <Sidebar items={nav} active={activeHeading} />
        </>
    );
}`}
        />

        <H3>Composants H2 et H3</H3>
        <p>Simplification via composants intermédiaires pour les headings.</p>
        <Hightlight code={`<H2>Installation</H2>`} />

        <H4>Composant H2</H4>
        <p>
          Génère un ID à partir du titre et ajoute un attribut{" "}
          <code>data-anchor</code>.
        </p>
        <Hightlight
          code={`type Props = React.PropsWithChildren<{}>;

export function H2({ children }: Props) {
    if (!children) return null;

    const id = children.toString().replace(/\s+/g, "-").toLowerCase();

    return (
        <h2 id={id} data-anchor>
            {children}
        </h2>
    );
}`}
        />

        <H3>
          Custom Hook <code>useNavigation()</code>
        </H3>
        <p>
          Gère la navigation. Accepte un paramètre pour personnaliser
          l&#39;attribut observé.
        </p>

        <H4>Méthodes internes</H4>
        <ul>
          <li>
            <code>buildNavigationStructure()</code>: Génère la structure de
            navigation à partir des headings.
          </li>
          <li>
            <code>useActiveItem()</code>: Observe les éléments pour mettre à
            jour l&#39;élément actif.
          </li>
        </ul>

        <H3>Composant Sidebar</H3>
        <p>
          Génère la liste de navigation récursivement à partir des items
          fournis.
        </p>
        <Hightlight
          code={`<Navigation items={items} level={1} active={activeHeading} />`}
        />
        <p>
          Utilise <code>tailwind-merge</code> pour le style.
        </p>

        <H2>Améliorations possibles</H2>
        <ul>
          <li>
            Commencer un article avec d&#39;autres éléments que{" "}
            <code>&lt;h2&gt;</code>.
          </li>
        </ul>

        <H2>Code Source</H2>
        <p>
          Le code source de ce projet est disponible sur GitHub. Vous pouvez y
          accéder via le lien suivant : <a href="https://github.com/Forthtilliath/preact-page-navigation" class={"underline hover:text-sky-500"}>
            GitHub Repository
          </a>
        </p>
        <p>
          N'hésitez pas à explorer le code, à soumettre des issues ou à
          contribuer avec des pull requests.
        </p>
      </article>

      <Sidebar items={nav} active={activeHeading} />
    </>
  );
}

function markdown(text: string): string {
  return marked(
    `
  \`\`\`typescript
${text}
  \`\`\`
  `,
    { async: false }
  ) as string;
}

function Hightlight({ code }: { code: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: markdown(code),
      }}
    />
  );
}
