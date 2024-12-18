import { useNavigate } from "react-router-dom"


export function TaskCard({task}) {

  const navigate = useNavigate()

  return (

    <div className="w-1/3 bg-neutral-900 border p-4 flex flex-col gap-4 hover:cursor-pointer hover:shadow-lg hover:shadow-slate-200 hover:drop-shadow-xl duration-300 trasition" onClick={() => {
      navigate(`/tasks/${task.id}`)
    }}>
          <h1 className="font-bold text-xl">{task.title}</h1>
          <p>{task.description}</p>
    </div>
  )
}
