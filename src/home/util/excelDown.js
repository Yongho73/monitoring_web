import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export function excelDownLoad(columns , excelData , fileName) {
  let title = [];

  if(columns){
    for(let i = 0 ; i  < columns.length ; i ++ ){      
      title.push(columns[i].label)      
    }
  }
    

  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelFileName =  fileName;
  
  const ws = XLSX.utils.aoa_to_sheet([ title ]);

  XLSX.utils.sheet_add_json(ws, excelData, {    
    skipHeader: true,
    origin: -1 //ok
  });

  ws["A1"].s = {
    fill: {
      patternType:"solid",
      fgColor:{ rgb: "00dce6f1" },
      bgColor:{ rgb: "00dce6f1" } 
    }    
  };
  
  const wb: any = {Sheets: { data: ws }, SheetNames: ['data']};
  const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
  const excelFile = new Blob([excelButter], { type: excelFileType});
  FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
};