class Nodo {
    constructor(producto) {
        this.producto = producto;  // El producto que guarda el nodo
        this.siguiente = null;     // Referencia al siguiente nodo
        this.anterior = null;      // Referencia al nodo anterior (nuevo para doble enlace)
    }
}

class InventarioOrdenado {
    constructor() {
        this.primero = null;  // El primer nodo de la lista
        this.ultimo = null;   // El último nodo de la lista (nuevo para doble enlace)
    }
    
    agregar(producto) {
        let nuevoNodo = new Nodo(producto);
        
        if (!this.primero) {
            // Lista vacía
            this.primero = nuevoNodo;
            this.ultimo = nuevoNodo;
            return true;
        }
        
        if (producto.codigo < this.primero.producto.codigo) {
            // Insertar al inicio
            nuevoNodo.siguiente = this.primero;
            this.primero.anterior = nuevoNodo;
            this.primero = nuevoNodo;
            return true;
        }
        
        if (producto.codigo > this.ultimo.producto.codigo) {
            // Insertar al final
            nuevoNodo.anterior = this.ultimo;
            this.ultimo.siguiente = nuevoNodo;
            this.ultimo = nuevoNodo;
            return true;
        }
        
        // Insertar en medio, manteniendo orden
        let actual = this.primero;
        while (actual && actual.producto.codigo < producto.codigo) {
            actual = actual.siguiente;
        }
        
        if (actual && actual.producto.codigo === producto.codigo) {
            return false;  // Código ya existe
        }
        
        // Insertar antes de 'actual'
        nuevoNodo.siguiente = actual;
        nuevoNodo.anterior = actual.anterior;
        if (actual.anterior) {
            actual.anterior.siguiente = nuevoNodo;
        }
        actual.anterior = nuevoNodo;
        return true;
    }
    
    buscar(codigo) {
        let actual = this.primero;
        while (actual) {
            if (actual.producto.codigo === codigo) {
                return actual.producto;
            }
            if (actual.producto.codigo > codigo) {
                return null;  // No hay necesidad de seguir buscando
            }
            actual = actual.siguiente;
        }
        return null;
    }
    
    eliminar(codigo) {
        let actual = this.primero;
        while (actual) {
            if (actual.producto.codigo === codigo) {
                if (actual === this.primero) {
                    this.primero = actual.siguiente;
                    if (this.primero) {
                        this.primero.anterior = null;
                    } else {
                        this.ultimo = null;  // Lista vacía
                    }
                } else if (actual === this.ultimo) {
                    this.ultimo = actual.anterior;
                    this.ultimo.siguiente = null;
                } else {
                    actual.anterior.siguiente = actual.siguiente;
                    actual.siguiente.anterior = actual.anterior;
                }
                return actual.producto;
            }
            if (actual.producto.codigo > codigo) {
                return null;  
            }
            actual = actual.siguiente;
        }
        return null;
    }
    
    extraerPrimero() {
        if (!this.primero) return null;
        let producto = this.primero.producto;
        this.primero = this.primero.siguiente;
        if (this.primero) {
            this.primero.anterior = null;
        } else {
            this.ultimo = null;  // Lista vacía
        }
        return producto;
    }
    
    extraerUltimo() {
        if (!this.ultimo) return null;
        let producto = this.ultimo.producto;
        this.ultimo = this.ultimo.anterior;
        if (this.ultimo) {
            this.ultimo.siguiente = null;
        } else {
            this.primero = null;  // Lista vacía
        }
        return producto;
    }
    
    infoTexto() {
        let actual = this.primero;
        let texto = '';
        while (actual) {
            texto += actual.producto.info() + '<br>';
            actual = actual.siguiente;
        }
        return texto;
    }
    
    listar() {
        let html = "<h3>Listado de Productos (Orden Normal):</h3>";
        let actual = this.primero;
        while (actual) {
            html += actual.producto.infoHtml();
            actual = actual.siguiente;
        }
        if (!this.primero) html += "<p>No hay productos.</p>";
        return html;
    }
    
    listarInverso() {
        let html = "<h3>Listado de Productos (Orden Inverso):</h3>";
        let actual = this.ultimo;
        while (actual) {
            html += actual.producto.infoHtml();
            actual = actual.anterior;
        }
        if (!this.ultimo) html += "<p>No hay productos.</p>";
        return html;
    }
}
