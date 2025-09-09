import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CMS_BASE = 'https://cms.speednova.com/api';
const CMS_HEADERS = {
  Accept: 'application/json',
  'project-id': import.meta.env.VITE_CMS_PROJECT_ID || '',
  Authorization: import.meta.env.VITE_CMS_TOKEN || '',
};

export default function BlogPage() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // escuchar cambios del selector del header
  useEffect(() => {
    const onLang = (e) => setLang(e.detail || localStorage.getItem('lang') || 'en');
    window.addEventListener('lang-changed', onLang);
    return () => window.removeEventListener('lang-changed', onLang);
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`${CMS_BASE}/pages?locale=${lang}&sort=published_at,DESC`, { headers: CMS_HEADERS })
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => alive && setItems([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [lang]);

  return (
    <>
      {/* banner */}
      <section className="bg-primary-subtle py-14">
        <div className="container-fluid text-center">
          <p className="text-primary fs-4 fw-bolder">BLOG</p>
          <h1 className="fw-bolder fs-12">Our most recent articles</h1>
        </div>
      </section>

      {/* list */}
      <section className="pt-5 pt-md-14 pt-lg-12 pb-4 pb-md-5 pb-lg-14">
        <div className="container-fluid">
          {loading && <div className="py-10 text-center">Loading…</div>}

          {!loading && items.length === 0 && (
            <div className="alert alert-warning">
              No content for locale: <b>{lang}</b>
            </div>
          )}

          <div className="row">
            {items.map((p) => {
              const title = p?.fields?.['page-title'] || p?.fields?.title || 'Untitled';
              const slug = p?.fields?.url || p?.uuid;
              const preview =
                (p?.fields?.content || '')
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim()
                  .slice(0, 150) + '…';

              return (
                <div key={p.uuid} className="col-lg-4 col-md-6 mb-4">
                  <div className="card rounded-3 overflow-hidden h-100">
                    <Link to={`/post/${slug}`} className="position-relative">
                      <img
                        src="/assets/images/blog/blog-img1.jpg"
                        alt="cover"
                        className="w-100 img-fluid"
                      />
                      <div className="position-absolute bottom-0 end-0 me-9 mb-3">
                        <p className="text-dark fs-2 px-2 rounded-pill bg-white mb-0">2 min Read</p>
                      </div>
                    </Link>
                    <div className="mt-10 px-7 pb-7 d-flex flex-column gap-3 h-100">
                      <div className="d-flex">
                        <p className="fs-2 px-2 rounded-pill bg-muted bg-opacity-25 text-dark mb-0">
                          {lang === 'es' ? 'Contenido' : 'Content'}
                        </p>
                      </div>
                      <Link to={`/post/${slug}`} className="fs-15 fw-bolder">
                        {title}
                      </Link>
                      <p className="mb-0 fs-4 truncated-text">{preview}</p>
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-9">
                          <div className="d-flex gap-2">
                            <i className="ti ti-eye fs-5 text-dark"></i>
                            <p className="mb-0 fs-2 fw-semibold text-dark">—</p>
                          </div>
                          <div className="d-flex gap-2">
                            <i className="ti ti-message fs-5 text-dark"></i>
                            <p className="mb-0 fs-2 fw-semibold text-dark">—</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <i className="ti ti-circle fs-2"></i>
                          <p className="mb-0 fs-2 fw-semibold text-dark">
                            {new Date(p.published_at).toLocaleDateString(lang)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA del template */}
      <section className="mb-5 mb-md-14 mb-lg-12">
        <div className="custom-container">
          <div className="bg-primary-subtle rounded-3 position-relative overflow-hidden">
            <div className="row">
              <div className="col-lg-6">
                <div className="py-lg-12 ps-lg-12 py-5 px-lg-0 px-9">
                  <h2 className="fs-10 fw-bolder text-lg-start text-center">
                    Develop with feature-rich Bootstrap Dashboard
                  </h2>
                  <div className="d-flex justify-content-lg-start justify-content-center gap-3 my-4 flex-sm-nowrap flex-wrap">
                    <Link to="/auth/login" className="btn btn-primary py-6 px-9">
                      Member Login
                    </Link>
                    <Link to="/auth/login" className="btn btn-outline-primary py-6 px-9">
                      Register as Member
                    </Link>
                  </div>
                  <p className="fs-3 text-lg-start text-center mb-0">
                    <span className="fw-bolder">One-time purchase</span> - no recurring fees.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-lg-block d-none">
                <img
                  src="/assets/images/frontend-pages/design-collection.png"
                  alt="banner"
                  className="position-absolute develop-feature-rich"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
