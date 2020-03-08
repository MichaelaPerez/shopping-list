const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// Set ENV (environment)
process.env.NODE_ENV = 'production'; //delete this line to allow for dev tools

let mainWindow; //main window
let addWindow;

// Listen for the app to be ready
app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true //DO NOT USE THIS if loadURL is a 3rd party webpage or html written by someone else. Security risk. That's why it's disabled by default. Read more: https://stackoverflow.com/questions/44391448/electron-require-is-not-defined?fbclid=IwAR2kuTFFVLj5oZGtRvcFOuHAPxGtaHwU8QJo8MYF4IXrLSAPzwU95sWW1PM
        }
    });
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'), 
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Build nemu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow() {
    //Create new window
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true 
        },
        width: 300,
        height: 200,
        title: 'Add shopping list item'
    });
    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'), 
        protocol: 'file:',
        slashes: true
    }));
    // Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    });
}

// Catch item:add
ipcMain.on('item:add', function(e, item) {
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});

// Create menu template
const mainMenuTemplate = [
    {
    label: 'File', 
    submenu: [
        {
            label: 'Add item',
            accelerator: process.platform == 'darwin' ? 'Command+W' : 'Ctrl+W',
            click() {
                createAddWindow();
            }
        },
        {
            label: 'Clear items',
            accelerator: process.platform == 'darwin' ? 'Command+D' : 'Ctrl+D',
            click() {
                mainWindow.webContents.send('item:clear');
            }
        },
        {
            label:  'Quit',
            // If on a Mac (darwin), hotkey is Command+Q. Otherwise, it's Ctrl+Q
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click(){
                app.quit();
            }
        }
    ]
    }
];

// If Mac, add empty object to menu
if(process.platform=='darwin'){
    mainMenuTemplate.unshift({}); //fn adds parameter to front of array
}

// Add developer tools item if not in production
if(process.env.NODE_ENV != 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}