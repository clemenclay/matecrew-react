// src/views/apps/blog/Posts.jsx
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchPages } from '../../../lib/cmsClient';
import {
  Grid, Card, CardContent, CardActions, Typography, Button, Stack, Chip
} from '@mui/material';

export default function Posts() {
  const [state, setState] = useState({ loading: true, error: null, pages: [] });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchPages();
        if (!alive) return;
        setState({ loading: false, error: null, pages: Array.isArray(data) ? data : [] });
      } catch (e) {
        if (!alive) return;
        setState({ loading: false, error: e.message || 'Error', pages: [] });
      }
    })();
    return () => { alive = false; };
  }, []);

  if (state.loading) return <Typography>Cargando…</Typography>;
  if (state.error) return <Typography color="error">{state.error}</Typography>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>Blog</Typography>
        <Chip label={`${state.pages.length} páginas`} />
      </Stack>
      <Grid container spacing={3}>
        {state.pages.map((p) => {
          const slug = p?.fields?.['url'];
          const title = p?.fields?.['page-title'] || slug || p.uuid;
          const date = p?.published_at ? new Date(p.published_at) : null;
          const dateStr = date ? date.toLocaleString() : '';
          return (
            <Grid item xs={12} md={6} lg={4} key={p.uuid}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} variant="outlined">
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{title}</Typography>
                  <Typography variant="body2" color="text.secondary">{dateStr}</Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    variant="contained"
                    component={RouterLink}
                    to={`/apps/blog/post/${slug}`}
                    disabled={!slug}
                  >
                    Leer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
