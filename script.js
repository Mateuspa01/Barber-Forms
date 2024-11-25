let btn = document.getElementById("enviar")
let consulta = document.getElementById('consulta')

//CONSULTA DE DATA
consulta.addEventListener("click", async ()=>{
    const DataDiv = document.getElementById('data')
    const label = document.getElementById('horas')
    if(VerificarData()){
        DataDiv.classList.remove('is-invalid')
        CreateHours()
    }
    else{
        label.innerHTML = ""
        DataDiv.classList.add('is-invalid')
    }
})

//VERIFICAÇÃO DE INSERÇÃO CORRETA DA DATA
function VerificarData(){

    const DataInput = document.getElementById("data").value
    const DataInputVetor = DataInput.split("-")
    const DataInputDate = new Date(DataInput)

    const Calendario = new Date()
    const Dia = Calendario.getDate()
    const Mes = Calendario.getMonth() + 1 

    if(DataInputDate.getFullYear() < Ano){
        return false;
    }else{
        if(DataInputDate.getDay() === 6) {
            return false
        }else{
            if(Number(DataInputVetor[1]) > Mes){
                return true
            }else 
            if(Number(DataInputVetor[1]) === Mes){
                if(DataInputVetor[2] < Dia){
                    return false
                }else{
                    return true
                }  
            }else return false
        }
    }
}

//INSERÇÃO DAS HORAS NO LABEL
async function CreateHours(){
    const dataSelecionada = document.getElementById('data').value

    const input = ["07:00", "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

    const select = document.getElementById('horas')
    
    select.innerHTML = ""
    
    let clientes
    try{
        const res = await fetch("dados.json")
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json()
        clientes = data.clientes
    }catch(error){
        console.error('Fetch error:', error);
        return;
    }
    
    const atendente = document.getElementById('atendente').value
    const clienteAT = clientes.filter(cliente => cliente.atendente === atendente)

    const clienteData = clientes.find(cliente => cliente.data === dataSelecionada && cliente.atendente == atendente)
    const horarioOcupado = clienteData ? clienteData.hora : []

    const horarioLivre = input.filter(h => !horarioOcupado.includes(h))

    if(dataSelecionada == ""){
        alert('[ERRO]: Selecione uma data')
    }else
    if(clienteAT.length > 0){
        Data(horarioOcupado, horarioLivre, input, select)
    }else{
        input.forEach(horario =>{
            let option = document.createElement("option")
            option.value = horario
            option.text = horario
            select.appendChild(option)
        })
    }
}

//ENVIO DO FORMULÁRIO
btn.addEventListener("click", ()=>{
    const atendente = document.getElementById('atendente').value
    const atendenteDiv = document.getElementById('atendente')

    const horarioDiv = document.getElementById('horas')

    if(isNaN(atendente)){
        atendenteDiv.classList.add('is-invalid')
    }else {
        if(atendente < 1 || atendente > 3){
            atendenteDiv.classList.add('is-invalid')
        }else{
            atendenteDiv.classList.remove('is-invalid')
        }
    }

    if(VerificarHorario()) horarioDiv.classList.remove('is-invalid')
    else horarioDiv.classList.add('is-invalid')


    const DataDiv = document.getElementById('data')
    const label = document.getElementById('horas')
    if(VerificarData()){
        DataDiv.classList.remove('is-invalid')
        CreateHours()
    }
    else{
        label.innerHTML = ""
        DataDiv.classList.add('is-invalid')
    }
})

//VERIFICAÇÃO CORRETA DO HORARIO
function VerificarHorario(){

    const horarioInput = document.getElementById('horas').value
    const horario = parseInt(horarioInput)

    if(horario >= 7 && horario <= 17) return true
    else return false
}

function Data(horarioOcupado, horarioLivre, input, select) {
    const horariosParaExibir = horarioOcupado.length > 0 ? horarioLivre : input;
    horariosParaExibir.forEach(horario => {
        let option = document.createElement("option");
        option.value = horario;
        option.text = horario;
        select.appendChild(option);
    });
}
