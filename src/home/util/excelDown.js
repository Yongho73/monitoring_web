import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from 'xlsx-js-style'
import _ from 'lodash'

export function excelDownLoad(columns , excelData , fileName) {
  let title = [];
  let colWidth = []
  let colHeight= [{ hpx : 35 }]
  let data = []
  
  const headerStyle = { border: {top: { style: "thin", color: { rgb: "000000" } },
                                 bottom: { style: "thin", color: { rgb: "000000" } },
                                 left: { style: "thin", color: { rgb: "000000" } },
                                 right: { style: "thin", color: { rgb: "000000" } }},
                        font: { bold : true },
                        alignment: { vertical: 'center' , horizontal: 'center' },
                        fill: { patternType: 'solid', fgColor: {rgb: 'FFD3D3D3'}}};

  if(columns){
    for(let i = 0 ; i  < columns.length ; i ++ ){      
      const headerData = { v:columns[i].label ,t:'s', s: headerStyle } 
      title.push(headerData)                  
    }
  }

  if(excelData){
    for(let i = 0 ; i  < excelData.length ; i ++ ){      
      const wch = { wch : 20 }
      const hpx = { hpx : 35 }
      colWidth.push(wch);
      colHeight.push(hpx);
    }
  }
    

  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelFileName =  fileName;
  
  const ws = XLSX.utils.aoa_to_sheet([ title ]);
  ws['!cols'] = colWidth;
  ws['!rows'] = colHeight;
    
  XLSX.utils.sheet_add_json(ws, excelData, { skipHeader: true, origin: -1  });  

  _.forEach(ws, (v, c) => {
    if (c !== '!ref' &&  c !== '!cols' && c !== '!rows') {     
      // 컬렁 명에서 문자열만 추출 ( A1, A2, A3 --> 1, 2, 3)
      const regex = /[^0-9]/g;
      const result = c.replace(regex, "");
      const number = parseInt(result);      

      if(number > 1){ // Header Row 는 스타일 제외  
        ws[c]['s'] = { alignment: { vertical: 'center'}}
      }
    }
  })
    
  const wb: any = {Sheets: { data: ws }, SheetNames: ['data']};  
  
  const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
  const excelFile = new Blob([excelButter], { type: excelFileType});
  FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);

}