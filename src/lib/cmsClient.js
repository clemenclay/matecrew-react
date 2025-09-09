// src/lib/cmsClient.js
const BASE_URL = import.meta.env.VITE_CMS_BASE_URL || 'https://cms.speednova.com/api';
const PROJECT_ID = import.meta.env.VITE_CMS_PROJECT_ID || '';
const TOKEN = import.meta.env.VITE_CMS_TOKEN || '';
const LOCALE = import.meta.env.VITE_CMS_LOCALE || 'es';

function makeUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}/${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  return url.toString();
}

const defaultHeaders = {
  Accept: 'application/json',
  ...(PROJECT_ID ? { 'project-id': PROJECT_ID } : {}),
  ...(TOKEN ? { Authorization: TOKEN } : {}),
};

export async function fetchPages({ limit, sort = 'published_at,DESC', locale = LOCALE } = {}) {
  const url = makeUrl('pages', { locale, sort, ...(limit ? { limit } : {}) });
  const res = await fetch(url, { headers: defaultHeaders });
  if (!res.ok) throw new Error(`CMS error ${res.status}`);
  return res.json();
}

export async function fetchPageBySlug(slug, { locale = LOCALE } = {}) {
  const pages = await fetchPages({ locale });
  return pages.find(p => p?.fields?.['url'] === slug) || null;
}
