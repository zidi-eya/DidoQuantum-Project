# Use Python 3.10 as base image
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# 🔹 Install system dependencies required for some Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    python3-dev \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY requirements.txt .

# 🔹 Upgrade pip and install Cython (before installing dependencies)
RUN pip install --no-cache-dir --upgrade pip setuptools wheel Cython

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Command to run the FastAPI application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
