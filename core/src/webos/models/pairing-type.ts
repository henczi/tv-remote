export enum PairingType { Prompt, Pin /*, Combined */ }
export function pairingTypeString(pairingType: PairingType) {
  return PairingType[pairingType].toUpperCase();
}