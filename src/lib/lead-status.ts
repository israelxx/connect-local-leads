export const LEAD_STATUSES = [
  { value: "novo", label: "Novo", color: "bg-primary/15 text-primary border-primary/30" },
  { value: "follow_up", label: "Follow-up", color: "bg-warning/15 text-warning border-warning/30" },
  { value: "aguardando_pagamento", label: "Aguardando Pagamento", color: "bg-accent/15 text-accent border-accent/30" },
  { value: "fechado", label: "Fechado", color: "bg-success/15 text-success border-success/30" },
  { value: "cancelado", label: "Cancelado", color: "bg-destructive/15 text-destructive border-destructive/30" },
] as const;

export type LeadStatus = typeof LEAD_STATUSES[number]["value"];

export function getStatusConfig(status: string) {
  return LEAD_STATUSES.find((s) => s.value === status) || LEAD_STATUSES[0];
}
