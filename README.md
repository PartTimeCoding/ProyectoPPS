# Proyecto de Modernización e Implemenación de Nuevos Sistemas para Compañia de Televisión via Satelite (TEVISAT)

## Descripcion

## Uso

## Dependencias
### Para levantar la página web:
1. Hacer `cd` en la terminal e ingresar al directorio /ProyectoPPS
2. Usar el comando `npm run dev`

### Para levantar la base de datos MySQL en un contenedor de Docker
1. Hacer `cd` en la terminal e ingresar al directorio /ProyectoPPS
2. Revisar que el servicio de Docker está corriendo mediante `systemctl status docker`
    2.1. En caso de estar apagado usar el comando `systemctl enable --now docker` para que se encienda cada vez que se enciende el sistema operativo y el `--now` es para que se encienda inmediantamente que se ejecute el comando
3. Levantar el contenedor Docker de MySQL con el comando `sudo docker compose up -d`

### Para levantar el servidor Node.js que sirve de Middleware entre la base de datos MySQL y la pagina web
1. Hacer `cd` en la terminal e ingresar al directorio /ProyectoPPS/src/backend
2. Usar el comando `npm run dev`