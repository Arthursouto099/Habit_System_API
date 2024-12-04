const urlGet = "http://localhost:3001/habitos"
const urlGetByID = "http://localhost:3001/habitos/"
const urlPost = "http://localhost:3001/habitos"
const urlPut = `http://localhost:3001/habitos/`


fetch(urlGet)
    .then(response => { return response.json() })
    .then(data => display(data))


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
        alert("Os dados não podem ser vazios")
    }



    else {
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



}



function exibirTelaEdit() {
    const editArea = document.getElementById("editar-area")
    habitosArea.style.display = 'none'
    editArea.style.display = 'flex'

    const id = prompt("Digite o ID do hábito que deseja editar!")

    
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

  const id = prompt("Digite o ID do hábito que deseja editar novamente, o id deve ser o mesmo que o anterior!")

  fetch(urlPut + id, {
    method: "PUT",
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify(dadosAtualizados)

    
    
  }) 

  const editArea = document.getElementById("editar-area")
  alert("Caso seu hábito não tenha aparecido, por favor atualize a página.")

  editArea.style.display = "none"
  habitosArea.style.display = "flex"

   
}

