FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

COPY pom.xml .
RUN mvn -q -e -B dependency:go-offline

COPY src ./src
RUN mvn -q -e -B package -DskipTests

EXPOSE 8080

# Run the built Spring Boot jar inside the same image
ENTRYPOINT ["sh", "-c", "java -jar target/*.jar"]

