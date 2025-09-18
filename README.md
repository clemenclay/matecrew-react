# Modernize Front (fix)

## Pasos
1. Copia **la carpeta `assets/` del template HTML** dentro de `public/` (quedará `public/assets/...`).
2. Duplica `.env.example` a `.env` y completa tus credenciales del CMS.
3. Instala e inicia:
   ```bash
   npm i
   npm run dev
   ```

## Notas
- Añadí `import React from 'react'` en todos los `.jsx` para evitar el error **"React is not defined"**.
- `index.html` usa jQuery por CDN y solo incluye plugins que suelen existir en `public/assets/libs/...`. Si tus rutas difieren, ajusta esas 3 `<script>`.
- Rutas: `/`, `/blog`, `/post/:slug` y atajo legacy `/apps/blog/post/:slug`.
