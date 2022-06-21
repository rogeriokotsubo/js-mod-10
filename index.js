document.getElementById('btn-input').addEventListener('click', Save);
document.getElementById('btn-list').addEventListener('click', List);
document.getElementById('btn-cancel').addEventListener('click', Cancel);
const msg = document.querySelector('#msg');
let produtos = [];
let produto = {};
let id = 0;
let idSel = 0;
let newProduct = 1;
let valor = 0;
let nome = '';
let descricao = '';

function Save() {
  valor = parseFloat(document.querySelector('#value').value.replace(",", "."));
  nome = document.querySelector("#name").value.trim();
  descricao = document.querySelector("#description").value.trim();

  try {
    CheckValues();
  } catch (errorMsg) {
    msg.textContent=errorMsg;
    return false;
  } 

  try{
    if (newProduct===1){  // adding new product
        document.querySelector('#ctn-details').style.display='none';
        id += 1;
        produto = {
            id: id,
            nome: nome,
            descricao: descricao,
            valor: valor,
            incluidoEm: Date.now()        
        };
        produtos.push(produto);
        msg.textContent = `Produto ${produto.nome} incluído com sucesso`;
      } else {
      let i = 0;
      while (i < produtos.length){
        if (produtos[i].id===idSel){
          produtos[i].nome = nome;
          produtos[i].descricao = descricao;
          produtos[i].valor = valor;
          msg.textContent = `Produto ${produtos[i].nome} alterado com sucesso`;
          if (document.querySelector('#ctn-details').style.display==='block'){
            Show(i);
          } 
          break;         
        };
        i += 1;
      }

      List();
    }
  } catch (error){
    msg.textContent=error;
    return false;
  }
}  


function CheckValues(){
  if (isNaN(valor)){
    throw new Error(`Valor do produto inválido! (${valor})`);
  }
  if (valor<=0){
    throw new Error(`Valor do produto inválido! (${valor})`);
  }
  if (nome===''){
    throw new Error(`Nome do produto inválido!`);
  }
  if (descricao===''){
    throw new Error(`Descrição do produto inválido!`);
  }

  let i = 0;
  while (i < produtos.length){
    if (produtos[i].nome.toLowerCase()===nome.toLowerCase()){
      if (newProduct===1){
        throw new Error(`Já existe um produto cadastrado com este nome!`);
      } else if (produtos[i].id != idSel){
        throw new Error(`Já existe um produto cadastrado com este nome!`);
      }
      break;         
    };
    i += 1;
  }
}

function List(){
  if (produtos.length===0){
    document.querySelector('#ctn-table').style.display = 'none';
    msg.innerHTML = `Nenhum produto cadastrado`;
  } else {
    const tbl = document.querySelector('#tbl-products');
    tbl.innerHTML = `<tr> 
                        <th>Produto</th> 
                        <th>Valor</th>
                        <th>Editar</th>
                        <th>Apagar</th>
                    </tr>`
    let i = 0;
    while (i < produtos.length){                     
      tbl.innerHTML += `<tr> 
                          <td class="show-product" onclick="Show(${i})">${produtos[i].nome}</td> 
                          <td>${produtos[i].valor.toFixed(2)}</td>
                          <td class="edit-icon" onclick="Edit(${i})"><span class="material-icons">edit</span></td>
                          <td class="del-icon" onclick="Delete(${i})"><span class="material-icons">delete</span></td>
                        </tr>`
      i += 1;                  
    }
    document.querySelector('#ctn-table').style.display = 'block';
  }  
}

function Edit(Id){
  msg.innerHTML = `&nbsp`;
  newProduct = 0;
  idSel = produtos[Id].id;
  document.querySelector("#btn-input").textContent='Salvar produto';
  document.querySelector('#value').value = produtos[Id].valor;
  document.querySelector('#name').value = produtos[Id].nome;
  document.querySelector('#description').value = produtos[Id].descricao;

  if (document.querySelector('#ctn-details').style.display==='block'){
    Show(Id);
  }  
}

function Delete(Id){
  let produtosTmp = [];
  i = 0;
  while (i < produtos.length){
    if (i!=Id){
      produtosTmp.push(produtos[i]);
    }  
    i += 1;
  } 
  produtos = [];
  i = 0;
  while (i < produtosTmp.length){
    produtos.push(produtosTmp[i]);
    i += 1;
  } 
  Cancel();
  List();
}

function Show(Id){
  const detail = document.querySelector('#tbl-details');
  const date = new Date(produtos[Id].incluidoEm);

  detail.innerHTML = `<tr> 
                        <th colspan="2">Informações do Produto</th> 
                      </tr>
                      <tr> 
                        <th>Id</th>
                        <td>${produtos[Id].id}</td> 
                      </tr>
                      <tr>  
                        <th>Nome</th>
                        <td>${produtos[Id].nome}</td> 
                      </tr>
                      <tr>  
                         <th>Descrição</th>
                         <td>${produtos[Id].descricao}</td>  
                      </tr>
                      <tr>  
                         <th>Valor</th>
                         <td>${produtos[Id].valor.toFixed(2)}</td>
                      </tr>
                      <tr>  
                        <th>Incluído Em</th>
                        <td>${date.toLocaleDateString()} - ${date.toLocaleTimeString()}</td>
                      </tr>`               
  
  document.querySelector('#ctn-details').style.display = 'block';
}


function Cancel(){
  newProduct = 1;
  msg.innerHTML = `&nbsp`;
  document.querySelector('#value').value='';
  document.querySelector("#name").value='';
  document.querySelector("#description").value='';
  document.querySelector("#btn-input").textContent='Incluir produto';
  document.querySelector('#ctn-details').style.display = 'none';
}
