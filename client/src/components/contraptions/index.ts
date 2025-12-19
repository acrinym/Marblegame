export * from "./Diverter";
export * from "./CopperEnergyCoils";
export * from "./WaterJetPropulsor";
export * from "./Spinner";
export * from "./TriggeredDiverter";
export * from "./Painter";
export * from "./CornerCatcher";
export * from "./CurvedTrack";

export type ContraptionType = 
  | "diverter"
  | "copperCoils"
  | "waterJet"
  | "spinner"
  | "triggeredDiverter"
  | "painter"
  | "cornerCatcher"
  | "curvedTrack"
  | "quarterPipe"
  | "halfPipe"
  | "vortexFunnel"
  | "exitBin";

export interface BaseContraption {
  id: string;
  type: ContraptionType;
  position: { x: number; y: number };
}
