const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function api(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: {},
    credentials: 'include',
  };
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }

  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  console.log(`[API] ${method} ${url}`);
  try {
    const res = await fetch(url, opts);
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
    console.log(`[API Response] Status: ${res.status}, Data:`, data);
    if (!res.ok) {
      console.error(`[API Error] ${res.status}: ${data?.message || 'Unknown error'}`);
    }
    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    console.error(`[API Network Error]`, error);
    throw error;
  }
}
