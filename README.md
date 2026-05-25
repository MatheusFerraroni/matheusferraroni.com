# Matheus Ferraroni - site pessoal

Base estática para um site pessoal com `p5.js` local e Tailwind CSS, pronta para publicar no GitHub Pages.

## Estrutura

- `index.html`: página principal
- `assets/css/tailwind.css`: arquivo-fonte do Tailwind
- `assets/css/styles.css`: CSS compilado usado no site
- `assets/js/sketch.js`: sketch inicial em `p5.js`
- `assets/vendor/p5/p5.min.js`: biblioteca local

## Tailwind CSS

1. Instale as dependências com `npm install`.
2. Rode `npm run build:css` para gerar `assets/css/styles.css`.
3. Durante o desenvolvimento, use `npm run watch:css`.

## Publicação no GitHub Pages

1. Suba este conteúdo para um repositório.
2. No GitHub, abra `Settings > Pages`.
3. Em `Build and deployment`, escolha `Deploy from a branch`.
4. Selecione a branch principal e a pasta `/ (root)`.

Como os caminhos do projeto são relativos, o site funciona no GitHub Pages sem depender de CDN.
