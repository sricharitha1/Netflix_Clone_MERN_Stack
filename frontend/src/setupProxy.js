import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:9000',
    changeOrigin: true,
  }));
}
