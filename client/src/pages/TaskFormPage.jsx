import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";    
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function TasksFormPage() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const navigate = useNavigate()
    const params = useParams()
    console.log(params);
    

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateTask(params.id, data)
            toast.success('Task update', {
                position: 'top-right'
            })
        }else {
            await createTask(data)
            toast.success('Task created', {
                position: 'top-right'
            })
        }
        navigate('/tasks/')
    })


    useEffect(() => {
        async function loadTask() {
            if (params.id){
                console.log('Obteniendo datos');
                const {data: {title, description}} = await getTask(params.id)
                setValue('title', title)
                setValue('description', description)
            }
        }
        loadTask()
    }, [])

    return (
        <div className="max-w-80 mx-auto">
            <form className="flex flex-col gap-4 items-center border rounded-md mt-10 p-10" onSubmit={onSubmit}>
                { params.id && <h1 className="font-bold text-2xl underline">Update Task</h1>}
                { !params.id && <h1 className="font-bold text-2xl underline">Create Task</h1>}
                <input className="bg-neutral-900 p-3 rounded-md" type="text" placeholder="Title" {...register("title", { required: true })} />
                {errors.title && <span>This field is     required</span>}
                <textarea className="bg-neutral-900 p-3 rounded-md" rows="3" placeholder="Description" {...register("description", { required: true })}></textarea>
                {errors.description && <span>This field is required</span>}
                <button className="rounded-md border p-2 hover:bg-gray-600 duration-500 transition" >Save</button>
            </form>

            { params.id && (<button className="rounded-md text-red-700 font-bold underline mt-2" onClick={async () => {
                const accepted = window.confirm('Are you sure??')
                if (accepted) {
                    await deleteTask(params.id)
                    toast.success('Task deleted',{
                        position: 'top-right'
                    })
                    navigate('/tasks/')
                }
            }}>Delete</button>)}

        </div>
    )

}