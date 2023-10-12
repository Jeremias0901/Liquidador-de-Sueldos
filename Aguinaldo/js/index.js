const calcular = sueldos => {
  const maxSueldo = sueldos.reduce((max, act) => act > max ? act : max, sueldos[0]);
  const aguinaldo = maxSueldo / 2;
  return aguinaldo;
}
