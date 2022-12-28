
document.querySelector('.formulario').addEventListener("submit", (e) => {
  const fecha = new Date();
  const meses = [ // 2021
  /**
   * NOTE: es posible utilizar la api: https://api.workingdays.org/1.2/api-documentation.php
   * para recuperar los dias laborales automaticamente
   */
  {nombre: "enero", diasHabiles: 25},
  {nombre: "febrero", diasHabiles: 22},
  {nombre: "marzo", diasHabiles: 24},
  {nombre: "abril", diasHabiles: 24},
  {nombre: "mayo", diasHabiles: 21},
  {nombre: "junio", diasHabiles: 24},
  {nombre: "julio", diasHabiles: 25},
  {nombre: "agosto", diasHabiles: 24},
  {nombre: "septiembre", diasHabiles: 23},
  {nombre: "octubre", diasHabiles: 24},
  {nombre: "noviembre", diasHabiles: 24},
  {nombre: "diciembre", diasHabiles: 24}
  ];
  // diasHabiles = meses.map( ({diasHabiles}) => diasHabiles );

  var persona = {
  name: document.getElementById("name").value,
  surname: document.getElementById("surname").value,
  dni: parseFloat(document.getElementById("dni").value),
  cuil: parseFloat(document.getElementById("cuil").value)
  }
  var ingreso = {
    sueldoBasico: parseFloat(document.getElementById("sueldoBasico").value),
    antiguedad: {
      procentajePorAnio: parseFloat(document.getElementById("porcentajeAnio").value)
    },
    anioActual: fecha.getUTCFullYear(),
    fechaIngresoEmpresa: parseFloat(document.getElementById("fechaIngresoEmpresa").value),
    titulo: {
      nombre: document.getElementById("tituloNombre").value,
      plata: parseFloat(document.getElementById("tituloValor").value),
    },
    presentismo: parseFloat(document.getElementById("presentismo").value),
    mesLiquidar: document.getElementById("mesLiquidar").value,
    hora: {
      normalCantidad: parseFloat(document.getElementById("horasDia").value),
      extra: {
      cincuentaCantidad: parseFloat(document.getElementById("horasExtra50").value),
      cienCantidad: parseFloat(document.getElementById("horasExtra100").value)
      }
    },
    // vacacionesDias: parseFloat(document.getElementById("vacaciones").value),
    inasistencias: parseFloat(document.getElementById("inasistencias").value),
    viaticos: parseFloat(document.getElementById("viaticos").value),
    aportes: [
      { nombre: "jubilacion", porcentaje: parseFloat(document.getElementById("jubilacion").value) },
      { nombre: "obraSocial", porcentaje: parseFloat(document.getElementById("obraSocial").value)},
      { nombre: "pami", porcentaje: parseFloat(document.getElementById("pami").value)},
      { nombre: "sindicato", porcentaje: parseFloat(document.getElementById("sindicato").value)}
    ],
    asignaciones: {
      familiarCargo: parseFloat(document.getElementById("familiarCargo").value)/* ,
      asignacionFamiliarPrenatal: parseFloat(document.getElementById("ASIGFANPRE").value),
      asignacionFamiliarCargo: parseFloat(document.getElementById("ASIGFAC").value), */
    }
  }

  var diasHabiles;
  var validated;
  var totalAportes;
  var horasExtra;
  var antiguedad;
  var inasistencias;
  var sueldoBruto;
  var viaticos;

  var mesElegido;
  var diasHabilesHoy;
  var hora;
  var horaExtra100;
  var horaExtra50;
  var aportes;
  var sueldoNeto;

  e.preventDefault(); // para que no se recargue la pagina
  validated = validate();

  if(!validated) return;

  totalAportes = ingreso.aportes.reduce((ac, a) => { ac + a });
  horasExtra = {
  cincuenta: {  },
  cien: {  }
  };

  horasExtra.cien.cantidad = ingreso.hora.extra.cienCantidad;
  horasExtra.cincuenta.cantidad = ingreso.hora.extra.cincuentaCantidad;

  antiguedad = {
  anios: ingreso.anioActual - ingreso.fechaIngresoEmpresa,
  porcentaje: null,
  valor: null
  }

  if (document.getElementById("mesLiquidar").value == "0") {
  alert('es igual a cero' + ingreso.mesLiquidar);
  }else
  alert('NOOOOOOOOOOOOO es igual a cero' + ingreso.mesLiquidar);

  mesElegido = meses.filter(mes => mes.nombre === document.getElementById("mesLiquidar").value)[0];
  diasHabilesHoy = mesElegido.diasHabiles;
  const horasTotalesDelMes = diasHabilesHoy * ingreso.hora.normalCantidad;

  hora = {
  normal: {
    valor: null
  }
  }

  hora.normal.valor = ingreso.sueldoBasico / (diasHabilesHoy * ingreso.hora.normalCantidad);

  antiguedad.porcentaje = antiguedad.anios * ingreso.antiguedad.procentajePorAnio;
  antiguedad.valor = (sueldoBasico *  ingreso.antiguedad.procentajePorAnio) / 100;
  const sueldoBasicoNormalHabitual = sueldoBasico + antiguedad.valor + ingreso.titulo.valor;

  horaExtra100 = {
  valor: hora.normal.valor * 1.5,
  total: null
  }

  horaExtra100.total = horaExtra100.valor * ingreso.hora.extra.cincuentaCantidad

  // horasExtra50Valor = (sueldoBasicoNormalHabitual / horasTotalesDelMes + sueldoBasicoNormalHabitual / horasTotalesDelMes / 2) * input.horasExtra50;
  // HSEX100R = (sueldoBasicoNormalHabitual / horasTotalesDelMes + sueldoBasicoNormalHabitual / horasTotalesDelMes) * horasExtra100;

  inasistencias = (sueldoBasicoNormalHabitual * ingreso.inasistencias) / diasHabilesHoy;

  var presentismo;

  if (ingreso.inasistencias > 0) {
    presentismo = presentismo * 0.0;
  }

  horaExtra50 = {
  valor: hora.normal.valor * 1.5,
  total: null
  }

  horaExtra50.total = horaExtra50.valor * ingreso.hora.extra.cincuentaCantidad;
  sueldoBruto = sueldoBasicoNormalHabitual + presentismo + horaExtra50.total + horaExtra100.total - inasistencias;

  aportes = ingreso.aportes.map( aporte => {
  return { nombre: aporte.nombre, valor: (sueldoBruto * aporte.porcentaje) / 100 };
  });

  sueldoNeto = sueldoBruto - totalAportes;
  viaticos = ingreso.viaticos * diasHabilesHoy;
  sueldoNetoCobrar = sueldoNeto + viaticos;
  ingreso.hora.normalCantidad = antiguedad.valor + ingreso.titulo.valor + ingreso.presentismo + horaExtra50.total + horaExtra100.total + viaticos;

  document.getElementById("output__name").value = ingreso.name;
  document.getElementById("output__surname").value = ingreso.surname;
  document.getElementById("output__dni").value = ingreso.dni;
  document.getElementById("output__cuil").value = document.getElementById("cuil").value;

  document.getElementById("output__antiguedad").value = antiguedad;

  document.getElementById("output__sueldoBasico").value = sueldoBasico;

  document.getElementById("output__jubilacion").value = jubilacion;
  document.getElementById("output__jubilacionR").value = jubilacion;

  document.getElementById("output__pami").value = ingreso.aportes[2].porcentaje;
  document.getElementById("output__pamiR").value = aportes[2].valor;

  document.getElementById("output__obraSocial").value = ingreso.obraSocial;
  document.getElementById("output__obraSocialR").value = aportes[1].valor;

  document.getElementById("output__sindicato").value = sindicato;
  document.getElementById("output__sindicatoR").value = aportes[3].valor;

  /* document.getElementById("output__familiarCargo").value = familiarCargo;
  document.getElementById("output__familiarCargoR").value = familiarCargoR; */

  document.getElementById("output__antiguedad").value = antiguedad;
  document.getElementById("output__antiguedadR").value = antiguedad.valor;

  document.getElementById("output__tituloValor").value = ingreso.titulo.nombre;
  document.getElementById("output__tituloValorR").value = 1;

  document.getElementById("output__presentismo").value = ingreso.presentismo;
  document.getElementById("output__presentismoR").value = presentismo;

  document.getElementById("output__fecha").value = ingreso.anioActual.toString();

  document.getElementById("output__horasExtra50").value = horasExtra50.cantidad;
  document.getElementById("output__horasExtra50R").value = horasExtra50.plata;
  document.getElementById("output__horasExtra100").value = horasExtra100.cantidad;
  document.getElementById("output__horasExtra100R").value = horasExtra100.plata;

  document.getElementById("output__viaticos").value = ingreso.viaticos;
  document.getElementById("output__viaticosR").value = viaticos;

  document.getElementById("output__inasistencias").value = ingreso.inasistencias;
  document.getElementById("output__inasistenciasR").value = inasistencias;
  document.getElementById("output__sueldoBruto").value = sueldoBruto;

  document.getElementById("output__sueldoNetoCobrar").value = sueldoNeto;

  document.getElementById("output__aportes").value = totalAportes;

  document.getElementById("output__horasDia").value = ingreso.hora.normalCantidad;
});

function validate() {
  /**
   * TODO: Desarrollar esta funcion.
   * NOTE: usar expresiones regulares para cada datos para validar los datos.
   *       objeto expresiones preliminar.
   */

  const expresiones = {
  nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,}$/,
  plata: /(^[0-9]{1,3}\.[0-9]{3},[0-9]{2}$|^[0-9]{1,3}\.[0-9]{3}$|^[0-9]{1,3}$)/
  }

  validated = false;



  return true;  // provisional para tests
  // return validated;
}
