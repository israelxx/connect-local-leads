import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldOff, Search, UserCog, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { checkUserRole } from "@/lib/roles";

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  isAdmin: boolean;
}

export default function Users() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }

    const hasAdminRole = await checkUserRole('admin');
    setCheckingAuth(false);

    if (!hasAdminRole) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página.",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    fetchUsers();
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch all users from auth.users via RPC or direct query
      // Note: We need to use service role or create a function to get auth.users
      // For now, we'll get users who have submitted leads or have roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get unique user IDs from roles
      const userIdsWithRoles = new Set(rolesData?.map(r => r.user_id) || []);

      // Get users from leads table
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('email, created_at')
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;

      // For this implementation, we'll query the actual authenticated users
      // We need to create a more comprehensive solution
      const { data: { user } } = await supabase.auth.getUser();
      
      // Create a mock user list based on available data
      // In production, you'd want an edge function to list all auth.users
      const usersList: User[] = [];
      
      // Add current user
      if (user) {
        const isAdmin = userIdsWithRoles.has(user.id);
        usersList.push({
          id: user.id,
          email: user.email || '',
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          isAdmin: isAdmin
        });
      }

      // For a complete solution, we need an edge function
      // For now, show message that this requires service role access
      
      setUsers(usersList);
      setFilteredUsers(usersList);
      
      toast({
        title: "Nota importante",
        description: "Para ver todos os usuários, é necessário criar uma edge function. Por enquanto, mostrando apenas seu usuário.",
      });
      
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching users:", error);
      }
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: string, currentlyAdmin: boolean) => {
    setProcessingUserId(userId);
    try {
      if (currentlyAdmin) {
        // Remove admin role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');

        if (error) throw error;

        toast({
          title: "Sucesso!",
          description: "Role de admin removida com sucesso.",
        });
      } else {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: 'admin'
          });

        if (error) throw error;

        toast({
          title: "Sucesso!",
          description: "Role de admin adicionada com sucesso.",
        });
      }

      // Refresh users list
      fetchUsers();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Error toggling admin role:", error);
      }
      toast({
        title: "Erro",
        description: error.message || "Não foi possível atualizar a role.",
        variant: "destructive",
      });
    } finally {
      setProcessingUserId(null);
    }
  };

  if (checkingAuth || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <UserCog className="h-12 w-12 animate-pulse mx-auto text-primary" />
          <p className="text-muted-foreground">
            {checkingAuth ? "Verificando permissões..." : "Carregando usuários..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
        <p className="text-muted-foreground mt-1">Controle de permissões e roles de admin</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Implementação Completa Necessária
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 dark:text-blue-200 space-y-2">
            <p>
              Para listar <strong>todos os usuários</strong> do sistema, é necessário criar uma edge function 
              com acesso service_role que consulte a tabela auth.users.
            </p>
            <p className="text-sm">
              Por enquanto, você pode adicionar roles de admin manualmente usando o email do usuário 
              após ele criar conta no sistema.
            </p>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Usuários ({filteredUsers.length})</span>
              <Badge variant="outline">{filteredUsers.filter(u => u.isAdmin).length} admins</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <UserCog className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum usuário encontrado</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user.email}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Criado em {new Date(user.created_at).toLocaleDateString('pt-BR')}</span>
                          {user.last_sign_in_at && (
                            <>
                              <span>•</span>
                              <span>Último acesso: {new Date(user.last_sign_in_at).toLocaleDateString('pt-BR')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {user.isAdmin ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="outline">Usuário</Badge>
                      )}

                      <Button
                        variant={user.isAdmin ? "destructive" : "default"}
                        size="sm"
                        onClick={() => toggleAdminRole(user.id, user.isAdmin)}
                        disabled={processingUserId === user.id}
                      >
                        {processingUserId === user.id ? (
                          "Processando..."
                        ) : user.isAdmin ? (
                          <>
                            <ShieldOff className="h-4 w-4 mr-2" />
                            Remover Admin
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Tornar Admin
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
