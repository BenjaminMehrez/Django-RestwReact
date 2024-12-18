import { Link } from "react-router-dom"

export function Navigation() {
  return (
    <div className="flex gap-16 h-20 items-center border-b-2 border-white text-xl">
        <Link to="/tasks">
        <h1 className="hover:underline">Task App</h1>
        </Link>
        <Link to="/tasks/create"><h1 className="hover:underline">Create Task</h1></Link>
    </div>
  )
}