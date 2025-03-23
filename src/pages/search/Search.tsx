import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import businessLogo from '../../assets/AliceRibeiroLogo.png'
import { getAnamneseForms, getAnamneseFormByName, deleteAnamneseFormById } from '../../services/anamneseApi'; 
import { IAnamneseForm } from '../../interfaces/IAnamneseForm';
import { FcSearch, FcDownload } from "react-icons/fc";
import { IoIosAttach } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import ModalAddForm from '../../forms/ModalAddForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  background-color:hsl(330, 100.00%, 98.40%);
  min-height: 100vh;
  height: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #f5d0e3;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #e8b8d1;
  }

  ::-webkit-scrollbar-track {
    background-color: #f9f9f9;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;    
  padding: 20px 10px 10px 10px;    
  height: min-content;
  width: 90vw;    

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 5px;
  }  
`;

const Logo = styled.img`
  border-radius: 30%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);    
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #D4AF27; 
  margin: 15px 0;
  width: 90vw;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: max(30%, 300px);
  background-color: #fff;
  color: rgba(43, 41, 37, 0.56);

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color:rgb(207, 189, 121);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color:rgb(228, 181, 13);
  }
    
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ListContainer = styled.div`
  margin-top: 20px;
  width: 90vw;
  overflow: auto;
  max-height: 80vh;
  border: 1px solid #ccc; 
  border-radius: 4px;
  background-color: #fff;
  color: rgba(43, 41, 37, 0.56)
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  background-color:rgb(245, 208, 227);
`;

const TableRow = styled.tr<{ key: string, isOdd: boolean }>`  
  &:hover {
    background-color: #f0f0f0;
  }
  background-color: ${(props) => (props.isOdd ? '#ffffff' : '#fff7fb')};
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const TableCellActions = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  width: 1%;
  white-space: nowrap;
  text-align: center;
`;

const ActionButton = styled.button`
  padding: 5px 5px;
  border: none;
  border-radius: 30%;
  cursor: pointer;
  background-color: transparent;
  color: #aaa;
  &:hover {    
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);    
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function Search () {
  const [searchTerm, setSearchTerm] = useState('');
  const [anamneseForms, setAnamneseForms] = useState<IAnamneseForm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAnamneseForms();
        setAnamneseForms(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAnamneseFormByName(searchTerm);
        setAnamneseForms(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();      
  };

  const handleViewRecord = (id: string) => {
    navigate(`/AnamneseForm/${id}`);
  };

  const handleDownload = (link: string) => {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.download = 'formulario_assinado';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDelete = async (id: string) => {
    try {        
      await deleteAnamneseFormById(id);      
      handleFilter();      
    } catch(error) {        
      console.error(error);
    }    
  }

  const handleOpenModal = (id: string) => {
    setSelectedFormId(id); 
    setModalVisible(true); 
  };

  const handleCloseModal = () => {
    setSelectedFormId(null); 
    setModalVisible(false); 
    handleFilter();
  };
  
  if (isLoading) {
    return (      
      <Container>
        <Header>
          <Logo
            src={businessLogo}
            alt="Logo Alice Ribeiro Estética"
          />          
          <Input
            type="text"
            placeholder="Digite o nome para pesquisa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <Button onClick={handleFilter}>Filtrar</Button>
            <Button onClick={handleNavAnamneseForm} style={{ marginLeft: '20px', backgroundColor: '#e8b8d1' }}>Nova</Button>
          </div>
        </Header>

        <Divider />

        <img src="https://i.gifer.com/ZZ5H.gif" alt="Carregando..." style={{ width: '100px', height: '100px' }} />
      </Container>
    );
  }  

  function handleNavAnamneseForm(): void {
    navigate('/AnamneseForm');
  }

  return (
    <Container>
      <Header>
        <Logo
          src={businessLogo}
          alt="Logo Alice Ribeiro Estética"
        />
        <Input
          type="text"
          placeholder="Digite o nome para pesquisa"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Button onClick={handleFilter}>Filtrar</Button>
          <Button onClick={handleNavAnamneseForm} style={{ marginLeft: '20px', backgroundColor: '#e8b8d1' }}>Nova</Button>
        </div>
      </Header>
      
      <Divider />

      <ListContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Data</TableHeader>
              <TableHeader>Ações</TableHeader>
            </tr>
          </thead>
          <tbody>
            {anamneseForms.map((form, index) => (
              <TableRow key={form._id.$oid} isOdd={index % 2 === 0}>
                <TableCell>{form.nome}</TableCell>
                <TableCell>{new Date(form.data).toISOString().split('T')[0].split('-').reverse().join('/')}</TableCell>
                <TableCellActions>
                    <ActionButton onClick={() => handleViewRecord(form._id.$oid)}>
                      <FcSearch size={16} />
                    </ActionButton> 
                    <ActionButton onClick={() => handleOpenModal(form._id.$oid)}>
                      <IoIosAttach size={16} />
                    </ActionButton>                                   
                    <ActionButton 
                      onClick={() => handleDownload(form.formularioAssinado)} 
                      disabled={!form.formularioAssinado}
                    >
                      <FcDownload size={16} />
                    </ActionButton> 
                    <ActionButton onClick={() => handleDelete(form._id.$oid)}>
                      <AiTwotoneDelete size={16} />
                    </ActionButton>
                </TableCellActions>
              </TableRow> 
            ))}
          </tbody>
        </Table>
      </ListContainer>

      {modalVisible && selectedFormId && (
        <ModalAddForm
          formId={selectedFormId}
          visible={modalVisible}
          onClose={handleCloseModal}
          onSave={handleCloseModal}
        />
      )}

    </Container>
  );
};

export default Search;