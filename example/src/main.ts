import { Tracker } from "activity-track";

const tracker = new Tracker();
tracker.track(document.querySelector("body")!);