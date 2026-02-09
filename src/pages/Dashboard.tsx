import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Target, BarChart } from "lucide-react";
import { LEAD_STATUSES, getStatusConfig } from "@/lib/lead-status";

interface Lead {
  id: string;
  status: string;
  service_type: string;
  created_at: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("id, status, service_type, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads((data as Lead[]) || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const totalLeads = leads.length;
  const closedLeads = leads.filter((l) => l.status === "fechado").length;
  const cancelledLeads = leads.filter((l) => l.status === "cancelado").length;
  const activeLeads = totalLeads - cancelledLeads;
  const conversionRate = activeLeads > 0 ? ((closedLeads / activeLeads) * 100).toFixed(1) : "0";
  const primeHubLeads = leads.filter((l) => l.service_type === "prime_hub").length;

  // Leads by status for chart
  const statusCounts = LEAD_STATUSES.map((s) => ({
    ...s,
    count: leads.filter((l) => l.status === s.value).length,
  }));

  // Leads last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentLeads = leads.filter((l) => new Date(l.created_at) >= thirtyDaysAgo).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral do CRM Pro Connect</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">{recentLeads} nos últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leads Fechados</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">{closedLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">De {activeLeads} leads ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-accent">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Fechados / Ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">PRIME HUB</CardTitle>
            <BarChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{primeHubLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalLeads > 0 ? ((primeHubLeads / totalLeads) * 100).toFixed(1) : 0}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {statusCounts.map((s) => {
              const config = getStatusConfig(s.value);
              return (
                <div
                  key={s.value}
                  className={`rounded-lg border p-4 text-center ${config.color}`}
                >
                  <div className="text-2xl font-bold">{s.count}</div>
                  <div className="text-xs font-medium mt-1">{s.label}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
