import { isBoolean } from "util";

type IBooleanIntValue = 0 | 1;

export default class Helpers {
    static boolToInt(boolValue: boolean): IBooleanIntValue {
        if (!isBoolean(boolValue)) throw new Error('Tried to convert non-boolean value');
        return boolValue === true ? 1 : 0;
    }

    static isIn(value: any, options: any[]): boolean {
        return options.includes(value);
    }

    static isNumeric(input: any): boolean {
        return !isNaN(input);
    }
}