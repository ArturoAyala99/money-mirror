function hash(x) {
    let seed = 23;
    let diccionario = "adefijnoprsuv";
    let resultado_esperado = 143638514475224;
    for(let i = 0; i < x.length; i++) {
        seed = (seed * 19 + diccionario.indexOf(x[i]));
    }
    let diferencia = resultado_esperado - seed;

    if (seed === resultado_esperado){
        return {
            coincide:"SI",
            seed: seed,
            resultado_final: resultado_esperado,
            diferencia: diferencia,
            letras: x,
        }
    }
    return {
        coincide:"NO",
        seed: seed,
        resultado_final: resultado_esperado,
        diferencia: diferencia,
        letras: x
    }
}

function hash2(){
    let seed = 23;
    let diccionario = "adefijnoprsuv";
    let resultado_final = 143638514475224; // es el "seed" final
    // variables extra
    let letras = ''; 

    for(let i = 0; i < 10; i++) {

        let index = resultado_final % 19;
       
        // agregar letra de derecha a izquierda
        letras = diccionario[index] + letras;
        //letras += diccionario[index];
        
        resultado_final =  (resultado_final - index)  / 19 ;
    }

    let resultado = hash(letras);

    return resultado;
}
console.log(hash2());