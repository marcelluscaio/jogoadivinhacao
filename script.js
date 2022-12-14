let qtdChances = document.querySelector("#qtdChances");
let qtdChancesValor;
let botaoRegras = document.querySelector("#botaoRegras");
let numInicial = document.querySelector("#numInicial");
let numFinal = document.querySelector("#numFinal");
let numeroSorteado;
let erro = false;

botaoRegras.addEventListener("click", defineRegras);

function defineRegras(e){
   e.preventDefault();
   validaNumeros();
   if(erro === true){
      erro = false;
      return
   } else{
   let mensagemErro = document.querySelector("#mensagemErro");
   mensagemErro.classList.add("escondido");
   mensagemErro.innerHTML = "";
   sorteiaNumero();   
   desabilitaCampos();
   defineChances();
   mostraJogo()
   }
}

function validaNumeros(){
   let numInicialValor = numInicial.value;
   let numFinalValor = numFinal.value;
   let qtdChancesValor = qtdChances.value;
   let mensagemErro = document.querySelector("#mensagemErro");   
   if(numInicialValor == "" || numFinalValor == "" || qtdChancesValor == ""){
      mensagemErro.classList.remove("escondido");
      mensagemErro.innerHTML = "Preencha todos os campos";
      erro=true;
   } else if(Number.isInteger(parseFloat(numInicialValor)) == false || Number.isInteger(parseFloat(numFinalValor)) == false || Number.isInteger(parseFloat(qtdChancesValor)) == false){
      mensagemErro.classList.remove("escondido");
      mensagemErro.innerHTML = "Somente números inteiros";
      erro=true;
   } else if(parseInt(numFinalValor)<parseInt(numInicialValor)){
      mensagemErro.classList.remove("escondido");
      mensagemErro.innerHTML = "O número final deve ser maior que o número inicial";
      erro=true;
   } else if(parseInt(numFinalValor)-parseInt(numInicialValor)<=parseInt(qtdChancesValor)*3){
      mensagemErro.classList.remove("escondido");
      mensagemErro.innerHTML = "Assim fica fácil, fera! O número final deve ser maior que a soma do número inicial com o triplo da quantidade de chances";
      erro=true;
   }   
}

function sorteiaNumero(){   
   let numInicialInteiro = parseInt(numInicial.value);
   let numFinalInteiro = parseInt(numFinal.value);
   numeroSorteado = Math.floor((Math.random()*(numFinalInteiro+1-numInicialInteiro))+numInicialInteiro);   
   console.log(numeroSorteado);
}

function desabilitaCampos(){
   numInicial.disabled = true;
   numFinal.disabled = true;
   qtdChances.disabled = true;
   botaoRegras.disabled = true;
}

function defineChances(){
   qtdChancesValor = parseInt(qtdChances.value);
}

function mostraJogo(){
   let formularioJogo = document.querySelector(".formularioChute");
   formularioJogo.classList.remove("escondido");
}


//segunda parte
let botaoChute = document.querySelector("#botaoChute");
botaoChute.addEventListener("click", fazTentativa);
let botaoReiniciar = document.querySelector("#botaoReiniciar");
botaoReiniciar.addEventListener("click", reiniciar);
let chute = document.querySelector("#chute");


function fazTentativa(e){
   e.preventDefault();
   validaChute();
   if(erro === true){
      erro = false;
      return
   } else{
   let mensagemErroDois = document.querySelector("#mensagemErroDois"); 
   mensagemErroDois.classList.add("escondido");
   mensagemErroDois.innerHTML = "";
   comparaChute();
   }
}

//posso refazer essa função passando parametros para reduzir o codigo e juntar com a outra
function validaChute(){
   let chuteValor = chute.value; 
   let mensagemErroDois = document.querySelector("#mensagemErroDois");   
   if(chuteValor == "" ){
      mensagemErroDois.classList.remove("escondido");
      mensagemErroDois.innerHTML = "Coloque seu número primeiro";
      erro=true;
   } else if(Number.isInteger(parseFloat(chuteValor)) ==false){
      mensagemErroDois.classList.remove("escondido");
      mensagemErroDois.innerHTML = "Somente números inteiros";
      erro=true;
   } else if(parseInt(chuteValor)<parseInt(numInicial.value) || parseInt(chuteValor)>parseInt(numFinal.value)){
      mensagemErroDois.classList.remove("escondido");
      mensagemErroDois.innerHTML = "Esse não foi um chute muito bom. Chute dentro da escala =)";
      erro=true;
   } else if(arrChute.includes(parseInt(chuteValor))){
      mensagemErroDois.classList.remove("escondido");
      mensagemErroDois.innerHTML = "Esse você já chutou";
      erro=true;
   }      
}

let tentativas ="";
let arrChute = [];

