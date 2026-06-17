import type { APIRoute } from 'astro';
import { kv } from '@vercel/kv';

export const prerender = false;

export const GET: APIRoute = async () => {
	try {
		const count = await kv.incr('visits');
		return new Response(JSON.stringify({ count }), {
			headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
		});
	} catch {
		return new Response(JSON.stringify({ count: null }), {
			status: 503,
			headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
		});
	}
};
