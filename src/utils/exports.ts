import { 
  ActionButtonInterface,
  sortRows, 
  TableColumnInterface, 
  TableFilterInterface, 
} from '@uniquedj95/vtable';
import dayjs from 'dayjs';
import { ApiCore } from 'emr-api-client';
import jsPDF, { EncryptionOptions } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { get, sanitizeStr } from './common';
import useAppInfo from '@/composables/appInfo';
import useFacility from '@/composables/useFacility';
import { alertConfirmation } from './alerts';

interface ExportOptions {
  columns: TableColumnInterface[];
  rows: any[];
  filename: string;
  quarter?: string;
  period?: string;
  filters?: TableFilterInterface;
  canHorizontalPageBreak?: boolean;
  safeMode?: boolean;
}

const { appVersion, apiVersion } = useAppInfo();
const { facilityUUID } = useFacility();

/**
 * Creates a header with encryption options for a PDF document.
 * Uses the username from ApiCore as both the user and owner password.
 * Sets the user permissions to allow printing only.
 *
 * @returns {Record<"encryption", EncryptionOptions>} Encryption options for the PDF.
 */
function getEncryptionHeader(): Record<"encryption", EncryptionOptions> {
  const password = ApiCore.getUsername();
  return {
    encryption: {
      userPassword: password,
      ownerPassword: password,
      userPermissions: ["print"]
    }
  }
}

/**
 * Determines if a column should be included in the export based on safeMode and column exportable property.
 *
 * @param {TableColumnInterface} column - The column to check.
 * @param {boolean} safeMode - Flag to determine if all columns should be exportable.
 * @returns {boolean} True if the column is exportable. False otherwise
 */
function isExportable(column: TableColumnInterface, safeMode: boolean): boolean {
  return safeMode || column.exportable !== false;
}

/**
 * Extracts exportable headings from the table columns based on safe mode.
 *
 * @param {Array<TableColumnInterface>} columns - Array of table column configurations.
 * @param {boolean} [safeMode=false] - Flag to include all columns regardless of their exportable status.
 * @returns {Array<string>} Array of exportable column headings.
 */
function getExportableHeadings(columns: Array<TableColumnInterface>, safeMode: boolean = false): Array<string> {
  return columns.filter(column => isExportable(column, safeMode)).map(column => column.label);
}

/**
 * Processes and retrieves exportable rows from the table data.
 *
 * @param {Array<TableColumnInterface>} columns - Array of table column configurations.
 * @param {Array<any>} rows - Array of table row data.
 * @param {boolean} [safeMode=false] - Flag to include all columns regardless of their exportable status.
 * @returns {Array<Array<string>>} Array of rows with exportable data.
 */
function getExportableRows(columns: Array<TableColumnInterface>, rows: Array<any>, safeMode: boolean = false): Array<Array<string>>{
  return rows.map(row => {
    return columns.filter(column => isExportable(column, safeMode))
      .map(column => {
        let value = get(row, column.path);
        if (typeof column.formatter === 'function' && value) value = column.formatter(value, row)
        return sanitizeStr(`${column.drillable && Array.isArray(value) ? value.length : value}`);
      })
  })
}

/**
 * Converts table data into a CSV formatted string.
 * 
 * The function also appends footer details such system versions, date created, etc.
 *
 * @param {ExportOptions} opts - Options for exporting, including columns, rows, and various metadata.
 * @returns {string} The table data in CSV format.
 */
function toCsvString(opts: ExportOptions): string {
  const { columns, rows, quarter, period, filters, safeMode } = opts;
  const exportableColumns = getExportableHeadings(columns, safeMode);
  const exportableRows = getExportableRows(columns, sortRows(rows, filters?.sort || []), safeMode);
  let str = exportableColumns.join(",") + "\n"
  str += exportableRows.map(row => row.join(",")).join("\n");
  str += "\n" + `Date Created:  ${dayjs().format('DD/MMM/YYYY HH:MM:ss')}`;
  if (quarter) str += "\n" + `Quarter: ${quarter}`;
  if (period) str += "\n" + `Quarter: ${period}`;
  str += "\n" + `e-Mastercard Version : ${appVersion.value}`;
  str += "\n" + `API Version ${apiVersion.value}`;
  str += "\n" + `Site UUID: ${facilityUUID.value}`;
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
  const {filename, canHorizontalPageBreak, columns, rows, filters, safeMode } = opts
  const tableColumns: Array<Array<string>> = [ getExportableHeadings(columns, safeMode) ];
  const tableRows: Array<Array<string>> = getExportableRows(columns, sortRows(rows, filters?.sort || []), safeMode);
  const encryption = safeMode ? getEncryptionHeader() : {};
  const doc = new jsPDF({...encryption})
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
    action: async (_a, rows, filters, columns) => {
      let safeMode = useSecureExport && 
        await alertConfirmation(
          'PDF may contain private data that will require a password to unlock, To access private data choose Secure PDF over Regular PDF',
          {
            header: 'Security warning',
            confirmBtnLabel: "Secure PDF",
            cancelBtnLabel: "Regular PDF",
            
          }
        );
        
      exportToPDF({
        rows, 
        filters,
        columns, 
        quarter,
        period,
        filename,
        safeMode,           
      })
    }
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