import React, { useState, useEffect } from "react";
import { Container, Form, Div, CardList } from "./styles";
import Input from "../../Components/Input/index";
import Botao from "../../Components/Botao/index";
import RectangularCard from "../../Components/Card/index";
import TaskService from '../../Services/TaskService'

const taskService = new TaskService()

const Tarefas = () => {
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        dateTime: "",
        durationTime: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await taskService.buscar();
                setTarefas(response.data || []);
            } catch (err) {
                alert("Erro ao buscar dados da API.");
            }
        }

        fetchData();
    }, []);

    const handleEditClick = (task) => {
        setIsEditing(true);
        setCurrentTask(task);
        setForm({
            title: task.title,
            description: task.description,
            dateTime: formatarData(task.dateTime),
            durationTime: task.durationTime
        });
    };

    function formatarData(inputData) {
        const data = new Date(inputData);
      
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se de que os meses começam em zero no JavaScript
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');
      
        const dataFormatada = `${ano}-${mes}-${dia}T${hora}:${minutos}`;
      
        return dataFormatada;
      }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (isEditing) {
                
                const response = await taskService.editar(currentTask.id, form);
                if (response.status === 200) {
                    const updatedTasks = await taskService.buscar();
                    setTarefas(updatedTasks.data || []);
                    setIsEditing(false);
                    setCurrentTask(null);
                    setLoading(false);
                    return alert('Tarefa editada com sucesso.');
                }
            } else {
                const response = await taskService.cadastrar(form);

                if (response.status === 201) {
                    const newTask = await taskService.buscar();
                    setTarefas(newTask.data || []);
                    setLoading(false);
                    return alert('Tarefa criada.');
                }
            }

            setLoading(false);
        } catch (err) {
            alert('Erro ao criar/editar a tarefa.');
        }
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };


    const deleteTask = async (id) => {
        setLoading(true)
        const response = await taskService.deletar(id)
        if (response.status === 204) {
            let tarefas = await taskService.buscar(); 
            setTarefas(tarefas.data || []);
            setLoading(false)
        }
        setLoading(false)
        return alert('Tarefa deletada.')
    }

    const handleHourChange = (e) => {
        const inputHour = e.target.value;

        const cleanedInput = inputHour.replace(/[^\d]/g, '');
      
        if (cleanedInput.length > 2) {
          const formattedInput = cleanedInput.substring(0, 2) + ':' + cleanedInput.substring(2);
      
          const truncatedInput = formattedInput.substring(0, 5);
      
          setForm({ ...form, [e.target.name]: truncatedInput });
        } else {
          setForm({ ...form, [e.target.name]: cleanedInput });
        }
      };

    return (
        <Container>
            <Form>
                <h1>{isEditing ? 'Editar tarefa' : 'Criar tarefa'}</h1>
                <Input
                    name='title'
                    placeholder='Digite o titulo da tarefa'
                    onChange={handleChange}
                    type='text'
                    value={form.title}
                />
                <Input
                    name='description'
                    placeholder='Digite a descrição da tarefa'
                    onChange={handleChange}
                    type='text'
                    value={form.description}
                />
                <Input
                    name='dateTime'
                    placeholder='Insira a data e hora'
                    onChange={handleChange}
                    type='datetime-local'
                    value={form.dateTime}
                />
                <Input
                    name='durationTime'
                    placeholder='Insira o tempo de duração (HH:mm)'
                    onChange={handleHourChange}
                    type='text'
                    value={form.durationTime}
                />
                <Botao
                    type='submit'
                    text={isEditing ? 'Editar' : 'Criar'}
                    onClick={handleSubmit}
                />
            </Form>
            <Div>
                <h1>Lista de tarefas</h1>
                <CardList>
                    {tarefas.length > 0 ? (
                        tarefas.map((tarefa) => (
                            <RectangularCard
                                key={tarefa.id}
                                values={tarefa}
                                onDeleteClick={() => deleteTask(tarefa.id)}
                                onEditClick={() => handleEditClick(tarefa)}
                                isLoading={loading}
                            />
                        ))
                    ) : (
                        <p>Aguarde, carregando tarefas...</p>
                    )}
                </CardList>
            </Div>
        </Container>
    );
}

export default Tarefas;