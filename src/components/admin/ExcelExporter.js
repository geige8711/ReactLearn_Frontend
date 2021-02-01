import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelExporter = ({ dataSet, fileName, sheetName, children, columns }) => {
  return (
    <ExcelFile element={children} filename={fileName}>
      <ExcelSheet data={dataSet} name={sheetName}>
        {columns.map((column, index) => (
          <ExcelColumn key={index} label={column} value={column} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExcelExporter;
