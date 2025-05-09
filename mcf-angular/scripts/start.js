#!/usr/bin/env node
const prompts = require('prompts');
prompts.override(require('yargs').argv);
const {spawn} = require('node:child_process')
const pidTree = require("pidtree");

const apps = {
clientes:4200,
facturar:4201,
menu:4202,
productos:4203,
reportes:4204
};

(async () => {

  const {appSeleccionadas} = await prompts([
    
    {
      type: 'multiselect',
      name: 'appSeleccionadas',
      message: 'Seleccionar la(s) aplicaciones a trabajar',
      instructions:false,
      choices: Object.entries(apps).map(([appName, portNumber])=>({
        title:`${appName} (Puerto: ${portNumber})`,
        value: appName
      }))
      ,
      hint: '- Seleccionar con barra espaciadora y Enter',
    }
  ]);

 
  if(Array.isArray(appSeleccionadas) && appSeleccionadas.length<=0){
    console.log("Debe seleccionar por lo menos una aplicación");
    process.exit();
  }

 const iniciarProceso= spawn(/^win/.test(process.platform) ? 'lerna.cmd' :'lerna',
 [ 
 "run",
  "start",
  "--scope",
  `*/*{root-config,utils,layout,styleguide,${appSeleccionadas.join(",")}}*`,
  "--stream",
  "--parallel",
],
{
    stdio:"inherit",
    env: {
        ...process.env,
        FEATURE_APP_DATA: JSON.stringify(Object.fromEntries(
          appSeleccionadas.map(appName => [appName, apps[appName]])
        )),
    }
}
 );
 
  

setTimeout(async () => {
  const ids = await pidTree(iniciarProceso.pid);
  process.on("SIGINT", async () => {
    spawn("kill", ["-9"].concat(ids));
  });
}, 2000);
})();
