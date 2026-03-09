# PROYECTO: Las Trufas de Andrea

Single Page Application de e-commerce desarrollada con React, Vite y Firebase.

La aplicación permite navegar por el catálogo, filtrar productos por categoría, ver el detalle de cada producto, agregar unidades al carrito, revisar el resumen de compra y generar una orden en Firestore.

## Autor

Proyecto desarrollado por Diego Chiang.

## Demo funcional

El proyecto implementa:

- catálogo de productos consumido desde Firestore
- filtrado por categorías con React Router
- vista de detalle por producto
- carrito global con Context API
- selector de cantidad con validación de mínimo y stock
- checkout con generación de orden en Firestore
- loaders, mensajes condicionales y ruta 404

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Context API
- Firebase / Cloud Firestore
- CSS modular por componente

## Estructura principal

```text
src/
├── components/
│   ├── Cart/
│   ├── CartItem/
│   ├── CartWidget/
│   ├── Checkout/
│   ├── Item/
│   ├── ItemCount/
│   ├── ItemDetail/
│   ├── ItemDetailContainer/
│   ├── ItemList/
│   ├── ItemListContainer/
│   ├── Loader/
│   ├── NavBar/
│   └── NotFound/
├── context/
│   ├── CartContext.jsx
│   └── CartProvider.jsx
├── services/
│   └── config.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx

public/
├── favicon.png
└── img/
    ├── caja-promocional-x12.jpg
    ├── caja-promocional-x6.jpg
    ├── trufa-clasica-cacao.jpg
    ├── trufa-clasica-cafe.jpg
    ├── trufa-clasica-vainilla.jpg
    ├── trufa-especial-frambuesa.jpg
    ├── trufa-especial-naranja.jpg
    └── trufa-especial-pistacho.jpg
```

## Rutas de la aplicación

- `/` → listado general de productos
- `/category/:categoryId` → listado filtrado por categoría
- `/item/:itemId` → detalle del producto
- `/cart` → carrito de compras
- `/checkout` → formulario de compra y generación de orden
- `*` → página no encontrada

## Flujo principal

1. El usuario ingresa al catálogo.
2. Puede navegar entre categorías desde el `NavBar`.
3. Al entrar al detalle de un producto, selecciona la cantidad con `ItemCount`.
4. El producto se agrega al carrito usando Context API.
5. El `CartWidget` muestra el total acumulado de unidades.
6. En `Cart` se visualizan productos, cantidades, subtotales y total.
7. En `Checkout` se completan los datos del comprador.
8. Al confirmar la compra, se genera un documento en Firestore dentro de la colección `ordenes`.
9. La interfaz muestra el id de la orden generada.

## Base de datos en Firestore

### Colección de productos

La app consume los productos desde la colección:

```text
productos
```

Cada documento debe incluir, como mínimo, estos campos:

```js
{
  title: "Trufa clásica de cacao",
  shortDescription: "Chocolate intenso y acabado tradicional.",
  description: "Nuestra trufa clásica combina cacao de sabor profundo...",
  price: 4.5,
  stock: 18,
  category: "clasicas",
  featured: true,
  image: "/img/trufa-clasica-cacao.jpg"
}
```

### Colección de órdenes

Al confirmar una compra, la app genera documentos en:

```text
ordenes
```

con una estructura similar a esta:

```js
{
  buyer: {
    nombre: "Diego",
    apellido: "Chiang",
    telefono: "999999999",
    email: "correo@ejemplo.com"
  },
  items: [
    {
      id: "abc123",
      title: "Caja promocional x12",
      price: 44.9,
      quantity: 1
    }
  ],
  total: 44.9,
  fecha: serverTimestamp()
}
```

## Instalación y ejecución

1. Clona el repositorio.
2. Instala las dependencias.
3. Ejecuta el proyecto en modo desarrollo.

```bash
npm install
npm run dev
```

## Configuración de Firebase

El proyecto utiliza Firestore a través de `src/services/config.js`.

Debes inicializar Firebase con tu propia configuración:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

## Estado global del carrito

El carrito se administra con Context API mediante:

- `CartContext.jsx`
- `CartProvider.jsx`

Funciones principales disponibles en el contexto:

- `addItem(product, quantity)`
- `removeItem(itemId)`
- `clearCart()`
- `getTotalItems()`
- `getTotalPrice()`

## Componentes destacados

- `NavBar`: navegación principal y acceso al carrito
- `CartWidget`: icono del carrito con contador dinámico
- `ItemListContainer`: consulta Firestore y renderiza el listado
- `ItemList`: muestra la grilla de productos
- `Item`: tarjeta individual del producto
- `ItemDetailContainer`: consulta un producto por id
- `ItemDetail`: muestra la información completa del producto
- `ItemCount`: selector de cantidad con validación de stock
- `Cart`: resumen del carrito
- `CartItem`: producto individual dentro del carrito
- `Checkout`: formulario final y generación de orden
- `Loader`: feedback visual durante las consultas
- `NotFound`: ruta de respaldo para navegación inválida

## Consideraciones importantes

- Las imágenes se sirven desde la carpeta `public/img`.
- En Firestore, el campo `image` debe guardar rutas absolutas como `/img/trufa-clasica-cacao.jpg`.
- La colección de productos se llama `productos`.
- La colección de órdenes se llama `ordenes`.
