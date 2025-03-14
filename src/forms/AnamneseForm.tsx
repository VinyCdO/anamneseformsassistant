import { useState } from 'react'
import businessLogo from '.././assets/AliceRibeiroLogo.png'
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  background-color:rgb(255, 247, 251);
  min-height: 100%;
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
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);    
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
`;    

const FormLineFiveColumns = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1fr 2fr;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  margin: 10px 0;
`;    

const FormLineTwoColumns = styled.div`
  display: grid;
  grid-template-columns: 2fr 7fr;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  margin: 10px 0;
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

  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    dataNascimento: "",
    tratamentoFacialAnterior: "",
    aguaFrequencia: "",
    bebidaAlcoolicas: "",
    exposicaoSol: "",
    filtroSolar: "",
    qualidadeSono: "",
    atividadeFisica: "",
    protese: "",
    cremeLocaoFacial: "",
    utilizaMedicamento: "",
    alergia: "",
    boaAlimentacao: "",
    problemasPele: "",
    outraDoenca: "",
    qualDoenca: "",
    lentesContato: null,
    marcapasso: null,
    epilepsia: null,
    tabagista: null,
    intestinoRegulado: null,
    gestante: null,
    alteracoesCardiacas: null,
    pressaoAlta: null,
    diabetes: null
  });  

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleRadioChange = (question: string, value: boolean) => {
    handleChange({ target: { name: question, value: value } });
  };

  return (
    <>
    <Container>
      <Header>
        <Logo src={businessLogo} alt="Alice Ribeiro Estética" />
        <Title>FICHA DE ANAMNESE</Title>
      </Header>
      
      <Divider />
      
      <FormLineTwoColumns> 
          <Label>Nome:</Label>
          <Input name="nome" value={formData.nome} onChange={handleChange} />                            
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Endereço:</Label>        
        <Input name="endereco" value={formData.endereco} onChange={handleChange} />                        
      </FormLineTwoColumns>
      <FormLineFiveColumns> 
        <Label>Data de Nascimento:</Label>      
        <Input style={{maxWidth: '150px' }} name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />        
        <span></span>
        <Label>Telefone:</Label>
        
        <Input name="telefone" value={formData.telefone} onChange={handleChange} />                
      </FormLineFiveColumns>

      <Divider />
      
      <FormLineFourColumns>
        <Label>Utiliza lentes de contato?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Utiliza lentes de contato?"} checked={!!formData.lentesContato} onChange={() => handleRadioChange("lentesContato", true)} />
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Utiliza lentes de contato?"} checked={formData.lentesContato === null ? false : !formData.lentesContato} onChange={() => handleRadioChange("lentesContato", false)} />
          <Label>NÃO</Label>
        </RadioGroup>

        <Label>Tem marcapasso?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem marcapasso?"} checked={!!formData.marcapasso} onChange={() => handleRadioChange("marcapasso", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem marcapasso?"} checked={formData.marcapasso === null ? false : !formData.marcapasso} onChange={() => handleRadioChange("marcapasso", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>
      </FormLineFourColumns>
      <FormLineFourColumns>
        <Label>Tem epilepsia/convulsões?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem epilepsia/convulsões?"} checked={!!formData.epilepsia} onChange={() => handleRadioChange("epilepsia", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem epilepsia/convulsões?"} checked={formData.epilepsia === null ? false : !formData.epilepsia} onChange={() => handleRadioChange("epilepsia", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>

        <Label>É tabagista?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"É tabagista?"} checked={!!formData.tabagista} onChange={() => handleRadioChange("tabagista", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"É tabagista?"} checked={formData.tabagista === null ? false : !formData.tabagista} onChange={() => handleRadioChange("tabagista", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>
      </FormLineFourColumns>
      <FormLineFourColumns>
        <Label>Tem intestino regulado?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem intestino regulado?"} checked={!!formData.intestinoRegulado} onChange={() => handleRadioChange("intestinoRegulado", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem intestino regulado?"} checked={formData.intestinoRegulado === null ? false : !formData.intestinoRegulado} onChange={() => handleRadioChange("intestinoRegulado", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>

        <Label>Está gestante?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Está gestante?"} checked={!!formData.gestante} onChange={() => handleRadioChange("gestante", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Está gestante?"} checked={formData.gestante === null ? false : !formData.gestante} onChange={() => handleRadioChange("gestante", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>
      </FormLineFourColumns>
      <FormLineFourColumns>
        <Label>Tem alterações cardíacas?</Label>
        <RadioGroup>      
          <RadioButton type="radio" name={"Tem alterações cardíacas?"} checked={!!formData.alteracoesCardiacas} onChange={() => handleRadioChange("alteracoesCardiacas", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem alterações cardíacas?"} checked={formData.alteracoesCardiacas === null ? false : !formData.alteracoesCardiacas} onChange={() => handleRadioChange("alteracoesCardiacas", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>

        <Label>Tem pressão alta?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem pressão alta?"} checked={!!formData.pressaoAlta} onChange={() => handleRadioChange("pressaoAlta", true)} />
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem pressão alta?"} checked={formData.pressaoAlta === null ? false : !formData.pressaoAlta} onChange={() => handleRadioChange("pressaoAlta", false)} /> 
          <Label>NÃO</Label>
        </RadioGroup>
      </FormLineFourColumns>
      <FormLineFourColumns>
        <Label>Tem diabetes?</Label>
        <RadioGroup>
          <RadioButton type="radio" name={"Tem diabetes?"} checked={!!formData.diabetes} onChange={() => handleRadioChange("diabetes", true)} /> 
          <Label>SIM</Label>
          <RadioButton type="radio" name={"Tem diabetes?"} checked={formData.diabetes === null ? false : !formData.diabetes} onChange={() => handleRadioChange("diabetes", false)} />
          <Label>NÃO</Label>
        </RadioGroup>
        <span></span>
        <span></span>
      </FormLineFourColumns>

      <Divider />

      <FormLineTwoColumns> 
        <Label>Tem tratamento facial anterior?</Label>        
        <Input name="tratamentoFacialAnterior" value={formData.tratamentoFacialAnterior} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Toma água com frequência?</Label>        
        <Input name="aguaFrequencia" value={formData.aguaFrequencia} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Ingere bebidas alcoólicas?</Label>        
        <Input name="bebidaAlcoolicas" value={formData.bebidaAlcoolicas} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineFiveColumns> 
        <Label>Se expõe ao sol com muita frequência?</Label>
        <Input name="exposicaoSol" value={formData.exposicaoSol} onChange={handleChange} />
        <span></span>
        <Label>Utiliza filtro solar?</Label>        
        <Input name="filtroSolar" value={formData.filtroSolar} onChange={handleChange} />
      </FormLineFiveColumns>
      <FormLineTwoColumns> 
        <Label>Tem  boa qualidade de sono?</Label>        
        <Input name="qualidadeSono" value={formData.qualidadeSono} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Pratica atividade física?</Label>        
        <Input name="atividadeFisica" value={formData.atividadeFisica} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Possui prótese corporal/facial?</Label>        
        <Input name="protese" value={formData.protese} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Utiliza cremes ou loções faciais?</Label>        
        <Input name="cremeLocaoFacial" value={formData.cremeLocaoFacial} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Utiliza algum medicamento?</Label>        
        <Input name="utilizaMedicamento" value={formData.utilizaMedicamento} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Possui algum tipo de alergia?</Label>        
        <Input name="alergia" value={formData.alergia} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Possui uma boa alimentação?</Label>        
        <Input name="boaAlimentacao" value={formData.boaAlimentacao} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Tem problemas de pele?</Label>        
        <Input name="problemasPele" value={formData.problemasPele} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Possui alguma outra doença?</Label>        
        <Input name="outraDoenca" value={formData.outraDoenca} onChange={handleChange} />
      </FormLineTwoColumns>
      <FormLineTwoColumns> 
        <Label>Se sim, qual?</Label>        
        <Input name="qualDoenca" value={formData.qualDoenca} onChange={handleChange} />
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
