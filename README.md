# YouTube Audio Downloader (Node.js + yt-dlp + FFmpeg)

Este proyecto permite descargar audio de videos de YouTube y convertirlo automáticamente a MP3 usando Node.js, yt-dlp y FFmpeg en Windows. A continuación se detallan todos los pasos para descargar, instalar, configurar y levantar el proyecto.

---

## 1. Descargar e instalar Node.js

1. Ir a la página oficial de Node.js: https://nodejs.org/  
2. Descargar la versión recomendada para Windows.  
3. Ejecutar el instalador y seguir el asistente de instalación.  
4. Verificar que Node.js y npm se hayan instalado correctamente abriendo el CMD o PowerShell y escribiendo `node -v` y `npm -v`.

---

## 2. Descargar yt-dlp

1. Ir a la página oficial de releases de yt-dlp: https://github.com/yt-dlp/yt-dlp/releases  
2. Descargar el archivo `yt-dlp.exe`.  
3. Crear una carpeta para guardarlo, por ejemplo `C:\yt-dlp`.  
4. Copiar `yt-dlp.exe` dentro de esa carpeta.  
5. Configurar la variable de entorno PATH para que Windows reconozca el comando:  
   - Abrir Configuración → Sistema → Información del sistema → Configuración avanzada del sistema → Variables de entorno.  
   - Editar la variable PATH y agregar `C:\yt-dlp\`.  
6. Verificar que la instalación sea correcta abriendo CMD o PowerShell y escribiendo `yt-dlp --version`.

---

## 3. Descargar FFmpeg

1. Ir a la página de builds de FFmpeg: https://www.gyan.dev/ffmpeg/builds/  
2. Descargar la versión “full build” para Windows.  
3. Extraer la carpeta descargada en una ubicación conveniente, por ejemplo `C:\ffmpeg-8.0.1-full_build`.  
4. Asegurarse de que el ejecutable `ffmpeg.exe` esté dentro de la carpeta `bin`.  
5. Configurar la variable de entorno PATH agregando `C:\ffmpeg-8.0.1-full_build\bin`.  
6. Verificar la instalación abriendo CMD o PowerShell y escribiendo `ffmpeg -version`.

---

## 4. Configurar proyecto Node.js

1. Crear una carpeta para el proyecto, por ejemplo `C:\Users\USER\Desktop\youtube-audio`.  
2. Abrir CMD o PowerShell y navegar a la carpeta creada.  
3. Inicializar Node.js escribiendo `npm init -y`.  
4. Crear un archivo `index.js` donde se escribirá el script de descarga y conversión de audio.  
5. Configurar las rutas absolutas de yt-dlp y FFmpeg dentro del script para que el proyecto funcione correctamente.

---

## 5. Ejecutar el proyecto

1. Abrir CMD o PowerShell y navegar a la carpeta del proyecto.  
2. Ejecutar el script escribiendo `node index.js`.  
3. El audio descargado se guardará automáticamente en la carpeta configurada dentro del script, normalmente con el nombre del video en formato MP3.  

---
