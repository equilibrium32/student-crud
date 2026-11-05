# Stage 1: Build the Spring Boot application using Maven
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml first
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Ensure Linux executable permissions and LF line endings
RUN chmod +x ./mvnw && sed -i 's/\r$//' ./mvnw

# Copy source code and build jar (skip tests for production image)
COPY src/ ./src/
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Render assigns PORT at runtime
ENV PORT=8080

# Tune JVM for Render Free Tier (512MB RAM) to prevent OOM kills
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=65 -XX:+UseSerialGC -Xss512k -XX:ReservedCodeCacheSize=48m"

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
