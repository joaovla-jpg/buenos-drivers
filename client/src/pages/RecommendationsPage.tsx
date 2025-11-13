import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Target } from "lucide-react";

export default function RecommendationsPage() {
  const [, navigate] = useLocation();

  const recommendations = [
    {
      title: "Construir Confiança",
      description: "Driver #1 com correlação de 0.65 com intenção de uso",
      icon: CheckCircle2,
      color: "blue",
      actions: [
        "Programa de avaliação e certificação de motoristas",
        "Transparência de preços e políticas",
        "Garantias de segurança e proteção do usuário",
        "Testimoniais e reviews de usuários satisfeitos",
      ],
    },
    {
      title: "Intensificar Comunicação",
      description: "Gap de 2.2 pontos - maior oportunidade de melhoria",
      icon: AlertCircle,
      color: "purple",
      actions: [
        "Campanha nas redes sociais com conteúdo relevante",
        "Parcerias com influencers locais de Buenos Aires",
        "Marketing de conteúdo sobre segurança e benefícios",
        "Notificações push personalizadas e ofertas",
      ],
    },
    {
      title: "Melhorar Segurança Percebida",
      description: "Correlação de 0.55 - segundo driver mais importante",
      icon: Target,
      color: "green",
      actions: [
        "Botão de emergência visível no app",
        "Compartilhamento de localização em tempo real",
        "Verificação de identidade de motoristas",
        "Seguro de viagem incluído",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recomendações Estratégicas</h1>
            <p className="text-gray-600 mt-2">Plano de ação para aumentar o número de corridas</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            ← Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Executive Summary */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Resumo Executivo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              A análise dos dados de pesquisa revelou que <strong>Confiança + Comunicação</strong> são os dois pilares para converter intenção em ação.
            </p>
            <p className="text-gray-700">
              Com 50.5% da amostra já tendo alta intenção de uso, o foco deve ser em <strong>remover barreiras de confiança</strong> e <strong>aumentar a visibilidade</strong> do app no mercado.
            </p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="space-y-8">
          {recommendations.map((rec, idx) => {
            const Icon = rec.icon;
            const colorClasses = {
              blue: "border-blue-500 bg-blue-50",
              purple: "border-purple-500 bg-purple-50",
              green: "border-green-500 bg-green-50",
            };

            return (
              <Card key={idx} className={`bg-white border-0 shadow-lg border-l-4 ${colorClasses[rec.color as keyof typeof colorClasses]}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Icon className={`w-8 h-8 mt-1 text-${rec.color}-600`} />
                    <div className="flex-1">
                      <CardTitle className={`text-${rec.color}-600`}>{rec.title}</CardTitle>
                      <CardDescription>{rec.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rec.actions.map((action, actionIdx) => (
                      <div key={actionIdx} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 bg-${rec.color}-500`}></div>
                        <p className="text-gray-700">{action}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Implementation Timeline */}
        <Card className="bg-white border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Cronograma de Implementação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Semana 1-2: Estruturação</h4>
                  <p className="text-gray-600">Definir equipes, recursos e métricas de sucesso</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Semana 3-4: Confiança</h4>
                  <p className="text-gray-600">Implementar programa de certificação de motoristas e melhorias de segurança</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Semana 5-6: Comunicação</h4>
                  <p className="text-gray-600">Lançar campanhas nas redes sociais e parcerias com influencers</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Semana 7+: Monitoramento</h4>
                  <p className="text-gray-600">Acompanhar KPIs e ajustar estratégia conforme necessário</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expected Impact */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">Impacto Esperado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">+25%</p>
                <p className="text-gray-700 mt-2">Aumento em Confiança</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600">+40%</p>
                <p className="text-gray-700 mt-2">Aumento em Recall de Comunicação</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-600">+20%</p>
                <p className="text-gray-700 mt-2">Aumento em Corridas (Estimado)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
