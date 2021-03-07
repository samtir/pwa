'use strict'

let deferredInstallPrompt = null

const installButton = document.getElementById('buttonInstall')

installButton.addEventListener('click',installPWA)

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent)

function  saveBeforeInstallPromptEvent (event) {
	deferredInstallPrompt = event

	installButton.removeAttribute('hidden')
}

function installPWA(event){
	deferredInstallPrompt.prompt()

	event.srcElement.setAttribute('hidden',true)
	deferredInstallPrompt.userChoice.then((choice)=>{
		if (choice.outcome === 'accepted') {
			console.log('Instalacion aceptado');
		}else {
			console.log('Instalacion rechazada')
		}
		deferredInstallPrompt = null
	})
}

