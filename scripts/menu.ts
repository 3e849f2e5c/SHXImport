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

// Created by 3e849f2e5c on 2021/01/18

// Executed when the spreadsheet is opened.
const onOpen = () => {
	const ui = SpreadsheetApp.getUi();
	const menu = ui.createMenu("Barotrauma");
	menu.addItem("Import XML Content", menuItemImport.name);
	menu.addToUi();
};

const menuItemImport = () => {
	const ui = SpreadsheetApp.getUi();
	const html = HtmlService.createHtmlOutputFromFile("html/dialog.html")
		.setWidth(400)
		.setHeight(64)
		.setSandboxMode(HtmlService.SandboxMode.IFRAME);
	ui.showModalDialog(html, 'Select a file');
};

/**
 * Called by the HTML dialog when a file is selected.
 * @param value - text content of the file that was uploaded, hopefully XML.
 */
const fileDialogCallback = (value: string) => {
	const ui = SpreadsheetApp.getUi();
	ui.alert("Content is being imported which can take up to a minute.\n" +
		"Avoid editing the spreadsheet before you get another popup mentioning the result of the import.\n" +
		"\n" +
		"Close this dialog to proceed.");

	try {
		XMLImport.loadContent(value);
		ui.alert("Content imported successfully.");
	} catch (e) {
		AnLogger.error("There was a problem importing the content.", e)
	}
}