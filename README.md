Resumen

Aplicación que consiste en realizar operaciones CRUD para tareas.

Para instalar:
  1.- Backend hecho en Java. Importar proyecto al IDE de preferencia y ejecutar la app desde la clase SpringBootFullstackApplication.java. Librerias son definidas y descargadas
    a través del archivo pom.xml.
  2.- Definición de los servicios rest ubicados en la siguiente ruta luego de haber iniciado la aplicacion http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/task-controller/deleteTask
  3.- Frontent hecho con reactJS y redux. Clonar el proyecto a la ruta deseada y ejecutar el comando npm install. Luego de tener las dependencias descargadas, ejecutar el comando
    npm start.
    
Hasta este punto, se deberia tener la aplicación corriendo.

La base de dato esta construida in-memory. Es decir, en la ruta src/main/resources/data.sql se encuentra dicho archivo que se encargara de crear la tabla Tarea al momento de 
iniciar la aplicación. No hace falta descargar drivers o instalar alguna dependencia de BD.

