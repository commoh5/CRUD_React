import React,{useState} from 'react';

function Table({list,removeData,updateUser,getID}) {
  const [edit, setEdit] = useState();
  const [submit, setSubmit] = useState(true);
  const [data, setData] = useState({
    id:'',
    name:'',
    address:'',
  })

  const handleChange = e =>{
    const {name,value} = e.target;
    setData({
      ...data,
      [name]:value
    });
  };
  //Display table
  const displayData = list.map((item)=>{
    return edit === item.id && submit ? (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>
        <input
          type="text"
          required=" required"
          placeholder="Enter your name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        </td>
        <td>
          <input
            type="text"
            required=" required"
            placeholder="enter your address"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
        </td>
        <td>
          <button 
            className='btn btn-primary'
            onClick={(e) => {
              e.preventDefault();
              updateUser(item.id, data);
              setSubmit(false);
              setData("");
            }}
            >
            <i className="fas fa-check"></i>
          </button>
        </td>
      </tr>        
    ) : (
      <tr key={item.id}>
        <th
          onClick={() => {
            setEdit(item.id);
            setSubmit(!submit);
          }}
        >{item.id}</th>
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>
          <div className='d-flex'>
            {/* btn update */}
            <button 
              className='btn btn-primary'
              onClick={()=>getID(item.id)}
              >
              <i className="far fa-edit"></i>
            </button>
            {/* //btn Delete */}
            <button 
              type="button"
              className='btn btn-danger'
              onClick={() => {
                if (window.confirm("delete item?")) {
                  removeData(item.id);
                }
                console.log(removeData);
              }} 
              style={{marginLeft:'7px'}}>
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  }) 
  
  return (
    <>
      <table className="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">address</th>
          <th scope="col">actions</th>
        </tr>
      </thead>
      <tbody>
        {displayData}
      </tbody>
      </table>
    </>
    
    
  )
}

export default Table
