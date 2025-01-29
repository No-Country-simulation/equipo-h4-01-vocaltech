# Backend Hackathon VocalTech

Este proyecto es el backend desarrollado para la hackathon, orientado a crear una API que procesa respuestas de formularios y recomienda servicios personalizados. Además, incluye una funcionalidad de diagnóstico para emprendedores y empresas, permitiendo identificar necesidades específicas y ofrecer soluciones adaptadas.

Este documento está dirigido exclusivamente a desarrolladores y testers, proporcionando información técnica para garantizar el correcto funcionamiento y validación del sistema.

## Tecnologías

El backend está construido con:

- Python: Lenguaje principal por su versatilidad y compatibilidad con herramientas de inteligencia artificial.

- Django: Framework web utilizado para crear una API robusta y escalable.

- Django REST Framework (DRF): Para la implementación de endpoints RESTful.

- SQLite: Base de datos utilizada durante el desarrollo (puede migrarse a otro sistema en producción).

## Configuración e Instalación

Clonar el repositorio:

```bash
git clone https://github.com/No-Country-simulation/equipo-h4-01-vocaltech.git
cd <equipo-h4-01-vocaltech>
```

Crear y activar un entorno virtual:

```bash
cd backend
python -m venv venv
source venv/bin/activate
En Windows: venv\Scripts\activate
```
En Windows: 
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Aplicar migraciones:

```bash
python manage.py migrate
```

Iniciar el servidor de desarrollo:

```bash
python manage.py runserver
```

## Consideraciones

El sistema utiliza una variable de entorno llamada PROD para gestionar la configuración de la base de datos:

Cuando ```PROD``` está configurada como ```True```, el sistema utiliza la base de datos de producción.

Cuando ```PROD``` está configurada como ```False``` o no está definida, el sistema utiliza la base de datos de desarrollo.

Por defecto, ```PROD``` debe estar configurada como ```False``` para garantizar que el entorno de desarrollo sea utilizado durante las pruebas y el desarrollo local.

El archivo ```.env``` debe crearse dentro de la carpeta ```backend``` del proyecto y contener la siguiente configuración inicial:

```text
PROD=True
```
