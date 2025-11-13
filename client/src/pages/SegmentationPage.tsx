import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function SegmentationPage() {
  const [, navigate] = useLocation();
  const { data: segmentation, isLoading } = trpc.analysis.segmentation.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Segmentação de Usuários</h1>
            <p className="text-gray-600 mt-2">Análise de segmentos por intenção de uso</p>
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
        ) : segmentation ? (
          <>
            {/* Segmentation Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* High Intention Segment */}
              <Card className="bg-white border-0 shadow-lg border-l-4 border-green-500">
                <CardHeader>
                  <CardTitle className="text-green-600">Alta Intenção de Uso</CardTitle>
                  <CardDescription>
                    {segmentation.highIntention.count} respondentes ({((segmentation.highIntention.count / (segmentation.highIntention.count + segmentation.lowIntention.count)) * 100).toFixed(1)}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Confiança</span>
                        <span className="text-2xl font-bold text-green-600">
                          {segmentation.highIntention.avgConfidence.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(segmentation.highIntention.avgConfidence / 7) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Segurança</span>
                        <span className="text-2xl font-bold text-green-600">
                          {segmentation.highIntention.avgSecurity.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(segmentation.highIntention.avgSecurity / 7) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Comunicação</span>
                        <span className="text-2xl font-bold text-green-600">
                          {segmentation.highIntention.avgCommunication.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(segmentation.highIntention.avgCommunication / 7) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Perfil:</strong> Usuários com alta confiança no app, percebem segurança e estão expostos à comunicação.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Low Intention Segment */}
              <Card className="bg-white border-0 shadow-lg border-l-4 border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-600">Baixa Intenção de Uso</CardTitle>
                  <CardDescription>
                    {segmentation.lowIntention.count} respondentes ({((segmentation.lowIntention.count / (segmentation.highIntention.count + segmentation.lowIntention.count)) * 100).toFixed(1)}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Confiança</span>
                        <span className="text-2xl font-bold text-red-600">
                          {segmentation.lowIntention.avgConfidence.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${(segmentation.lowIntention.avgConfidence / 7) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Segurança</span>
                        <span className="text-2xl font-bold text-red-600">
                          {segmentation.lowIntention.avgSecurity.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${(segmentation.lowIntention.avgSecurity / 7) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Comunicação</span>
                        <span className="text-2xl font-bold text-red-600">
                          {segmentation.lowIntention.avgCommunication.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${(segmentation.lowIntention.avgCommunication / 7) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Perfil:</strong> Usuários com menor confiança, percebem menos segurança e têm menor exposição à comunicação.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Differences */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Principais Diferenças entre Segmentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">Diferença em Confiança</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {(segmentation.highIntention.avgConfidence - segmentation.lowIntention.avgConfidence).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">Diferença em Segurança</span>
                    <span className="text-2xl font-bold text-green-600">
                      {(segmentation.highIntention.avgSecurity - segmentation.lowIntention.avgSecurity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">Diferença em Comunicação</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {(segmentation.highIntention.avgCommunication - segmentation.lowIntention.avgCommunication).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : null}
      </main>
    </div>
  );
}
