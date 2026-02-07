// Este archivo conectará tu panel a Appwrite
export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const { action, data } = req.body;
    
    // Tus credenciales de Appwrite (SEGURAS aquí en el backend)
    const APPWRITE_CONFIG = {
      endpoint: 'https://sfo.cloud.appwrite.io/v1',
      projectId: '6983d79c003274653ed4',
      apiKey: process.env.APPWRITE_API_KEY || 'tu-api-key-aqui',
      databaseId: 'inventario-db',
      tableId: 'transactions'
    };
    
    let response;
    
    switch(action) {
      case 'getTransactions':
        response = await fetch(
          `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/tables/${APPWRITE_CONFIG.tableId}/documents`,
          {
            headers: {
              'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
              'X-Appwrite-Key': APPWRITE_CONFIG.apiKey,
              'Content-Type': 'application/json'
            }
          }
        );
        break;
        
      default:
        return res.status(400).json({ error: 'Acción no válida' });
    }
    
    const result = await response.json();
    res.status(200).json(result);
    
  } catch (error) {
    console.error('Error en proxy:', error);
    res.status(500).json({ 
      error: 'Error del servidor',
      message: error.message 
    });
  }
}