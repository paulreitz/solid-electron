import { ipcMain } from 'electron';

export function registerIpcHandlers() {
    ipcMain.handle('message', async () => {
        return 'hello';
    });
}