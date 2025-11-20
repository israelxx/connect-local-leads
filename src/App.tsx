import AppPublic from "./AppPublic";
import AppAdmin from "./AppAdmin";

/**
 * App - Roteador principal que seleciona qual versão carregar
 * 
 * Modos disponíveis:
 * - "public": Landing page apenas (domínio principal)
 * - "admin": Dashboard e login apenas (subdomínio)
 * - undefined/outros: Todas as rotas (desenvolvimento local)
 */
const appMode = import.meta.env.VITE_APP_MODE;

const App = () => {
  // Deploy público (domínio principal)
  if (appMode === "public") {
    return <AppPublic />;
  }
  
  // Deploy administrativo (subdomínio)
  if (appMode === "admin") {
    return <AppAdmin />;
  }
  
  // Desenvolvimento local - todas as rotas
  return <AppPublic />;
};

export default App;
