import {DeviceService, DeviceServiceListener} from './service';

let _lgservice: DeviceService;
function lgservice(listener?: DeviceServiceListener) {
  if (_lgservice)
  return _lgservice;
  if (listener)
  return (_lgservice = new DeviceService(listener));
  throw new Error("No service. To create call with a listener first.");
}

export { PairingType as LgWebOSTvPairingType } from './models/pairing-type';
export {
  DeviceServiceListener as LgWebOSTvServiceListener
};
export default lgservice;