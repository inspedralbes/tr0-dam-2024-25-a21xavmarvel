const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 25000;
const questionsFilePath = './questions.json';

app.use(bodyParser.json());
app.use(cors());

// Función para leer el archivo JSON
const readQuestions = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(questionsFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const questions = JSON.parse(data);
                resolve(questions);
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
};

// Función para escribir el archivo JSON
const writeQuestions = (questions) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(questionsFilePath, JSON.stringify(questions, null, 2), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};



// EndPoint para obtener todas las preguntas
app.get('/preguntes', async (req, res) => {
    try {
        const questions = await readQuestions();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: 'No se pudo leer el archivo' });
    }
});





// EndPoint para agregar una nueva pregunta
app.post('/preguntes', async (req, res) => {
    const newQuestion = req.body;
    try {
        const questions = await readQuestions();
        questions.preguntes.push(newQuestion);
        await writeQuestions(questions);
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar la pregunta' });
    }
});

// EndPoint para actualizar una pregunta
app.put('/preguntes/:id', async (req, res) => {
    const { id } = req.params;
    const updatedQuestion = req.body;
    try {
        const questions = await readQuestions();
        const index = questions.preguntes.findIndex(q => q.id === parseInt(id));
        if (index !== -1) {
            questions.preguntes[index] = { ...questions.preguntes[index], ...updatedQuestion };
            await writeQuestions(questions);
            res.json(questions.preguntes[index]);
        } else {
            res.status(404).json({ error: 'Pregunta no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la pregunta' });
    }
});

// EndPoint para eliminar una pregunta
app.delete('/preguntes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const questions = await readQuestions();
        const index = questions.preguntes.findIndex(q => q.id === parseInt(id));
        if (index !== -1) {
            questions.preguntes.splice(index, 1);
            await writeQuestions(questions);
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pregunta no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la pregunta' });
    }
});





// Servidor en escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://dam.inspedralbes.cat:${port}`);
});
