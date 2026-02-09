import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, Clock, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Meeting {
  id: string;
  title: string;
  description: string | null;
  meeting_date: string;
  meeting_time: string;
  duration_minutes: number;
  lead_id: string | null;
  user_id: string;
  leads?: { name: string; company: string } | null;
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function Agenda() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    meeting_date: "",
    meeting_time: "09:00",
    duration_minutes: 30,
    lead_id: "",
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const { data: meetings = [] } = useQuery({
    queryKey: ["meetings", format(monthStart, "yyyy-MM")],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("meetings")
        .select("*, leads(name, company)")
        .gte("meeting_date", format(calendarStart, "yyyy-MM-dd"))
        .lte("meeting_date", format(calendarEnd, "yyyy-MM-dd"))
        .order("meeting_time");
      if (error) throw error;
      return data as Meeting[];
    },
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads-for-meetings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, name, company")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: typeof form) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("meetings").insert({
        title: values.title,
        description: values.description || null,
        meeting_date: values.meeting_date,
        meeting_time: values.meeting_time,
        duration_minutes: values.duration_minutes,
        lead_id: values.lead_id || null,
        user_id: user.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      toast({ title: "Reunião criada com sucesso" });
      resetForm();
    },
    onError: () => toast({ title: "Erro ao criar reunião", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: typeof form }) => {
      const { error } = await supabase
        .from("meetings")
        .update({
          title: values.title,
          description: values.description || null,
          meeting_date: values.meeting_date,
          meeting_time: values.meeting_time,
          duration_minutes: values.duration_minutes,
          lead_id: values.lead_id || null,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      toast({ title: "Reunião atualizada" });
      resetForm();
    },
    onError: () => toast({ title: "Erro ao atualizar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("meetings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      toast({ title: "Reunião removida" });
    },
    onError: () => toast({ title: "Erro ao remover", variant: "destructive" }),
  });

  const resetForm = () => {
    setForm({ title: "", description: "", meeting_date: "", meeting_time: "09:00", duration_minutes: 30, lead_id: "" });
    setEditingMeeting(null);
    setDialogOpen(false);
  };

  const openNewMeeting = (date?: Date) => {
    resetForm();
    if (date) setForm((f) => ({ ...f, meeting_date: format(date, "yyyy-MM-dd") }));
    setDialogOpen(true);
  };

  const openEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setForm({
      title: meeting.title,
      description: meeting.description || "",
      meeting_date: meeting.meeting_date,
      meeting_time: meeting.meeting_time.slice(0, 5),
      duration_minutes: meeting.duration_minutes,
      lead_id: meeting.lead_id || "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMeeting) {
      updateMutation.mutate({ id: editingMeeting.id, values: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const meetingsByDate = useMemo(() => {
    const map = new Map<string, Meeting[]>();
    meetings.forEach((m) => {
      const key = m.meeting_date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    });
    return map;
  }, [meetings]);

  const selectedDayMeetings = selectedDate
    ? meetingsByDate.get(format(selectedDate, "yyyy-MM-dd")) || []
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-muted-foreground">Gerencie suas reuniões</p>
        </div>
        <Button onClick={() => openNewMeeting()}>
          <Plus className="mr-2 h-4 w-4" /> Nova Reunião
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-lg capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {d}
                </div>
              ))}
              {calendarDays.map((day) => {
                const key = format(day, "yyyy-MM-dd");
                const dayMeetings = meetingsByDate.get(key) || [];
                const isToday = isSameDay(day, new Date());
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isSelected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(day)}
                    onDoubleClick={() => openNewMeeting(day)}
                    className={cn(
                      "relative min-h-[80px] p-1 text-left border border-border/50 rounded-md transition-colors",
                      !isCurrentMonth && "opacity-30",
                      isToday && "bg-primary/10 border-primary/30",
                      isSelected && "ring-2 ring-primary"
                    )}
                  >
                    <span className={cn("text-xs font-medium", isToday && "text-primary")}>
                      {format(day, "d")}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {dayMeetings.slice(0, 2).map((m) => (
                        <div key={m.id} className="text-[10px] leading-tight truncate rounded bg-primary/15 text-primary px-1 py-0.5">
                          {m.meeting_time.slice(0, 5)} {m.title}
                        </div>
                      ))}
                      {dayMeetings.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">+{dayMeetings.length - 2} mais</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Side panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR }) : "Selecione um dia"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDate && selectedDayMeetings.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhuma reunião neste dia.</p>
            )}
            {selectedDayMeetings.map((m) => (
              <div key={m.id} className="border border-border rounded-lg p-3 space-y-1">
                <div className="flex items-start justify-between">
                  <p className="font-medium text-sm">{m.title}</p>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEditMeeting(m)}>
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => deleteMutation.mutate(m.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {m.meeting_time.slice(0, 5)} • {m.duration_minutes}min
                </div>
                {m.leads && (
                  <Badge variant="secondary" className="text-xs">{m.leads.name} — {m.leads.company}</Badge>
                )}
                {m.description && <p className="text-xs text-muted-foreground">{m.description}</p>}
              </div>
            ))}
            {selectedDate && (
              <Button variant="outline" size="sm" className="w-full" onClick={() => openNewMeeting(selectedDate)}>
                <Plus className="mr-2 h-3 w-3" /> Adicionar reunião
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Meeting Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(o) => { if (!o) resetForm(); setDialogOpen(o); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMeeting ? "Editar Reunião" : "Nova Reunião"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data</Label>
                <Input type="date" value={form.meeting_date} onChange={(e) => setForm((f) => ({ ...f, meeting_date: e.target.value }))} required />
              </div>
              <div>
                <Label>Horário</Label>
                <Input type="time" value={form.meeting_time} onChange={(e) => setForm((f) => ({ ...f, meeting_time: e.target.value }))} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Duração (min)</Label>
                <Input type="number" value={form.duration_minutes} onChange={(e) => setForm((f) => ({ ...f, duration_minutes: parseInt(e.target.value) || 30 }))} min={5} />
              </div>
              <div>
                <Label>Lead (opcional)</Label>
                <Select value={form.lead_id} onValueChange={(v) => setForm((f) => ({ ...f, lead_id: v === "none" ? "" : v }))}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {leads.map((l) => (
                      <SelectItem key={l.id} value={l.id}>{l.name} — {l.company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
              <Button type="submit">{editingMeeting ? "Salvar" : "Criar"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
