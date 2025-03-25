require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Verificar que las variables de entorno estén definidas
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL y SUPABASE_KEY deben estar definidos en el archivo .env');
  process.exit(1);
}

// Crear y exportar el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
