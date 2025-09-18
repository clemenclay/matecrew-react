import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const navCls = ({ isActive }) => `nav-link fs-4 fw-bold text-dark link-primary${isActive ? ' active' : ''}`;

function setLang(code) {
  localStorage.setItem('lang', code);
  document.documentElement.setAttribute('lang', code);
  window.dispatchEvent(new CustomEvent('lang-changed', { detail: code }));
}
function getLang() { return localStorage.getItem('lang') || 'en'; }

// function Topbar() {
//   return (
//     <div className="topbar-image bg-primary py-1 rounded-0 mb-0 alert alert-dismissible fade show" role="alert">
//       <div className="d-flex justify-content-center gap-sm-3 gap-2 align-items-center text-center flex-md-nowrap flex-wrap">
//         <span className="badge bg-white bg-opacity-10 fs-2 fw-bolder px-2">New</span>
//         <p className="mb-0 text-white fw-bold">Frontend Pages Included!</p>
//       </div>
//       <button type="button" className="btn-close btn-close-white p-2 fs-2" data-bs-dismiss="alert" aria-label="Close"></button>
//     </div>
//   );
// }

function Footer() {
  return (
    <footer>
      <div className="container-fluid">
        <div className="border-bottom">
          <div className="row mb-sm-12 mb-4">
            <div className="col-md-3 col-6">
              <h3 className="fs-4 fw-semibold mb-7">Applications</h3>
              <ul className="d-flex flex-column gap-9">
                <li><Link to="/blog" className="fs-4 text-body link-primary">Blog</Link></li>
                <li><Link to="/admin/sample-page" className="fs-4 text-body link-primary">Calendar</Link></li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h3 className="fs-4 fw-semibold mb-7">Forms</h3>
              <ul className="d-flex flex-column gap-9">
                <li><Link to="/admin/sample-page" className="fs-4 text-body link-primary">Form Wizard</Link></li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h3 className="fs-4 fw-semibold mb-7">Tables</h3>
              <ul className="d-flex flex-column gap-9">
                <li><Link to="/admin/sample-page" className="fs-4 text-body link-primary">Basic Table</Link></li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h3 className="fs-4 fw-semibold mb-7">Follow us</h3>
              <div className="d-flex gap-9">
                <a href="#"><img src="/assets/images/frontend-pages/icon-facebook.svg" alt="facebook" /></a>
                <a href="#"><img src="/assets/images/frontend-pages/icon-twitter.svg" alt="twitter" /></a>
                <a href="#"><img src="/assets/images/frontend-pages/icon-instagram.svg" alt="instagram" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between py-7 flex-md-nowrap flex-wrap gap-sm-0 gap-3">
          <div className="d-flex gap-3 align-items-center">
            <img src="/assets/images/logos/favicon.png" alt="icon" />
            <p className="fs-4 mb-0">All rights reserved by Modernize.</p>
          </div>
          <div>
            <p className="mb-0">Produced by <a target="_blank" rel="noreferrer" href="https://adminmart.com/" className="text-primary link-primary">AdminMart</a>.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollTop() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="top-btn btn btn-primary d-flex align-items-center justify-content-center round-54 p-0 rounded-circle"
      style={{ position: 'fixed', right: 24, bottom: 24, display: show ? 'flex' : 'none', zIndex: 1030 }}
      aria-label="Scroll to top"
    >
      <i className="ti ti-arrow-up fs-7" />
    </button>
  );
}

