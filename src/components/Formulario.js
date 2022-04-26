import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase'

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido ] = useState('')
    const [edad, setEdad] = useState('')
    const [direccion,setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [data, setData] = useState([])
    const [foto, setFoto] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    useEffect(()=>{

        const obtenerDatos = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('registro').get()
                const array = data.docs.map(item =>(
                    {
                        id:item.id, ...item.data()
                    }
                ))
                setData(array)

            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos()

    })

    const fotos = async () => {
        try {
            const res = await fetch('https://picsum.photos/200')
            setFoto(res.url)
        } catch (error) {
            
        }
    }

    const insertar = async (e) =>{
        e.preventDefault()
        fotos()

        if(!nombre.trim()){
            setError('Campo nombre vacío')
            return
        }

        if(!apellido.trim()){
            setError('Campo apellido vacío')
            return
        }

        if(!edad.trim()){
            setError('Campo edad vacío')
            return
        }

        if(!direccion.trim()){
            setError('Campo direccion vacío')
            return
        }

        if(!telefono.trim()){
            setError('Campo telefono vacío')
            return
        }

        try{
            const db = firebase.firestore()
            const nuevaData = {
                nombrenombre:nombre,
                nombreapellido:apellido,
                nombreAño:edad,
                nombredireccion:direccion,
                nombretelefono:telefono
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
        setModoEdicion(false)
        setError(null)
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
    

    const editar = (item) =>{
        setNombre(item.nombrenombre)
        setApellido(item.nombreapellido)
        setEdad(item.nombreAño)
        setDireccion(item.nombredireccion)
        setApellido(item.nombretelefono)
        setModoEdicion(true)
        setId(item.id)
    }

    const editarRegistro = async e =>{
        e.preventDefault()

        
       
        if(!nombre.trim()){
            setError('Campo nombre vacío')
            return
        }

        if(!apellido.trim()){
            setError('Campo apellido vacío')
            return
        }

        if(!edad.trim()){
            setError('Campo edad vacío')
            return
        }

        if(!direccion.trim()){
            setError('Campo direccion vacío')
            return
        }

        if(!telefono.trim()){
            setError('Campo telefono vacío')
            return
        }
       
        try{
            const db= firebase.firestore()
            await db.collection('registro').doc(id).update({
                nombrenombre: nombre,
                nombreapellido: apellido,
                nombreAño:edad,
                nombredireccion:direccion,
                nombretelefono:telefono
            })

           
        }catch(error){
            console.log(error)
        }
        setNombre('')
        setApellido('')
        setEdad('')
        setDireccion('')
        setTelefono('')
        setModoEdicion(false)
        setError(null)

    }

    const cancelar =()=>{
        setNombre('')
        setApellido('')
        setEdad('')
        setDireccion('')
        setTelefono('') 
        setModoEdicion(false)
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Registro Usuarios</h1>
            <hr/>
            <div className='row'>

            <div>
                    <h4 className='text-center'> 
                    {
                        modoEdicion ? 'Editar registro': 'Agregar registro'
                    }
                    </h4>

                    <form onSubmit={modoEdicion ? editarRegistro: insertar}>
                    {
                     error ? <span className='text-danger'>{error}</span> : null
                    }
                    <div className='row'>
                        <div className='col-4'>
                         <label>Nombre</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese el nombre'
                            onChange={(e)=>setNombre(e.target.value)}
                            />
                        </div>

                        <div className='col-4'>
                         <label>Apellido</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese el apellido producción '
                            onChange={(e)=>setApellido(e.target.value)}
                            />
                            
                        </div>

                        <div className='col-4'>
                         <label>Edad</label>
                            <input
                            className='form-control mb-2'
                            type="number"
                            placeholder='Ingrese la edad producción '
                            onChange={(e)=>setEdad(e.target.value)}
                            />
                            
                        </div>

                        <div className='col-4'>
                         <label>Direccion</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese la direccion'
                            onChange={(e)=>setDireccion(e.target.value)}
                            />
                            
                        </div>

                        <div className='col-4'>
                         <label>Telefono</label>
                            <input
                            className='form-control mb-2'
                            type="number"
                            placeholder='Ingrese el telefono'
                            onChange={(e)=>setTelefono(e.target.value)}
                            />
                            
                        </div>

                       
                    </div>
                   
                     
                    {
                    !modoEdicion? (
                        <button className='btn btn-success btn-block' type='submit'>Insertar</button>
                     )
                     :
                     (  <>
                        <button className='btn btn-info btn-block' type='submit'>Editar</button>
                        <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                        </>
                     )
                    }

                </form>
                <br/>
                </div>

                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Direccion</th>
                            <th>Telefono</th>
                            <th>Foto</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(item => (
                            <tr>
                                <td>{item.nombrenombre}</td>
                                <td>{item.nombreapellido}</td>
                                <td>{item.nombreAño}</td>
                                <td>{item.nombredireccion}</td>
                                <td>{item.nombretelefono}</td>
                                <td><img src={item.foto} alt='img' height={40} width={40}/></td>
                                <td><button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button></td>
                                <td> <button className='btn btn-warning btn-sm float-end' onClick={()=> editar(item)} >editar</button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                
            </div>
        </div>
    )

}

export default Formulario


