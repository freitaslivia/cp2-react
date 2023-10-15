import "./ModalExcluir.scss";

export default function ModalExcluir(props) {

  const handleExclude = () => {
 
     const handleExclude = fetch(`http://localhost:5000/produtos/${props.produto.id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
       },
     });
 
     if (!handleExclude.ok) {
       console.log("Erro ao excluir produto");
     }
     console.log("Produto excluído com sucesso");
     location.reload();
  };
 
  if (props.openExcluir) {
     return (
       <div className="Modal-excluir">
         <h1>Excluir Produto</h1>
         <div>
           <p>Nome : {props.produto.nome}</p>
           <p>Desc : {props.produto.desc}</p>
           <p>Valor : {props.produto.valor}</p>
           <p>Id : {props.produto.id}</p>
         </div>
         <div>
           <button onClick={handleExclude}>Excluir</button>
           <button onClick={() => props.setOpenExcluir(false)}>Cancelar</button>
         </div>
       </div>
     );
  }
 }