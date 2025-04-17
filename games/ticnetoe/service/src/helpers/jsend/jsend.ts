/**
 * JSend is a simple spec for JSON responses
 *
 * I've found it a pretty handy spec to adhere to - it's not complicated, very light
 * and offers consistency where it matters.
 *
 * Using it is less about having any sort of hard standard than it is about being predictable.
 */

export interface JSend {
    success(data: any): any;

    fail(data: any): any;

    error(message: string | null, data?: any): any;
}