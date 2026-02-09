import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { checkUserRole } from "@/lib/roles";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CrmSidebar } from "@/components/CrmSidebar";
import { ShieldAlert, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CrmLayoutProps {
  children: React.ReactNode;
}

export function CrmLayout({ children }: CrmLayoutProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }

    const hasAdminRole = await checkUserRole("admin");
    setIsAdmin(hasAdminRole);
    setChecking(false);

    if (!hasAdminRole) {
      toast({
        title: "Acesso Negado",
        description: "Você não tem permissão para acessar o dashboard.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center">
            <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <CardTitle className="text-2xl">Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">Você não tem permissão de administrador.</p>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CrmSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background sticky top-0 z-10">
            <SidebarTrigger />
          </header>
          <div className="flex-1 p-3 sm:p-6 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
