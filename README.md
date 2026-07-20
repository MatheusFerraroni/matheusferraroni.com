# Matheus Ferraroni — site pessoal

Portfólio estático bilíngue, publicado no GitHub Pages em
[`matheusferraroni.com`](https://matheusferraroni.com). O conteúdo principal é HTML
pré-renderizado, com Tailwind CSS e uma animação de fundo em p5.js executada localmente.

## Idiomas e estrutura

- `/`: página canônica em português brasileiro (`pt-BR`).
- `/en/`: página canônica em inglês (`en`).
- `content/site-content.mjs`: fonte de conteúdo e traduções.
- `templates/site-template.mjs`: template compartilhado das páginas e arquivos SEO.
- `scripts/build-site.mjs`: gerador determinístico.
- `assets/css/tailwind.css`: CSS-fonte; `assets/css/styles.css` é o resultado compilado.
- `assets/js/sketch.js`: animação p5.js; `assets/js/site.js` controla a interface.

`index.html`, `en/index.html`, `robots.txt` e `sitemap.xml` são gerados. Não os edite
diretamente: altere o conteúdo ou o template e execute o build.

## Desenvolvimento

Requer Node.js `^22.22.0` ou `>=24.8.0`.

```sh
npm install
npm run build
```

Comandos disponíveis:

- `npm run build:pages`: gera as duas páginas, `robots.txt` e `sitemap.xml`.
- `npm run build:css`: compila e minifica o Tailwind.
- `npm run build`: executa as duas etapas na ordem correta.
- `npm run build:check`: confirma que os arquivos gerados estão atualizados, sem gravá-los.
- `npm run build:css:check`: recompila em uma pasta temporária e detecta CSS versionado desatualizado.
- `npm run check`: valida geração, HTML, SEO, assets e sintaxe JavaScript.
- `npm test`: executa a suíte de regressão com `node:test`.
- `npm run watch:css`: recompila o CSS durante mudanças visuais.

Para testar localmente, sirva a raiz por HTTP; abrir os HTMLs diretamente com `file://`
não reproduz corretamente as rotas e os caminhos do GitHub Pages.

## SEO e compartilhamento

As páginas possuem canonical autorreferente, `hreflang` recíproco, Open Graph,
Twitter Card e JSON-LD com `WebSite`, `ProfilePage` e `Person`. Os cards sociais
localizados ficam em `assets/image/social-card-*.png`; os SVGs correspondentes são
as fontes editáveis de 1200 × 630.

Depois de publicar uma alteração estrutural:

1. Confirme que `/`, `/en/`, `/robots.txt` e `/sitemap.xml` respondem com HTTP 200.
2. Valide as duas páginas no Rich Results Test.
3. Verifique o domínio no Google Search Console por DNS.
4. Envie `https://matheusferraroni.com/sitemap.xml`.
5. Inspecione e solicite indexação de `/` e `/en/`.

O site não inclui Google Analytics, cookies de rastreamento ou redirecionamento
automático por idioma.

## Publicação

O GitHub Pages publica os arquivos versionados da branch principal e da pasta raiz.
O arquivo `CNAME` mantém o domínio personalizado, e todos os assets necessários são
servidos pelo próprio repositório, sem CDN.
