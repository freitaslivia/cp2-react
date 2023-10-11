import { GrFormEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Fill as Excluir } from "react-icons/ri";
import style from "./Produtos.module.css";
import { useEffect, useState } from "react";
import "./Produtos.scss";
import ModalInserir from "../components/ModalInserir/ModalInserir";

export default function Produtos() {
  document.title = "Produtos";

  const [listaProdutoExterna, setListaProdutoExterna] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/produtos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListaProdutoExterna(data);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <div>
      <h1>LISTA DE PRODUTOS</h1>

      {open ? <ModalInserir open={open} setOpen={setOpen} /> : ""}

      <table className={style.tblEstilo}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>DESCRIÇÃO</th>
            <th>PREÇO</th>
            <th>EDITAR / EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {listaProdutoExterna.map((item, indice) => (
            <tr key={indice} className={style.tblLine}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.desc}</td>
              <td>{item.valor}</td>
              <td>
                <button>
                  <Editar />
                </button>
                <button>
                  <Excluir />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>PRODUTOS LINDOS</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}