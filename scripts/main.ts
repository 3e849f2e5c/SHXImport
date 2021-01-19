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
 *
 */

// Created by 3e849f2e5c on 2021/01/18

import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

const spreadSheet: Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

/**
 * Returns info about an item in Barotrauma.
 * @param {string} identifier
 * @param {string} data
 */
const ITEM = (identifier: string, data: string): any => {
	if (!ContentDB.isInitialized()) {
		return "...";
	}
	return ContentDB.queryItem(identifier, data);
};

/**
 * Merges 2 or more arrays together preserving the order.
 * For example an array of [1,2,3] and [4,5,6] would result
 * in an array of [1,4,2,5,3,6].
 */
const INTERLEAVE = (...arrays: any[]): any[] => {
	const foundArrays: any[][] = new Array(arrays.length);

	let totalSize: number = 0,
		maxLength: number = 0;

	for (let i = 0; i < arrays.length; i++) {
		const obj: any = arrays[i];
		let size = 0;
		if (Array.isArray(obj)) {
			foundArrays[i] = obj;
			size = obj.length;
		} else {
			foundArrays[i] = [obj];
			size = 1;
		}
		totalSize += size;
		maxLength = Math.max(maxLength, size);
	}

	const result: any[] = new Array(totalSize);

	let k: number = 0;

	for (let i = 0; i < maxLength; i++) {
		for (let j = 0; j < foundArrays.length; j++) {
			const arr: any[] = foundArrays[j];
			if (arr.length > i) {
				result[k++] = arr[i];
			}
		}
	}

	return result;
}

/**
 * Creates a table from the array
 * @param array
 * @param amount - the amount of columns
 */
const TABLE = (array: any[], amount: number): any[][] => {
	const finalArray: any[][] = [];

	for (let i = 0; i < array.length; i += amount) {
		const newArray: any[] = [];
		for (let j = 0; j < amount; j++) {
			const value: any = array[i + j];
			newArray.push(value?.toString());
		}
		finalArray.push(newArray);
	}
	return finalArray;
}