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

// Created by 3e849f2e5c on 2021/01/21

import Document = GoogleAppsScript.XML_Service.Document;
import Element = GoogleAppsScript.XML_Service.Element;
import Attribute = GoogleAppsScript.XML_Service.Attribute;

class XMLImport {
	public static loadContent(text: string): void {
		const doc: Document = XmlService.parse(text);

		let sheet: Sheet = ContentDB.getSheet() ?? ContentDB.createSheet();

		const root: Element = doc.getRootElement();
		if (root == null) {
			AnLogger.error("Root element not found.");
			return;
		}

		sheet.clear();
		let hasHeader = false;
		const header: string[] = [];
		const content: string[][] = [];

		const children: Element[] = root.getChildren();

		for (let i = 0; i < children.length; i++) {
			const values: string[] = [];
			const item: Element = children[i];
			const itemChildren: Element[] = item.getChildren();
			const attributes: Attribute[] = item.getAttributes();

			let j: number = 0,
				k: number = 0;

			for (j = 0; j < attributes.length; j++) {
				const attribute: Attribute = attributes[j];
				if (!hasHeader) {
					header.push(attribute.getName().toLowerCase())
				}
				values.push(attribute.getValue())
			}

			for (k = 0; k < itemChildren.length; k++) {
				const subElement: Element = itemChildren[k];
				const subAttributes: Attribute[] = subElement.getAttributes();
				for (j = 0; j < subAttributes.length; j++) {
					const attribute: Attribute = subAttributes[j];
					if (!hasHeader) {
						header.push(`${subElement.getName().toLowerCase()}.${attribute.getName().toLowerCase()}`)
					}
					values.push(attribute.getValue())
				}
			}
			hasHeader = true;
			content.push(values);
		}

		const columns: number = sheet.getMaxColumns();
		if (header.length > columns) {
			// HOW DO I APPEND MORE COLUMNS WITH APPSCRIPT OH GOD I'M LOSING MY MIND
			const amount: number = header.length - columns;
			AnLogger.error(`Not enough columns to fit the data. Need ${amount} more.`);
		}
		sheet.appendRow(header);

		const range: Range = sheet.getRange(2, 1, content.length, content[0].length);
		range.setValues(content);
		sheet.setFrozenRows(1);
		sheet.setFrozenColumns(1);
		sheet.autoResizeColumns(1, columns);
		SpreadsheetApp.flush();
	}
}