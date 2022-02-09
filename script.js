const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"];

let ventas = [
  // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
  {
    id: 1,
    fecha: new Date(2019, 1, 4),
    nombreVendedora: "Grace",
    sucursal: "Centro",
    componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
  },
  {
    id: 2,
    fecha: new Date(2019, 0, 1),
    nombreVendedora: "Ada",
    sucursal: "Centro",
    componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
  },
  {
    id: 3,
    fecha: new Date(2019, 0, 2),
    nombreVendedora: "Grace",
    sucursal: "Caballito",
    componentes: ["Monitor ASC 543", "Motherboard MZI"],
  },
  {
    id: 4,
    fecha: new Date(2019, 0, 10),
    nombreVendedora: "Ada",
    sucursal: "Centro",
    componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"],
  },
  {
    id: 5,
    fecha: new Date(2019, 0, 12),
    nombreVendedora: "Grace",
    sucursal: "Caballito",
    componentes: [
      "Monitor GPRS 3000",
      "Motherboard ASUS 1200",
      "Monitor GPRS 3000",
      "Motherboard ASUS 1500",
    ],
  },
];

const articulos = [
  { item: "Monitor GPRS 3000", precio: 200 },
  { item: "Motherboard ASUS 1500", precio: 120 },
  { item: "Monitor ASC 543", precio: 250 },
  { item: "Motherboard ASUS 1200", precio: 100 },
  { item: "Motherboard MZI", precio: 30 },
  { item: "HDD Toyiva", precio: 90 },
  { item: "HDD Wezter Dishital", precio: 75 },
  { item: "RAM Quinston", precio: 110 },
  { item: "RAM Quinston Fury", precio: 230 },
];

const sucursales = ["Centro", "Caballito"];

//1. precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que
//se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioMaquina = (componentes) => {
  let totalComponentes = 0;
  for (const componente of componentes) {
    totalComponentes += articulos.find(
      (articulo) => articulo.item === componente
    ).precio;
  }
  return totalComponentes;
};
//console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])); // 320 ($200 del monitor + $120 del motherboard)

//2. cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad
//de veces que fue vendido, o sea que formó parte de una máquina que se vendió.
//La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const cantidadVentasComponente = (componente) => {
  let totalVentas = 0;
  for (const venta of ventas) {
    for (const item of venta.componentes) {
      if (item === componente) {
        totalVentas++;
      }
    }
  }
  return totalVentas;
};
console.log(cantidadVentasComponente("Monitor ASC 543")); // 2

// 3. vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos,
//(mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes.
//O sea no cantidad de ventas, sino importe total de las ventas.
//El importe de una venta es el que indica la función precioMaquina.
//El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

// hacemos la funcion ventasPorFecha para reutilizarla en el punto 3

const ventasPorFecha = (mes, anio) => {
  const filtroDeVentas = [];
  for (const venta of ventas) {
    if (
      mes - 1 == venta.fecha.getMonth() &&
      anio == venta.fecha.getFullYear()
    ) {
      filtroDeVentas.push(venta);
    }
  }
  return filtroDeVentas;
};

const vendedoraDelMes = (mes, anio) => {
  const totalVentasPorVendedora = [];
  const ventasMes = ventasPorFecha(mes, anio);

  // findIndex : me trae el indice del primer elemento que coincida con mi condicion
  for (const venta of ventasMes) {
    let index = totalVentasPorVendedora.findIndex(
      () => ventasMes.nombreVendedora === venta.nombreVendedora
    );
    //console.log(index)
    if (index === -1) {
      //cuando no existe el indice el findIndex retorna -1.
      totalVentasPorVendedora.push({
        nombre: venta.nombreVendedora,
        total: precioMaquina(venta.componentes),
      });
      console.log("Creando el Objeto: ", totalVentasPorVendedora);
    } else {
      totalVentasPorVendedora[index].total += precioMaquina(venta.componentes);
    }
  }

  let nombreVendedora = "";
  let vendedoraPrecio = 0;

  for (const indice in totalVentasPorVendedora) {
    console.log(indice);
    if (vendedoraPrecio <= totalVentasPorVendedora[indice].total) {
      vendedoraPrecio = totalVentasPorVendedora[indice].total;
      console.log(totalVentasPorVendedora[indice].total);
      nombreVendedora = totalVentasPorVendedora[indice].nombre;
    }
  }

  console.log(vendedoraPrecio);
  console.log(nombreVendedora);
  return nombreVendedora;
};

