// src/main/windowState.ts
import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';

interface WindowState {
  x?: number;
  y?: number;
  width: number;
  height: number;
  isMaximized: boolean;
}

export function createWindowState() {
  const statePath = path.join(app.getPath('userData'), 'window-state.json');
  
  const defaultState: WindowState = {
    width: 800,
    height: 600,
    isMaximized: false
  };

  function saveState(window: BrowserWindow) {
    if (!window.isMaximized()) {
      const bounds = window.getBounds();
      const state: WindowState = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        isMaximized: false
      };
      
      try {
        fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
      } catch (err) {
        console.error('Failed to save window state:', err);
      }
    } else {
      try {
        const state = {
          ...getState(),
          isMaximized: true
        };
        fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
      } catch (err) {
        console.error('Failed to save window state:', err);
      }
    }
  }

  function getState(): WindowState {
    try {
      if (fs.existsSync(statePath)) {
        const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        return {
          x: state.x,
          y: state.y,
          width: state.width || defaultState.width,
          height: state.height || defaultState.height,
          isMaximized: state.isMaximized || defaultState.isMaximized
        };
      }
    } catch (err) {
      console.error('Failed to read window state:', err);
    }
    
    return defaultState;
  }

  return {
    saveState,
    getState
  };
}