import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { registerIpcHandlers } from './ipc';
import { createWindowState } from './windowState';

let mainWindow: BrowserWindow | null = null;
const windowState = createWindowState();

function createWindow() {
    const state = windowState.getState();

    mainWindow = new BrowserWindow({
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (state.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.on('close', () => {
        if (mainWindow) {
            windowState.saveState(mainWindow);
        }
    })

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }
}

registerIpcHandlers();

app.whenReady().then(createWindow);

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