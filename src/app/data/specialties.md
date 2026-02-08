# Especialties data — Comentario general

Este archivo `specialties.json` contiene una lista de especialidades médicas usadas por la aplicación para clasificar consultas del usuario.

- Propósito: proporcionar `id`, `name`, `keywords` y `description` para cada especialidad.
- Formato: un array JSON de objetos; no incluye metadatos ni comentarios ya que JSON no soporta comentarios.
- Uso: el servicio de clasificación (`src/app/services/classifier.js`) utiliza las palabras clave para asignar intención.

Si quieres un comentario embebido en el JSON, puedo convertir el archivo a un objeto con un campo `_comment` y un campo `specialties` que contenga el array; dímelo si prefieres esa opción.