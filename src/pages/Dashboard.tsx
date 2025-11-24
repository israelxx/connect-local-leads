import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, TrendingUp, DollarSign, LogOut, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { checkUserRole } from "@/lib/roles";

interface LeadStats {
  total: number;
  standard: number;
  primeHub: number;
  standardRevenue: string[];
  primeHubRevenue: string[];
  recentLeads: any[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState<LeadStats>({
    total: 0,
    standard: 0,
    primeHub: 0,
    standardRevenue: [],
    primeHubRevenue: [],
    recentLeads: [],
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }

    // Check if user has admin role
    const hasAdminRole = await checkUserRole('admin');
    setIsAdmin(hasAdminRole);
    setCheckingAuth(false);

    if (!hasAdminRole) {
      toast({
        title: "Acesso Negado",
        description: "Você não tem permissão para acessar o dashboard.",
        variant: "destructive",
      });
      return;
    }

    // Only fetch stats if user is admin
    fetchStats();
  };

  const fetchStats = async () => {
    try {
      const { data: leads, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const standard = leads?.filter(l => l.service_type === "standard") || [];
      const primeHub = leads?.filter(l => l.service_type === "prime_hub") || [];

      setStats({
        total: leads?.length || 0,
        standard: standard.length,
        primeHub: primeHub.length,
        standardRevenue: standard.map(l => l.revenue),
        primeHubRevenue: primeHub.map(l => l.revenue),
        recentLeads: leads?.slice(0, 10) || [],
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as estatísticas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            {checkingAuth ? "Verificando permissões..." : "Carregando..."}
          </p>
        </div>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center">
            <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <CardTitle className="text-2xl">Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Você não tem permissão de administrador para acessar o dashboard.
            </p>
            <p className="text-sm text-muted-foreground">
              Entre em contato com o administrador do sistema para solicitar acesso.
            </p>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const conversionRate = stats.total > 0 
    ? ((stats.primeHub / stats.total) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Dashboard Pro Connect</h1>
            <p className="text-muted-foreground mt-2">Estatísticas de Leads</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">Todos os contatos</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Padrão</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.standard}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.total > 0 ? ((stats.standard / stats.total) * 100).toFixed(1) : 0}% do total
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PRIME HUB</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stats.primeHub}
              </div>
              <p className="text-xs text-primary mt-1 font-semibold">
                🌟 Premium ({conversionRate}% conversão)
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <DollarSign className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">Para PRIME HUB</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Leads Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Nome</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Empresa</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Contato</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Segmento</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Faturamento</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentLeads.map((lead, index) => (
                    <tr key={lead.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.service_type === 'prime_hub' 
                            ? 'bg-primary/10 text-primary border border-primary/30' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {lead.service_type === 'prime_hub' ? '🌟 PRIME HUB' : 'Padrão'}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-foreground">{lead.name}</td>
                      <td className="p-3 text-sm text-foreground">{lead.company}</td>
                      <td className="p-3 text-sm text-foreground">{lead.phone}</td>
                      <td className="p-3 text-sm text-foreground">{lead.email}</td>
                      <td className="p-3 text-sm text-muted-foreground">{lead.segment}</td>
                      <td className="p-3 text-sm text-foreground font-medium">{lead.revenue}</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