console.log(vendedoraDelMes(1, 2019));

// 4. ventasMes(mes, anio): Obtener las ventas de un mes.
//El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
//***************************************************** */
//totalVentas recibe un array de Parametro
const totalVentas = (ventasAsumar) => {
  let auxVentas = 0;
  for (const venta of ventasAsumar) {
    auxVentas += precioMaquina(venta.componentes);
  }
  return auxVentas;
};
console.log("total ventas ???? ", totalVentas(ventas));
//************************************************** */
//esta es la solucion 4:
const ventasMes = (mes, anio) => {
  const ventasXmes = ventasPorFecha(mes, anio);
  return totalVentas(ventasXmes);
};

console.log(ventasMes(1, 2019)); // 1250

//5. ventasVendedora(nombre): Obtener las ventas totales realizadas
//por una vendedora sin límite de fecha.

const ventasVendedora = (nombre) => {
  const filtarVendedora = ventas.filter(
    (venta) => venta.nombreVendedora === nombre
  );
  return totalVentas(filtarVendedora);
};

console.log("ventas vendedora :", ventasVendedora("Grace")); //1220

//6.componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente.
// El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente.

//se retorna el NOMBRE del componente mas vendido
//cantidadVentasComponente retorna un numero = totalVentas , recibe un string componente
//la funcion recibe una Variable Global --- porque Ventas tiene un scope Global

const componenteMasVendido = () => {
  const arrayComponente = [];

  for (const articulo of articulos) {
    let nombreArticulo = articulo.item;
    arrayComponente.push({
      nombre: nombreArticulo,
      cantidad: cantidadVentasComponente(nombreArticulo),
    });
  }

  let aux = 0;
  let masVendido;

  for (const item of arrayComponente) {
    if (item.cantidad > aux) {
      aux = item.cantidad;
      masVendido = item.nombre;
    }
  }

  return masVendido;
};

console.log(componenteMasVendido()); // monitor GPRS 3000

//7. huboVentas(mes, anio): que indica si hubo ventas en un mes determinado.
//El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio) => {
  const ventasMes = ventasPorFecha(mes, anio);

  return ventasMes.length > 0;
};
console.log("hubo ventas ?", huboVentas(3, 2019)); // false

//8.Crear la función ventasSucursal(sucursal), que obtiene las ventas totales
//realizadas por una sucursal sin límite de fecha.

const ventasSucursal = (sucursal) => {
  const ventasXsucursal = ventas.filter((venta) => venta.sucursal === sucursal);
  return totalVentas(ventasXsucursal);
};

console.log("ventas x sucursal: ", ventasSucursal("Centro"));
console.log(ventasSucursal("Caballito"));

//9. Las funciones ventasSucursal y ventasVendedora tienen mucho código en común,
//ya que es la misma funcionalidad pero trabajando con una propiedad distinta.
//Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

