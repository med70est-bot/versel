export default async function handler(req, res) {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Appwrite-Project, X-Appwrite-Key');
  
  // Responder a preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Credenciales de Appwrite
    const APPWRITE_CONFIG = {
      endpoint: 'https://sfo.cloud.appwrite.io/v1',
      projectId: '6983d79c003274653ed4',
      apiKey: process.env.APPWRITE_API_KEY || 'sk_live_...', // <-- Tu API Key aquí temporalmente
      databaseId: 'inventario-db',
      tableId: 'transactions'
    };
    
    console.log('Solicitud recibida:', req.method, req.url);
    
    // Solo aceptamos GET por ahora
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Método no permitido' });
    }
    
    // Construir URL para Appwrite
    const appwriteUrl = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/tables/${APPWRITE_CONFIG.tableId}/documents`;
    
    console.log('Conectando a:', appwriteUrl);
    
    // Hacer la solicitud a Appwrite
    const response = await fetch(appwriteUrl, {
      headers: {
        'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
        'X-Appwrite-Key': APPWRITE_CONFIG.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('Respuesta de Appwrite:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Appwrite:', errorText);
      return res.status(response.status).json({ 
        error: 'Error de Appwrite', 
        status: response.status,
        message: errorText
      });
    }
    
    const data = await response.json();
    console.log('Datos recibidos:', data.documents ? data.documents.length : 0, 'documentos');
    
    // Devolver datos
    return res.status(200).json({
      success: true,
      documents: data.documents || [],
      total: data.total || 0
    });
    
  } catch (error) {
    console.error('Error en proxy:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
