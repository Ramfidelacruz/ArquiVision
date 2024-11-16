require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const options = {
    auth: {
        persistSession: false
    }
};

try {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY,
        options
    );
    
    console.log('Cliente Supabase creado exitosamente');
    
    // Prueba simple de conexión
    supabase.from('test').select('*').limit(1)
        .then(() => console.log('Conexión a Supabase verificada'))
        .catch(err => console.error('Error al verificar conexión:', err));

    module.exports = supabase;
} catch (error) {
    console.error('Error al crear cliente Supabase:', error);
    throw error;
}
