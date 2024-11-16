export interface IElectronAPI {
    message: () => Promise<string>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}