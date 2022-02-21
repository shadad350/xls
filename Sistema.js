var xlsx = require("xlsx");

var wb = xlsx.readFile("210222.XLS");
var ws = wb.Sheets["Sheet1"];

ws["!ref"] = ws["!ref"].replace("A1", "B5");
ws["B5"].w = ws["B5"].w.replace("Código", "Codigo");
ws["C5"].w = ws["C5"].w.replace("Cód. compra", "CodCompra");
ws["E5"].w = ws["E5"].w.replace("Rubro completo", "RubroC");
ws["F5"].w = ws["F5"].w.replace("Denominación", "Item");
ws["G5"].w = ws["G5"].w.replace("Empaque x", "Empaque");
ws["J5"].w = ws["J5"].w.replace("Precio Cba.", "PrecioCba");
ws["K5"].w = ws["K5"].w.replace("Precio Rev.", "Rev");
ws["L5"].w = ws["L5"].w.replace("Marca 1-Activo, 0-Inactivo", "Marca");

var data = xlsx.utils.sheet_to_json(ws);

var dataSistema = data.map(function (record) {
  delete record.CodCompra;
  delete record.Rubro;
  delete record.RubroC;
  delete record.Empaque;
  delete record.PrecioCba;
  delete record.Rev;

  for (o of data) o.Marca = o.Marca.replace("1", "Activa");
  for (o of data) o.Marca = o.Marca.replace("0", "Pausada");
  for (o of data)
    if (o.Stock < 0) {
      o.Stock = 0;
    }
  for (o of data)
    if (o.Stock === 0) {
      o.Marca= "Pausada";
    }

  record.Stock = parseInt(record.Stock);
  record.Precio = Math.ceil(parseInt(record.Precio) / 100);
  record.Precio5 = record.Precio;
  record.Precio = record.Precio + 69;
  record.Codigo= toString(record.Codigo)
  return record;
});

/* var dataSistemaD = dataSistema.map(function (o) {
  if (o.Stock === 0) {
    o.Marca= "Pausada";
  }
  return o;
}); */

//console.log(dataSistema);

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(dataSistema);
xlsx.utils.book_append_sheet(newWB, newWS, "Sistema");
xlsx.writeFile(newWB, "Sistema.xls");
