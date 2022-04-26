
import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase'

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido ] = useState('')
    const [edad, setEdad] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [data, setData] = useState([])

    useEffect(()=>{

        const obtenerDatos = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('registro').get()
                const array = data.docs.map(item =>(
                    {
                    id:item.id,...item.data()
                    }
                ))
                setData(array)

            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos()

    })

    const insertar = async (e) =>{
        e.preventDefault()

        try{
            const db = firebase.firestore()
            const nuevaData = {
                nombrenombre:nombre,
                nombreapellido:apellido,
                nombreAño:edad,
                nombredireccion:direccion,
                nombretelefono:telefono,
            }
            await db.collection('registro').add(nuevaData)
            setData([...data,
                {
                    nombrenombre: nombre,
                    nombreapellido: apellido,
                    nombreAño:edad,
                    nombredireccion:direccion,
                    nombretelefono:telefono
                }
            ])
        }catch(error){
            console.log(error)
        }

        setNombre('')
        setApellido('')
        setEdad('')
        setDireccion('')
        setTelefono('')
    }

    const eliminar= async (id) =>{
        try{
            const db = firebase.firestore()
            await db.collection('registro').doc(id).delete()
            const aux = data.filter(item => item.id !== id)
            setData(aux)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Registro Usuarios</h1>
            <hr/>
            <div className='row'>

            <div>
                    <h4 className='text-center'>Insertar</h4>
                    <form onSubmit={insertar}>
                    <input
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese nombre'
                    onChange={(e)=>setNombre(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese apellido'
                    onChange={(e)=>setApellido(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="number"
                    placeholder='Ingrese edad'
                    onChange={(e)=>setEdad(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese direccion'
                    onChange={(e)=>setDireccion(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese telefono'
                    onChange={(e)=>setTelefono(e.target.value)}
                    />
                    <button type='submit'>Agregar</button>

                </form>
                </div>

                <div className="col text-center">
                    <h4 className="text-center">Listado nombres</h4>
                    <ul className="col-sm- list-group">
                    {
                        data.map((item, index)=>(
                            <li className='list-group-item' key={index}>
                                <span className='lead'>
                                    {item.nombrenombre} - 
                                    {item.nombreapellido} -
                                    {item.nombreAño} -
                                    {item.nombredireccion} -
                                    {item.nombretelefono} -
                                    </span>
                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button>
                                <button className='btn btn-warning btn-sm float-end' >editar</button>
                            </li>
                        ))
                    }
                    </ul>
                </div>

            </div>
        </div>
    )

}

export default Formulario