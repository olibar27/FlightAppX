function readExcelFile() {
    console.log("readExcelFile called");
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            console.log('File successfully read.');
            var data = new Uint8Array(event.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var sheet_name_list = workbook.SheetNames;
            var html = '';
            sheet_name_list.forEach(function(sheet_name) {
                var worksheet = workbook.Sheets[sheet_name];
                var sheet_html = XLSX.utils.sheet_to_html(worksheet);
                html += '<h2>' + sheet_name + '</h2>' + sheet_html;
            });
            document.getElementById('excelTable').innerHTML = html;
        };
        reader.onerror = function (event) {
            console.error("File could not be read! Error:", event.target.error);
        };
        reader.readAsArrayBuffer(file);
    };
    input.click();
}
