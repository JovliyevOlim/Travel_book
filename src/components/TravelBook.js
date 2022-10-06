import React from 'react';
import axios from "axios";
import {useEffect,useState} from "react";
import {Link} from "react-router-dom";

function TravelBook(props) {

    const [travelBook,setTravelBook] =useState([])

     async function fetchData(){
         const  {data} = await  axios.get("http://localhost:5000/api/travel")
            setTravelBook(data.travels)
        }

        async  function deleteHandler(id){

                await axios.delete(`http://localhost:5000/api/travel/${id}`)
        }

    useEffect(()=>{
            fetchData()
    },[])



    return (
        <div>
            {
                travelBook.map(item=>(
                    <div key={item._id} className="card mb-3 mt-3">
                        <img src={item.image} className="card-img-top" alt={item.title}/>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.descr}</p>
                            <div className={'d-flex justify-content-start'}>
                                <Link className={'btn btn-primary'} to={`/update/${item._id}`}>Edit</Link>
                                <form onSubmit={()=>deleteHandler(item._id)}>
                                    <button type={'submit'} className={'btn btn-danger mx-2'}>Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    );
}

export default TravelBook;
