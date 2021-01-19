/*
 * MIT License
 *
 * Copyright 2021 Markus "3e849f2e5c" Isberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Created by 3e849f2e5c on 2021/01/25

import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;

class ContentDB {
	public static contentSheetName: string = "GameContent";

	public static isInitialized(): boolean {
		return this.getSheet() != null;
	}

	public static queryItem(identifier: string, data: string): any {
		const sheet: Sheet = this.getSheet();
		if (sheet == null) {
			return "Content spreadsheet not found.";
		}

		const lawRow: number = sheet.getLastRow();
		const columns: number = sheet.getMaxColumns();
		const header: any[] = sheet.getRange(1, 1, 1, columns).getValues()[0];

		for (let i = 0; i < lawRow; i++) {
			const row: Range = sheet.getRange(i + 2, 1, 1, columns);
			const values: any[] = row.getValues()[0];
			if (values[0] == identifier || values[1] == identifier) {
				let j: number = 0;
				for (; j < columns; j++) {
					if (header[j] == data) {
						break;
					}
				}
				let value: any = values[j];
				if (typeof value == "string" && value.indexOf(",") != -1) {
					value = value.split(",");
				}
				return value;
			}
		}

		return `Unknown item "${identifier}"`;
	}

	public static createSheet(): Sheet {
		return spreadSheet.insertSheet(ContentDB.contentSheetName);
	}

	public static getSheet(): Sheet | null {
		return spreadSheet.getSheetByName(ContentDB.contentSheetName);
	}
}