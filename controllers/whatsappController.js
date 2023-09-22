import wbm from 'wbm';
import fsExtra from 'fs-extra';
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import path from 'path';

// Get the current module's file path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tmpPath = path.resolve(__dirname, '../tmp');

export async function waController(req, res) {
  try {
    // console.log('Controller loaded');
    const { numbers, message } = req.body;
    // console.log(numbers, message);
    await fsExtra.ensureDir(tmpPath);

    wbm
      .start({ qrCodeData: true, session: false, showBrowser: true })
      .then(async (qrCodeData) => {
        await wbm.send(numbers, message);

        // console.log(qrCodeData);
        
        await wbm.waitQRCode();
        await wbm.end();

        await fsExtra.remove(tmpPath);
      })
      .catch((err) => {
        console.log('Error in generating QR code: ', err);
        res.status(500).send('Error in generating QR code');
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in WhatsApp controller');
  }
}
