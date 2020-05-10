const escpos = require('escpos');

// Select the adapter based on your printer type
const device  = new escpos.USB(0x1504, 0x0006);
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

// const options = { encoding: "GB18030" /* default */ }
const options = {
    width: 40
};
// encoding is optional

const printer = new escpos.Printer(device, options);



device.open(function(){
  printer
  .font('a')
  .align('ct')
  .style('bu')
  .size(2, 4)
  .text('The quick brown fox jumps over the lazy dog')
  .text('敏捷的棕色狐狸跳过懒狗')
  .barcode('1234567', 'EAN8')
  .table(["One", "Two", "Three"])
  .tableCustom([ 
    { text:"Left", align:"LEFT", width:0.33 },
    { text:"Center", align:"CENTER", width:0.33},
    { text:"Right", align:"RIGHT", width:0.33 }
  ]) 
  .qrimage('https://github.com/song940/node-escpos', function(err){
    this.cut();
    this.close();
  });
});
