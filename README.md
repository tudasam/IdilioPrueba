# 🎬 Idilio Prueba

Este proyecto es una prueba técnica que muestra **series y capítulos** obtenidos desde una base de datos en **Supabase (Postgres)**, organizados por categorías.

---

## 🚀 Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/tudasam/IdilioPrueba.git
cd Idilio
```

Instalar dependencias:

```bash
npm install
```

Iniciar el proyecto:

```bash
npm start
```

---

## 🗄️ Funciones SQL implementadas

Se implementó la función **`get_all_categories_with_shows`**, que:

- Reordena los datos en un JSON.
- Agrupa los shows según sus categorías.
- Dado que un show puede pertenecer a múltiples categorías, puede aparecer repetido.

---

## ⚙️ Decisiones técnicas

- Por **restricción de tiempo**, solo se implementó la funcionalidad básica requerida: lectura de la base de datos Postgres en Supabase y visualización de los shows por categoría.
- Para **simplicidad y fines prácticos**, la base de datos se generó con ayuda de inteligencia artificial.
- Se utilizó un componente tipo **Modal** para mostrar la vista de detalle de cada show.

---

## 🤖 Prompts usados en IA

- Generación de información en CSV para subir a Supabase.

---

## 🔮 Próximos pasos (si hubiera más tiempo)

- Ampliar la base de datos con más capítulos por show (más de 3).
- Incluir **video previews** en la vista de detalle de cada show.
- Implementar **búsqueda de shows** desde la barra de búsqueda.
- Agregar un **sistema de favoritos**.
- Historial de vistas del usuario.

---

✨ _Desarrollado como parte de una prueba técnica._
