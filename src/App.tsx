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
  if (appMode === "public") {
    return <AppPublic />;
  }
  
  // Admin mode or development — show full CRM
  return <AppAdmin />;
};

export default App;
