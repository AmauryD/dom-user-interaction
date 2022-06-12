const validTextInputs = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week'] as const;

export type StringKeys<T> = Extract<string, keyof T>;

export function isTextInput(target: HTMLElement) {
    if (target instanceof HTMLInputElement) {
        return validTextInputs.includes(target.getAttribute("type")!.toLowerCase() as StringKeys<typeof validTextInputs>);
    }
    if (target instanceof HTMLTextAreaElement) {
        return true;
    }
    return false;
}