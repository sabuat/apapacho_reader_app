# Apapacho Reader - TODO

## Fase 1: Configuración y Diseño
- [x] Configurar tema visual con colores de Apapacho
- [x] Crear logo e iconos de la app (usando favicon de Apapacho)
- [x] Actualizar app.config.ts con nombre y branding
- [x] Configurar tipografías (Playfair Display, Lato)

## Fase 2: Autenticación y Backend
- [x] Implementar registro de usuarios (usando Manus OAuth)
- [x] Implementar login de usuarios (usando Manus OAuth)
- [x] Configurar base de datos para usuarios
- [ ] Implementar recuperación de contraseña
- [x] Configurar sesiones y tokens JWT (Manus OAuth)

## Fase 3: Biblioteca de Libros
- [x] Crear estructura de datos para libros
- [x] Crear estructura de datos para capítulos
- [x] Desarrollar pantalla de biblioteca (Home)
- [ ] Implementar búsqueda y filtros de libros
- [x] Mostrar portadas y metadatos de libros
- [ ] Implementar paginación/scroll infinito

## Fase 4: Lector de Capítulos
- [x] Desarrollar pantalla del lector
- [x] Implementar navegación entre capítulos
- [x] Agregar controles de tamaño de fuente
- [ ] Agregar controles de brillo
- [x] Implementar seguimiento de progreso de lectura (hook creado)
- [ ] Guardar posición de lectura en base de datos
- [ ] Implementar marcadores (bookmarks)

## Fase 5: Sistema de Publicidad
- [x] Diseñar banners publicitarios
- [x] Implementar lógica de mostrar publicidad cada 3 capítulos
- [ ] Integrar con servicio de ads (Google AdMob o similar)
- [x] Hacer publicidad no intrusiva

## Fase 6: Notificaciones
- [ ] Configurar push notifications con Expo
- [ ] Crear tabla de notificaciones en BD
- [ ] Implementar notificaciones para nuevos libros
- [x] Crear pantalla de historial de notificaciones
- [ ] Implementar preferencias de notificaciones

## Fase 7: Perfil de Usuario
- [x] Desarrollar pantalla de perfil
- [x] Mostrar información del usuario
- [ ] Mostrar libros en progreso
- [ ] Mostrar historial de lectura
- [ ] Implementar edición de perfil
- [ ] Implementar cambio de contraseña

## Fase 8: Webinars
- [ ] Crear estructura de datos para webinars
- [x] Desarrollar pantalla de webinars
- [ ] Implementar reproductor de video
- [ ] Agregar lista de reproducción
- [ ] Implementar descarga de recursos

## Fase 9: Panel de Administración Web
- [x] Crear esquema de base de datos para libros, capítulos, webinars
- [x] Crear funciones de base de datos (db.ts)
- [x] Crear rutas tRPC para API
- [x] Crear pantalla de admin para gestionar contenido
- [ ] Crear formularios para crear/editar libros
- [ ] Crear formularios para crear/editar capítulos
- [ ] Crear formularios para crear/editar webinars
- [ ] Crear dashboard con estadísticas

## Fase 10: Integración App-Backend
- [x] Actualizar app para consultar libros desde API
- [x] Actualizar app para consultar capítulos desde API
- [x] Actualizar app para consultar webinars desde API
- [ ] Implementar sincronización de progreso de lectura

## Fase 11: UI/UX y Pulido
- [ ] Aplicar identidad visual completa
- [ ] Revisar y mejorar transiciones
- [ ] Optimizar rendimiento
- [ ] Pruebas en iOS y Android
- [ ] Pruebas en web
- [ ] Revisar accesibilidad

## Fase 12: Entrega
- [ ] Crear checkpoint final
- [ ] Documentar instrucciones de uso
- [ ] Preparar para publicación
