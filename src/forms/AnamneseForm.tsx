import { useState } from 'react'
import businessLogo from '../assets/AliceRibeiroLogo.png'
import styled from "styled-components";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnamneseFormById } from '../services/anamneseApi';
import { IAnamneseForm } from '../interfaces/IAnamneseForm.ts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  background-color:rgb(255, 247, 251);
  min-height: 100vh;
  height: auto;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;    
  padding: 0px 10px 0 10px;    
  height: 100px;
  width: 90vw;    
`;

const Logo = styled.img`
  border-radius: 30%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);    
  cursor: pointer;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #D4AF27; 
  margin: 15px 0;
  width: 90vw;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #D4AF27;     
  font-weight: 400;
  padding-top: 20px;    
`;

const Label = styled.label`
  font-size: 0.8rem;
  color:rgba(43, 41, 37, 0.56);   
  font-weight: 600;
  text-align: right;
  display: inline-block;
  max-width: max-content;
  margin-right: 10px;
`;

const LabelRodape = styled.label`
  font-size: 1.3rem;
  color:rgba(43, 41, 37, 0.56);   
  font-weight: 600;
  text-align: center;
  display: inline-block;
`;

const Input = styled.input`
  border-radius: 5px;
  background-color:rgba(255, 255, 255, 0);
  border: none;
  border-bottom: 2px solid black;
  border-radius: 0;
  border-color:rgba(43, 41, 37, 0.56);
  color: black;
  width: max-auto;  
  margin-right: 20px;    
`;

const FormLineFourColumns = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 2fr;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  margin: 10px 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;    

const FormLineFiveColumns = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1fr 2fr;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  margin: 10px 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;    

const FormLineTwoColumns = styled.div`
  display: grid;
  grid-template-columns: 2fr 7fr;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  margin: 10px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    
  }
`;   

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 50px 0;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  color: black;
  gap: 10px;    
`;

const RadioButton = styled.input`
  margin-right: 10px;
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
`;

