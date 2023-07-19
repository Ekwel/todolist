let data = [];
let taskDone = [];

// la classe tâche
class Task {
  static id = 0;

  constructor(name, description, date, categorie, statut) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.categorie = categorie;
    this.statut = statut;
    this.id = ++Task.id;
  }

  // méthodes qui insère les éléments du formulaire
  fillTasklist(task) {
    data.unshift(task);
    // alert(JSON.stringify(tasks));
    console.log(data);

    const container = document.getElementById("nav-Todo");

    // boucle sur data pour créer une carte pour chaque élément de datas dans la nav To-do
    let html = "";
    data.forEach((item) => {
      html += `
              <div class="card todo shadow mb-3" id="${item.id}">
                <div class="card-body">
                  <div class="d-flex flex-row justify-content-between">
                    <h5 class="card-title">${item.name}</h5>
                    <li class="nav-item dropdown nav">
                    <button class="btn btn-white" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" id="modif" onclick="modifTask(${item.id})">Modifier</a></li>
                        <li><a class="dropdown-item" href="#" id="complete" onclick="sendToComplete(${item.id})">Done</a></li>
                        <li><a class="dropdown-item" href="#" id="delete" onclick="deleteTask(${item.id})">Delete</a></li>
                      </ul>
                    </li>
                  </div>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    <small>${item.date}</small> 
                  </h6>
                  <p class="card-text">
                    ${item.description}
                  </p>
                  <span class="badge bg-success">${item.categorie}</span>
                </div>
              </div>
            `;
    });
    // insérer la chaîne de caractères HTML dans l'élément DOM
    container.innerHTML = html;
  }
}

// la fonction qui crée une tâche après avoir récupérée les éléments du formulaire
function createtask() {
  let name = $("#taskname").val();
  let description = $("#taskdescription").val();
  // récupérer l'heure de la tâche en 3 étapes
  let dateForm = $("#taskDate").val();
  let dateObject = new Date(dateForm.replace('T', ' '));
  let date = dateObject.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

  let categorie = $("#taskcategorie").val();
  let statut = $("#alerte").is(":checked"); // Renvoie true ou false
  let close = $("#close");

  // instancier une nouvelle variable de type Task
  const task = new Task(name, description, date, categorie, statut);
  task.fillTasklist(task);
  // fermer auto la modale
  close.click();
}

// la fonction qui supprime une tâche de l'array data et affiche les tâches restantes
function deleteTask(id) {
  let index = data.findIndex((data) => data.id == id);
  data.splice(index, 1);

  const container = document.getElementById("nav-Todo");

  // boucle forEach pour créer une carte pour chaque élément de données
  let html = "";
  data.forEach((item) => {
    html += `
              <div class="card todo shadow mb-3" id="${item.id}">
                <div class="card-body">
                  <div class="d-flex flex-row justify-content-between">
                    <h5 class="card-title">${item.name}</h5>
                    <li class="nav-item dropdown nav">
                    <button class="btn btn-white" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" id="modif" onclick="modifTask(${item.id})">Modifier</a></li>
                        <li><a class="dropdown-item" href="#" id="complete" onclick="sendToComplete(${item.id})">Done</a></li>
                        <li><a class="dropdown-item" href="#" id="delete" onclick="deleteTask(${item.id})">Delete</a></li>
                      </ul>
                    </li>
                  </div>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    <small>${item.date}</small> 
                  </h6>
                  <p class="card-text">
                    ${item.description}
                  </p>
                  <span class="badge bg-success">${item.categorie}</span>
                </div>
              </div>
            `;
  });
  // insérer la chaîne de caractères HTML dans l'élément DOM
  container.innerHTML = html;
}

