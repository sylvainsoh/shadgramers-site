# shadgramers.com

Site vitrine de ShaDGramers : la startup, le jeu de cartes SIPA et la chaîne YouTube.
HTML et CSS statiques, servis par nginx, sans étape de compilation.

## Pages

| Adresse | Fichier |
|---|---|
| `/` | `index.html` |
| `/sipa` | `sipa.html` |
| `/a-propos` | `a-propos.html` |
| `/contact` | `contact.html` |
| `/confidentialite` | `confidentialite.html` |

Aussi : `ads.txt` (Google AdSense, ne pas modifier sans raison), `robots.txt`, `sitemap.xml` (date `lastmod` à mettre à jour quand une page change).

## Mise en ligne

Un push sur `master` déploie automatiquement le site : l'application Coolify `shadgramers-site` suit cette branche par l'application GitHub de Coolify. Pas d'autre branche suivie.

Le dossier publié est la racine du dépôt. Tout fichier qui ne doit pas être servi (comme ce README) est listé dans `.dockerignore`.

## Règles du site

- Aucun cookie, aucune mesure d'audience, rien chargé depuis un autre site : polices (`fonts/`), images et script (`js/site.js`) sont hébergés ici. La page Confidentialité le dit.
- Couleurs rouge `#B02B24`, blanc et noir `#0E0E10`. Titres en Unbounded, texte en Manrope.
- Le nom s'écrit ShaDGramers (un seul M).
- Les animations s'arrêtent quand le système demande moins de mouvement, et tout le contenu s'affiche sans le script.
- Pas de bloc vide ni « en construction » : une telle page ne peut pas porter d'annonces.
