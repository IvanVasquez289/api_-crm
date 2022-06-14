import React from 'react'
import { Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
const Formulario = () => {

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
  const handleSubmit = (valores) => {
    console.log(valores)
  }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar cliente</h1>
        
        <Formik
            initialValues={{
                nombre:'',
                empresa:'',
                email:'',
                telefono:'',
                notas:''
            }}

            onSubmit={(values)=>{
                handleSubmit(values)
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
                        value="Agregar Cliente"
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                    />
                </Form>
                )
            }}
        </Formik>
    </div>
  )
}

export default Formulario