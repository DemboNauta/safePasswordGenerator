function calcularTiempo(password) {
    const caracteres = [
        'abcdefghijklmnopqrstuvwxyz', // letras minúsculas
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // letras mayúsculas
        '0123456789', // números
        '!@#$%^&*()_+[]{}|;:,.<>/?' // símbolos
    ];

    let posiblesCaracteres = 0;

    if (/[a-z]/.test(password)) posiblesCaracteres += caracteres[0].length;
    if (/[A-Z]/.test(password)) posiblesCaracteres += caracteres[1].length;
    if (/[0-9]/.test(password)) posiblesCaracteres += caracteres[2].length;
    if (/[\W_]/.test(password)) posiblesCaracteres += caracteres[3].length;

    const combinacionesPosibles = Math.pow(posiblesCaracteres, password.length);
    const intentosPorSegundo = 1e9; 

    const segundos = combinacionesPosibles / intentosPorSegundo;
    const minutos = segundos / 60;
    const horas = minutos / 60;
    const dias = horas / 24;
    const anos = dias / 365;
    const milenios = anos / 1000;
    const millonesDeAnos = anos / 1e6;
    const billonesDeAnos = anos / 1e9;
    const trillonesDeAnos = anos / 1e12;
    const cuatrillonesDeAnos = anos / 1e15;
    const quintillonesDeAnos = anos / 1e18;

    let tiempo = '';

    if (quintillonesDeAnos >= 1) {
        tiempo = `${quintillonesDeAnos.toFixed(2)} quintillones de años`;
    } else if (cuatrillonesDeAnos >= 1) {
        tiempo = `${cuatrillonesDeAnos.toFixed(2)} cuatrillones de años`;
    } else if (trillonesDeAnos >= 1) {
        tiempo = `${trillonesDeAnos.toFixed(2)} trillones de años`;
    } else if (billonesDeAnos >= 1) {
        tiempo = `${billonesDeAnos.toFixed(2)} billones de años`;
    } else if (millonesDeAnos >= 1) {
        tiempo = `${millonesDeAnos.toFixed(2)} millones de años`;
    } else if (milenios >= 1) {
        tiempo = `${milenios.toFixed(2)} milenios`;
    } else if (anos >= 1) {
        tiempo = `${anos.toFixed(2)} años`;
    } else if (dias >= 1) {
        tiempo = `${dias.toFixed(2)} días`;
    } else if (horas >= 1) {
        tiempo = `${horas.toFixed(2)} horas`;
    } else if (minutos >= 1) {
        tiempo = `${minutos.toFixed(2)} minutos`;
    } else {
        tiempo = `${segundos.toFixed(2)} segundos`;
    }

    return `Tiempo para hackear la contraseña: ${tiempo}`;
}


window.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('generarBtn');
    const longitud = document.getElementById('longitud');
    const longitudValor = document.getElementById('longitud-valor');
    longitudValor.textContent = longitud.value;

    longitud.addEventListener('input',()=>{
        longitudValor.textContent = longitud.value;
    })

    const defaultButtons = document.getElementsByClassName('default-button');
    for(let button of defaultButtons){
        button.addEventListener('click', () => {
            longitud.value = button.value;
            longitudValor.textContent = button.value;
        })
    }
    
    boton.addEventListener('click', () => {
        const longitud = parseInt(document.getElementById('longitud').value);
        if(longitud>5){
            const includeUppercase = document.getElementById('uppercase').checked;
            const includeLowercase = document.getElementById('lowercase').checked;
            const includeNumbers = document.getElementById('numbers').checked;
            const includeSymbols = document.getElementById('symbols').checked;
        
            let password = [];
            let charset = '';
        
            // Garantizar al menos un carácter de cada tipo seleccionado
            if (includeUppercase) {
                const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                password.push(uppercase.charAt(Math.floor(Math.random() * uppercase.length)));
                charset += uppercase;
            }
        
            if (includeLowercase) {
                const lowercase = 'abcdefghijklmnopqrstuvwxyz';
                password.push(lowercase.charAt(Math.floor(Math.random() * lowercase.length)));
                charset += lowercase;
            }
        
            if (includeNumbers) {
                const numbers = '0123456789';
                password.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
                charset += numbers;
            }
        
            if (includeSymbols) {
                const symbols = '!@#$%^&*()_+[]{}|;:,.<>/?';
                password.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
                charset += symbols;
            }
        
            for (let i = password.length; i < longitud; i++) {
                password.push(charset.charAt(Math.floor(Math.random() * charset.length)));
            }
        
            password = password.sort(() => 0.5 - Math.random());
        
            const passwordString = password.join('');
            document.getElementById('generatedPassword').value = passwordString;
            document.getElementById('costeHackeo').style.color = 'black';
            document.getElementById('costeHackeo').textContent = calcularTiempo(passwordString);
            document.getElementById('contenedorTiempo').style.display = 'block';
        }
        
    });
    
    copiarBtn.addEventListener('click', () => {
        var copyText = document.getElementById("generatedPassword");
        const notification = document.getElementById('copyNotification');
        navigator.clipboard.writeText(copyText.value);
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 1000); 
    });
    
});