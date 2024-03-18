import { 
  ActionButtonInterface,
  sortRows, 
  TableColumnInterface, 
  TableFilterInterface, 
} from '@uniquedj95/vtable';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { get, sanitizeStr } from './common';
import useAppInfo from '@/composables/appInfo';
import useFacility from '@/composables/useFacility';

interface ExportOptions {
  columns: TableColumnInterface[];
  rows: any[];
  filename: string;
  quarter?: string;
  period?: string;
  filters?: TableFilterInterface;
  canHorizontalPageBreak?: boolean;
  appendFooter?: boolean;
}

const { appVersion, apiVersion } = useAppInfo();
const { facility } = useFacility();

/**
 * Determines if a column should be included in the export based on column exportable property.
 *
 * @param {TableColumnInterface} column - The column to check.
 * @returns {boolean} True if the column is exportable. False otherwise
 */
function isExportable(column: TableColumnInterface): boolean {
  return column.exportable !== false;
}

/**
 * Extracts exportable headings from the table columns based on safe mode.
 *
 * @param {Array<TableColumnInterface>} columns - Array of table column configurations.
 * @returns {Array<string>} Array of exportable column headings.
 */
function getExportableHeadings(columns: Array<TableColumnInterface>): Array<string> {
  return columns.filter(column => isExportable(column)).map(column => column.label);
}

/**
 * Processes and retrieves exportable rows from the table data.
 *
 * @param {Array<TableColumnInterface>} columns - Array of table column configurations.
 * @param {Array<any>} rows - Array of table row data.
 * @returns {Array<Array<string>>} Array of rows with exportable data.
 */
function getExportableRows(columns: Array<TableColumnInterface>, rows: Array<any>): Array<Array<string>>{
  return rows.map(row => {
    return columns.filter(column => isExportable(column))
      .map(column => {
        let value = get(row, column.path);
        if (typeof column.formatter === 'function' && value) value = column.formatter(value, row)
        return sanitizeStr(`${column.drillable && Array.isArray(value) ? value.length : value}`);
      })
  })
}

function getCsvFooter(quarter?: string, period?: string) {
  let str = `Date Created:  ${dayjs().format('DD/MMM/YYYY HH:MM:ss')}`;
  if (quarter) str += "\n" + `Quarter: ${quarter}`;
  if (period) str += "\n" + `Quarter: ${period}`;
  str += "\n" + `CDR Version : ${appVersion.value}`;
  str += "\n" + `API Version ${apiVersion.value}`;
  str += "\n" + `Site UUID: ${facility.value?.uuid ?? ''}`;
  return str
}

/**
 * Converts table data into a CSV formatted string.
 * 
 * The function also appends footer details such system versions, date created, etc.
 *
 * @param {ExportOptions} opts - Options for exporting, including columns, rows, and various metadata.
 * @returns {string} The table data in CSV format.
 */
export function toCsvString(opts: ExportOptions): string {
  const { columns, rows, quarter, period, filters, appendFooter } = opts;
  const exportableColumns = getExportableHeadings(columns);
  const exportableRows = getExportableRows(columns, sortRows(rows, filters?.sort || []));
  let str = exportableColumns.join(",") + "\n"
  str += exportableRows.map(row => row.join(",")).join("\n");
  if(appendFooter !== false) str += "\n" + getCsvFooter(quarter, period);
  return str;
}

/**
 * Export table data to CSV file.
 *
 * @param {ExportOptions} opts - Options for exporting, including columns, rows, and filename.
 */
export function exportToCSV(opts: ExportOptions) {
  const csvData = new Blob([toCsvString(opts)], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(csvData);
  link.setAttribute("download", `${opts.filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates and saves a PDF document from the provided table data.
 *
 * @param {ExportOptions} opts - Options for exporting, including columns, rows, and various settings for PDF generation.
 */
export function exportToPDF(opts: ExportOptions) {
  const { filename, canHorizontalPageBreak, columns, rows, filters } = opts
  const tableColumns: Array<Array<string>> = [ getExportableHeadings(columns) ];
  const tableRows: Array<Array<string>> = getExportableRows(columns, sortRows(rows, filters?.sort || []));
  const doc = new jsPDF()
  const title = doc.splitTextToSize(sanitizeStr(filename), 180)
  const tableMarginStartY = title.length <= 1 ? 20 : title.length * 10
  doc.text(title, 14, 10)
  const config: any = {
    startY: tableMarginStartY,
    head: tableColumns,
    body: tableRows
  }
  if (canHorizontalPageBreak) {
    config.tableWidth = 'wrap'
    config.horizontalPageBreak = true
    config.horizontalPageBreakRepeat = 0
  }
  autoTable(doc, config)
  const path = `${filename}.pdf`
  doc.save(path)
}

export function getPdfExportBtn(filename: string, useSecureExport: boolean, quarter?: string, period?: string): ActionButtonInterface {
  return {
    label: "PDF",
    color: "primary",
    action: async (_a, rows, filters, columns) => exportToPDF({
      rows, 
      filters,
      columns, 
      quarter,
      period,
      filename,
    })
  }
}

export function getCsvExportBtn (filename: string, quarter?: string, period?: string): ActionButtonInterface {
  return {
    label: "CSV",
    color: "primary",
    action: async (_a, rows, filters, columns) => {
      exportToCSV({
        rows, 
        filters,
        columns, 
        quarter,
        period,
        filename,
      })
    }
  }
}