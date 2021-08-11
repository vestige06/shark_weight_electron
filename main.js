const { app,BrowserWindow,ipcMain,Menu,session  }  =  require('electron');
const path = require('path');
const windows = new Set();
// process.env
function setWindowMenu(win, menu) {
    if (process.platform === "darwin") {
      Menu.setApplicationMenu(menu);
      win.on("focus", () => {
        Menu.setApplicationMenu(menu);
      });
    } else {
      win.setMenu(menu);
    }
}

const createWindow = (options={
url:process.env.NODE_ENV === 'production'?'./dist/index.html':'http://localhost:3000/#/login',
protocal:process.env.NODE_ENV === 'production'?'FILE':'URL',
hash:'Login',
isDevTools:true,
callback:function(){}}) => {
    (async () =>await session.defaultSession.loadExtension("C:\\Apps\\react-devtools\\shells\\chrome\\build\\unpacked"))();
    // BrowserWindow.addDevToolsExtension('D:\\soft\\nginx\\www\\react-devtools\\shells\\chrome');
    let newWindow  = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: 'preload.tsx',
            webSecurity: false,
            // contextIsolation:false,
            nodeIntegration: true,
            contextIsolation:false,
            enableRemoteModule:true
        },
        show:false
    });
    if(options.protocal === 'URL'){
        newWindow.loadURL(options.url);
    }
    else{
        newWindow.loadFile(options.url,{
            hash: options.hash
        });
    }
    newWindow.once('ready-to-show',() => {
        newWindow.show();
    });

    if(options.isDevTools === true){
        newWindow.openDevTools();
        // newWindow.addDevToolsExtension('D:\\soft\\nginx\\www\\react-devtools\\shells\\chrome');
    }
    newWindow.on('closed', function () {
        windows.delete(newWindow);
        newWindow = null;
    });
    // options.callback();
    windows.add(newWindow);
    return newWindow;
}

app.allowRendererProcessReuse = false;
app.on('ready', ()=>{
    createWindow();
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('cmd',(e,msg1,msg2)=>{
    // console.log(msg1);
    // console.log(msg2);
    // e.sender.send("sendMain","this is a main");

});

ipcMain.on('onTemplateSettingOpen',(e,recv) => {
});
// var menu = Menu.buildFromTemplate(options.menu);
exports.createWindow = createWindow;
exports.setWindowMenu = setWindowMenu;


