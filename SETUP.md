# Quick Setup Guide / Guía de Configuración Rápida

## Option 1: Using Docker (Recommended) / Opción 1: Usando Docker (Recomendado)

This is the easiest way to run the application. Make sure you have Docker and Docker Compose installed.

Esta es la forma más fácil de ejecutar la aplicación. Asegúrate de tener Docker y Docker Compose instalados.

```bash
# Clone the repository / Clonar el repositorio
git clone https://github.com/KRamirez404/Traslator-Es-En.git
cd Traslator-Es-En

# Start all services / Iniciar todos los servicios
docker-compose up -d

# The application will be available at / La aplicación estará disponible en:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:3001
# - MySQL: localhost:3306
```

To stop the services / Para detener los servicios:
```bash
docker-compose down
```

To view logs / Para ver los logs:
```bash
docker-compose logs -f
```

## Option 2: Manual Setup / Opción 2: Configuración Manual

### Prerequisites / Requisitos previos:
- Node.js v14+ installed / Node.js v14+ instalado
- MySQL 5.7+ running / MySQL 5.7+ ejecutándose
- npm or yarn / npm o yarn

### Step 1: Setup MySQL Database / Paso 1: Configurar la base de datos MySQL

```bash
# Login to MySQL / Iniciar sesión en MySQL
mysql -u root -p

# Run the initialization script / Ejecutar el script de inicialización
mysql -u root -p < database/init.sql

# Or manually create the database / O crear la base de datos manualmente
# CREATE DATABASE translator_db;
```

### Step 2: Setup Backend / Paso 2: Configurar el Backend

```bash
cd backend

# Install dependencies / Instalar dependencias
npm install

# Create .env file from example / Crear archivo .env desde el ejemplo
cp .env.example .env

# Edit .env with your MySQL credentials / Editar .env con tus credenciales de MySQL
# nano .env

# Start the backend server / Iniciar el servidor backend
npm start

# For development with auto-reload / Para desarrollo con recarga automática
npm run dev
```

The backend will run on http://localhost:3001

### Step 3: Setup Frontend / Paso 3: Configurar el Frontend

```bash
# Open a new terminal / Abrir una nueva terminal
cd frontend

# Install dependencies / Instalar dependencias
npm install

# (Optional) Create .env file if you need custom API URL
# (Opcional) Crear archivo .env si necesitas URL personalizada
# cp .env.example .env

# Start the frontend development server / Iniciar el servidor de desarrollo
npm start
```

The frontend will automatically open at http://localhost:3000

## Testing the Application / Probando la Aplicación

Once both servers are running / Una vez que ambos servidores estén ejecutándose:

1. **Open your browser** to http://localhost:3000 / **Abre tu navegador** en http://localhost:3000

2. **Add a translation** / **Agregar una traducción**:
   - Go to "Dictionary" tab / Ve a la pestaña "Dictionary"
   - Enter a Spanish word and its English translation / Ingresa una palabra en español y su traducción al inglés
   - Click "Add Translation" / Haz clic en "Add Translation"

3. **Test translation** / **Probar traducción**:
   - Go to "Translator" tab / Ve a la pestaña "Translator"
   - Select translation direction / Selecciona la dirección de traducción
   - Enter a word you added / Ingresa una palabra que agregaste
   - Click "Translate" / Haz clic en "Translate"

## Troubleshooting / Solución de Problemas

### Backend won't start / El backend no inicia
- Check MySQL is running / Verifica que MySQL esté ejecutándose
- Verify .env credentials are correct / Verifica que las credenciales en .env sean correctas
- Check port 3001 is not in use / Verifica que el puerto 3001 no esté en uso

### Frontend can't connect to backend / El frontend no se conecta al backend
- Make sure backend is running on port 3001 / Asegúrate de que el backend esté ejecutándose en el puerto 3001
- Check browser console for CORS errors / Revisa la consola del navegador por errores de CORS
- Verify REACT_APP_API_URL in .env (if used) / Verifica REACT_APP_API_URL en .env (si se usa)

### Database connection errors / Errores de conexión a la base de datos
- Verify MySQL service is running / Verifica que el servicio MySQL esté ejecutándose
- Check database credentials in .env / Revisa las credenciales de la base de datos en .env
- Ensure database 'translator_db' exists / Asegúrate de que la base de datos 'translator_db' exista

## Default Translations / Traducciones Predeterminadas

The database initialization script includes 10 sample translations / El script de inicialización incluye 10 traducciones de ejemplo:

- hola → hello
- adiós → goodbye
- gracias → thank you
- por favor → please
- casa → house
- perro → dog
- gato → cat
- agua → water
- libro → book
- mesa → table
