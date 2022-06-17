import React from 'react'
import { Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'
const Formulario = ({cliente, cargando}) => {
  const navigate = useNavigate()
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
                .min(3, 'El nombre es muy corto')
                .max(12, 'El nombre es muy largo')
                .required('El nombre del cliente es obligatorio') ,
    empresa: Yup.string()       
                .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
                .email('Email no valido')
                .required('El email es obligatorio')
                .required('El nombre de la empresa es obligatorio'),
    telefono: Yup.number()
                .positive('Numero no valido')
                .integer('Numero no valido')
                .typeError('El numero no es valido')
                
  })    

//   Este handle solo funciona cuando pasa damos submit y la validacion es correcta
  const handleSubmit = async (valores) => {
    // console.log(valores)
    let respuesta;
    try {
      if(cliente.id){
        // Actualizar Registro
        const url = `http://localhost:4000/clientes/${cliente.id}`

        respuesta = await fetch(url,{
            method: 'PUT',
            body: JSON.stringify(valores),
            headers: {
                'Content-Type': 'application/json'
            }
        })
   
      } else {
        // Nuevo Registro
        const url = 'http://localhost:4000/clientes'

        respuesta = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(valores),
            headers: {
                'Content-Type': 'application/json'
            }
        })
       
      }
    } catch (error) {
        console.log(error)
    }


    const resultado = await respuesta.json()
    console.log(resultado)

    navigate('/clientes')
  }

  return (
    cargando ? <Spinner/> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'> {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} </h1>
            
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa:cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm} )=>{
                    await handleSubmit(values)

                    resetForm()
                }}

                validationSchema={nuevoClienteSchema}
            >   
                {({errors, touched})=> {
                    // console.log(touched)
                    // console.log(errors)
                    return(
                        <Form className='mt-10'>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='nombre'>Nombre:</label>
                            <Field
                                id='nombre'
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-100'
                                placeholder= 'Nombre del cliente'
                                name='nombre'
                            />
                        {errors.nombre && touched.nombre ? (
                            <Alerta> {errors.nombre} </Alerta>
                        ): null }
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='empresa'>Empresa:</label>
                            <Field
                                id='empresa'
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-100'
                                placeholder= 'Empresa del cliente'
                                name='empresa'
                            />
                            {errors.empresa && touched.empresa ? (
                            <Alerta> {errors.empresa} </Alerta>
                            ): null }
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='email'>E-mail:</label>
                            <Field
                                id='email'
                                type='email'
                                className='mt-2 block w-full p-3 bg-gray-100'
                                placeholder= 'Email del cliente'
                                name='email'
                            />
                            {errors.email && touched.email ? (
                            <Alerta> {errors.email} </Alerta>
                            ): null }
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='tel'>Telefono:</label>
                            <Field
                                id='tel'
                                type='tel'
                                className='mt-2 block w-full p-3 bg-gray-100'
                                placeholder= 'Telefono del cliente'
                                name='telefono'
                            />
                            {errors.telefono && touched.telefono ? (
                            <Alerta> {errors.telefono} </Alerta>
                            ): null }
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='notas'>Notas:</label>
                            <Field
                                as='textarea'
                                id='notas'
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-100 h-40'
                                placeholder='Notas del cliente'
                                name='notas'
                            />
                        </div>

                        <input 
                            type="submit" 
                            value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer'
                        />
                    </Form>
                    )
                }}
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false

}
export default Formulario