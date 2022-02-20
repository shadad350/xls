var xlsx = require("xlsx");

var wb = xlsx.readFile("180222.XLS");

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

var fueraMarca = data.filter((item) => {
  return item.Marca === "1";
});

var dataList = fueraMarca.map(function (record) {
  delete record.CodCompra;
  delete record.Rubro;
  delete record.RubroC;
  delete record.Empaque;
  delete record.Stock;
  delete record.Precio;
  delete record.Rev;
  delete record.Marca;

  record.PrecioCba = parseInt(record.PrecioCba) / 100;

  return record;
});

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(dataList);
xlsx.utils.book_append_sheet(newWB, newWS, "lista");

var dataPDF = fueraMarca.map(function (record1) {
  delete record1.Item;
  return record1;
});

var newWS1 = xlsx.utils.json_to_sheet(dataPDF);
xlsx.utils.book_append_sheet(newWB, newWS1, "PDF");

xlsx.writeFile(newWB, "Listas.xlsx");
