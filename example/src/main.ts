import { Tracker } from "activity-track";

const tracker = new Tracker(document.querySelector("body")!);
tracker.track();

tracker.on("input-filled", ()=>{
  console.log("input filled");
});

tracker.on("input-click", ()=>{
  console.log("click filled");
});

tracker.on("click", ()=>{
  console.log("click");
});

tracker.on("input-select", ()=>{
  console.log("select filled");
});