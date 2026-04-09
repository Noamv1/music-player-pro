const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    load: (key) => JSON.parse(localStorage.getItem(key) || "null")
});
