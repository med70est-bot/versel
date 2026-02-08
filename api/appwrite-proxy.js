// api/appwrite-proxy.js - VERSIÓN CORREGIDA
export default async function handler(request, response) {
  console.log('🔔 Función API llamada:', {
    method: request.method,
    url: request.url,
    time: new Date().toISOString()
  });

  try {
    // Configurar CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Manejar preflight
    if (request.method === 'OPTIONS') {
      return response.status(200).end();
    }

    // Solo GET por ahora
    if (request.method !== 'GET') {
      return response.status(405).json({ 
        error: 'Método no permitido. Usa GET.' 
      });
    }

    // Respuesta de prueba exitosa
    return response.status(200).json({
      success: true,
      message: '✅ ¡Backend de Green Net funcionando!',
      endpoint: '/api/appwrite-proxy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      nextStep: 'Conectar a Appwrite'
    });

  } catch (error) {
    console.error('❌ Error en función:', error);
    return response.status(500).json({
      error: 'Error interno',
      message: error.message
    });
  }
}
