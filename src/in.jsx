import { useEffect, useState } from "react"


export default function In(){
    const [input,setInput]=useState()
    const [data,setData]=useState()
    const [error,setError]=useState(false)



function check(){
    console.log(":f")
    console.log(input)
    if(input.includes('https://github.com/')){
        console.log(input)
        try {
        fetch(input.replace('https://github.com/','https://api.github.com/repos/'))
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if('status' in res && res.status=='404'){
                console.log("res")
                setError(true)
            }
            else{
                setData(res)
            }
        })  
        } catch (error) {
            alert("error")
        }
    }
    else{
        alert("Wrong Input")
    }
}


function sizeMatch(){
    const sizeType=["KB","MB","GB"]
    let size=data.size
    let ptr=0
    for(let i=0;i<sizeType.length;i++){
        if(size<1024){
            size=size.toFixed(2)
            return (size+" "+sizeType[ptr]);
        }
        size=size/1024
        ptr++;
    }
}
// console.log(sizeMatch())


const viewData= ()=>{return(
<>
            <div className="grid justify-center align-center">
                <div className="py-4 min-[400px]:px-4 md:px-4">
                    <div className="text-2xl">Repository Size:</div>
                    <div className="text-2xl">{sizeMatch()}</div>
                </div>
                <div className="grid grid-cols-[30%_70%] justify-center align-center md:w-[50dvw] min-[400px]:w-[95dvw] px-4">
                    <div className="grid self-cente py-6">
                        <img src={data.owner.avatar_url} className="circle bg-red-400 " />
                    </div>
                    <div>
                        <div className="grid grid-cols-[10%_90%] text-xl py-6 border-b-1 border-neutral-600 ">
                            <img src="icon/people.png" className="invert h-6 grid grid justify-center self-center" />
                            {data.owner.login}
                        </div>
                        <div className="grid grid-cols-3 py-4">
                            <div className="grid grid-cols-[30%_70%]">
                                <img src="icon/star.png" className="invert h-6" />
                                {data.stargazers_count}
                            </div>
                            <div className="grid grid-cols-[30%_70%]">
                                <img src="icon/eye.png" className="invert h-6" />
                                {data.watchers_count}
                            </div>
                            <div className="grid grid-cols-[30%_70%]">
                                <img src="icon/fork.png" className="invert h-6" />
                                {data.forks_count}
                            </div>
                        </div>
                        <div className="grid grid-cols-[10%_90%] py-2">
                            <img src="icon/repo.png" className="invert h-6" />
                            {data.full_name}
                        </div>
                        <div className="py-4">
                            <div className="pill bg-blue-600">{data.language}</div>
                        </div>
                    </div>
                </div>
            </div>
</>
)
}


const err=()=>{
    return(
        <>
            <div className="text-2xl">Unable to find the Github Repo </div>
            <div>Err :: 404</div>
        </>
    )
}






return(
<div className="grid grid-rows-[40%_60%] h-full">
    <div className="grid justify-center self-center h-[50%]">
        <div>
            <div className="md:text-5xl min-[400px]:text-xl pb-16">Github repo size checker</div>
            <div className="grid justify-center ">
                <div className="grid rounded-2xl md:w-[40dvw] min-[400px]:w-full overflow-hidden">
                    <input type="text" className=" p-4 px-8 rounded-t-3xl border-2 border-blue-400 border-b-0 min-[400px]:rounded-t-2xl px-8" placeholder="https://github.com/"  onChange={(e)=>setInput(e.target.value)}/>
                    <button className="py-2 bg-blue-400 cursor-pointer hover:bg-blue-600 transition-all" onClick={()=>check()}>Check</button>
                </div>
            </div>
        </div>
    </div>
    <div className="grid justify-center align-center">
        <div className="radius w-[95dvw] min-[400px]:p-4">
            {
                data == undefined ? 
                <div>
                    <div>Paste your github repository link </div>
                    <div>and Click <b>Check </b></div>
                </div>
                : error==true ? err()
                : viewData()
            }
        </div>
    </div>
    
</div>
)
}