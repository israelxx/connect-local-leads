import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LEAD_STATUSES, getStatusConfig } from "@/lib/lead-status";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Building2, Phone, Mail } from "lucide-react";

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

export default function Kanban() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
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
  }, [toast]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const onDragEnd = async (result: DropResult) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    const newStatus = destination.droppableId;
    const lead = leads.find((l) => l.id === draggableId);
    if (!lead || lead.status === newStatus) return;

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === draggableId ? { ...l, status: newStatus } : l))
    );

    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", draggableId);

    if (error) {
      // Rollback
      setLeads((prev) =>
        prev.map((l) => (l.id === draggableId ? { ...l, status: lead.status } : l))
      );
      toast({ title: "Erro", description: "Não foi possível atualizar o status.", variant: "destructive" });
    }
  };

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
        <h1 className="text-2xl sm:text-3xl font-bold">Kanban</h1>
        <p className="text-sm text-muted-foreground mt-1">Arraste os cards para atualizar o status dos leads</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-3 px-3 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {LEAD_STATUSES.map((status) => {
            const columnLeads = leads.filter((l) => l.status === status.value);
            const config = getStatusConfig(status.value);

            return (
              <Droppable key={status.value} droppableId={status.value}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-shrink-0 w-[260px] sm:w-72 rounded-lg border border-border p-2 sm:p-3 transition-colors snap-start ${
                      snapshot.isDraggingOver ? "bg-primary/5" : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
                        {status.label}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">{columnLeads.length}</span>
                    </div>

                    <div className="space-y-2 min-h-[100px]">
                      {columnLeads.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 rounded-md border border-border bg-card shadow-sm transition-shadow ${
                                snapshot.isDragging ? "shadow-lg ring-2 ring-primary/30" : ""
                              }`}
                            >
                              <p className="font-medium text-sm truncate">{lead.name}</p>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Building2 className="h-3 w-3" />
                                  <span className="truncate">{lead.company}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  <span>{lead.phone}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate">{lead.email}</span>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                  lead.service_type === "prime_hub"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  {lead.service_type === "prime_hub" ? "PRIME HUB" : "Padrão"}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
