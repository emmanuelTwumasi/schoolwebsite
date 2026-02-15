# Stage 1: Build the application with Maven and JDK 17
FROM maven:3.8.5-openjdk-17 AS builder

# Set the working directory
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .

# Download dependencies first to leverage Docker layer caching
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the application, skipping tests
RUN mvn clean package -DskipTests

# Stage 2: Create the final, lean image with JRE 17
FROM openjdk:17-jre-slim

# Set the working directory
WORKDIR /app

# Copy the application JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8085

# Set the entrypoint to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
