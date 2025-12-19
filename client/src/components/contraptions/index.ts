export * from "./Diverter";
export * from "./CopperEnergyCoils";
export * from "./WaterJetPropulsor";
export * from "./Spinner";
export * from "./TriggeredDiverter";
export * from "./Painter";
export * from "./CornerCatcher";
export * from "./CurvedTrack";
export * from "./Lift";
export * from "./Brake";
export * from "./Teleporter";
export * from "./Spring";
export * from "./Cannon";
export * from "./Destructor";
export * from "./Blocker";
export * from "./Heater";
export * from "./Freezer";

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
  | "spiralTrack"
  | "lift"
  | "brake"
  | "teleporter"
  | "spring"
  | "cannon"
  | "destructor"
  | "blocker"
  | "heater"
  | "freezer"
  | "vortexFunnel"
  | "entryFunnel"
  | "track"
  | "exitBin";

export interface BaseContraption {
  id: string;
  type: ContraptionType;
  position: { x: number; y: number };
}
