import axios from 'axios'
import React,{useState,useRef,useEffect} from 'react'
import image from '../images/img-01.png'
import alert from '../methods/alert'
import { useNavigate } from 'react-router-dom'
const Register = ({setprogress}) => {

	const navigate = useNavigate()
	const [container, setcontainer] = useState(1)
	const [userData, setuserData] = useState({name:"",email:"",id:""})
	const [disabled, setdisabled] = useState(true)

	let inpRef = useRef();
	useEffect(() => {
  
		if(inpRef.current !== undefined)
		inpRef.current.value = '';
	  }, [container]);


	const submitHandler = async(e,status)=>{
		e.preventDefault();
		if(container == 1){

			let name = document.getElementById('name').value;
			let id = document.getElementById('id').value
			let email = document.getElementById('email').value

			setuserData({...userData,name:name,id:id,email:email})
			try {

				setprogress(80)
				let res = await axios.post('https://dp1.sytes.net/sendmail',{email:email,shouldExist:false})

				if(res.status != 200){
					throw new Error(res.data)
				}
				else{
					alert('success',`otp sent to ${email}`)
					setcontainer(2)
				}

				setprogress(100)
			} catch (err) {
				alert('danger',err.message)
				setprogress(100)
			}
		}
		else{
			let otp = document.getElementById('otp').value
			if(status === "verify"){

				try {
					
					setprogress(80)
					let res = await axios.post('https://dp1.sytes.net/verifyotp',{email:userData.email,otp:otp});
	
					if(res.status != 200)
					throw new Error(res.data)
					else{
						alert('success','Verified!')
						setcontainer(3)
						setdisabled(false)
					}
					
					setprogress(100)
				} catch (err) {
					alert('danger',err.message)
					setprogress(100)
				}
			}
			else{
				try {

					setprogress(80)
					if(disabled)
					throw new Error("Please verify OTP!")
					
					let file = document.getElementById('dp')
					const uploadData = new FormData();;
            		uploadData.append('name', userData.name);
            		uploadData.append('id', userData.id);
            		uploadData.append('email', userData.email);

					if(file.files.length == 0)
					throw new Error("please select a file")

            		uploadData.append('file', file.files[0]);

					document.querySelector('.uploading').style.display = "block"

					let res = await axios.post('https://dp1.sytes.net/register', uploadData, {
						headers: {
							'content-type': 'multipart/form-data'
						}
					})

					if(res.status != 200)
					throw new Error(res.data)
					else{
						document.querySelector('.uploading').style.display = "none"
						alert('success',res.data)
					}
					setprogress(100)
					navigate('/')

				} catch (err) {
					document.querySelector('.uploading').style.display = "none"
					alert('danger',err.message)
					setprogress(100)
				}

			}

		}

	}
  return (
    
   <><div className='uploading alert alert-primary'>uploading...</div>{container == 1? <>
    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={image} alt="IMG"/>
				</div>

				<form className="login100-form validate-form" onSubmit={e=>submitHandler(e,"register")}>
					<span className="login100-form-title">
						Register
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="text" name="pass" placeholder="Name" id='name' required/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-address-card" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="text" name="pass" placeholder="ID Number" id='id' required/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-credit-card" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="email" name="email" placeholder="Email" id='email' required/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>	
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" >
							Next
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
    </>

	: container == 2 ?<>
    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={image} alt="IMG"/>
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title" >
						Verify OTP
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="text" name="otp" placeholder="OTP" id='otp' ref={inpRef}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-credit-card" aria-hidden="true"></i>
						</span>
					</div>

					<div className="container-login100-form-btn" style={{padding:'0px'}}>
						<button className="login100-form-btn" onClick={e=>submitHandler(e,"verify")} disabled={!disabled}>
							Verify
						</button>
					</div>

				</form>
			</div>
		</div>
	</div>
    </> : <>
    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={image} alt="IMG"/>
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title" >
						Upload Your DP
					</span>
					<div className="wrap-input100 validate-input" data-validate = "Password is required" style={{paddingTop:"9px",marginTop:"22px",textAlign:"center"}}>
						<input className="input100" type="file" name="pass" placeholder="ID Number" id='dp'/>
					</div>
					<div className="container-login100-form-btn" style={{padding:'0px'}}>
						<button className="login100-form-btn" onClick={e=>submitHandler(e,"register")}>
							Upload
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
    </>}</>
  )
}

export default Register