document.addEventListener("DOMContentLoaded", () => {
  document.body.style.backgroundImage = "url('gym-background.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";

  const giornoSelect = document.getElementById("giorno");
  const esercizioSelect = document.getElementById("esercizio");
  const form = document.getElementById("form");
  const listaAllenamenti = document.getElementById("lista-allenamenti");
  const ctx = document.getElementById("graficoCarico").getContext("2d");
  
  const eserciziPerGiorno = {
  1: [
    "Panca piana (con bilanciere o manubri) – 4 serie x 8-10 ripetizioni",
    "Pull-up assistiti (o lat machine) – 4 serie x 8-10 ripetizioni",
    "Panca inclinata (manubri) – 3 serie x 8-10 ripetizioni",
    "Rematore con manubri – 4 serie x 8-10 ripetizioni",
    "Shoulder press (manubri o bilanciere) – 4 serie x 8-10 ripetizioni",
    "Curl bicipiti (con manubri o bilanciere) – 3 serie x 10-12 ripetizioni",
    "Tricipiti con corda (pulley) – 3 serie x 10-12 ripetizioni",
    "Crunch (addominali) – 3 serie x 15-20 ripetizioni",
    "Plank – 3 serie x 30-45 secondi"
  ],
  2: [
    "Leg Press (con basso carico) – 3 serie x 10-12 ripetizioni",
    "Hip Thrust (manubri o bilanciere) – 4 serie x 8-10 ripetizioni",
    "Glute Bridge (a corpo libero) – 4 serie x 12-15 ripetizioni",
    "Leg Curl (macchina per i bicipiti femorali) – 3 serie x 10-12 ripetizioni",
    "Calf Raises (sollevamenti polpacci) – 4 serie x 12-15 ripetizioni",
    "Plank laterale – 3 serie x 30 secondi per lato"
  ],
  3: [
    "Stacco da terra (Deadlift) – 4 serie x 6-8 ripetizioni",
    "Push-up (piegamenti) – 4 serie x 10-12 ripetizioni",
    "Rematore con bilanciere – 3 serie x 8-10 ripetizioni",
    "Chest Press (macchina) – 3 serie x 8-10 ripetizioni",
    "Affondi (senza pesi o con manubri leggeri) – 3 serie x 10 ripetizioni per gamba",
    "Russian twist (addominali) – 3 serie x 20 ripetizioni (per lato)",
    "Leg Raise (sollevamenti gambe per addominali) – 3 serie x 15 ripetizioni"
  ]
};

  function caricaEsercizi() {
    esercizioSelect.innerHTML = "";
    eserciziPerGiorno[giornoSelect.value].forEach((esercizio) => {
      const option = document.createElement("option");
      option.value = esercizio;
      option.textContent = esercizio;
      esercizioSelect.appendChild(option);
    });
  }

  giornoSelect.addEventListener("change", caricaEsercizi);
  caricaEsercizi();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = document.getElementById("data").value;
    const esercizio = esercizioSelect.value;
    const serie = document.getElementById("serie").value;
    const kg = document.getElementById("kg").value;
    const peso = document.getElementById("peso").value;
    
    const allenamento = { data, esercizio, serie, kg, peso };
    let allenamenti = JSON.parse(localStorage.getItem("allenamenti")) || [];
    allenamenti.push(allenamento);
    localStorage.setItem("allenamenti", JSON.stringify(allenamenti));
    
    displayAllenamenti();
    aggiornaGrafico();
  });

  function displayAllenamenti() {
    listaAllenamenti.innerHTML = "";
    const allenamenti = JSON.parse(localStorage.getItem("allenamenti")) || [];
    allenamenti.forEach((a) => {
      const li = document.createElement("li");
      li.textContent = `${a.data}: ${a.esercizio}, ${a.serie} serie, ${a.kg} kg, Peso: ${a.peso} kg`;
      listaAllenamenti.appendChild(li);
    });
  }

  function aggiornaGrafico() {
    const allenamenti = JSON.parse(localStorage.getItem("allenamenti")) || [];
    const dati = allenamenti.map((a) => ({ x: a.data, y: Number(a.kg) }));
    
    new Chart(ctx, {
      type: "line",
      data: {
        datasets: [{
          label: "Carico (kg)",
          data: dati,
          borderColor: "blue",
          fill: false,
        }],
      },
      options: {
        scales: {
          x: { type: "time", time: { unit: "day" } },
          y: { beginAtZero: true },
        },
      },
    });
  }
  
  displayAllenamenti();
  aggiornaGrafico();
});
