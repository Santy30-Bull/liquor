# Liquor Microservice

Este proyecto es un microservicio que gestiona información relacionada con licores. Se conecta a una base de datos PostgreSQL que se encuentra en un contenedor Docker y utiliza **NATS** para comunicarse con otros microservicios, como **Booking** y el **API Gateway**.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- **Docker**: Para correr la base de datos PostgreSQL en un contenedor.
- **Node.js**: Para ejecutar el microservicio.
- **NATS Server**: Para la comunicación entre microservicios.

## Configuración

El microservicio requiere un archivo `.env` con las siguientes variables de entorno:

```env
LIQUOR_DB_HOST= "ejemplo"
LIQUOR_DB_PORT="ejemplo"
LIQUOR_DB_USER="ejemplo"
LIQUOR_DB_PASSWORD="ejemplo"
LIQUOR_DB_NAME="ejemplo"
NATS_SERVER_URL="ejemplo"
PORT="ejemplo"
```

## Instalacion

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>

```bash
npm install

docker run --name liquordb -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=liquordb -p 5433:5432 -d postgres

docker run -d --name nats -p 4222:4222 nats

npm start

```

## Pruebas

```bash
npm test
```

## Swagger UI (Opcional)

Si este microservicio incluye documentación con Swagger, puedes acceder a la interfaz de Swagger en:
http://localhost:<PUERTO>/api-docs
