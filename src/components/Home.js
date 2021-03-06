import React,{useEffect,useState,Suspense} from 'react'
import axios from 'axios'
import alert from '../methods/alert'
import staticAlert from '../methods/staticAlert'

const Card = React.lazy(()=> import('./Card'))


const   Home = ({setprogress}) => {
    const [data, setdata] = useState([])
    const [likedId, setlikedId] = useState("")
    console.log(likedId)


    async function main(){
        try {
            setprogress(80)
            let current_d = new Date();
            let contest_d = new Date("2022-04-21T20:30:00")

            if (current_d < contest_d ){
                staticAlert('danger','Contest has not started yet :)')
                setprogress(100)
                return;
            }
            let res1 = await axios.get('https://dp1.sytes.net/likedid')
            setlikedId(res1.data.id)

            let res = await axios.get('https://dp1.sytes.net/getdata')
            setdata(res.data)

            setprogress(100)

        } catch (err) {
            alert('danger',err.message)
            setprogress(100)
        }
    }
    useEffect(() => {    
        main()
    }, [])
    
  return (
    <div className="card-container">
        {data.length !== 0 ?data.map((ele)=>{
            return (
                <Suspense>
                    {likedId != ""?<Card ele = {ele} pLiked={likedId} setprogress={setprogress}/>:""}
                </Suspense>
            )
        }):""}
    </div>
  )
}

export default Home