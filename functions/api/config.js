// Cloudflare Pages Function for Configuration API
// 处理 /api/config 路径的请求

// Configuration
const API_BASE_URL = 'https://z-api.aioec.tech/proxy/generate';

// Main request handler
export async function onRequest(context) {
  const { request, env } = context;

  // 只允许 GET 请求
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  try {
    const config = {
      apiBaseUrl: API_BASE_URL,
      // 添加前端可能需要的其他配置
      features: {
        randomSeed: true,
        seedControl: true,
        galleryStats: true,
        localStorage: true
      },
      limits: {
        maxSeed: 1000000000,
        minSeed: 0,
        maxGalleryCols: 4,
        minGalleryCols: 1
      }
    };

    return new Response(JSON.stringify(config), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Configuration error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

// 处理 OPTIONS 请求 (CORS 预检)
export function onOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}