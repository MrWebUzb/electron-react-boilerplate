const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

const createSplashWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 200,
        frame: false,
        transparent: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            nativeWindowOpen: true,
        },
    });

    win.loadFile('splash.html');
    return win;
};

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            nativeWindowOpen: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        show: false,
    });

    win.loadFile('index.html');

    isDev && win.webContents.openDevTools();
    return win;
};

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

ipcMain.on('notify', (_, message) => {
    new Notification({
        title: 'Notification',
        body: message,
    }).show();
});

app.whenReady().then(() => {
    // const template = require('./utils/Menu').createTemplate(app);
    // const menu = Menu.buildFromTemplate(template);
    // Menu.setApplicationMenu(menu);

    // tray = new Tray(trayIcon);
    // tray.setContextMenu(menu);

    const splash = createSplashWindow();
    const mainApp = createWindow();

    mainApp.once('ready-to-show', () => {
        setTimeout(() => {
            splash.destroy();
            mainApp.show();
        }, 2000);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
