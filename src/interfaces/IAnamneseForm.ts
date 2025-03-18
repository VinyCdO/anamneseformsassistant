export interface IAnamneseForm {
  _id: {
    $oid: string;
  };
  data: string;
  nome: string;
  endereco: string;
  telefone: string;
  dataNascimento: string;
  tratamentoFacialAnterior: string;
  aguaFrequencia: string;
  bebidaAlcoolicas: string;
  exposicaoSol: string;
  filtroSolar: string;
  qualidadeSono: string;
  atividadeFisica: string;
  protese: string;
  cremeLocaoFacial: string;
  utilizaMedicamento: string;
  alergia: string;
  boaAlimentacao: string;
  problemasPele: string;
  outraDoenca: string;
  qualDoenca: string | null;
  lentesContato: boolean;
  marcapasso: boolean;
  epilepsia: boolean;
  tabagista: boolean;
  intestinoRegulado: boolean;
  gestante: boolean;
  alteracoesCardiacas: boolean;
  pressaoAlta: boolean;
  diabetes: boolean;
  formularioAssinado: string;
}