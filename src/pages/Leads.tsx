import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LEAD_STATUSES, getStatusConfig } from "@/lib/lead-status";
import { Search, Users, TrendingUp, BarChart, Target } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  segment: string;
  challenge: string;
  revenue: string;
  service_type: string;
  social_handle: string;
  status: string;
  created_at: string;
}

export default function Leads() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads((data as Lead[]) || []);
    } catch {
      toast({ title: "Erro", description: "Não foi possível carregar os leads.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );

    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      fetchLeads();
      toast({ title: "Erro", description: "Não foi possível atualizar o status.", variant: "destructive" });
    }
  };

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLeads = leads.length;
  const closedLeads = leads.filter((l) => l.status === "fechado").length;
  const conversionRate = totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(1) : "0";
  const primeHubLeads = leads.filter((l) => l.service_type === "prime_hub").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Leads</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerencie todos os seus leads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fechados</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{closedLeads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{conversionRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">PRIME HUB</CardTitle>
            <BarChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{primeHubLeads}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, empresa ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {LEAD_STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Tipo</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Empresa</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Instagram</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Contato</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Segmento</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Desafio</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Faturamento</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const statusConfig = getStatusConfig(lead.status);
                  return (
                    <tr key={lead.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-3">
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateStatus(lead.id, value)}
                        >
                          <SelectTrigger className={`h-7 w-auto text-xs border ${statusConfig.color}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {LEAD_STATUSES.map((s) => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          lead.service_type === "prime_hub"
                            ? "bg-primary/10 text-primary border border-primary/30"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {lead.service_type === "prime_hub" ? "🌟 PRIME HUB" : "Padrão"}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{lead.name}</td>
                      <td className="p-3 text-sm">{lead.company}</td>
                      <td className="p-3 text-sm">{lead.social_handle || "-"}</td>
                      <td className="p-3 text-sm">{lead.phone}</td>
                      <td className="p-3 text-sm">{lead.email}</td>
                      <td className="p-3 text-sm text-muted-foreground">{lead.segment}</td>
                      <td className="p-3 text-sm text-muted-foreground max-w-[200px] truncate" title={lead.challenge}>{lead.challenge}</td>
                      <td className="p-3 text-sm font-medium">{lead.revenue}</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-muted-foreground">
                      Nenhum lead encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
