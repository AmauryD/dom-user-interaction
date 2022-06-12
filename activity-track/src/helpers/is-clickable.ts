import { StringKeys } from "./is-input";

const validClickableInputs = ['submit','button','radio','checkbox','select'] as const;

/**
 * Here we try differentiate a classic "click" on div instead of a interacting with a clickable input elements or  their labels
 */
export function isClickableInteractiveElement(e: HTMLElement) {
    if (e instanceof HTMLButtonElement || e instanceof HTMLAnchorElement) {
        return true;
    }

    if (e instanceof HTMLInputElement) {
        return validClickableInputs.includes(e.getAttribute("type")!.toLowerCase() as StringKeys<typeof validClickableInputs>);
    }

    return false;
}