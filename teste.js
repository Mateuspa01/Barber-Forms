const servicos = document.getElementById("servico")

servicos.addEventListener("change", () =>{
    const option = document.getElementById("servico").value
    const DivTotal = document.getElementById('vlr-total')
    const DivValor = document.getElementById('valor')
    const DivTipo = document.getElementById('corte')

    DivValor.innerHTML = `R$ ${option},00`
    DivTotal.innerHTML = `R$${option},00`
    
    if(option == 30)
        DivTipo.innerHTML = `Degrade`
    else
    if(option == 37)
        DivTipo.innerHTML = `Degrade + Sobrancelha`
    else
    if(option == 45)
        DivTipo.innerHTML = `Degrade + Barba`
    else
    if(option == 50)
        DivTipo.innerHTML = `Degrade + Barba + Sobrancelha`


})
