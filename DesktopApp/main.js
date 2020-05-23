const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow; 

//listen for app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    })); //file://dirname/mainWinow.html
//Quit app when Closed
mainWindow.on('closed', function(){
    app.quit();
});
    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu);
});

// handle create add window
function toogleListView(){
    document.getElementById("dh").innerHTML = 'toogleListView';
}
function toogleVerification(){
    document.getElementById("dh").innerHTML = 'toogleVerification';
}
//create menu template
const mainMenuTemplate = [
    
    {
        label: 'file',
        submenu:[
            {
                label: 'List View',
                click(){
                    toogleListView();
                }
            },
            {
                label: 'Verification',
                click(){
                    toogleVerification();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : //for mac
                'ctrl+Q',
                //hot key for quit
                click(){
                    app.quit()
                }
            }
        ]
    }
    
];

// if mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}


// add Developer tools items if not in production
if(process.env.NODE_ENV!== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'command+I':
                'ctrl+I',
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