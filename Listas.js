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

//cellRef = xlsx.utils.encode_range({ s: { c: 4, r: 5 }, e: { c: 4, r: 4999 } });

var data = xlsx.utils.sheet_to_json(ws);

var removed = data.splice((data.Marca='1'),1)

var dataList = data.map(function (record) {
  delete record.CodCompra;
  delete record.Rubro;
  delete record.RubroC;
  delete record.Empaque;
  delete record.Stock;
  delete record.Precio;
  delete record.Rev;

   /*  for (o of data)
    delete o.Marca; */
    

  record.PrecioCba = parseInt(record.PrecioCba) / 100;

  return record;
});



//console.log(cellRef);
//console.log(ws['B5'].w);
console.log(dataList);

/* var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(dataList);
xlsx.utils.book_append_sheet(newWB, newWS, "lista");


var dataPDF = data.map(function (record) {
  delete record.Item


  return record;
});

var newWS1 = xlsx.utils.json_to_sheet(dataPDF);
xlsx.utils.book_append_sheet(newWB, newWS1, "PDF");

xlsx.writeFile(newWB, "Listas.xls"); 
 */