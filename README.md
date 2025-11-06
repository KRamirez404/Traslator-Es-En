# Traductor Español-Inglés / Spanish-English Translator

Una aplicación full-stack para traducir entre español e inglés con funcionalidad CRUD para gestionar un diccionario de palabras.

A full-stack application to translate between Spanish and English with CRUD functionality to manage a word dictionary.

## Características / Features

- ✅ Traducción bidireccional (Español ↔ Inglés)
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar palabras)
- ✅ API RESTful con Node.js + Express
- ✅ Base de datos MySQL
- ✅ Interfaz de usuario moderna con React
- ✅ Responsive design

## Tecnologías / Technologies

### Backend
- Node.js
- Express.js
- MySQL2
- CORS
- dotenv

### Frontend
- React 18
- Axios
- CSS3

## Requisitos Previos / Prerequisites

- Node.js (v14 o superior / v14 or higher)
- MySQL (v5.7 o superior / v5.7 or higher)
- npm o yarn

## Instalación / Installation

### 1. Clonar el repositorio / Clone the repository
```bash
git clone https://github.com/KRamirez404/Traslator-Es-En.git
cd Traslator-Es-En
```

### 2. Configurar la base de datos / Set up the database

Asegúrate de tener MySQL ejecutándose. La aplicación creará automáticamente la base de datos y las tablas necesarias.

Make sure MySQL is running. The application will automatically create the necessary database and tables.

### 3. Configurar el Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` basado en `.env.example`:
Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de MySQL:
Edit the `.env` file with your MySQL credentials:

```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=translator_db
DB_PORT=3306
```

### 4. Configurar el Frontend

```bash
cd ../frontend
npm install
```

## Ejecutar la Aplicación / Run the Application

### Iniciar el Backend / Start the Backend

```bash
cd backend
npm start
```

El servidor estará disponible en: `http://localhost:3001`
The server will be available at: `http://localhost:3001`

### Iniciar el Frontend / Start the Frontend

En otra terminal / In another terminal:

```bash
cd frontend
npm start
```

La aplicación se abrirá automáticamente en: `http://localhost:3000`
The application will open automatically at: `http://localhost:3000`

## API Endpoints

### Traducciones / Translations

- `GET /api/translations` - Obtener todas las traducciones / Get all translations
- `GET /api/translations/:id` - Obtener una traducción por ID / Get translation by ID
- `POST /api/translations` - Crear nueva traducción / Create new translation
- `PUT /api/translations/:id` - Actualizar traducción / Update translation
- `DELETE /api/translations/:id` - Eliminar traducción / Delete translation

### Traducir / Translate

- `GET /api/translate/es-en/:word` - Traducir de español a inglés / Translate Spanish to English
- `GET /api/translate/en-es/:word` - Traducir de inglés a español / Translate English to Spanish

## Estructura del Proyecto / Project Structure

```
Traslator-Es-En/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── translationController.js
│   │   ├── routes/
│   │   │   └── translations.js
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dictionary.js
│   │   │   └── Translator.js
│   │   ├── services/
│   │   │   └── translationService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   └── package.json
└── README.md
```

## Uso / Usage

### Agregar una traducción / Add a translation

1. Ve a la pestaña "Dictionary" / Go to the "Dictionary" tab
2. Ingresa la palabra en español e inglés / Enter the Spanish and English words
3. Haz clic en "Add Translation" / Click "Add Translation"

### Traducir una palabra / Translate a word

1. Ve a la pestaña "Translator" / Go to the "Translator" tab
2. Selecciona la dirección de traducción / Select translation direction
3. Ingresa la palabra / Enter the word
4. Haz clic en "Translate" / Click "Translate"

### Editar una traducción / Edit a translation

1. En la tabla del diccionario, haz clic en "Edit" / In the dictionary table, click "Edit"
2. Modifica los campos / Modify the fields
3. Haz clic en "Update Translation" / Click "Update Translation"

### Eliminar una traducción / Delete a translation

1. En la tabla del diccionario, haz clic en "Delete" / In the dictionary table, click "Delete"
2. Confirma la acción / Confirm the action

## Contribuir / Contributing

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

Contributions are welcome. Please open an issue or pull request.

## Licencia / License

ISC