//10. Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos,
//(mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio) => {
  const totalSucursalXmes = [];
  const ventasMes = ventasPorFecha(mes, anio);

  for (const venta of ventasMes) {
    let indice = totalSucursalXmes.findIndex(
      (sucursal) => sucursal.nombre === venta.sucursal
    );

    if (indice === -1) {
      totalSucursalXmes.push({
        nombre: venta.sucursal,
        total: precioMaquina(venta.componentes),
      });
    } else {
      totalSucursalXmes[indice].total += precioMaquina(venta.componentes);
    }
  }
  console.log("probando", totalSucursalXmes);

  let nombreSucursal = "";
  let totalVentasSucursal = 0;

  for (const indice in totalSucursalXmes) {
    if (totalVentasSucursal <= totalSucursalXmes[indice].total) {
      totalVentasSucursal = totalSucursalXmes[indice].total;
      nombreSucursal = totalSucursalXmes[indice].nombre;
    }
  }

  return nombreSucursal;
};

console.log(sucursalDelMes(1, 2019)); // "Caballito"

/****************************************DOM****************************************************/
////////////////////////////////////MODAL BULMA/////////////////////////////////////////////////

////////////////////Traemos los ID del html///////////////////////
const objetoNuevaVenta = document.getElementById("tablaVentas");
const btnNuevaVenta = document.getElementById("btn-nueva-vta");
const crearModal = document.getElementById("modal-create");
const crearVenta = document.getElementById("crear-venta");
const cerrarModal = document.getElementById("btn-close");
let selectComponentes = document.getElementById("seleccion-componentes");
const btnCerrarEditor = document.getElementById("btnCerrarEditor");
const iconoEditar = document.getElementById("icono-editar");
const productoEstrella = document.getElementById("productos-estrella");
const nombreVendedora = document.getElementById("mayorVentaXVendedora");
const cancelarNuevaVenta = document.getElementById("cancelar-nueva-venta");

cancelarNuevaVenta.addEventListener("click", () =>{
  closeModal(crearModal);
})

//VARIABLES GLOBALES
//let seleccionComponentes = [];

////////Funciones del modal//////////////////////
function openModal($el) {
  $el.classList.add("is-active");
}

function closeModal($el) {
  $el.classList.remove("is-active");
}

function closeAllModals() {
  (document.querySelectorAll(".modal") || []).forEach(($modal) => {
    closeModal($modal);
  });
}

// //Añadir un evento de clic en los botones para abrir un modal específico
(document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);
  console.log($target);
  //trigger es el boton
  $trigger.addEventListener("click", () => {
    //$target es el id modal
    openModal($target);
  });
});

//AÑADIR UN EVENTO DEL CLICK EN VARIOS ELEMENTOS HIJOS PARA CERRAR EL MODAL PADRE.
(
  document.querySelectorAll(
    ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
  ) || []
).forEach(($close) => {
  const $target = $close.closest(".modal");

  $close.addEventListener("click", () => {
    closeModal($target);
  });
});

//AÑADIR UN ENVENTO DE TECLADO PARA CERRAR TODOS LOS MODALES.
document.addEventListener("keydown", (event) => {
  const e = event || window.event;

  if (e.keyCode === 27) {
    //Escape key
    closeAllModals();
  }
});

//FUNCIÓN PARA GENERAR ID DINÁMICAMENTE
const generateId = () => Math.ceil(Math.random() * 100_000);

/////FUNCIÓN PARA PARSEAR LA FECHA
const parseDateToString = (date) => {
  let day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return `${date.getFullYear()}-${month}-${day}`;
};

const parseDateToStringDom = (date) => {
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return `${day}/${month}/${date.getFullYear()}`;
};

// function capturarComponentes(lista) {
//   let seleccionComponentes=[]
//   let elegido = lista.value
//   //reconoce la lista y las opciones pero no hace el push de cada uno de los seleccionados
//   //for(const option of lista.options){

//     //if(option.selected){  //reconoce el ultimo valor
//       seleccionComponentes.push(elegido);
//       console.log("valor", elegido)
//   //  }
//  // }
//   console.log("selecc compo", seleccionComponentes)
//   return seleccionComponentes;
// }

function capturarComponentes(select) {
  let seleccionComponentes = [];
  let options = select && select.options;
  console.log("opciones", options);
  for (const option of options) {
    if (option.selected) {
      console.log("seleccion", option.selected);
      seleccionComponentes.push(option.value);
    }
  }

  return seleccionComponentes;
}

