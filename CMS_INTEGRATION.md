# CMS Integration (Blog Design)

Este starterkit fue extendido con vistas para listar y ver páginas del CMS
usando el diseño tipo **frontend-blogpage** (Cards + MUI).

## Variables de entorno
Crear `.env` (o completar si ya existe):

```env
VITE_CMS_BASE_URL=https://cms.speednova.com/api
VITE_CMS_PROJECT_ID=<project-id>
VITE_CMS_TOKEN=<token>   # ej: 6|...
VITE_CMS_LOCALE=es
```

## Rutas
Se añadieron rutas en `src/routes/cmsRoutes.js`:

- `/apps/blog/posts` → listado de páginas del CMS (orden publicadas desc)
- `/apps/blog/post/:slug` → detalle HTML de una página (usa `fields.url`)
- `/p/:slug` → atajo directo al detalle

**Integración en el router principal**

Editar `src/routes/Router.js` y agregar el spread de `cmsRoutes` dentro del
objeto del FullLayout (`path: '/'`) en su `children`:

```diff
+ import cmsRoutes from './cmsRoutes';

  const Router = [
    {
      path: '/',
      element: <FullLayout />,
      children: [
+       ...cmsRoutes,
        // (rutas existentes)
      ]
    },
    // (resto de rutas)
  ]
```

> Nota: Si tu archivo difiere, podés directamente copiar las rutas de
> `cmsRoutes.js` a la sección `children` del FullLayout.

## Componentes
- `src/views/apps/blog/Posts.jsx`: grilla de cards con las páginas.
- `src/views/apps/blog/PostView.jsx`: vista de artículo que renderiza el HTML
   del campo `fields.content` con sanitización.
- `src/components/cms/HtmlContent.jsx`: wrapper de DOMPurify.

## Estilos
- El HTML del CMS puede traer clases (Tailwind). Como este starterkit usa MUI,
  igualmente se renderiza bien; si querés tipografía tipo "blog", podés
  aplicar estilos globales o añadir `@mui/typography`/`prose` utilidades.

## CORS
Si el front y el CMS están en dominios distintos y CORS no está habilitado,
activalo en el CMS o usá un proxy del mismo origen.
