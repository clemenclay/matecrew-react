import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const CMS_BASE = 'https://cms.speednova.com/api';
const CMS_HEADERS = {
  Accept: 'application/json',
  'project-id': import.meta.env.VITE_CMS_PROJECT_ID || '',
  Authorization: import.meta.env.VITE_CMS_TOKEN || '',
};

/**
 * Mapa de equivalencias de slugs por idioma.
 * Clave: idioma destino -> { slugActual : slugDestino }
 * Agregá acá tus pares a medida que crees páginas.
 */
const SLUG_MAP = {
  en: { terminos: 'terms-of-service' },
  es: { 'terms-of-service': 'terminos' },
};

export default function PostView() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirige cuando cambia el idioma si existe mapeo de slug
  useEffect(() => {
    const onLang = (e) => {
      const newLang = e.detail || localStorage.getItem('lang') || 'en';
      setLang(newLang);
      const target = SLUG_MAP[newLang]?.[slug];
      if (target && target !== slug) {
        navigate(`/post/${target}`, { replace: true });
      }
    };
    window.addEventListener('lang-changed', onLang);
    return () => window.removeEventListener('lang-changed', onLang);
  }, [navigate, slug]);

  // Fetch del CMS para el idioma/slug actual
  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`${CMS_BASE}/pages?locale=${lang}&sort=published_at,DESC`, { headers: CMS_HEADERS })
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        const arr = Array.isArray(data) ? data : [];
        const found = arr.find(
          (x) => (x?.fields?.url || '').toLowerCase() === decodeURIComponent(slug).toLowerCase(),
        );
        // Si no lo encontró y hay mapeo, redirigimos automáticamente
        if (!found) {
          const target = SLUG_MAP[lang]?.[slug];
          if (target && target !== slug) {
            navigate(`/post/${target}`, { replace: true });
            return;
          }
        }
        setPost(found || null);
      })
      .catch(() => setPost(null))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [slug, lang, navigate]);

  if (loading) return <div className="container-fluid py-10 text-center">Loading…</div>;
  if (!post) return <div className="container-fluid py-10 alert alert-warning">Not found.</div>;

  const title = post?.fields?.['page-title'] || post?.fields?.title || 'Untitled';
  const content = post?.fields?.content || '';

  return (
    <div className="container-fluid py-10">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <h1 className="fw-bolder mb-4">{title}</h1>
          <article
            className="prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content, { ADD_ATTR: ['target'] }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
