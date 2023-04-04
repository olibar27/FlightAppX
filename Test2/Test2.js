function readExcelCell() {
  console.log("readExcelCell called");
  var url = "Book1.xlsx";
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (e) {
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, { type: "binary" });

    /* Get worksheet name */
    var first_sheet_name = workbook.SheetNames[0];

    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];

    /* Get cell A2 */
    var cell = worksheet["A2"];
    var value = cell ? cell.v : undefined;
    
    /* Display value */
    document.getElementById('excelCell').innerHTML = "<h2>Value of cell A2: " + value + "</h2>";
  };

  oReq.onerror = function (e) {
    console.error("An error occurred while loading the file.");
  };

  oReq.send();
}

window.addEventListener('DOMContentLoaded', function() {
  readExcelCell();
});
