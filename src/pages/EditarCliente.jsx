import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Formulario from "../components/Formulario";
import Spinner from "../components/Spinner";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado);
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(!cargando);
      }, 1000);
    };

    obtenerClienteApi();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar datos de un cliente
      </p>

      {cargando ? <Spinner/> : cliente?.nombre? (
          <Formulario 
            cliente = {cliente}
            cargando = {cargando}
          />

      ) :<p>Cliente ID no valido</p> }

    </>
  );
};

export default EditarCliente;
