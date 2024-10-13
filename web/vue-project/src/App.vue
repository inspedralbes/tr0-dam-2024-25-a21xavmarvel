
<template>
  <div id="app">
    <h1 class="main-title">Gestión de Preguntas</h1>

    <div class="form-container">
      <form @submit.prevent="addQuestion" class="form">
        <div class="answers-container">
          <input
            class="input-field"
            v-model="newQuestion.pregunta"
            placeholder="Pregunta"
            required
          />
          
          <input
            class="input-field"
            v-model="newQuestion.respostes[0].text"
            placeholder="Respuesta 1"
            required
          />
          <input
            class="input-field"
            v-model="newQuestion.respostes[0].imatge"
            placeholder="URL de Imagen 1"
            required
          />
          <input
            class="input-field"
            v-model="newQuestion.respostes[1].text"
            placeholder="Respuesta 2"
            required
          />
          <input
            class="input-field"
            v-model="newQuestion.respostes[1].imatge"
            placeholder="URL de Imagen 2"
            required
          />
          <input
            class="input-field"
            v-model="newQuestion.respostes[2].text"
            placeholder="Respuesta 3"
            required
          />
          <input
            class="input-field"
            v-model="newQuestion.respostes[2].imatge"
            placeholder="URL de Imagen 3"
            required
          />
          <input
            class="input-field"
            v-model="newQuestion.respostes[3].text"
            placeholder="Respuesta 4"
            required
          />
          <input
            class="input-field"
            v-model="newQuestion.respostes[3].imatge"
            placeholder="URL de Imagen 4"
            required
          />

          
        <select v-model="newQuestion.respuestaCorrecta" class="input-field" required>
          <option disabled value="">Seleccione la respuesta correcta</option>
          <option value="0">Respuesta 1</option>
          <option value="1">Respuesta 2</option>
          <option value="2">Respuesta 3</option>
          <option value="3">Respuesta 4</option>
        </select>

        </div>

  

        <button class="submit-button" type="submit">Agregar Pregunta</button>
      </form>
    </div>

    <h2 class="title">Lista de Preguntas</h2>
    <ul class="questions-list">
      <li
        class="question-item"
        v-for="(question, index) in questions"
        :key="question.id"
      >
        <div class="question-text">{{ question.pregunta }}</div>



        <div class="answers-box">
  <div
    class="answer"
    v-for="(respuesta, idx) in question.respostes"
    :key="idx"
  >
    <img :src="respuesta.imatge" :alt="respuesta.text" class="answer-image" />
    <p>{{ respuesta.text }}</p>
    
    <div v-if="!editing && question.respuestaCorrecta === idx" class="correct-answer-indicator">
      <span class="check-icon">✔️</span>
    </div>
    
    <span v-if="idx === question.respuestaCorrecta" class="correct-answer">
      Correcta<br />
      <i class="fas fa-check" style="color: green;"></i>
    </span>
  </div>
</div>





        <div class="action-buttons">
          <button class="action-button" @click="editQuestion(question)">
            Editar
          </button>
          <button class="action-button" @click="deleteQuestion(question.id)">
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <div v-if="editing" class="edit-container">
      <h3>Editar Pregunta</h3>
      <form @submit.prevent="updateQuestion" class="form">
        <div class="answers-container">
          <input
            class="input-field"
            v-model="currentQuestion.respostes[0].text"
            placeholder="Respuesta 1"
            required
          />
          <input
            class="input-field"
            v-model="currentQuestion.respostes[0].imatge"
            placeholder="URL de Imagen 1"
            required
          />
          <input
            class="input-field"
            v-model="currentQuestion.respostes[1].text"
            placeholder="Respuesta 2"
            required
          />
          <input
            class="input-field"
            v-model="currentQuestion.respostes[1].imatge"
            placeholder="URL de Imagen 2"
            required
          />
          <input
            class="input-field"
            v-model="currentQuestion.respostes[2].text"
            placeholder="Respuesta 3"
            required
          />
          <input
            class="input-field"
            v-model="currentQuestion.respostes[2].imatge"
            placeholder="URL de Imagen 3"
            required
          />
          <input
            class="input-field"
            v-model="currentQuestion.respostes[3].text"
            placeholder="Respuesta 4"
            required
          />
          <input
            class="input-field"
            v-model="currentQuestion.respostes[3].imatge"
            placeholder="URL de Imagen 4"
            required
          />
        </div>

        <select v-model="currentQuestion.respuestaCorrecta" class="input-field" required>
          <option disabled value="">Seleccione la respuesta correcta</option>
          <option value="0">Respuesta 1</option>
          <option value="1">Respuesta 2</option>
          <option value="2">Respuesta 3</option>
          <option value="3">Respuesta 4</option>
        </select>

        <button class="submit-button" type="submit">Actualizar</button>
      </form>
    </div>
  </div>
