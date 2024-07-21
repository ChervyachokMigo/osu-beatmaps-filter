const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const starrate_fix = require('./tools/osu_db_fix_starrate');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
/*process.env['NODE_OPTIONS'] = '--max-old-space-size=10000';*/
//process.env['NODE_ENV'] = '--max-old-space-size=10000';

//console.log('process.env', process.env)

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}
console.log(require('node:v8').getHeapStatistics())
console.log(require('node:v8').getHeapStatistics().total_available_size/1024/1024, __filename );

const createWindow = () => {
  // Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
		preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		nodeIntegration: true,
		disableDialogs: false,
		contextIsolation: false,
		nodeIntegrationInWorker: true,
		nodeIntegrationInSubFrames: true,
		sandbox: false,
		webSecurity: false
		},
	});
	
	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	mainWindow.removeMenu();

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

};

app.commandLine.appendSwitch('js-flags', '--max-old-space-size=10000');
app.commandLine.appendSwitch('--no-sandbox', true);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then( async () => {
	
	ipcMain.handle('open-file', (event, options) => {
		return dialog.showOpenDialogSync(options);
	});

	ipcMain.handle('save-file', (event, options) => {
		return dialog.showSaveDialogSync(options);
	});

	ipcMain.handle('starrate-fix', (event, options) => {
		starrate_fix(options.input_path, options.output_path);
		return true;
	});

	createWindow();

	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

	

	/*installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));*/
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

