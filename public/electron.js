// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const setupEvents = require('../installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

const path = require('path');

const serve = require('electron-serve');
const loadURL = serve({ directory: 'build' });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.


let mainWindow;

function isDev() {
    return !app.isPackaged;
}


function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        // Use this in development mode.
        icon: isDev() ? path.join(process.cwd(), 'public/logo.ico') : path.join(__dirname, 'build/logo.ico'),
        // Use this in production mode.
        // icon: path.join(__dirname, 'build/logo512.png'),
        show: false
    });

    // This block of code is intended for development purpose only.
    // Delete this entire block of code when you are ready to package the application.
    if (isDev()) {
        mainWindow.loadURL('http://localhost:3000/');
    } else {
        loadURL(mainWindow);
    }
    
    // Uncomment the following line of code when app is ready to be packaged.
    // loadURL(mainWindow);

    // Open the DevTools and also disable Electron Security Warning.
    // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    // Emitted when the window is ready to be shown
    // This helps in showing the window gracefully.
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });
    if (!isDev()) {
        mainWindow.setMenu(null);
    }
    mainWindow.maximize();
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',function(){
    if (!isDev())
        require('../server');
    createWindow()});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// function handleSquirrelEvent(application) {
//     if (process.argv.length === 1) {
//         return false;
//     }
//     const ChildProcess = require('child_process');
//     const path = require('path');
//     const appFolder = path.resolve(process.execPath, '.');
//     const rootAtomFolder = path.resolve(appFolder, '..');
//     const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
//     const exeName = path.basename(process.execPath);
//     const spawn = function(command, args) {
//         let spawnedProcess, error;
//         try {
//             spawnedProcess = ChildProcess.spawn(command, args, {
//                 detached: true
//             });
//         } catch (error) {}
//         return spawnedProcess;
//     };
//     const spawnUpdate = function(args) {
//         return spawn(updateDotExe, args);
//     };
//     const squirrelEvent = process.argv[1];
//     switch (squirrelEvent) {
//         case '--squirrel-install':
//         case '--squirrel-updated':
// // Optionally do things such as:
// // - Add your .exe to the PATH
// // - Write to the registry for things like file associations and
// //   explorer context menus
// // Install desktop and start menu shortcuts
//             spawnUpdate(['--createShortcut', exeName]);
//             setTimeout(application.quit, 1000);
//             return true;
//         case '--squirrel-uninstall':
// // Undo anything you did in the --squirrel-install and
// // --squirrel-updated handlers
// // Remove desktop and start menu shortcuts
//             spawnUpdate(['--removeShortcut', exeName]);
//             setTimeout(application.quit, 1000);
//             return true;
//         case '--squirrel-obsolete':
// // This is called on the outgoing version of your app before
// // we update to the new version - it's the opposite of
// // --squirrel-updated
//             application.quit();
//             return true;
//     }
// };