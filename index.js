// Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
    setTimeout(() => {
        // Aquí simulas leer el JSON con un retraso de 1 segundo
        callback(biblioteca);
    }, 1000);
}

// Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

// Función para simular la escritura de datos en JSON
function escribirDatos(datos, callback) {
    setTimeout(() => {
        biblioteca = datos;
        if (callback) callback(true);
    }, 1000);
}

// Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible, callback) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    leerDatos((datos) => {
        datos.libros.push(nuevoLibro);
        escribirDatos(datos, (exito) => {
            if (exito) {
                console.log("Libro agregado exitosamente:");
                console.log(nuevoLibro);
                if (callback) callback(true);
            }
        });
    });
}

// Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado, callback) {
    leerDatos((datos) => {
        let encontrado = false;
        datos.libros.forEach((libro) => {
            if (libro.titulo === titulo) {
                libro.disponible = nuevoEstado;
                encontrado = true;
            }
        });
        
        if (encontrado) {
            escribirDatos(datos, (exito) => {
                if (exito) {
                    console.log(`Disponibilidad actualizada para: ${titulo}`);
                    if (callback) callback(true);
                }
            });
        } else {
            console.log("Libro no encontrado");
            if (callback) callback(false);
        }
    });
}

// Ejemplo de cómo ejecutar la aplicación
mostrarLibros();

// Ejemplo de uso con callbacks
agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true, (exito) => {
    if (exito) {
        console.log("Proceso de agregar libro completado");
        mostrarLibros();
    }
});

setTimeout(() => {
    actualizarDisponibilidad("1984", false, (exito) => {
        if (exito) {
            console.log("Proceso de actualización completado");
            mostrarLibros();
        }
    });
}, 2000);