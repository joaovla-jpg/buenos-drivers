import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TITLE } from "@/const";

export default function Dashboard() {
  const [, navigate] = useLocation();

  const sections = [
    {
      title: "Análise Exploratória",
      description: "Estatísticas descritivas e distribuição dos dados",
      path: "/analysis",
      icon: "📊",
      id: "analysis",
    },
    {
      title: "Drivers de Intenção",
      description: "Correlação entre fatores e intenção de uso",
      path: "/analysis",
      icon: "🎯",
      id: "drivers",
    },
    {
      title: "Segmentação",
      description: "Análise de segmentos por intenção de uso",
      path: "/segmentation",
      icon: "👥",
      id: "segmentation",
    },
    {
      title: "Recomendações",
      description: "Estratégias para aumentar o número de corridas",
      path: "/recommendations",
      icon: "💡",
    },
    {
      title: "Sobre o Projeto",
      description: "Metodologia e processo de análise",
      path: "/about",
      icon: "📖",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{APP_TITLE}</h1>
          <p className="text-gray-600 mt-2">Case Técnico - Research Ops - Buenos Drivers App</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Bem-vindo à Análise do Buenos Drivers</CardTitle>
              <CardDescription className="text-base">
                Este dashboard apresenta uma análise completa dos dados de pesquisa para entender os drivers de intenção de uso do app Buenos Drivers em Buenos Aires.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                O objetivo de negócio é <strong>aumentar o número de corridas</strong> através de um maior entendimento do mercado e dos consumidores.
              </p>
              <p className="text-gray-700">
                Navegue pelas seções abaixo para explorar a análise de dados, insights estratégicos e recomendações.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Card
              key={section.id}
              className="bg-white hover:shadow-lg transition-shadow cursor-pointer border-0"
              onClick={() => navigate(section.path)}
            >
              <CardHeader>
                <div className="text-4xl mb-2">{section.icon}</div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(section.path)}
                >
                  Explorar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Insights Preview */}
        <div className="mt-12">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Insights Principais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">0.65</div>
                  <p className="text-gray-600 mt-2">Correlação: Confiança → Intenção</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">50.5%</div>
                  <p className="text-gray-600 mt-2">Respondentes com Alta Intenção</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">2.2</div>
                  <p className="text-gray-600 mt-2">Gap: Comunicação (maior oportunidade)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
