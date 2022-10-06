import React from 'react';
import axios from "axios";
import {useState,useEffect} from 'react';
import {useNavigate,useParams} from "react-router-dom";
function UpdateBook() {

    const [title,setTitle] = useState('')
    const [descr,setDescr] = useState('')
    const [image,setImage] = useState('')
    const param = useParams()
    const navigate = useNavigate()
    useEffect(()=>{


         fetchdata()
    },[])


    async function fetchdata (){
        const  {data} = await axios.get(`http://localhost:5000/api/travel/${param.id}`)
        console.log(data.travel)
        setTitle(data.travel.title)
        setDescr(data.travel.descr)
        setImage(data.travel.image)
    }



    async function  editHandler(e){
        e.preventDefault()
        await axios.put(`http://localhost:5000/api/travel/${param.id}`,{title,descr,image})
        navigate('/')
    }

    return (
        <form onSubmit={editHandler}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    name={'title'}
                    value={title}
                    onChange={e=>setTitle(e.target.value)}

                />
            </div>
            <div className="mb-3">
                <label htmlFor="descr" className="form-label">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="descr"
                    name={'descr'}
                    value={descr}
                    onChange={e=>setDescr(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image URL</label>
                <input
                    type="text"
                    className="form-control"
                    id="image"
                    name={'image'}
                    value={image}
                    onChange={e=>setImage(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default UpdateBook;
