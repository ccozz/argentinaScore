# Argentina Score

Una app web para calificar el rendimiento del plantel argentino en el Mundial 2026, jugador por jugador.

## Qué hace

- Muestra el plantel dividido en cuatro zonas: arqueros, defensores, mediocampistas y delanteros.
- Incluye a Lionel Scaloni como DT.
- Permite puntuar de 1 a 10, con intervalos de 0,5.
- Reúne cada evaluación enviada en una grilla comparativa: una columna por persona.
- Calcula el promedio de cada jugador entre las evaluaciones recibidas.
- Muestra arriba el promedio global de todas las evaluaciones enviadas.
- Tiene modo oscuro y diseño adaptable a celular.

## Reglas de evaluación

1. Cada persona debe escribir su nombre antes de enviar.
2. Un mismo nombre solo puede enviar una evaluación.
3. Se deben completar todas las notas habilitadas para enviar.
4. Gerónimo Rulli y Juan Musso quedan en `OFF`: no tuvieron minutos y no se pueden calificar.
5. Los puntajes válidos son: `1`, `1.5`, `2` ... hasta `10`.
6. Las notas enviadas se almacenan en el navegador de quien las carga.
7. Cada columna enviada se puede eliminar desde su encabezado.

## Cómo abrirla

No necesita instalar dependencias ni levantar un servidor.

1. Cloná el repositorio.
2. Abrí `index.html` en el navegador.

```bash
git clone https://github.com/ccozz/argentinaScore.git
cd argentinaScore
```

También se puede publicar como sitio estático en GitHub Pages.

## Archivos principales

- `index.html`: estructura de la interfaz.
- `style.css`: estilo general y paleta vintage.
- `pitch.css`: cancha, tabla y ajustes responsive.
- `script.js`: plantel, puntajes, validaciones, promedios y almacenamiento local.
