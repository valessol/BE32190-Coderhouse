<div align="center">

# GuitarLA

<table class="no-border">
  <tr>
    <td><a href="https://github.com/aregtech/areg-sdk/actions/workflows/msbuild.yml" alt="MS Build"><img src="https://amsilabs.com/wp-content/uploads/2021/01/MongoDB-1.jpg" alt="MongoDB" style="width: 150px;"/></a></td>
    <td><a href="https://expressjs.com/es/"><img src="https://expressjs.com/images/express-facebook-share.png" alt="Express JS" style="width: 150px;"/></a></td>
    <td><a href="https://es.react.dev/learn" alt="ReactJS"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="ReactJS" style="height: 60px;"/></a></td>
    <td><a href="https://github.com/aregtech/areg-sdk/actions/workflows/codeql-analysis.yml"><img src="https://nodejs.org/static/images/logo.svg" alt="NodeJS" style="width: 150px;"/></a></td>
  </tr>
</table>
</div>

## Introducción 📌

**GuitarLA** (_Guitar Los Ángeles_) es un ecommerce de venta de guitarras, realizado enteramente con el stack MERN, como proyecto final para el curso de Programación Backend de Coderhouse, en su parte backend, y como parte del curso React - La Guía Completa de Juan Pablo de la Torre Valdez en Udemy.

![](Animation.gif)

## Características del proyecto Backend 📌

- Desarrollo de la arquitectura del servidor en base a capas MVC definidas, con capa de ruteo, controladores, lógica de negocio, validaciones y capa de persistencia.
- Persistencia mediante File System para el desarrollo local, y uso de bases de datos con Mongo Atlas para el ambiente de producción.
- Sistema de autenticación basado en JWT
- Encriptación de contraseñas mediante Bcrypt
- Sistema de registro y login de usuarios
- Ruteo para el listado de productos, así como su agregado a la base de datos, edición y eliminación
- Lo mismo para la interacción con el carrito de compras permitiendo crear un carrito, añadirle productos, remover productos o modificarlos, y eliminar el carrito.

## Tecnologías utilizadas 📌

- NodeJS
- Express JS
- MongoDB
- Mongoose
- Bcrypt
- Cors
- Dotenv
- Joi
- Json Web Token
- Minimist

## Flujo del usuario 📌

El flujo de un usuario dentro de la aplicación considera que el mismo puede interactuar por la página de productos (inicio), así como el detalle de los mismos sin autenticarse. Sin embargo, para el acceso a las rutas protegidas (agregar productos, editar el carrito o eliminar productos del carrito), éste deberá primero loguearse (o registrarse).

## Instalación 📌
```
git clone https://github.com/valessol/BE32190-Coderhouse.git
cd BE32190-Coderhouse.git
```

### Levantar el backend:
```
cd backend
npm install
npm run dev
```
### Levantar el frontend:
```
cd frontend
npm install
npm run dev
```

## Uso 📌

A continuación se listan los endpoint correspondientes, junto con una breve descripción, y en caso de corresponder, un ejemplo del body que reciben. También se indica en la columna "Auth", si la ruta debe ser authorizada por JWT antes de llegar al controlador.

> Nota: Para probar la aplicación con POSTMAN, se debe comentar la línea que habilita el acceso mediante CORS

### `/api/auth`

| Endpoint    | Http Req | Description                            | Auth | Body                                                                                                    |
| ----------- | -------- | -------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------- |
| `/register` | POST     | Registrar nuevo usuario                | No   | `{ "email": "testing@mail.com", "password" : "12345678", "phone": 11236856546, "username": "testing" }` |
| `/login`    | POST     | Loguear usuario registrado             | No   | `{ "email": "testing@mail.com", "password" : "12345678" }`                                              |
| `/all`      | GET      | Obtener todos los usuarios             | No   | -                                                                                                       |
| `/:userId`  | DELETE   | Eliminar un usuario                    | No   | -                                                                                                       |
| `/`         | GET      | Authorizar un usuario con Bearer Token | Sí   | -                                                                                                       |

### `/api/products`

| Endpoint | Http Req | Description                   | Auth | Body                                                                                                                                                                                                    |
| -------- | -------- | ----------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`      | GET      | Obtener todos los productos   | No   | -                                                                                                                                                                                                       |
| `/:id`   | GET      | Obtener un producto por su Id | No   | -                                                                                                                                                                                                       |
| `/`      | POST     | Guardar un producto           | Sí   | `{ "title": "Blackmore", "price": 359, "description": "Ut malesuada vitae neque sit amet congue. Suspendisse potenti. Mauris …", "url": "guitarra_12_xzmjnz", "stock": 8, "category": "instrumentos" }` |
| `/:id`   | PUT      | Actualizar un producto        | Sí   | `{ "price": 389 }`                                                                                                                                                                                      |
| `/:id`   | DELETE   | Eliminar un producto          | Sí   | -                                                                                                                                                                                                       |

### `/api/cart`

| Endpoint              | Http Req | Description                                | Auth | Body                                                   |
| --------------------- | -------- | ------------------------------------------ | ---- | ------------------------------------------------------ |
| `/create/:userId`     | GET      | Crear un carrito                           | Sí   | -                                                      |
| `/:userId`            | GET      | Obtener carrito de un usuario              | Sí   | -                                                      |
| `/remove/:userId`     | PUT      | Eliminar todos los productos de un carrito | Sí   | -                                                      |
| `/:userId`            | PUT      | Agregar un producto al carrito             | Sí   | `{ "_id": "644ca048b68b415727b1fc2e", "quantity": 1 }` |
| `/:userId/:productId` | PUT      | Actualizar o remover un producto           | Sí   | `{ "quantity": 3 }`                                    |
| `/:userId`            | DELETE   | Eliminar el carrito                        | Sí   | -                                                      |
