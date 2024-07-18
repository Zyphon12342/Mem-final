// main.js

import { initializeController } from './controller.js';
import { initializeView } from './view.js';

export const socket = io();
export let lastClickTime = 0;

document.addEventListener('DOMContentLoaded', () => {
    initializeController();
    initializeView();
});
