FROM openjdk:17.0

COPY build/libs/ReservasYCitas-0.0.1-SNAPSHOT.jar programa.jar

ENTRYPOINT["java","-jar","programa.jar"]