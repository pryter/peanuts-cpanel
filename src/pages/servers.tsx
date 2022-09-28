/* eslint-disable */

import fs from "fs"
import path from "path"

export async function getServerSideProps() {

  const ddir = "data"

  const list  = fs.readdirSync(path.join(ddir))
  let data = []
  for (let s of list) {
    const sdata = fs.readFileSync(path.join(ddir, s)).toString() || "{}"
    data.push(JSON.parse(sdata))
  }

  return {
    props: {
      data: data
    }, // will be passed to the page component as props
  }
}

const Page = ({data}: any) => {

  return (
    <div className="py-8">
      <h1 className="text-xl text-center font-medium mb-6">Server lists</h1>
<div className="flex flex-col items-center space-y-6">
      {data.map((i: any) => (
        <div style={{minWidth: "520px"}} className="flex bg-blue-50 shadow-md rounded-lg" key={i.id}>
        <div>
          <img style={{width:"144px", height: "144px"}} className="rounded-l-lg" src={i.banner}/>
        </div>
        <div className="flex flex-col px-6 py-2 text-gray-800 flex-grow">
<div>
<h1 className="font-bold">{i.name}</h1>
          <h1 className="text-xs text-gray-600">{i.id}</h1>
          <h1 className="text-xs text-gray-600">Status: {i.active ? <span className="text-green-600">Active</span> : <span className="text-yellow-600">Idle</span>}</h1>
</div>
{i.track ? <div style={{width: "320px"}} className="flex bg-white px-2 py-1 rounded-md shadow-md mt-1">
  <img className="w-16 rounded-md" src={i.track.thumbnail}/>
  <div className="px-3 text-gray-800">
    <h1 style={{maxWidth: "256px"}} className="text-xs truncate font-medium">{i.track.title}</h1>
    <div className="text-xs font-medium">
      <div className="flex space-x-2">
      <h1 className="text-gray-700">By: <span className="bg-blue-100 px-1 rounded-md text-gray-800">{i.track.requester}</span></h1>
      <h1 className="text-gray-700">Duration: <span className="text-gray-800">{new Date(i.track.duration).getMinutes()}:{new Date(i.track.duration).getSeconds()}</span></h1>
        </div>
      <h1 className="text-gray-700">Channel: <span className="bg-yellow-100 text-gray-800 px-1 rounded-md">{i.track.channelName}</span></h1>
    </div>
  </div>
</div> : <div className="flex flex-grow items-center justify-center w-full text-gray-500"><h1>Now playing unavailable</h1></div>}
          </div>
      </div>
      ))}
    </div>
    </div>
  )
}

export default Page