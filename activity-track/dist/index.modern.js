class e extends EventTarget{track(e){e.addEventListener("mousedown",e=>{const t=e.target;if(function(e){return e instanceof HTMLInputElement||e instanceof HTMLAreaElement}(t)&&!t.disabled){const e=n=>{this.dispatchEvent(new CustomEvent("input-filled")),t.removeEventListener("focusout",e)};t.addEventListener("focusout",e)}})}}export{e as Tracker};
//# sourceMappingURL=index.modern.js.map
