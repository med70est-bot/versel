// api/appwrite-proxy.mjs - VERSIÓN .MJS
export default async function handler(req, res) {
  console.log('🚀 API Function Called at:', new Date().toISOString());
  
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Respuesta de prueba
  return res.status(200).json({
    success: true,
    message: '🎉 ¡GREEN NET BACKEND FUNCIONANDO!',
    timestamp: new Date().toISOString(),
    path: '/api/appwrite-proxy',
    method: req.method,
    note: 'Próximo paso: Conectar a Appwrite'
  });
}
