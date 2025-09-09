// src/components/cms/HtmlContent.jsx
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

export default function HtmlContent({ html = '' }) {
  const safe = useMemo(() => DOMPurify.sanitize(html, { USE_PROFILES: { html: true } }), [html]);
  return <div dangerouslySetInnerHTML={{ __html: safe }} />;
}

HtmlContent.propTypes = {
  html: PropTypes.string,
};