function capturarDatos() {
  let eleccionVendedora = document.getElementById("nombre-vendedora");
  let eleccionSucursal = document.getElementById("seleccion-sucursal");
  let eleccionFecha = document.getElementById("seleccion-fecha");
  let selectComponentes = document.getElementById("seleccion-componentes");

  let componentesSelec = capturarComponentes(selectComponentes);
  let componentesPrecio = precioMaquina(componentesSelec);
  let idRandom = generateId();

  let objeto = {
    id: idRandom,
    fecha: new Date(eleccionFecha.value),
    nombreVendedora: eleccionVendedora.value,
    sucursal: eleccionSucursal.value,
    componentes: componentesSelec,
    precio: componentesPrecio,
  };

  console.log("compo de objeto", objeto.componentes);
  ventas.push(objeto);
  renderTabla();

  console.log("array ventas", ventas);
}

//SE SELECCIONAN VARIOS COMPONENTES PARA CREAR LA VENTA
const setOptionSelectedMultiple = (element, optionsToSelect) => {
  const options = element.options;
  for (const index in options) {
    const option = options[index];
    if (optionsToSelect.includes(option.value)) {
      option.selected = true;
    }
  }
};

/*************************************************************************/

//vendedoraDelMes nos retorna el nombre de la vendedora
const vendedoraMejorVenta = () => {
  const totalVentasPorVendedora = [];

  // findIndex : me trae el indice del primer elemento que coincida con mi condicion
  for (const venta of ventas) {
    let index = totalVentasPorVendedora.findIndex(
      () => ventas.nombreVendedora === venta.nombreVendedora
    );
    //console.log(index)
    if (index === -1) {
      //cuando no existe el indice el findIndex retorna -1.
      totalVentasPorVendedora.push({
        nombre: venta.nombreVendedora,
        total: precioMaquina(venta.componentes),
      });
    } else {
      totalVentasPorVendedora[index].total += precioMaquina(venta.componentes);
    }
  }

  let nombreVendedora = "";
  let vendedoraPrecio = 0;

  for (const indice in totalVentasPorVendedora) {
    console.log(indice);
    if (vendedoraPrecio <= totalVentasPorVendedora[indice].total) {
      vendedoraPrecio = totalVentasPorVendedora[indice].total;
      console.log(totalVentasPorVendedora[indice].total);
      nombreVendedora = totalVentasPorVendedora[indice].nombre;
    }
  }

  console.log(vendedoraPrecio);
  console.log(nombreVendedora);
  return nombreVendedora;
};

//FUNCIÓN QUE IMPRIME EN EL HTML
function renderTabla() {
  let plantilla = "";

  for (const item of ventas) {
    item.precio = precioMaquina(item.componentes);

    plantilla += `<tr>
      <td>${parseDateToString(item.fecha)}</td>
      <td>${item.nombreVendedora}</td>
      <td>${item.sucursal}</td>
      <td>${item.componentes}</td>
      <td>${item.precio}</td> 
      <td><i id="icono-editar" class="pencil fas fa-pencil-alt" onclick="openEditModal(${
        item.id
      })"
      ></i><i class="trash far fa-trash-alt" onclick="openDeleteModal(${
        item.id
      })"></i></td> 
      </tr>                                      
    `;
  }
  objetoNuevaVenta.innerHTML = plantilla;
  mostrarvtasxSucursal();
  nombreComponenteMasVendido();
  mejorVendedora();
}

function inicializar() {
  renderTabla();
  mostrarvtasxSucursal();
  nombreComponenteMasVendido();
  mejorVendedora();
}

//GUARDA LOS COMPONENTES SELECCIONADOS EN LA VENTA
// selectComponentes.addEventListener("change", () => {
//   capturarComponentes(elemento);
// });

cerrarModal.addEventListener("click", () => {
  closeModal(crearModal);
});

