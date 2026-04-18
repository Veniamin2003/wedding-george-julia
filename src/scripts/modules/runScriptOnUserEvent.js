// Функция запускающая callback функцию при пользовательском взаимодействии
// полезно для отложенной загрузки счетчиков
export const runScriptOnUserEvent = (callback) => {
    try {
        var runnedScript = false;

        window.addEventListener( 'scroll', runScript, {passive: true} );
        window.addEventListener( 'touchstart', runScript );
        document.addEventListener( 'mouseenter', runScript );
        document.addEventListener( 'click', runScript );

        function runScript( e ) {
            if ( e && e.type ) {
                console.log( e.type );
            } else {
                console.log( 'DOMContentLoaded' );
            }

            if ( runnedScript ) {
                return;
            }

            callback();

            runnedScript = true;

            window.removeEventListener( 'scroll', runScript );
            window.removeEventListener( 'touchstart', runScript );
            document.removeEventListener( 'mouseenter', runScript );
            document.removeEventListener( 'click', runScript );
        }
    } catch (error) {
        console.log(error)
    }

}