function AnamneseForm() {

  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<IAnamneseForm[]>([]);  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnamneseForm = async () => {      
      if (id) {
        try {
          setIsLoading(true);
          const data = await getAnamneseFormById(id);
          setFormData(data);
        } catch (error) {
          console.error("Error fetching anamnese form:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAnamneseForm();
  }, [id]);
  
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const updatedFormData = [...formData];
    if (updatedFormData.length === 0) {
      updatedFormData.push({} as IAnamneseForm);
    }
    updatedFormData[0] = { ...updatedFormData[0], [e.target.name]: e.target.value };
    setFormData(updatedFormData);
  };

  const handleRadioChange = (question: string, value: boolean) => {
    handleChange({ target: { name: question, value: value } });
  };

  function handleNavigateHome(): void {
    window.location.href = '/';
  }

  if (isLoading) {
    return (      
      <Container>
        <Header>
          <Logo src={businessLogo} alt="Alice Ribeiro Estética" onClick={() => handleNavigateHome()} />
          <Title>FICHA DE ANAMNESE</Title>
        </Header>
        
        <Divider />

        <img src="https://i.gifer.com/ZZ5H.gif" alt="Carregando..." style={{ width: '100px', height: '100px' }} />
      </Container>
    );
  }
  
  return (
    <>
    <Container>
      <Header>
        <Logo src={businessLogo} alt="Alice Ribeiro Estética" onClick={() => handleNavigateHome()} />
        <Title>FICHA DE ANAMNESE</Title>
      </Header>
      
      <Divider />
      
      <FormLineTwoColumns> 
          <Label>Nome:</Label>
          <Input name="nome" value={formData?.[0]?.nome} onChange={handleChange} />                            
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Endereço:</Label>        
        <Input name="endereco" value={formData?.[0]?.endereco} onChange={handleChange} />                        
      </FormLineTwoColumns>
      <FormLineFiveColumns> 
        <Label>Data de Nascimento:</Label>      
        <Input 
          style={{ maxWidth: '150px' }} 
          name="dataNascimento" 
          value={formData?.[0]?.dataNascimento ? new Date(formData[0].dataNascimento).toLocaleDateString('pt-BR') : ''} 
          onChange={handleChange} 
        />        
        <span></span>
        <Label>Telefone:</Label>
        
        <Input name="telefone" value={formData?.[0]?.telefone} onChange={handleChange} />                
      </FormLineFiveColumns>

      <Divider />
      
      <FormLineFourColumns>
        <Label>Utiliza lentes de contato?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Utiliza lentes de contato?"} checked={!!formData?.[0]?.lentesContato} onChange={() => handleRadioChange("lentesContato", true)} />
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Utiliza lentes de contato?"} checked={formData?.length === 0 ? false : !formData?.[0]?.lentesContato} onChange={() => handleRadioChange("lentesContato", false)} />
          <Label>NÃO</Label>
        </RadioGroup>

        <Label>Tem marcapasso?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem marcapasso?"} checked={!!formData?.[0]?.marcapasso} onChange={() => handleRadioChange("marcapasso", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem marcapasso?"} checked={formData?.length === 0 ? false : !formData?.[0]?.marcapasso} onChange={() => handleRadioChange("marcapasso", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>
      </FormLineFourColumns>
      <FormLineFourColumns>
        <Label>Tem epilepsia/convulsões?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem epilepsia/convulsões?"} checked={!!formData?.[0]?.epilepsia} onChange={() => handleRadioChange("epilepsia", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem epilepsia/convulsões?"} checked={formData?.[0]?.epilepsia === null ? false : !formData?.[0]?.epilepsia} onChange={() => handleRadioChange("epilepsia", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>

        <Label>É tabagista?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"É tabagista?"} checked={!!formData?.[0]?.tabagista} onChange={() => handleRadioChange("tabagista", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"É tabagista?"} checked={formData?.[0]?.tabagista === null ? false : !formData?.[0]?.tabagista} onChange={() => handleRadioChange("tabagista", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>
      </FormLineFourColumns>
      <FormLineFourColumns>
        <Label>Tem intestino regulado?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem intestino regulado?"} checked={!!formData?.[0]?.intestinoRegulado} onChange={() => handleRadioChange("intestinoRegulado", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem intestino regulado?"} checked={formData?.[0]?.intestinoRegulado === null ? false : !formData?.[0]?.intestinoRegulado} onChange={() => handleRadioChange("intestinoRegulado", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>

        <Label>Está gestante?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Está gestante?"} checked={!!formData?.[0]?.gestante} onChange={() => handleRadioChange("gestante", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Está gestante?"} checked={formData?.[0]?.gestante === null ? false : !formData?.[0]?.gestante} onChange={() => handleRadioChange("gestante", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>
      </FormLineFourColumns>
      <FormLineFourColumns>
        <Label>Tem alterações cardíacas?</Label>
        <RadioGroup>      
          <RadioButton type="radio" name={"Tem alterações cardíacas?"} checked={!!formData?.[0]?.alteracoesCardiacas} onChange={() => handleRadioChange("alteracoesCardiacas", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem alterações cardíacas?"} checked={formData?.[0]?.alteracoesCardiacas === null ? false : !formData?.[0]?.alteracoesCardiacas} onChange={() => handleRadioChange("alteracoesCardiacas", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>

        <Label>Tem pressão alta?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem pressão alta?"} checked={!!formData?.[0]?.pressaoAlta} onChange={() => handleRadioChange("pressaoAlta", true)} />
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem pressão alta?"} checked={formData?.[0]?.pressaoAlta === null ? false : !formData?.[0]?.pressaoAlta} onChange={() => handleRadioChange("pressaoAlta", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>
      </FormLineFourColumns>
      <FormLineFourColumns>
        <Label>Tem diabetes?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem diabetes?"} checked={!!formData?.[0]?.diabetes} onChange={() => handleRadioChange("diabetes", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem diabetes?"} checked={formData?.[0]?.diabetes === null ? false : !formData?.[0]?.diabetes} onChange={() => handleRadioChange("diabetes", false)} />
          <Label>NÃO</Label>
        </RadioGroup>
        <span></span>
        <span></span>
      </FormLineFourColumns>

      <Divider />

      <FormLineTwoColumns> 
        <Label>Tem tratamento facial anterior?</Label>        
        <Input name="tratamentoFacialAnterior" value={formData?.[0]?.tratamentoFacialAnterior} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Toma água com frequência?</Label>        
        <Input name="aguaFrequencia" value={formData?.[0]?.aguaFrequencia} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Ingere bebidas alcoólicas?</Label>        
        <Input name="bebidaAlcoolicas" value={formData?.[0]?.bebidaAlcoolicas} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineFiveColumns> 
        <Label>Se expõe ao sol com muita frequência?</Label>
        <Input name="exposicaoSol" value={formData?.[0]?.exposicaoSol} onChange={handleChange} />
        <span></span>
        <Label>Utiliza filtro solar?</Label>        
        <Input name="filtroSolar" value={formData?.[0]?.filtroSolar} onChange={handleChange} />
      </FormLineFiveColumns>
      <FormLineTwoColumns> 
        <Label>Tem  boa qualidade de sono?</Label>        
        <Input name="qualidadeSono" value={formData?.[0]?.qualidadeSono} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Pratica atividade física?</Label>        
        <Input name="atividadeFisica" value={formData?.[0]?.atividadeFisica} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Possui prótese corporal/facial?</Label>        
        <Input name="protese" value={formData?.[0]?.protese} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Utiliza cremes ou loções faciais?</Label>        
        <Input name="cremeLocaoFacial" value={formData?.[0]?.cremeLocaoFacial} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Utiliza algum medicamento?</Label>        
        <Input name="utilizaMedicamento" value={formData?.[0]?.utilizaMedicamento} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Possui algum tipo de alergia?</Label>        
        <Input name="alergia" value={formData?.[0]?.alergia} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Possui uma boa alimentação?</Label>        
        <Input name="boaAlimentacao" value={formData?.[0]?.boaAlimentacao} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Tem problemas de pele?</Label>        
        <Input name="problemasPele" value={formData?.[0]?.problemasPele} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Possui alguma outra doença?</Label>        
        <Input name="outraDoenca" value={formData?.[0]?.outraDoenca} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Se sim, qual?</Label>        
        <Input name="qualDoenca" value={formData?.[0]?.qualDoenca || ""} onChange={handleChange} />
      </FormLineTwoColumns>

      <Divider />

      <Title style={{ margin: '0' }}>TERMO DE COMPROMISSO</Title>
      <Label style={{ fontSize: '1.3rem' }}>Eu me responsabilizo por todas as informações</Label>
      <Label style={{ fontSize: '1.3rem' }}>aqui prestadas e autorizo o procedimento.</Label>

      <FormLineTwoColumns style={{ gridTemplateColumns: '1fr 2fr', margin: '0px' }}>        
        <FormColumn>
          <Label style={{ color: '#d6b128', fontSize: '1.5rem', margin: '0'}}>____/_____/________</Label>      
          <LabelRodape>Data</LabelRodape>        
        </FormColumn>
        <FormColumn>
          <Label style={{ color: '#d6b128', fontSize: '1.5rem', margin: '0px 50px 0px 10px' }}>________________________________________________________________</Label>  
          <LabelRodape>Assinatura</LabelRodape>    
        </FormColumn>        
      </FormLineTwoColumns>      
    </Container>      
    </>
  )
}

export default AnamneseForm
