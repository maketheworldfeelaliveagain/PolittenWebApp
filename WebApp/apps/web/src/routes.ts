import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
 route('partijos/:partyId', 'routes/party.tsx'),
 route('pazadai', 'routes/promises.tsx'),
 route('pazadai/:promiseId', 'routes/promise.tsx'),
 route('llms.txt', 'routes/llms.txt.ts'),
 route('*', 'routes/not-found.tsx'),
 
	route('sitemap.xml', 'routes/sitemap.xml.ts'),
	route('robots.txt', 'routes/robots.txt.ts'),
	route('api/health', 'routes/api.health.ts'),
	route('api/*', 'routes/api.$.ts'),
] satisfies RouteConfig;
