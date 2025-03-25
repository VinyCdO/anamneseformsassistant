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
  padding: 0px 10px 0 10px;    
  height: 100px;
  width: 90vw;    

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding-top: 20px;
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

  @media (max-width: 768px) {
    margin: 0px;    
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: max(30%, 300px);
  background-color: #fff;
  color: rgba(43, 41, 37, 0.56);
  margin-right: 20px;
  min-width: max-content;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    margin-right: 0;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #D4AF27;     
  font-weight: 400;    
  padding-top: 20px;  

  @media (max-width: 768px) {
    padding-top: 0px;    
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

const DivFilterArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  

  @media (max-width: 768px) {
    margin-top: 20px;
    flex-direction: column;    
    wrap: wrap;
  }
`;

const DivActionsArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RadioButton = styled.input`
  cursor: pointer;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(43, 41, 37, 0.56);
  border-radius: 50%;
  background-color: white;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #D4AF27;
    border-color: rgba(43, 41, 37, 0.56);
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    margin-left: 20px;
  }
`;

const Label = styled.label`
  font-size: 0.8rem;
  color:rgba(43, 41, 37, 0.56);   
  font-weight: 600;
  text-align: left;
  display: inline-block;
  min-width: max-content;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    margin-right: 0;
  }
`;

function Search () {
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchFutureDates, setSearchFutureDates] = useState(false);
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
        const data = await getAnamneseFormByName(searchName);
        setAnamneseForms(data);

        if (searchDate) {
          const selectedDate = new Date(searchDate);
          const filteredForms = data.filter(
            (form) => new Date(form.data) >= selectedDate              
          );

          setAnamneseForms(filteredForms);
        }

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

  const handleChangeAtendimentosFuturos = () => {
    setSearchFutureDates(!searchFutureDates);

    if (!searchFutureDates) {
      const currentDate = new Date().toISOString().split('T')[0];
      setSearchDate(currentDate);
      document.getElementById('filterDate')?.setAttribute('disabled', 'true');
    } else {
      setSearchDate('');
      document.getElementById('filterDate')?.removeAttribute('disabled');
    }

    
  }
  
  if (isLoading) {
    return (      
      <Container>
        <Header>
          <Logo
            src={businessLogo}
            alt="Logo Alice Ribeiro Estética"
          />        
          <Title>PESQUISA</Title>            
        </Header>

        <Divider />

        <DivFilterArea>
          <Input
            type="text"
            placeholder="Digite o nome para pesquisa"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <DivActionsArea>
            <Input
              type="date"
              placeholder="Data inicial"
              style={{ maxWidth: '115px' }}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />          
            <RadioButton type="checkbox" name="filterFutureDates" checked={searchFutureDates} onChange={() => handleChangeAtendimentosFuturos()} />
            <Label>Atendimentos Futuros</Label>
          </DivActionsArea>
          <DivActionsArea>
            <Button onClick={handleFilter}>Filtrar</Button>
            <Button onClick={handleNavAnamneseForm} style={{ marginLeft: '20px', backgroundColor: '#e8b8d1' }}>Nova</Button>
          </DivActionsArea>
        </DivFilterArea>
        
        <DivFilterArea>
          <img src="https://i.gifer.com/ZZ5H.gif" alt="Carregando..." style={{ width: '100px', height: '100px' }} />
        </DivFilterArea>
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
        <Title>PESQUISA</Title>            
      </Header>
      
      <Divider />

      <DivFilterArea>
        <Input
          type="text"
          placeholder="Digite o nome para pesquisa"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <DivActionsArea>
          <Input
            id='filterDate'
            type="date"
            placeholder="Data inicial"
            style={{ maxWidth: '115px' }}
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <RadioButton type="checkbox" name="filterFutureDates" checked={searchFutureDates} onChange={() => handleChangeAtendimentosFuturos()} />
          <Label>Atendimentos Futuros</Label>
        </DivActionsArea>
        <DivActionsArea>
          <Button onClick={handleFilter}>Filtrar</Button>
          <Button onClick={handleNavAnamneseForm} style={{ marginLeft: '20px', backgroundColor: '#e8b8d1' }}>Nova</Button>
        </DivActionsArea>
      </DivFilterArea>

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