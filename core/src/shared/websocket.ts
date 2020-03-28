declare var window: any;
declare var require: any;
const ws = (typeof window !== 'undefined')
? (window && ((window as any).CustomWebSocket || window.WebSocket))
: require('ws');
export default ws;
