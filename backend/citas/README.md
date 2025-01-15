
# Funcionamiento de la Aplicación de Citas

La aplicación de citas está diseñada para gestionar citas de manera eficiente, permitiendo a los usuarios crear, actualizar, listar y eliminar citas. A continuación, se describe el funcionamiento de los endpoints principales de la API, implementados en la vista `CitaViewSet`.


## Endpoints Principales

Los endpoints de la aplicación de citas se detallan a continuación.

### Listar Citas

- Permite obtener una lista de todas las citas registradas en el sistema.
- Las citas se devuelven ordenadas por fecha en orden ascendente.
- Se pueden aplicar filtros por fecha y estado, así como realizar búsquedas por motivo.
- La respuesta está paginada, con un tamaño de página predeterminado de 10 elementos.

```http
  GET /api/citas/
```

| Parameter | Type      | Description           |
| :-------- | :-------- | :-------------------- |
| `Ninguno` | `Ninguno` | No recibe parámetros. |

---

### Obtener Detalle de Cita

- Permite obtener los detalles de una cita específica, pkentificada por su pk.
- Se devuelve la información completa de la cita solicitada.

```http
  GET /api/citas/{pk}/
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `pk`      | `string` | **Required**. Pk de la cita. |

---

### Crear Cita

- Permite crear una nueva cita.
- Se debe proporcionar la información de la cita en el cuerpo de la solicitud.

```http
  POST /api/citas/
```

| Parameter     | Type     | Description                                    |
| :------------ | :------- | :--------------------------------------------- |
| `fecha`       | `string` | **Required**. Fecha de la cita.                |
| `hora_inicio` | `string` | **Required**. Hora de inicio de la cita.       |
| `hora_fin`    | `string` | **Required**. Hora de finalización de la cita. |
| `estado`      | `string` | **Required**. Estado de la cita.               |

**NOTA**:

Se deben considerar los siguientes formatos y valores esperados al momento de realizar la solicitud:

- La `fecha` debe estar en formato `YYYY-MM-DD`.
- Tanto `hora_inicio` como `hora_fin` deben estar en formato `HH:MM:SS`.
- El campo `estado` espera uno de los siguientes estados:

| Value  | Description   |
| :----- | :------------ |
|  `AG`  | Agendada.     |
|  `CO`  | Confirmada.   |
|  `CM`  | Completada.   |
|  `CA`  | Cancelada.    |

La cita se guarda en la base de datos y se devuelve la información de la cita creada.

#### Ejemplo

```json
{
  "fecha": "2025-01-19",
  "hora_inicio": "10:00:00",
  "hora_fin": "11:00:00",
  "motivo": "Consulta sobre MVP",
  "estado": "AG"
}
```

#### Respuesta esperada

Se espera el siguiente mensaje, junto al código HTTP 201 Created.

```json
{
  "id": 1,
  "fecha": "2025-01-19",
  "hora_inicio": "10:00:00",
  "hora_fin": "11:00:00",
  "motivo": "Consulta sobre MVP",
  "estado": "AG"
}
```

---

### Actualizar Cita

- Permite actualizar completamente una cita existente.
- Se debe proporcionar la información completa de la cita en el cuerpo de la solicitud.

```http
  PUT `/api/citas/{pk}/`
```

| Parameter     | Type     | Description                                    |
| :------------ | :------- | :--------------------------------------------- |
| `fecha`       | `string` | **Required**. Fecha de la cita.                |
| `hora_inicio` | `string` | **Required**. Hora de inicio de la cita.       |
| `hora_fin`    | `string` | **Required**. Hora de finalización de la cita. |
| `estado`      | `string` | **Required**. Estado de la cita.               |

**NOTA**:

Se deben considerar los siguientes formatos y valores esperados al momento de realizar la solicitud:

- La `fecha` debe estar en formato `YYYY-MM-DD`.
- Tanto `hora_inicio` como `hora_fin` deben estar en formato `HH:MM:SS`.
- El campo `estado` espera uno de los siguientes estados:

| Value  | Description   |
| :----- | :------------ |
|  `AG`  | Agendada.     |
|  `CO`  | Confirmada.   |
|  `CM`  | Completada.   |
|  `CA`  | Cancelada.    |

La cita se actualiza en la base de datos y se devuelve la información de la cita actualizada.

#### Ejemplo

```json
{
  "fecha": "2025-02-19",
  "hora_inicio": "10:00:00",
  "hora_fin": "11:00:00",
  "motivo": "Consulta sobre MVP",
  "estado": "CO"
}
```

#### Respuesta esperada

Se espera el siguiente mensaje, junto al código HTTP 200 OK.

```json
{
  "id": 1,
  "fecha": "2025-02-19",
  "hora_inicio": "10:00:00",
  "hora_fin": "11:00:00",
  "motivo": "Consulta sobre MVP",
  "estado": "CO"
}
```
---

### Actualizar Parcialmente una Cita

- Permite actualizar parcialmente una cita existente.
- Se puede proporcionar solo la información que se desea actualizar en el cuerpo de la solicitud.

```http
  PATCH `/api/citas/{pk}/`
```

| Parameter     | Type     | Description                                    |
| :------------ | :------- | :--------------------------------------------- |
| `fecha`       | `string` | **Required**. Fecha de la cita.                |
| `hora_inicio` | `string` | **Required**. Hora de inicio de la cita.       |
| `hora_fin`    | `string` | **Required**. Hora de finalización de la cita. |
| `estado`      | `string` | **Required**. Estado de la cita.               |

**NOTA**:

Se deben considerar los siguientes formatos y valores esperados al momento de realizar la solicitud:

- La `fecha` debe estar en formato `YYYY-MM-DD`.
- Tanto `hora_inicio` como `hora_fin` deben estar en formato `HH:MM:SS`.
- El campo `estado` espera uno de los siguientes estados:

| Value  | Description   |
| :----- | :------------ |
|  `AG`  | Agendada.     |
|  `CO`  | Confirmada.   |
|  `CM`  | Completada.   |
|  `CA`  | Cancelada.    |

La cita se actualiza en la base de datos y se devuelve la información de la cita actualizada.

#### Ejemplo

```json
{
  "motivo": "Coaching para Emprendedores"
}
```

#### Respuesta esperada

Se espera el siguiente mensaje, junto al código HTTP 200 OK.

```json
{
  "id": 1,
  "fecha": "2025-02-19",
  "hora_inicio": "10:00:00",
  "hora_fin": "11:00:00",
  "motivo": "Coaching para Emprendedores",
  "estado": "CO"
}
```

---

### Eliminar Cita

- Permite eliminar una cita específica, pkentificada por su pk.
- La cita se elimina de la base de datos y se devuelve una respuesta de éxito.

```http
  DELETE `/api/citas/{pk}/`
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `pk`      | `string` | **Required**. Pk de la cita |

> ⚠️ **Advertencia:** Realizar esta acción implica eliminar el registro de la base de datos.


