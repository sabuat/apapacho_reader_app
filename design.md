# Diseño de Interfaz Móvil - Apapacho Reader

## Concepto Visual
La aplicación sigue la identidad visual de Editorial Apapacho: elegante, minimalista, con tipografías clásicas (Playfair Display para títulos) y modernas (Lato para cuerpo). Los colores principales son dorado, azul suave y rojo terracota sobre fondo blanco.

## Paleta de Colores
- **Dorado (Primario)**: #C5A059 - Usado en botones, acentos y elementos destacados
- **Azul (Secundario)**: #8C97AE - Usado en enlaces y elementos interactivos
- **Rojo/Terracota**: #9E4747 - Usado en alertas y estados especiales
- **Fondo**: #FFFFFF - Blanco puro
- **Texto Principal**: #2D2D20 - Gris oscuro
- **Texto Secundario**: #687076 - Gris medio
- **Bordes**: #E5E7EB - Gris claro

## Tipografías
- **Títulos**: Playfair Display (serif) - Elegante y clásica
- **Cuerpo**: Lato (sans-serif) - Moderna y legible
- **Monoespaciada**: Quicksand (para números y datos)

## Pantallas Principales

### 1. Home (Biblioteca)
**Contenido**: Galería de libros disponibles con portadas, títulos, autores y sinopsis breve.
**Funcionalidad**: Scroll vertical de libros, búsqueda/filtros, acceso rápido a libros recientes.
**Elementos**: Portadas como tarjetas con sombra suave, botón "Leer" destacado en dorado.

### 2. Lector de Capítulos
**Contenido**: Texto del capítulo con tipografía legible, controles de tamaño de fuente, brillo.
**Funcionalidad**: Navegación entre capítulos, marcador de progreso, seguimiento de lectura.
**Publicidad**: Banner publicitario cada 3-5 capítulos (no intrusivo, al final de sección).
**Elementos**: Barra superior con título del libro, barra inferior con navegación.

### 3. Perfil de Usuario
**Contenido**: Información del usuario, libros en progreso, historial de lectura, preferencias.
**Funcionalidad**: Editar perfil, cambiar contraseña, preferencias de notificaciones.
**Elementos**: Avatar, nombre, email, lista de libros con progreso.

### 4. Webinars
**Contenido**: Galería de videos sobre escritura y lectura creativa.
**Funcionalidad**: Reproducción de videos, lista de reproducción, descarga de recursos.
**Elementos**: Miniaturas de video, duración, descripción, autor.

### 5. Notificaciones
**Contenido**: Historial de notificaciones sobre nuevos libros y eventos.
**Funcionalidad**: Marcar como leído, eliminar, configurar preferencias.
**Elementos**: Lista con fecha, tipo de notificación, acceso directo al libro.

## Navegación (Tab Bar)
1. **Home** - Biblioteca de libros (icono: casa)
2. **Lectura** - Libros en progreso (icono: libro abierto)
3. **Webinars** - Videos educativos (icono: play)
4. **Perfil** - Usuario y configuración (icono: usuario)

## Flujos de Usuario Principales

### Flujo 1: Registro e Inicio de Sesión
1. Usuario abre app → Pantalla de bienvenida
2. Toca "Registrarse" → Formulario con email, contraseña, nombre
3. Confirma email → Acceso a biblioteca
4. Alternativa: Inicia sesión si ya tiene cuenta

### Flujo 2: Lectura de Libro
1. Usuario selecciona libro en biblioteca → Pantalla de detalles
2. Toca "Leer" → Abre lector en primer capítulo no leído
3. Lee capítulos, progreso se guarda automáticamente
4. Cada 3-5 capítulos: muestra publicidad breve
5. Puede cambiar tamaño de fuente, brillo, tema (claro/oscuro)

### Flujo 3: Notificaciones
1. Nuevo libro publicado → Notificación push
2. Usuario toca notificación → Va a detalles del libro
3. Puede marcar como "Leer después" o comenzar lectura inmediatamente

### Flujo 4: Webinars
1. Usuario abre tab de Webinars → Lista de videos
2. Toca video → Reproductor a pantalla completa
3. Puede descargar recursos asociados (PDF, etc.)

## Consideraciones de Diseño
- **Orientación**: Portrait (vertical) - optimizado para una mano
- **SafeArea**: Respeta notch y home indicator en dispositivos modernos
- **Accesibilidad**: Contraste suficiente, tamaños de toque mínimo 44x44pt
- **Tema Oscuro**: Soporta light/dark mode automático
- **Rendimiento**: Lazy loading de portadas, virtualización de listas largas

## Componentes Reutilizables
- **BookCard**: Tarjeta de libro con portada, título, autor
- **ChapterItem**: Elemento de capítulo en lista
- **ProgressBar**: Barra de progreso de lectura
- **AdBanner**: Banner publicitario
- **VideoThumbnail**: Miniatura de video para webinars
