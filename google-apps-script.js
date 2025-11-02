// Google Apps Script para recibir formularios de TalentoLocal
// Instrucciones de implementación al final del archivo

function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Leads');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Leads');
      // Add headers
      sheet.appendRow([
        'Fecha',
        'Nombre',
        'WhatsApp',
        'Email',
        'Sector',
        'Nivel Inglés',
        'Experiencia',
        'Disponibilidad',
        'CV Link',
        'Source',
        'User Agent',
        'Referrer',
        'Timestamp'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 13);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0f172a');
      headerRange.setFontColor('#ffffff');
    }
    
    // Prepare row data
    const timestamp = new Date();
    const row = [
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
      data.nombre || '',
      data.whatsapp || '',
      data.email || '',
      data.sector || '',
      data.ingles || '',
      data.experiencia || '',
      data.disponibilidad || '',
      data.cv || '',
      data._source || '',
      data._userAgent || '',
      data._referrer || '',
      data._timestamp || ''
    ];
    
    // Append data to sheet
    sheet.appendRow(row);
    
    // Send notification email (optional)
    sendNotificationEmail(data);
    
    // Send auto-response WhatsApp (optional - requires integration)
    // sendWhatsAppMessage(data.whatsapp);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Aplicación recibida correctamente' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    Logger.log('Error processing form: ' + error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Send email notification when new lead arrives
function sendNotificationEmail(data) {
  try {
    const recipient = 'hola@talentolocal.net'; // Change this to your email
    const subject = `Nueva aplicación: ${data.nombre}`;
    
    const body = `
      Nueva aplicación recibida en TalentoLocal:
      
      Nombre: ${data.nombre}
      WhatsApp: ${data.whatsapp}
      Email: ${data.email}
      Sector: ${data.sector}
      Nivel de Inglés: ${data.ingles}
      Experiencia: ${data.experiencia}
      Disponibilidad: ${data.disponibilidad}
      CV: ${data.cv || 'No proporcionado'}
      
      Fuente: ${data._source}
      Fecha: ${new Date(data._timestamp).toLocaleString('es-DO')}
      
      ---
      Contacta al candidato lo antes posible por WhatsApp: ${data.whatsapp}
    `;
    
    MailApp.sendEmail(recipient, subject, body);
    
  } catch (error) {
    Logger.log('Error sending email: ' + error.toString());
  }
}

// Optional: Test function
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Juan Pérez',
        whatsapp: '809-555-1234',
        email: 'juan@example.com',
        sector: 'Piantini',
        ingles: 'Intermedio',
        experiencia: '6-12 meses',
        disponibilidad: 'Full-time',
        cv: 'https://drive.google.com/test',
        _source: 'talentolocal.net',
        _timestamp: new Date().toISOString(),
        _userAgent: 'Test Browser',
        _referrer: 'Direct'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

/*
INSTRUCCIONES DE IMPLEMENTACIÓN:

1. Crear un Google Spreadsheet nuevo
   - Ve a https://sheets.google.com
   - Crea una nueva hoja de cálculo
   - Nómbrala "TalentoLocal Leads"

2. Abrir el editor de Apps Script
   - En tu spreadsheet, ve a Extensiones > Apps Script
   - Borra el código predeterminado
   - Copia y pega este código completo

3. Configurar el script
   - Cambia el email en sendNotificationEmail() por tu correo real
   - Guarda el proyecto (Ctrl+S o Cmd+S)
   - Nombra el proyecto como "TalentoLocal Form Handler"

4. Implementar como Web App
   - Haz clic en "Implementar" > "Nueva implementación"
   - Selecciona tipo: "Aplicación web"
   - Descripción: "TalentoLocal Form Endpoint"
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquier usuario"
   - Haz clic en "Implementar"
   - Copia la URL de la aplicación web

5. Configurar en el sitio web
   - Abre script.js en tu proyecto
   - Busca la línea: FORM_ENDPOINT: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   - Reemplaza con la URL que copiaste en el paso anterior
   - Guarda y sube los cambios

6. Probar el formulario
   - Abre tu sitio web
   - Completa el formulario de aplicación
   - Verifica que los datos lleguen al Google Sheet
   - Verifica que recibas el email de notificación

7. (Opcional) Automatizaciones adicionales
   - Configura reglas de notificación en Gmail
   - Conecta con Zapier/Make para integrar con tu CRM
   - Agrega respuestas automáticas por email

NOTAS:
- El script maneja errores automáticamente
- Los datos se guardan incluso si el email falla
- Puedes personalizar los campos según tus necesidades
- Para producción, considera agregar validación adicional
- Mantén el spreadsheet privado (solo tú con acceso)

SEGURIDAD:
- El endpoint es público pero solo acepta POST
- Los datos se guardan en tu Google Drive privado
- Considera agregar reCAPTCHA en el frontend si recibes spam
- Revisa los logs regularmente en Apps Script
*/

