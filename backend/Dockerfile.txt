# Usar la imagen base
FROM python:3.12-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY . /app

# Instalar dependencias del sistema necesarias para PostgreSQL y netcat
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Exponer el puerto de la aplicación
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
