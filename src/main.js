const { app, BrowserWindow } = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = () => {

	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,

		webPreferences: {
			//preload: './preload.js',
			/*v8CacheOptions: 'none',
			nodeIntegration: true,
			disableDialogs: false,
			contextIsolation: false,
			nodeIntegrationInWorker: true,
			nodeIntegrationInSubFrames: true,
			sandbox: false,
			webSecurity: false,
			experimentalFeatures: true,*/
		},
	});
	
	mainWindow.loadURL('http://localhost:9001');

	mainWindow.removeMenu();

	mainWindow.webContents.openDevTools();

};


app.whenReady().then( async () => {

	/*ipcMain.handle('open-file', (event, options) => {
		return dialog.showOpenDialogSync(options);
	});

	ipcMain.handle('save-file', (event, options) => {
		return dialog.showSaveDialogSync(options);
	});

	ipcMain.handle('starrate-fix', (event, options) => {
		starrate_fix(options.input_path, options.output_path);
		return true;
	});*/

	createWindow();

	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

