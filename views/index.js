


const urlGet = "http://localhost:3001/habitos"
const urlGetByID = "http://localhost:3001/habitos/"
const urlPost = "http://localhost:3001/habitos"
const urlPut = `http://localhost:3001/habitos/`
const urlDelete = 'http://localhost:3001/habitos/'


function exibirTodosHabitos(funcao) {
    fetch(urlGet)
        .then(response => response.json())
        .then(data => funcao(data))
}

exibirTodosHabitos(display)



// async function retornaData() {
//     try {
//         const response = await fetch(urlGet)
//         const data = await response.json()
//         return data
//     }catch(error) {
//         console.error(error)
//         throw error
//     }
// }

async function retornaData() {
    try {
        const response = await fetch(urlGet)
        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
        throw error
    }
}
// teste 1
// console.log(retornaData().then((response) => console.log(response)))

async function verificarId(id) {
    const habitos = await retornaData()

    let verificacao = false

    for (const habito of habitos) {
        if (habito.id === id) {
            console.log('ID encontrado');
            verificacao = true;
            break; // Interrompe o loop assim que o ID é encontrado
        }
    }

    return verificacao

}

function verificaNumero(id) {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let confirmacao = true
    for (let letra of alfabeto) {
        if (`${id}`.includes(letra)) {
            confirmacao = false
        }
    }

    return confirmacao

}




function display(data) {
    const results = document.getElementById("results")

    results.innerHTML = ''

    data.forEach(d => {
        const habitoDiv = document.createElement("div")
        habitoDiv.innerHTML = `<p><STRONG>ID:</strong> ${d.id} <br> <strong>NOME DO HÁBITO:</strong> ${d.Nome_Habito} <br> <strong>DESCRIÇÃO:</strong> ${d.Descricao_Do_Habito}, <br> <strong>IDENTIDADE:</strong> ${d.Identidade_Habito}</p>`
        habitoDiv.className = "habitos_results"
        const button = document.createElement("button")
        button.className = "button-delete"
        results.appendChild(habitoDiv)

    });
}

const createArea = document.getElementById("create")
const habitosArea = document.getElementById("area-h")

function criarHabito() {
    habitosArea.style.display = "none"
    createArea.style.display = "flex"
}

function submit() {
    const input1 = document.getElementById("input-nome")
    const input2 = document.getElementById("input-desc")
    const input3 = document.getElementById("input-id")

    if (input1.value === '' | input2.value === '' | input3.value === '') {
        return alert("Os dados não podem ser vazios")
    }




    fetch(urlGet, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ Nome_Habito: input1.value, Descricao_Do_Habito: input2.value, Identidade_Habito: input3.value })
    })
        .then(response => { return response.json() })
        .then(data => console.log(data))

    alert("Caso seu hábito não tenha aparecido, por favor atualize a página.")

    createArea.style.display = "none"
    habitosArea.style.display = "flex"
}



function exibirTelaEdit() {
    const id = prompt("Digite o ID do hábito que deseja editar!")
    if (typeof id !== 'string') return new Error("O tipo do ID é diferente de string")
    else if (id === '') return alert("O campo id não pode ser vazio")
    else if (verificaNumero(id) === false) {
        alert("O id não pode conter letras")
        return new Error("O ID não pode ser uma letra")

    }

    verificarId(parseInt(id)).then(resultado => {
        if (resultado === false) {
            alert("O ID INFORMADO NÃO EXISTE")
            return new Error("ID NÂO ENCONTRADO")
        }
    })

    const editArea = document.getElementById("editar-area")
    habitosArea.style.display = 'none'
    editArea.style.display = 'flex'

    const result = document.getElementById("result_id")
    result.innerHTML = ''


    const el = (data) => {
        data.forEach(d => {
            const habitoDiv = document.createElement("div")
            habitoDiv.innerHTML = `<p><STRONG>ID:</strong> ${d.id} <br> <strong>NOME DO HÁBITO:</strong> ${d.Nome_Habito} <br> <strong>DESCRIÇÃO:</strong> ${d.Descricao_Do_Habito}, <br> <strong>IDENTIDADE:</strong> ${d.Identidade_Habito}</p>`
            habitoDiv.className = "habitos_results"
            const button = document.createElement("button")
            button.className = "button-delete"
            result.appendChild(habitoDiv)

        });
    }

    fetch(urlGetByID + id)
        .then(response => { return response.json() })
        .then(data => el(data))
}


function exibirHabitoEditar() {
    const input1 = document.getElementById("input-nome-1")
    const input2 = document.getElementById("input-desc-2")
    const input3 = document.getElementById("input-id-3")



    const dadosAtualizados = {
        Nome_Habito: input1.value,
        Descricao_Do_Habito: input2.value,
        Identidade_Habito: input3.value
    }

    const id = prompt("Digite o ID do hábito que deseja editar novamente, o id deve ser o mesmo que o hábito abaixo!: ")

    if (typeof id !== 'string') return new Error("O tipo do ID é diferente de string")

    else if (id === '') return alert("O campo id não pode ser vazio")

    else if (verificaNumero(id) === false) {
        alert("O id não pode conter letras")
        return new Error("O ID não pode ser uma letra")

    }

    verificarId(parseInt(id)).then(resultado => {
        if (resultado === false) {
            alert("O ID INFORMADO NÃO É O MESMO!")
            return new Error("ID NÂO ENCONTRADO")
        }
    })

    fetch(urlPut + id, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(dadosAtualizados)



    })

    const editArea = document.getElementById("editar-area")
    alert("Caso seu hábito não tenha aparecido, por favor atualize a página.")

    editArea.style.display = "none"
    habitosArea.style.display = "flex"


}

function deletarHabito() {
    const id = prompt("Digite o ID do hábito: ")
    if (typeof id !== 'string') return new Error("O tipo do ID é diferente de string")
        
    else if (id === '') return alert("O campo id não pode ser vazio")
        
    else if (verificaNumero(id) === false) {
        alert("O id não pode conter letras")
        return new Error("O ID não pode ser uma letra")

    }

    verificarId(parseInt(id)).then(resultado => {
        if (resultado === false) {
            alert("O ID INFORMADO NÃO EXISTE")
            return new Error("ID NÂO ENCONTRADO")

        }
    })



    fetch(urlDelete + id, {
        method: "DELETE",
        headers: { 'Content-Type': "application/json" },
    })
}



