FROM maven:3.6.3 AS maven
LABEL MAINTAINER="hanbey.toktas@gmail.com"

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN mvn package 

FROM openjdk:17-alpine

ARG JAR_FILE=todo-0.0.1.jar

WORKDIR /opt/app

COPY --from=maven /usr/src/app/target/${JAR_FILE} /opt/app/

ENTRYPOINT ["java","-jar","todo-0.0.1.jar"]