"use client";

// Tiny coordination store: intro animations wait for the preloader curtain.
type Cb = () => void;

let done = false;
const callbacks: Cb[] = [];

export function markPreloaderDone() {
  if (done) return;
  done = true;
  callbacks.forEach((cb) => cb());
  callbacks.length = 0;
}

/** Runs `cb` when the preloader finishes (immediately if it already has). */
export function onPreloaderDone(cb: Cb) {
  if (done) cb();
  else callbacks.push(cb);
}
