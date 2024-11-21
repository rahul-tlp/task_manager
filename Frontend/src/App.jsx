import { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './assets/EmployeeData';
import axios from "axios";

console.log(EmployeeData);

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [ids, setIds] = useState(null);

  const getDta = () => {
    axios
      .get("http://localhost:8000/tasks")
      .then((res) => {
        setData(res.data);
      })
  };
  useEffect(() => {
    getDta();
  }, []);

  const submit = () => {
    axios
      .post("http://localhost:8000/tasks/", { title,description,status })
      .then(()=>{
        getDta()
      })
      .then(handleClear())
     
  };

  const handleEdit = (data) => {
    
    if (data != undefined) {
      setIsUpdate(true)
      setTitle(data.title)
      setDescription(data.description)
      setStatus(data.status)
      setIds(data._id);
      console.log(data._id);
      
    }
  }

  const handleUpdate = () =>{  
    axios
      .put(`http://localhost:8000/tasks/${ids}`, { title,description,status })
      .then(()=>{
        getDta()
      })
      .then(handleClear())
  }
  
  const handleClear = () => {
    setIsUpdate(false)
    setTitle('')
    setDescription('')
    setStatus('')
  }

  const handleDelete = (id) => {
    if(id) {
      if (window.confirm("Are you sure you want to delete this")) {
        axios.delete("http://localhost:8000/tasks/" + id)
        .then(() => {
          getDta();
        });
      }
    }
    
  };

  return (
    <div className="App">

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '0 10px' }}>
          <label>Title:
            <input
              type="text"
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div style={{ margin: '0 10px' }}>
          <label>Description:
            <input
              type="text"
              value={description}
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div style={{ margin: '0 10px' }}>
          <label>State:
            <input
              type="text"
              value={status}
              placeholder="Enter State"
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
        </div>

        {
          !isUpdate ?
          <button
            className="btn btn-primary"
            onClick={() => submit()}
            style={{ marginLeft: '10px' }}
          >
            Save
          </button> 
          :
          <button
            className="btn btn-primary"
            onClick={() => handleUpdate()}
            style={{ marginLeft: '10px' }}
          >
            update
          </button>
        } 
        
        
        <button
          className="btn btn-primary"
          onClick={() => handleClear()}
          style={{ marginLeft: '10px' }}
        >
          Clear
        </button>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <td>Sr. No</td>
            <td>Title</td>
            <td>Description</td>
            <td>
              <select style={{padding:"3px",textAlign:"center", border:"none"}}>
              <option >Staus</option>
                <option value="pending">Complete</option>
                <option value="complete">Pending</option>
              </select>
            </td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className='btn btn-primary' onClick={()=> handleEdit(item)}>Edit</button>
                    <button className='btn btn-danger' onClick={()=> handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
