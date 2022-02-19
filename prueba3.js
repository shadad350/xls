const test = [
    {
      Codigo: 1213,
      CodCompra: '1213',
      RubroC: 'CLIMATIZACION>CALEFONES>REPUESTOS>BORRAR',
      Item: 'RESISTENCIA PULMON BRONCE P/CALEFON ELECTRICO',
      Stock: 99,
      Precio: 750.23,
      PrecioCba: 564.08,
      Marca: '1'
    },
    {
      Codigo: 2738,
      CodCompra: '100 140 04',
      RubroC: 'CORTINERIA>BARRALES>BORRAR>BORRAR',
      Item: 'BARRAL PARA CORTINA DORADO DE 4MTS 1/2"',
      Stock: 118,
      Precio: 835.98,
      PrecioCba: 628.56,
      Marca: '1'
    },
  ];
  
  for (o of test)
    o.RubroC = o.RubroC.split(/BORRAR/).join('');
  
  console.log(test[0].RubroC)
  console.log(test[1].RubroC)
  console.log(test);