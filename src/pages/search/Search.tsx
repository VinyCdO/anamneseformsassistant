import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import businessLogo from '../../assets/AliceRibeiroLogo.png'
import { getAnamneseForms, getAnamneseFormByName } from '../../services/anamneseApi'; 
import { IAnamneseForm } from '../../interfaces/IAnamneseForm';

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
  }  
`;

const Logo = styled.img`
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);    

  @media (max-width: 768px) {
    display: block;    
    align-self: center;
    margin: 20px 0px 20px 0px;
  }
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
    margin: 10px;
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

const ActionButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  background-color: rgb(207, 189, 121);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(228, 181, 13);
  }
`;

function Search () {
  const [searchTerm, setSearchTerm] = useState('');
  const [anamneseForms, setAnamneseForms] = useState<IAnamneseForm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  if (isLoading) {
    return (      
      <Container>
        <Header>
          <Logo src={businessLogo} alt="Alice Ribeiro Estética" />
          <Input
            type="text"
            placeholder="Digite o nome para pesquisa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleFilter}>Filtrar</Button>
        </Header>

        <Divider />

        <img src="https://i.gifer.com/ZZ5H.gif" alt="Carregando..." style={{ width: '100px', height: '100px' }} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Logo src={businessLogo} alt="Alice Ribeiro Estética" />
        <Input
          type="text"
          placeholder="Digite o nome para pesquisa"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleFilter}>Filtrar</Button>
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
                <TableCell>{new Date(form.data).toLocaleDateString()}</TableCell>
                <TableCell>
                    <ActionButton onClick={() => handleViewRecord(form._id.$oid)}>
                    Visualizar
                    </ActionButton> 
                </TableCell>
              </TableRow> 
            ))}
          </tbody>
        </Table>
      </ListContainer>
    </Container>
  );
};

export default Search;