// la fonction qui supprime une tâche de l'array data et les met dans l'array taskDone
function sendToComplete(id) {
  let index = data.findIndex((data) => data.id == id);
  // envoyer donnée dans la vue Complete
  taskDone.unshift(data[index]);
  const container = document.getElementById("nav-complete");

  let complete = "";
  taskDone.forEach((item) => {
    complete += `
    <div class="card todo shadow mb-3">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-between">
          <h5 class="card-title">${item.name}</h5>
          <li class="nav-item dropdown nav">
            <button class="btn btn-white" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-three-dots"></i>
            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" id="delete" onclick="deleteTaskDone(${item.id})">Delete</a></li>
            </ul>
          </li>
        </div>
        <h6 class="card-subtitle mb-2 text-body-secondary">
          <small>${item.date}</small> 
        </h6>
        <p class="card-text">
          ${item.description}
        </p>
        <span class="badge bg-success">${item.categorie}</span>
      </div>
    </div>
  `;
  });
  container.innerHTML = complete;

  // Mettre à jour les taches du tableau data
  data.splice(index, 1);

  // Mettre à jour la vue To-do
  let TodoContain = document.getElementById("nav-Todo");

  let newView = "";
  data.forEach((item) => {
    newView += `
              <div class="card todo shadow mb-3">
                <div class="card-body">
                  <div class="d-flex flex-row justify-content-between">
                    <h5 class="card-title">${item.name}</h5>
                    <li class="nav-item dropdown nav">
                    <button class="btn btn-white" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" id="modif" onclick="modifTask(${item.id})">Modifier</a></li>
                        <li><a class="dropdown-item" href="#" id="complete" onclick="sendToComplete(${item.id})">Done</a></li>
                        <li><a class="dropdown-item" href="#" id="delete" onclick="deleteTask(${item.id})">Delete</a></li>
                      </ul>
                    </li>
                  </div>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    <small>${item.date}</small> 
                  </h6>
                  <p class="card-text">
                    ${item.description}
                  </p>
                  <span class="badge bg-success">${item.categorie}</span>
                </div>
              </div>
            `;
  });
  // insérer la chaîne de caractères HTML dans l'élément DOM
  TodoContain.innerHTML = newView;
}

// la fonction qui supprime une tâche de l'array data et affiche les tâches restantes
function deleteTaskDone(id) {
  let index = taskDone.findIndex((data) => data.id == id);
  taskDone.splice(index, 1);

  const container = document.getElementById("nav-complete");

  // boucle forEach pour créer une carte pour chaque élément de données
  let html = "";
  taskDone.forEach((item) => {
    html += `
              <div class="card todo shadow mb-3" id="${item.id}">
                <div class="card-body">
                  <div class="d-flex flex-row justify-content-between">
                    <h5 class="card-title">${item.name}</h5>
                    <li class="nav-item dropdown nav">
                    <button class="btn btn-white" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" id="delete" onclick="deleteTaskDone(${item.id})">Delete</a></li>
                      </ul>
                    </li>
                  </div>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    <small>${item.date}</small> 
                  </h6>
                  <p class="card-text">
                    ${item.description}
                  </p>
                  <span class="badge bg-success">${item.categorie}</span>
                </div>
              </div>
            `;
  });
  // insérer la chaîne de caractères HTML dans l'élément DOM
  container.innerHTML = html;
}


  $("#nav-DoSoon-tab").click(function() {
    let urgentTasks = [];

    let dateNow = new Date(); // Récupère la date et l'heure actuelle
    data.forEach(function(element) {
      let dateElement = new Date(element.date); // Convertit la date de l'élément en objet Date
      let differenceEnMillisecondes = dateElement.getTime()-dateNow.getTime() ; // Calcule la différence en millisecondes entre la date actuelle et la date de l'élément
      let differenceEnHeures = differenceEnMillisecondes / (1000 * 60 * 60); // Convertit la différence en heures
        if (differenceEnHeures <= 24 ){
          urgentTasks.unshift(element);
        }
    });

        // Mettre à jour la vue To-do
    let urgentContain = document.getElementById("nav-DoSoon");
    let newView = "";
    urgentTasks.forEach((item) => {
      newView += `
          <div class="card todo shadow mb-3">
            <div class="card-body">
              <div class="d-flex flex-row justify-content-between">
                <h5 class="card-title">${item.name}</h5>
                <li class="nav-item dropdown nav">
                <button class="btn btn-white" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" id="modif" onclick="modifTask(${item.id})">Modifier</a></li>
                    <li><a class="dropdown-item" href="#" id="complete" onclick="sendToComplete(${item.id})">Done</a></li>
                    <li><a class="dropdown-item" href="#" id="delete" onclick="deleteTask(${item.id})">Delete</a></li>
                  </ul>
                </li>
              </div>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                <small>${item.date}</small> 
              </h6>
              <p class="card-text">
                ${item.description}
              </p>
              <span class="badge bg-success">${item.categorie}</span>
            </div>
          </div>
        `;
    });
  // insérer la chaîne de caractères HTML dans l'élément DOM
  urgentContain.innerHTML = newView;

  });

