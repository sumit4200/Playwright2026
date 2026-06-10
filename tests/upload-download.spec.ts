import { test, expect, Page } from '@playwright/test';
import ExcelJS from 'exceljs';

async function writeExcelTest(
    searchText: string,
    replaceText: string,
    change: { rowChange: number; colChange: number },
    filePath: string
): Promise<void> {

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');

    if (!worksheet) {
        throw new Error('Sheet1 not found');
    }

    const output = await readExcelTest(worksheet, searchText);

    const cell = worksheet.getCell(
        output.row + change.rowChange,
        output.col + change.colChange
    );

    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);
}

async function readExcelTest(
    worksheet: ExcelJS.Worksheet,
    searchText: string
): Promise<{ row: number; col: number }> {

    const output = { row: -1, col: -1 };

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNum) => {

            if (cell.value?.toString() === searchText) {
                output.row = rowNumber;
                output.col = colNum;
            }

        });

    });

    return output;
}

test.only('Upload download test validation', async ({ page }) => {

    await page.goto(
        'https://rahulshettyacademy.com/upload-download-test/index.html'
    );

    const searchText = 'Mango';
    const updateValue = '990';

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#downloadButton').click()
    ]);
   console.log("======>" +download.suggestedFilename());
    const downloadPath =
        'C:/Users/goyal/Downloads/download.xlsx';

    await download.saveAs(downloadPath);

    await writeExcelTest(
        searchText,
        updateValue,
        { rowChange: 0, colChange: 2 },
        downloadPath
    );

    await page.locator('#fileinput').setInputFiles(downloadPath);

    const textLocator = page.getByText(searchText);

    const desiredRow = await page
        .getByRole('row')
        .filter({ has: textLocator })
        .locator('#cell-4-undefined')
        .textContent();

    console.log(desiredRow);

    expect(desiredRow).toBe(updateValue);
    await page.pause();
});