</template>





























<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const questions = ref([]);
const newQuestion = ref({
  pregunta: '',
  respostes: [
    { text: '', imatge: '' },
    { text: '', imatge: '' },
    { text: '', imatge: '' },
    { text: '', imatge: '' }
  ],
  respuestaCorrecta: null
});


const editing = ref(false);
const currentQuestion = ref({});

const fetchQuestions = async () => {
  const response = await axios.get('http://localhost:3000/preguntes');
  questions.value = response.data.preguntes;
};


const addQuestion = async () => {
  await axios.post('http://localhost:3000/preguntes', {
    id: questions.value.length + 1,
    pregunta: newQuestion.value.pregunta,
    respostes: newQuestion.value.respostes,
    resposta_correcta: newQuestion.value.respuestaCorrecta 
  });


  newQuestion.value = {
    pregunta: '',
    respostes: [
      { text: '', imatge: '' },
      { text: '', imatge: '' },
      { text: '', imatge: '' },
      { text: '', imatge: '' }
    ],
    respuestaCorrecta: null
  };
  fetchQuestions();
};


const editQuestion = (question) => {
  currentQuestion.value = { ...question }; // Clona la pregunta seleccionada
  editing.value = true; // Cambia el estado de edición a verdadero
};
const updateQuestion = async () => {
  await axios.put(`http://localhost:3000/preguntes/${currentQuestion.value.id}`, {
    pregunta: currentQuestion.value.pregunta,
    respostes: currentQuestion.value.respostes,
    respuestaCorrecta: currentQuestion.value.respuestaCorrecta // Asegúrate de que esto esté bien
  });

  editing.value = false; // Cambia el estado de edición a falso
  currentQuestion.value = {}; // Limpia la pregunta actual
  fetchQuestions(); // Vuelve a cargar las preguntas
};
const deleteQuestion = async (id) => {
  await axios.delete(`http://localhost:3000/preguntes/${id}`);
  fetchQuestions();
};

onMounted(fetchQuestions);
</script>

<style scoped>
#app {
  max-width: 4000px;
  margin: 2 auto;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-title {
  font-size: 2.5em;
  margin-bottom: 25px;
}

.title {
  font-size: 2em;
  margin: 50px 0;
}

.form-container {
  margin: 30px 0;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #218838;
}

.questions-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

.question-item {
  margin: 30px 0;
  padding: 10px;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.question-text {
  margin-bottom: 10px;
  font-weight: bold;
}

.answers-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
}

.answer {
  text-align: center;
  margin: 50px;
}

.answer-image {
  width: 150px;
  height: 100px;
}

.correct-answer {
  color: green;
  font-weight: bold;
}

.action-buttons {
  margin-top: 10px;
}

.action-button {
  padding: 10px 30px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.action-button:hover {
  background-color: #0056b3;
}

.edit-container {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.correct-answer-indicator {
  color: green; /* Cambia el color según lo que prefieras */
  font-size: 1.5em; /* Tamaño del icono */
  margin-top: 5px; /* Espaciado */
}

</style>