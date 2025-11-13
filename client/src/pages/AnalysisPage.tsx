import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function AnalysisPage() {
  const [, navigate] = useLocation();
  const { data: correlations, isLoading } = trpc.analysis.correlations.useQuery();
  const { data: segmentation } = trpc.analysis.segmentation.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Análise Exploratória</h1>
            <p className="text-gray-600 mt-2">Estatísticas descritivas e drivers de intenção</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            ← Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin mr-2" />
            <span>Carregando dados...</span>
          </div>
        ) : (
          <>
            {/* Correlations Section */}
            <Card className="bg-white border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Drivers de Intenção de Uso</CardTitle>
                <CardDescription>
                  Correlação de Pearson entre cada driver e a intenção de usar o Buenos Drivers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Confiança</div>
                    <div className="text-4xl font-bold text-blue-600">
                      {correlations?.confidence?.toFixed(2) || "0.00"}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Correlação mais forte</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Segurança</div>
                    <div className="text-4xl font-bold text-green-600">
                      {correlations?.security?.toFixed(2) || "0.00"}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Correlação moderada</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Comunicação</div>
                    <div className="text-4xl font-bold text-purple-600">
                      {correlations?.communication?.toFixed(2) || "0.00"}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Oportunidade de melhoria</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Aversão a Risco</div>
                    <div className="text-4xl font-bold text-orange-600">
                      {correlations?.aversion?.toFixed(2) || "0.00"}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Correlação fraca</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Segmentation Overview */}
            {segmentation && (
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Segmentação por Intenção</CardTitle>
                  <CardDescription>
                    Comparação entre usuários com alta e baixa intenção de uso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* High Intention */}
                    <div className="border-l-4 border-green-500 pl-6">
                      <h3 className="text-xl font-bold text-green-600 mb-4">
                        Alta Intenção ({segmentation.highIntention.count} respondentes)
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Confiança Média</p>
                          <p className="text-2xl font-bold text-green-600">
                            {segmentation.highIntention.avgConfidence.toFixed(2)}/7.0
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Segurança Média</p>
                          <p className="text-2xl font-bold text-green-600">
                            {segmentation.highIntention.avgSecurity.toFixed(2)}/7.0
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Comunicação Média</p>
                          <p className="text-2xl font-bold text-green-600">
                            {segmentation.highIntention.avgCommunication.toFixed(2)}/7.0
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Low Intention */}
                    <div className="border-l-4 border-red-500 pl-6">
                      <h3 className="text-xl font-bold text-red-600 mb-4">
                        Baixa Intenção ({segmentation.lowIntention.count} respondentes)
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Confiança Média</p>
                          <p className="text-2xl font-bold text-red-600">
                            {segmentation.lowIntention.avgConfidence.toFixed(2)}/7.0
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Segurança Média</p>
                          <p className="text-2xl font-bold text-red-600">
                            {segmentation.lowIntention.avgSecurity.toFixed(2)}/7.0
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Comunicação Média</p>
                          <p className="text-2xl font-bold text-red-600">
                            {segmentation.lowIntention.avgCommunication.toFixed(2)}/7.0
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
