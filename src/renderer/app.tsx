import { Component, createSignal, onMount } from 'solid-js';

import styles from './app.module.scss';

export const App: Component = () => {
    const [result, setResult] = createSignal<string>();

    onMount(async () => {
        console.log(window.electronAPI);
        const response = await window.electronAPI.message();
        setResult(response);
    });

    return (
        <div class={styles.container}>
            <h1 class={styles.title}>Solid + Electron App</h1>
            <p class={styles.message}>{result()} from IPC</p>
        </div>
    )
};