//SE CREA LA VENTA
crearVenta.addEventListener("click", () => {
  capturarDatos();
  //seleccionComponentes = [];
  closeModal(crearModal);
});

//SE CIERRA EL MODAL UNA VEZ QUE SE AGREGA LA VENTA
btnNuevaVenta.addEventListener("click", () => {
  openModal(crearModal);
});

//DATOS PRE CARGADOS DE VENTA POR SUCURSAL
const ventasPorSucursal = document.getElementById("tablaSucursal");

function mostrarvtasxSucursal() {
  let mostrarResultados = "";

  for (const sucursal of sucursales) {
    mostrarResultados += `
      <tr>
        <td>${sucursal}</td>
        <td>${ventasSucursal(sucursal)}</td>
      <tr>
      `;
  }

  ventasPorSucursal.innerHTML = mostrarResultados;
}

//FUNCION PARA PRODUCTOS ESTRELLA: COMPONENTE MÁS VENDIDO
//componenteMasVendido()devuelve el nombre del componente mas vendido

const nombreComponenteMasVendido = () => {
  productoEstrella.innerHTML = `Productos estrella: ${componenteMasVendido()}`;
};

//VENDEDORA QUE MAS INGRESOS GENERÓ
const mejorVendedora = () => {
  nombreVendedora.innerHTML = `Vendedora que más ingresos generó: ${vendedoraMejorVenta()}`;
};

//////////////////////////EDITAR VENTA//////////////////////
const btnCerrarEditar = document.getElementById("cerrar-modal-editar");//este es el boton cancelar 
const editarModal = document.getElementById("editar-modal");
const editarVenta = document.getElementById("editar-venta");
const cancelarEditar = document.getElementById("cerrar-modal-editar");
const $ = (element) => document.querySelector(element);

btnCerrarEditar.addEventListener("click", () => {
  closeModal(editarVenta);
});

const openEditModal = (id) => {
  let venta = ventas.find((venta) => venta.id === id);

  $("#editarNombre").value = venta.nombreVendedora;
  $("#editarSucursal").value = venta.sucursal;
  setOptionSelectedMultiple($("#editar-componentes"), venta.componentes);
  $("#editar-fecha").value = parseDateToString(venta.fecha);
  $("#editarId").value = venta.id;

  openModal($("#editar-modal"));
};

//boton guardar edicion
$("#editar-venta").addEventListener("click", () => {
  const id = Number($("#editarId").value);
  const nombreVendedora = $("#editarNombre").value;
  const fecha = new Date($("#editar-fecha").value);
  const sucursal = $("#editarSucursal").value;
  const componentes = capturarComponentes($("#editar-componentes"));

  const venta = {
    id,
    nombreVendedora,
    fecha,
    sucursal,
    componentes,
  };

  const index = ventas.findIndex((venta) => venta.id == id);
  ventas[index] = venta;
  renderTabla();
});

editarVenta.addEventListener("click", () => {
  closeModal(editarModal);
});

btnCerrarEditar.addEventListener("click", () => {
  closeModal(editarModal);
});

/////////////////////ELIMINAR VENTA//////////////////////////////
const eliminarVenta = document.getElementById("eliminar-venta");
const cerrarModalEliminar = document.getElementById("modal-eliminar");


const openDeleteModal = (id) => {
  $("#borrarId").value = id;
  openModal($("#modal-eliminar"));
};

$("#eliminar-venta").addEventListener("click", () => {
  const id = $("#borrarId").value;
  const index = ventas.findIndex((venta) => venta.id == id);
  if (index != -1) {
    ventas.splice(index, 1);
  }

  renderTabla();
 
});

$("#cancelar-eliminar").addEventListener("click", () => {
  closeModal($("#modal-eliminar"));
});

eliminarVenta.addEventListener("click", () =>{
  closeModal(cerrarModalEliminar)
})


window.onload = inicializar;
