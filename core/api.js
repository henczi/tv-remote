import { LgWebOSTvDeviceService, LgWebOSTvDeviceServiceListener, LgWebOSTvPairingType } from './dist/lib/webos';

let _lgservice;
function lgservice(listener) {
  if (_lgservice)
  return _lgservice;
  if (listener)
  return (_lgservice = new LgWebOSTvDeviceServiceListener(listener));
  throw new Error("No service. To create call with a listener first.");
}

export default lgservice;