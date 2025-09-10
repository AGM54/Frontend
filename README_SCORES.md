# Sistema de Puntuación y Progreso

Este documento describe la implementación del sistema de puntuación y seguimiento de progreso para la aplicación educativa.

## Estructura de Datos

### Tipos de Puntuación

- `ActivityScore`: Puntuación base para cualquier actividad
- `TriviaScore`: Específico para actividades tipo trivia
- `DragDropScore`: Para actividades de arrastrar y soltar
- `MatchingScore`: Para actividades de emparejar

### Progreso

- `ModuleProgress`: Seguimiento del progreso por módulo
- `UserProgress`: Progreso general del usuario

## Cálculo de Puntuaciones

### Puntuación Base
- Calculada como (respuestas correctas / total de preguntas) * 100

### Bonificaciones y Penalizaciones

#### Trivia
- Bonus por velocidad: hasta 10 puntos
- Bonus por racha: hasta 10 puntos
- Puntuación máxima: 100 puntos

#### Drag & Drop
- Penalización por intentos incorrectos: -2 puntos por error
- Penalización por tiempo: -1 punto por minuto
- Puntuación mínima: 0 puntos

#### Matching
- Penalización por intentos promedio: -2 puntos por intento adicional
- Se considera el número de intentos por cada par

## Integración con Backend

### Endpoints Principales

\`\`\`typescript
POST /api/scores/activity          // Guardar puntuación de actividad
GET  /api/scores/module/:id/user/:id // Obtener puntuaciones por módulo
GET  /api/progress/user/:id        // Obtener progreso del usuario
PUT  /api/progress/module          // Actualizar progreso de módulo
GET  /api/scores/leaderboard/:id   // Obtener tabla de puntuaciones
GET  /api/scores/stats/:id/user/:id // Obtener estadísticas de actividad
\`\`\`

### Formato de Datos

\`\`\`typescript
// Ejemplo de puntuación de actividad
{
  activityId: "trivia_1",
  userId: "user123",
  moduleId: "cnee",
  correctAnswers: 8,
  totalQuestions: 10,
  timeSpent: 300,
  score: 85
}

// Ejemplo de progreso de módulo
{
  moduleId: "cnee",
  userId: "user123",
  activitiesCompleted: 3,
  totalActivities: 5,
  averageScore: 82,
  isCompleted: false
}
\`\`\`

## Implementación en Componentes

### Uso en Actividades

1. Importar servicios y tipos necesarios:
\`\`\`typescript
import { ScoreService } from '../services/scoreService';
import { ActivityScore, ActivityType } from '../types/score.types';
\`\`\`

2. Guardar puntuación al completar actividad:
\`\`\`typescript
const saveScore = async (score: ActivityScore) => {
  try {
    await ScoreService.saveActivityScore(score);
    // Manejar éxito
  } catch (error) {
    // Manejar error
  }
};
\`\`\`

3. Obtener progreso:
\`\`\`typescript
const checkProgress = async (userId: string) => {
  try {
    const progress = await ScoreService.getUserProgress(userId);
    // Actualizar UI con el progreso
  } catch (error) {
    // Manejar error
  }
};
\`\`\`

## Consideraciones Importantes

1. **Persistencia**: Las puntuaciones deben guardarse incluso si no hay conexión
2. **Validación**: Implementar validación tanto en cliente como servidor
3. **Rendimiento**: Considerar caché para datos frecuentemente accedidos
4. **Seguridad**: Validar autorización en cada operación
5. **Sincronización**: Manejar conflictos en actualizaciones simultáneas

## Módulos y Actividades

### CNEE
- Trivia de conceptos
- Actividad de matching
- Drag & Drop de situaciones

### Electricidad
- Juego de átomos
- Circuitos interactivos
- Quiz de generación

### Factura
- Explorador de factura
- Matching de conceptos
- Simulador de consumo

### Alumbrado
- Drag & Drop de elementos
- Quiz de responsabilidades
- Actividad de matching

### Obligaciones
- Ordenamiento de pasos
- Trivia de derechos
- Matching de responsabilidades

## Próximas Mejoras

1. Implementar sistema de logros
2. Añadir rankings por módulo
3. Generar reportes de progreso
4. Integrar sistema de recompensas
5. Añadir análisis de patrones de aprendizaje