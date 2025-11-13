import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sobre o Projeto</h1>
            <p className="text-gray-600 mt-2">Metodologia e processo de análise</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            ← Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Project Overview */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Meu Processo de Análise</CardTitle>
            <CardDescription>Case Técnico - Research Ops - Okiar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Contexto do Desafio</h3>
              <p className="text-gray-700">
                O Buenos Drivers é um app de mobilidade urbana lançado em Buenos Aires que enfrenta resultados abaixo da expectativa. A competição é intensa com players consolidados como Uber, Cabify e DiDi. O objetivo de negócio é claro: <strong>aumentar o número de corridas</strong>.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dados Disponíveis</h3>
              <p className="text-gray-700 mb-3">
                Uma pesquisa foi realizada com 200 respondentes de Buenos Aires, todos com awareness da marca Buenos Drivers. Os dados incluem:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                <li><strong>Perfil Demográfico:</strong> Gênero, renda, idade, filhos</li>
                <li><strong>Construtos Psicométricos:</strong> Aversão a risco, confiança, segurança, intenção de uso, comunicação/recall</li>
                <li><strong>Escala:</strong> Likert 1-7 para todas as questões psicométricas</li>
                <li><strong>Amostra:</strong> 100% com awareness controlado da marca</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Metodologia de Análise</h3>
              <p className="text-gray-700 mb-3">
                Seguindo a abordagem de Research Ops, realizei uma análise estruturada em 4 etapas:
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">1. Análise Exploratória</h4>
                  <p className="text-gray-700 text-sm">
                    Limpeza e validação dos dados. Cálculo de estatísticas descritivas. Verificação de consistência interna (Alfa de Cronbach) dos construtos psicométricos.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-2">2. Criação de Índices Compostos</h4>
                  <p className="text-gray-700 text-sm">
                    Agregação de itens em índices: Aversão ao Risco (4 itens), Confiança (9 itens), Segurança (3 itens), Intenção de Uso (3 itens), Comunicação/Recall (7 itens).
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-2">3. Análise de Correlações</h4>
                  <p className="text-gray-700 text-sm">
                    Cálculo de correlações de Pearson entre cada driver e a intenção de uso. Identificação dos drivers mais fortes: Confiança (0.65), Segurança (0.55), Comunicação (0.42).
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold text-orange-900 mb-2">4. Segmentação e Diagnóstico</h4>
                  <p className="text-gray-700 text-sm">
                    Segmentação por intenção (alta ≥ 5.0 vs. baixa &lt; 5.0). Comparação de perfis demográficos e psicográficos. Identificação de gaps e oportunidades.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Principais Descobertas</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <p className="font-bold text-gray-900">Confiança é o Driver #1</p>
                    <p className="text-gray-700 text-sm">Correlação de 0.65 com intenção. Usuários com alta confiança têm 70% mais intenção de uso.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📢</div>
                  <div>
                    <p className="font-bold text-gray-900">Comunicação é Fraca</p>
                    <p className="text-gray-700 text-sm">Maior gap (2.2 pontos). Baixo recall de propaganda e presença nas redes sociais.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <p className="font-bold text-gray-900">Alta Intenção = 50.5%</p>
                    <p className="text-gray-700 text-sm">Metade da amostra já tem alta intenção, mas não converte em uso.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ferramentas Utilizadas</h3>
              <p className="text-gray-700 mb-3">
                Este dashboard foi desenvolvido utilizando tecnologias modernas de análise e visualização:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="font-bold text-gray-900">Python</p>
                  <p className="text-xs text-gray-600">Análise de dados</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="font-bold text-gray-900">React</p>
                  <p className="text-xs text-gray-600">Frontend interativo</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="font-bold text-gray-900">Node.js</p>
                  <p className="text-xs text-gray-600">Backend e APIs</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="font-bold text-gray-900">MySQL</p>
                  <p className="text-xs text-gray-600">Banco de dados</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="font-bold text-gray-900">tRPC</p>
                  <p className="text-xs text-gray-600">API type-safe</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="font-bold text-gray-900">Manus IA</p>
                  <p className="text-xs text-gray-600">Desenvolvimento web</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="font-bold text-blue-900 mb-2">Sobre a Entrega</h3>
              <p className="text-gray-700 text-sm mb-2">
                Este projeto demonstra uma abordagem completa de Research Ops, combinando:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li><strong>Análise de Dados:</strong> Metodologia rigorosa com estatísticas descritivas e correlações</li>
                <li><strong>Dashboard Web:</strong> Visualização interativa e responsiva dos insights</li>
                <li><strong>Recomendações Acionáveis:</strong> Estratégias claras baseadas em dados</li>
                <li><strong>Documentação:</strong> Processo transparente e reproduzível</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Closing Statement */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Fechamento Estratégico</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Este case técnico demonstra a capacidade de transformar dados brutos em insights acionáveis e recomendações estratégicas. A combinação de análise rigorosa com comunicação clara é essencial para impactar decisões de negócio.
            </p>
            <p className="mb-4">
              O desenvolvimento deste dashboard interativo, utilizando <strong>Manus IA</strong> como assistente de desenvolvimento web, exemplifica como a tecnologia pode acelerar a entrega de soluções de alto impacto, mantendo a qualidade e a eficiência.
            </p>
            <p>
              Estou pronto para discutir os resultados, responder perguntas e explorar próximos passos para implementar essas recomendações no Buenos Drivers.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
