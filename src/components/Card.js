import axios from 'axios'
import alert from '../methods/alert'
import React,{useEffect,useState} from 'react'
import { socket } from '../methods/socket'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'


const Card = ({ele,pLiked,setprogress}) => {

  const navigate = useNavigate();
  const [cardContainer, setcardContainer] = useState("")
  const [post, setpost] = useState("")
  const [likedId, setlikedId] = useState(null)
  const [copied,setCopied] = useState(false)
  const {id} = useParams();

  if(post === 1)
  alert('danger','User not found')
  const getPost = async()=>{
      try {
        
        let res = await axios.get(`https://dp1.sytes.net/posts/${id}`)
        let res1 = await axios.get(`https://dp1.sytes.net/likedid`)



        if(res1.status == 200)
        setlikedId(res1.data.id)
        else
        throw new Error(res1.data)

        if(res.status == 200)
        setpost(res.data)
        else
        throw new Error(res.data)

        setpostLikes(res.data.likes)
        if(res1.data.id === res.data.id){
          setLike(1)
          fill()
        }


        console.log('post',post,id)
      } catch (err) {
        alert('danger',err.message)
      }

      
  }
  
  
  console.log(post,likedId)

  if(copied)
  alert('success','link copied to clipboard')

  const [like,setLike] = React.useState(0)
  const [postLikes, setpostLikes] = useState(0)
  const [fillColor, setfillColor] = useState("fa-heart-o")

  let likes;
  

  if(postLikes == 1)
  likes = "1 Like"
  else if(postLikes >1)
  likes = `${postLikes} Likes`
  else
  likes = ""
  
  const fill = ()=>{
    setfillColor("fa-heart")
  }
  
  const unfill = ()=>{
    setfillColor("fa-heart-o")
  }
  
  
  useEffect(() => {

    if(ele === undefined){
      setcardContainer("card-container")
      getPost()
    }
    else
    {
      setpost(ele)
      setlikedId(pLiked)
      setpostLikes(ele.likes)
      if(pLiked === ele.id){
        setLike(1)
        fill()
      }
    }

  }, [])
  
  socket.on('getlikes',(id,likes)=>{

      console.log("Entered",id,likes,post)
      if(post.id === id)
      setpostLikes(likes)
  })


  const likeUnlike=async()=>{
    
    try {
      
      setprogress(80)
      if(like == 0){
        let res = await axios.post('https://dp1.sytes.net/like',{id:post.id})
        
        if(res.status != 200)
        throw new Error(res.data)
        else{
          fill()
          setLike(1)
          setprogress(100)
        }
      }
      else{
        let res1 = await axios.post('https://dp1.sytes.net/unlike',{id:post.id})
        if(res1.status != 200)
        throw new Error(res1.data)
        else{
          unfill()
          setLike(0)
          setprogress(100)
        }
      }
      socket.emit('updatelikes',post.id)
      
      } catch (err) {
          console.log(err.message)
          alert('danger',err.message)
          setprogress(100)
      }
  }
  
    
  return (
    
    <div className={cardContainer}>{post !=1 && post !=null ? <div className="card">
        <div className='card-top'>
          <div className='avatar'>
            <img src={`https://dp1.sytes.net/getimg/${post.id}`} alt="" />
          </div>
          <div className='name'>{post.name}</div>
        </div>
        <div className='card-img' onClick={()=> navigate(`/post/${post.id}`)}>
            <img src={`https://dp1.sytes.net/getimg/${post.id}`} alt="img"  className='img'/>
        </div>
        <div className='card-bottom'>
        <span id = "heart"><i className={`fa ${fillColor} heart`} aria-hidden="true" onClick={e=>likeUnlike()}></i> </span>
        <CopyToClipboard text={`https://dp.turntbloke.tech/post/${post.id}`} onCopy={()=> setCopied(true)}><span id = "share"><svg aria-label="Share Post" className="_8-yf5 fa-heart-o share" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg></span></CopyToClipboard>
        <div className="likes">{likes}</div>
        </div>
    </div>:<></>}
    {ele === undefined ?<Link to="/"><button type="button" class="btn btn-secondary register" style={{margin:'60px'}}>See all posts</button></Link>:""}
    </div>
  )
}

export default Card