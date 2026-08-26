export type ShredderState = "TYPING" | "PRINTING" | "SHREDDING" | "CLEARED";

export type SpeedFactor = number;

export interface Quad {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  width: number;
  height: number;
}

export interface HealingPhrase {
  text: string;
  triggerProgress: number;
}

export interface RT018StressShredderProps {
  onComplete?: () => void;
  onStateChange?: (state: ShredderState) => void;
  registerResetHandler?: (fn: () => void) => void;
}
