import React,{useEffect,useState,Suspense} from 'react'
import axios from 'axios'
import alert from '../methods/alert'

const Card = React.lazy(()=> import('./Card'))


const Home = ({setprogress}) => {
    const [data, setdata] = useState([])
    const [likedId, setlikedId] = useState("")
    console.log(likedId)


    async function main(){
        try {
            setprogress(80)
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