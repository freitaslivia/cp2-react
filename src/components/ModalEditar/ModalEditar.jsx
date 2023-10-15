import { useState, useEffect } from "react";
import "../ModalInserir/ModalInserirEditar.scss";

export default function ModalEditar(props) {
  const [produto, setProduto] = useState({
    id: "",
    nome: "",
    desc: "",
    valor: "",
  });

  useEffect(() => {
    if (props.produto) {
      setProduto(props.produto);
    }
  }, [props.produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/produtos/${produto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
       
        props.setOpenEditar(false);

        location.reload();
      })
      .catch((error) => console.log(error));
  };

  if (props.openEditar) {
    return (
      <div className="Modal">
        <h1>Editar Produto</h1>

        <button onClick={()=> props.setOpenEditar(false)}>X</button>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome do Produto:</label>
            <input type="text" id="nome" name="nome" value={produto.nome} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="desc">Descrição do Produto:</label>
            <input type="text" id="desc" name="desc" value={produto.desc} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="valor">Valor do Produto:</label>
            <input type="text" id="valor" name="valor" value={produto.valor} onChange={handleChange}/>
          </div>
          <div>
          <button type="submit">Salvar</button>
          </div>       
        </form>
      </div>
    );
  }
}
