§ Cómo correr el proyecto.
Prerequisitos:
-Node.js
-npm
-Expo CLI

Clonar repositorio
git clone https://github.com/tudasam/IdilioPrueba/tree/
cd Idilio

Instalar dependencias:
npm install

Iniciar el proyecto
npm start
§ Funciones de SQL implementadas.
Se implementó una función llamada get_all_categories_with_shows la cual reordena los datos en un json, y agrupa shows según las categorías a la que pertenecen.
Un show puede pertenecer a más de una categoría así que es probable que los shows se repitan en alguna ocasión.

§ Decisiones técnicas (1–2 párrafos).
-Por restricción de tiempo se optó a solo implementar la funcionalidad más básica requerida por la prueba, es decir, lectura de la base de datos
Postgres en supabase para mostrar los shows por categoría.
-Se decidió por simplicidad y fines prácticos generar la base de datos por medio de inteligencia artificial.
-Se decidió usar un componente tipo "Modal" para mostrar la vista de detalle de cada show

§ Prompts usados en IA.
-Generación de información en CSV para subirlo en supabase
-
§ Qué harías a continuación si tuvieras más tiempo.
-Usar una base de datos más extensa, que incluya más de 3 capítulos por show
-Video previews de los shows cuando se muestra la pantalla de detalle del show
-Búsqueda de shows por medio de la barra de busqueda.
-Sistema de favoritos.
-Historial de vistas.