function comparaChute(){
   let chuteValor = parseInt(chute.value);
   chute.value = "";
   let mensagemResultado = document.querySelector("#mensagemResultado");
   let numInicialInteiro = parseInt(numInicial.value);
   let numFinalInteiro = parseInt(numFinal.value);
   let escala = numFinalInteiro-numInicialInteiro;
   if(chuteValor === numeroSorteado){
      mensagemResultado.classList.remove("escondido");
      mensagemResultado.innerHTML = `Parabéns, você acertou! O número é ${numeroSorteado}! Clique no Reiniciar para jogar de novo!`;
      botaoChute.disabled=true;
      chute.disabled=true;

   } else{
      qtdChancesValor--;
      let listaChute = document.querySelector("#listaChutes");
      listaChute.classList.remove("escondido");      
      arrChute.push(parseInt(chuteValor));
      listaChute.innerHTML ="";
      for(i=0;i<arrChute.length;i++){
         if(i===arrChute.length-1){
            listaChute.innerHTML += `${arrChute[i]}`;
         } else{
            listaChute.innerHTML += `${arrChute[i]} - `;      
         }         
      }      

      if(qtdChancesValor === 0){
         mensagemResultado.classList.remove("escondido");
         mensagemResultado.innerHTML = `Puxa, você esgotou suas tentativas. O número era ${numeroSorteado}. Clica aqui embaixo no Reiniciar para jogar de novo!`;
         botaoChute.disabled=true;
         chute.disabled=true;
      } else if(tentativas === ""){
         mensagemResultado.classList.remove("escondido");
         let diferencaPositiva = Math.sign(chuteValor-numeroSorteado)===1 ? chuteValor-numeroSorteado : numeroSorteado-chuteValor;
         if(diferencaPositiva<(escala/4)){
            mensagemResultado.innerHTML = `Primeira tentativa e já está quente! Tente de novo. Você tem mais ${qtdChancesValor} chances.`;         
         } else{
            mensagemResultado.innerHTML = `Está um pouco longe do seu alvo. Mas essa é só a primeira tentativa! Tente de novo. Você tem mais ${qtdChancesValor} chances.`; 
         }         
         tentativas = chuteValor;
      } else if((tentativas<numeroSorteado && chuteValor<numeroSorteado)||(tentativas>numeroSorteado && chuteValor>numeroSorteado)){
         mensagemResultado.classList.remove("escondido");
         let diferencaPositivaAntigo = Math.sign(tentativas-numeroSorteado)===1 ? tentativas-numeroSorteado : numeroSorteado-tentativas;
         let diferencaPositivaNovo = Math.sign(chuteValor-numeroSorteado)===1 ? chuteValor-numeroSorteado : numeroSorteado-chuteValor;
         let frioOuQuente = diferencaPositivaNovo<(escala/4) ? "quente" : "frio";
         if(diferencaPositivaAntigo>diferencaPositivaNovo){
            let mensagem = frioOuQuente ==="quente"? ", cada vez mais quente" : ", mas ainda está frio";
            mensagemResultado.innerHTML = `Está mais perto do seu alvo${mensagem}! Esse é o caminho. Tente de novo. Você tem mais ${qtdChancesValor} chances.`;
         } else{
            let mensagem = frioOuQuente ==="quente"? ", mas ainda está quente! Não desanima." : ". Não desanima.";
            mensagemResultado.innerHTML = `Esfriou! Agora você está mais longe do seu alvo${mensagem} Tente de novo. Você tem mais ${qtdChancesValor} chances.`;
         }
         tentativas = chuteValor;
      }  else{
         mensagemResultado.classList.remove("escondido"); 
         let diferencaPositivaNovo = Math.sign(chuteValor-numeroSorteado)===1 ? chuteValor-numeroSorteado : numeroSorteado-chuteValor;
         let frioOuQuente = diferencaPositivaNovo<(escala/4) ? "quente" : "frio"; 
         let mensagem = frioOuQuente ==="quente"? ", e está bem perto!" : ", mas foi longe demais. Volte alguns números.";       
         mensagemResultado.innerHTML = `Você passou pelo seu alvo${mensagem} O número sorteado está entre este chute e o anterior. Você tem mais ${qtdChancesValor} chances.`;
         tentativas = chuteValor;
      }
   }   
}        

function reiniciar(e){
   e.preventDefault();
   numInicial.disabled = false;
   numFinal.disabled = false;
   qtdChances.disabled = false;
   botaoRegras.disabled = false;
   numInicial.value="";
   numFinal.value="";
   qtdChances.value="";   
   let formularioJogo = document.querySelector(".formularioChute");
   formularioJogo.classList.add("escondido");
   chute.disabled=false;
   botaoChute.disabled=false;
   let mensagemResultado = document.querySelector("#mensagemResultado");
   mensagemResultado.classList.add("escondido");
   mensagemResultado.innerHTML = "";
   chute.value ="";
   tentativas ="";
   arrChute=[];   
   let mensagemErroDois = document.querySelector("#mensagemErroDois");
   let mensagemErro = document.querySelector("#mensagemErro");
   let listaChute = document.querySelector("#listaChutes");
   listaChute.classList.add("escondido");      
   listaChute.innerHTML ="";
   mensagemErro.innerHTML="";
   mensagemErroDois.innerHTML="";
   mensagemErro.classList.add("escondido");
   mensagemErroDois.classList.add("escondido");
}