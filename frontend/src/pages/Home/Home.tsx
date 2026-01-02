import { useAuth } from "../../auth/hooks/useAuth";

function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isAuthenticated) {
    return <p>Você não está autenticado.</p>;
  }

  return (
    <>
      <h1>Home</h1>
      <p>Bem-vindo, {user?.username}</p>
      <p>Email: {user?.email}</p>
      <p>Função: {user?.user_type}</p>
    </>
  );
}

export default Home;
