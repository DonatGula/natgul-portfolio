"use client";
import { useEffect, useState } from "react";

const WORDS = ["NATGUL","SAMZEN"];
const TYPE_SPEED = 95;
const DELETE_SPEED = 55;
const PAUSE_AFTER = 1800;
const PAUSE_BETWEEN = 350;

export default function TypewriterTitle() {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const word = WORDS[wordIdx];
    const t = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < word.length) {
          setDisplayed(word.slice(0, displayed.length+1));
        } else {
          setPaused(true);
          setTimeout(() => { setPaused(false); setIsDeleting(true); }, PAUSE_AFTER);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0,-1));
        } else {
          setPaused(true);
          setTimeout(() => {
            setPaused(false); setIsDeleting(false);
            setWordIdx((p) => (p+1) % WORDS.length);
          }, PAUSE_BETWEEN);
        }
      }
    }, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, paused, wordIdx]);

  return (
    <h1 className="display leading-none" style={{ fontSize:"clamp(5rem,1vw,11rem)", letterSpacing:"-0.04em" }}>
      <span className="grad-text-white">{displayed}</span>
      <span style={{ color:"var(--pink)", animation:"blink 0.8s step-end infinite" }}>_</span>
    </h1>
  );
}
