import { isInput } from "./helpers/is-input";

export class Tracker extends EventTarget {
    track(htmlElement: HTMLElement) {
        htmlElement.addEventListener("mousedown",(e)=> {
            const target = e.target as HTMLElement;
            /** Click on text field */
            if (isInput(target) && !(target as HTMLInputElement).disabled) {
                const focusInput = (e: Event) => {
                    this.dispatchEvent(new CustomEvent("input-filled"));
                    target.removeEventListener("focusout", focusInput);
                };
                target.addEventListener("focusout", focusInput);
            } 
        })
    }
}