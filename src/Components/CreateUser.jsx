import React, {useState,useEffect} from 'react';
import Table from './Table';
import validate from './validate';
function CreateUser(props) {
  const [newUser, setNewUser] = useState({
    id: "",
    name: '',
    age:'',
    address:'',
    phone:''
  })
  // const storageUser = JSON.parse(localStorage.getItem("user"));
  const[newForm,setNewForm]=useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});    
  const [flag,setFlag] = useState(false)
  const [checkUpdate,setCheckUpdate] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  }
  console.log(newUser)
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setErrors(validate(newUser));
    // debugger
    setIsSubmit(true);    
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      if(checkUpdate){
        const newdata1= {        
          ...newUser,
          'id': Math.floor(Math.random() * 10000)
        };
        
        const newdata = [...newForm, newdata1]; 
        // localStorage.setItem("user", JSON.stringify(newdata));
        setNewForm(newdata);
        handleCleatForm();
        // setCheckUpdate(true)
       
      }
      else{
        [...newForm].map((user) =>{
          if(user.id===newUser.id){
            user.name = newUser.name;
            user.address = newUser.address        
            user.age = newUser.age        
            user.phone = newUser.phone       
          }
        }      
        );
        // localStorage.setItem("user", JSON.stringify([...newForm]));
        setNewForm([...newForm]);
        setCheckUpdate(true);
        handleCleatForm()        
      }
    }
  },[errors]);

  const handleCleatForm = () => {
    setNewUser({
      id: "",
      name: '',
      age:'',
      address:'',
      phone:''
    })
  }

  const removeData = (id) => {
    const removeArr = [...newForm].filter((us) => us.id !== id);
    // localStorage.setItem("user", JSON.stringify(removeArr));
    setNewForm(removeArr);
  };

  const updateUser = (id, newdata) => {
     [...newForm].map((user) =>{
      if(user.id===id){
        user.name = newdata.name;
        user.address = newdata.address
      }
    }      
    );
    // localStorage.setItem("user", JSON.stringify([...newForm]));
    setNewForm([...newForm]);
  };

  const UpdateUser2 = (id) => {

    const newArr = [...newForm].filter((e)=>e.id===id);
    
    setNewUser(...newArr);
   
    setFlag(true)

    setCheckUpdate(false)
  }
  console.log(newUser)

  return (
    <div className="container">
      <div className="float-start" style={{width:'50%'}}>
        <Table          
          list={newForm}
          removeData={removeData}
          updateUser={updateUser}
          getID={UpdateUser2}
        />
        <button 
        className='btn btn-primary' 
        style={{marginLeft:'25%'}}
        onClick={() => setFlag(!flag)}
        >Create user</button>
      </div>
      
      {flag ?
        (
          <div>
             
      <div className="float-end shadow round" style={{width:'40%'}}>
        <form>       
        <br/>
        <br/>
        <div className="form-group d-flex">
          <label htmlFor="userName" style={{marginTop:'7px', marginRight:'30px',marginLeft:'30px',fontWeight:'600'}}>Name</label>
          <div className="input">
            <input
              id = 'userName'
              type='text'
              className = {`form-control ${errors.name && 'is-invalid'}`}
              name ='name'
              placeholder='Enter your name'
              value={newUser.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
        </div>
        <br/>
        <div className="form-group d-flex">
          <label htmlFor="ageId" style={{marginTop:'7px', marginRight:'46px',marginLeft:'30px',fontWeight:'600'}}>Age</label>
          <div className="input">
            <input
              id = 'ageId'
              type='text'
              className = {`form-control ${errors.age && 'is-invalid'}`}
              name ='age'
              placeholder='Enter your Age'
              value={newUser.age}
              onChange={handleChange}
            />
            {errors.age && <p className="text-danger">{errors.age}</p>}
          </div>
        </div>
        <br/>
        <div className="form-group d-flex">
          <label htmlFor="addressId" style={{marginTop:'7px', marginRight:'17px',marginLeft:'30px',fontWeight:'600'}}>address</label>
          <div className="input">
            <input
              id = 'addressId'
              type='text'
              className = {`form-control ${errors.address && 'is-invalid'}`}
              name ='address'
              placeholder='Enter your address'
              value={newUser.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-danger">{errors.address}</p>}
          </div>
        </div>
        <br/>
        <div className="form-group d-flex">
          <label htmlFor="phoneId" style={{marginTop:'7px', marginRight:'26px',marginLeft:'30px',fontWeight:'600'}}>Phone</label>
          <div className="input">
            <input
              id = 'phoneId'
              type='text'
              className = {`form-control ${errors.phone && 'is-invalid'}`}
              name ='phone'
              placeholder='Enter your phone'
              value={newUser.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}
          </div>
        </div>
        <br/>
        <button onClick={handleSubmit} className='btn btn-success' style={{marginLeft:'150px'}}>{checkUpdate ? 'Create':'Update'}</button>
        <br/>
        <br/>
        </form>
      </div>     
          </div>
        )
        :(<></>)
      }
    </div>
    
  )
}

export default CreateUser
