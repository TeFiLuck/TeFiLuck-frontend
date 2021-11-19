// @ts-ignore
window.global = window;

// @ts-ignore
import('../polyfills/polyfills').then(() => import('./app-bootstrap'));
