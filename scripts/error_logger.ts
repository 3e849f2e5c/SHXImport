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

enum MessageType {
	DEBUG,
	ERROR
}

class Message {
	public readonly type: MessageType;
	public readonly message: string;
	public readonly exception: any;

	constructor(type: MessageType, message: string, exception: any = null) {
		this.type = type;
		this.message = message;
	}
}

class AnLogger {
	static messages: Message[] = [];

	static error(message: string, exception: any = null) {
		AnLogger.messages.push(new Message(MessageType.ERROR, message, exception));
		Logger.log(`ERROR: ${message}`);

		try {
			SpreadsheetApp.getUi().alert(message);
		} catch (error) { /* ignore */ }
	}

	static log(message: string) {
		AnLogger.messages.push(new Message(MessageType.DEBUG, message));
		Logger.log(`DEBUG: ${message}`);
	}
}