export default function FrontLayout() {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => { document.documentElement.setAttribute('lang', getLang()); }, []);
  const change = (code) => { setLangState(code); setLang(code); };

  return (
    <>
      <div className="topbar-image bg-primary py-1 rounded-0 mb-0 alert alert-dismissible fade show" role="alert">
        <div className="d-flex justify-content-center gap-sm-3 gap-2 align-items-center text-center flex-md-nowrap flex-wrap">
          <span className="badge bg-white bg-opacity-10 fs-2 fw-bolder px-2">New</span>
          <p className="mb-0 text-white fw-bold">Frontend Pages Included!</p>
        </div>
        <button type="button" className="btn-close btn-close-white p-2 fs-2" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

      <header className="header-fp p-0 w-100 header-sticky">
        <nav className="navbar navbar-expand-lg bg-primary-subtle py-2 py-lg-10">
          <div className="custom-container d-flex align-items-center justify-content-between">
            <Link to="/" className="text-nowrap logo-img">
              <img src="/assets/images/logos/dark-logo.svg" className="dark-logo" alt="Logo-Dark" />
              <img src="/assets/images/logos/light-logo.svg" className="light-logo" alt="Logo-light" style={{ display: 'none' }} />
            </Link>

            <button className="navbar-toggler border-0 p-0 shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
              <i className="ti ti-menu-2 fs-8"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 gap-xl-7 gap-8 mb-lg-0">
                <li className="nav-item"><NavLink className={navCls} to="/about">About Us</NavLink></li>
                <li className="nav-item"><NavLink className={navCls} to="/blog" end>Blog</NavLink></li>
                <li className="nav-item dropdown">
                  <NavLink className={navCls} to="/portfolio">
                    <span className="d-flex gap-2">Portfolio <span className="badge text-primary bg-primary-subtle fs-2 fw-bolder hstack">New</span></span>
                  </NavLink>
                </li>
                <li className="nav-item"><NavLink className={navCls} to="/admin">Dashboard</NavLink></li>
                <li className="nav-item"><NavLink className={navCls} to="/pricing">Pricing</NavLink></li>
                <li className="nav-item"><NavLink className={navCls} to="/contact">Contact</NavLink></li>
              </ul>

              <div className="dropdown me-3">
                <button className="btn btn-light d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-expanded="false">
                  <span style={{ fontSize: 18 }}>{lang === 'es' ? '🇪🇸' : '🇺🇸'}</span>
                  <span className="fw-semibold">{lang === 'es' ? 'Español' : 'English'}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><button className="dropdown-item d-flex align-items-center gap-2" onClick={() => change('en')}><span style={{ fontSize: 18 }}>🇺🇸</span> English</button></li>
                  <li><button className="dropdown-item d-flex align-items-center gap-2" onClick={() => change('es')}><span style={{ fontSize: 18 }}>🇪🇸</span> Español</button></li>
                </ul>
              </div>

              <div><Link to="/auth/login" className="btn btn-primary py-8 px-9">Log In</Link></div>
            </div>
          </div>
        </nav>
      </header>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <Link to="/"><img src="/assets/images/logos/dark-logo.svg" alt="Logo-light" /></Link>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled ps-0">
            <li className="mb-1"><NavLink to="/about" className="px-0 fs-4 d-block text-dark link-primary w-100 py-2">About Us</NavLink></li>
            <li className="mb-1"><NavLink to="/blog" className="px-0 fs-4 d-block w-100 py-2 text-dark link-primary">Blog</NavLink></li>
            <li className="mb-1">
              <NavLink to="/portfolio" className="px-0 fs-4 d-flex align-items-center justify-content-start gap-2 w-100 py-2 text-dark link-primary">
                Portfolio <span className="badge text-primary bg-primary-subtle fs-2 fw-bolder hstack">New</span>
              </NavLink>
            </li>
            <li className="mb-1"><NavLink to="/admin" className="px-0 fs-4 d-block w-100 py-2 text-dark link-primary">Dashboard</NavLink></li>
            <li className="mb-1"><NavLink to="/pricing" className="px-0 fs-4 d-block w-100 py-2 text-dark link-primary">Pricing</NavLink></li>
            <li className="mb-1"><NavLink to="/contact" className="px-0 fs-4 d-block w-100 py-2 text-dark link-primary">Contact</NavLink></li>
            <li className="mt-3"><Link to="/auth/login" className="btn btn-primary w-100">Log In</Link></li>
          </ul>
        </div>
      </div>

      <main className="main-wrapper overflow-hidden">
        <Outlet />
      </main>

      <Footer />
      <ScrollTop />
    </>
  );
}
