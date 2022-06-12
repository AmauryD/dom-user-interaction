import { isTextInput } from "./helpers/is-input";
import { EventEmitter } from "events";
import { isClickableInteractiveElement } from "./helpers/is-clickable";

const cleanupOnFocusOut = (
  element: HTMLElement,
  event: keyof HTMLElementEventMap,
  listener: (e: Event) => unknown
) => {
  const focusOutListener = () => {
    element.removeEventListener(event, listener);
    element.removeEventListener("focusout", focusOutListener);
  };
  element.addEventListener("focusout", focusOutListener);
  element.addEventListener(event, listener);
};

export class Tracker extends EventEmitter {
  private _isTracking : boolean = false;

  constructor( private _element: HTMLElement) {
    super();
  }

  public untrack() {
    if (this._isTracking) {
        throw new Error("Nothing to untrack from");
    }
    this._element.removeEventListener("click", this.listenClick.bind(this));
    this._element.removeEventListener("focusin", this.listenFocus.bind(this));
    this.removeAllListeners();
  }

  public track() {
    if (this._isTracking) {
        throw new Error("You're already tracking " + this._element.nodeName);
    }

    this._isTracking = true;
    /**
     * Not all elements get focus when clicked
     */
    this._element.addEventListener("click", this.listenClick.bind(this));
    /**
     * Focus is a good way to handle vim guys that only fill forms with keyboard
     */
    this._element.addEventListener("focusin", this.listenFocus.bind(this));
  }

  private listenFocus(e: Event) {
    const target = e.target as HTMLElement;
      /** Focus on text field */
      if (isTextInput(target) && !(target as HTMLInputElement).disabled) {
        cleanupOnFocusOut(target, "change", () => {
          this.emit("input-filled");
        });
      }

      /**
       * Select
       */
      if (target instanceof HTMLSelectElement) {
        cleanupOnFocusOut(target, "change", () => {
          this.emit("input-select", {
            select: target.parentElement,
            option: target,
          });
        });
      }
  }

  private listenClick(e: Event) {
    const target = e.target as HTMLElement;
    if (isClickableInteractiveElement(target)) {
      this.emit("input-click");
    }
  }
}
