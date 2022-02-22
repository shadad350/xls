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

var dataCSV = data.map(function (record) {
  delete record.Rubro;
  delete record.Empaque;
  delete record.Rev;

  for (o of data) o.RubroC = o.RubroC.split(/BORRAR/).join("");
  for (o of data) o.Marca = o.Marca.replace("1", "Publish");
  for (o of data) o.Marca = o.Marca.replace("0", "Draft");
  for (o of data)
    if (o.Stock < 0) {
      o.Stock = 0;
    }

  record.Stock = parseInt(record.Stock);
  record.Precio = Math.ceil(parseInt(record.Precio) / 100);
  record.PrecioCba = parseInt(record.PrecioCba) / 100;
  record.Precio5 = record.Precio;
  record.Precio = record.Precio + 69;
  return record;
});

//console.log(dataCSV);

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(dataCSV);
xlsx.utils.book_append_sheet(newWB, newWS, "sheet");

xlsx.writeFile(newWB, "PasoInfo.csv");
