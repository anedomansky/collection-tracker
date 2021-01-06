import electron, { BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import unhandled from 'electron-unhandled';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import './websocket';
import './db';
import Colors from './config/Colors';

unhandled();

const { app } = electron;
const PORT = process.env.PORT || 8080;

let window: BrowserWindow | null;

const createWindow = async (): Promise<void> => {
    if (process.env.NODE_ENV === 'dev') {
        installExtension(VUEJS_DEVTOOLS)
            .then((name) => console.log(Colors.fgGreen, `> Added Extension:  ${name}`, Colors.fgReset))
            .catch((error) => console.trace(Colors.fgRed, '> An error occurred: ', error, Colors.fgReset));
    }

    window = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
        },
    });

    if (process.env.NODE_ENV === 'dev') {
        window.loadURL(`http:localhost:${PORT}`);
        window.webContents.once('dom-ready', () => {
            window!.webContents.openDevTools();
        });
    } else {
        window.loadURL(
            url.format({
                pathname: path.join(__dirname, '/index.html'),
                protocol: 'file:',
                slashes: true,
            }),
        );
        window.webContents.once('dom-ready', () => {
            window!.webContents.openDevTools();
        });
    }

    window.on('closed', () => {
        window = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});
