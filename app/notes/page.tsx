'use server'

import { useHooks } from "@/models/notes"

export default async function Page() {
  const { getNotesLists } = await useHooks()
  const notes = await getNotesLists()

  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {notes?.map((item: any) => (
          <li key={item.email} className="py-4 flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
            </div>
          </li>
        ))}
      </ul>


      <div>
        <h1>Send Message</h1>
        <form >
          <label>
            Message:
            <input type="text" />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div >
  )
}