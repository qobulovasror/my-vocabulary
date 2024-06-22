const Home = (props) => {
  const { user, setToken, setUser } = props;
  const logout = () => {
    const res = confirm("Do you want to go out");
    if (res) {
      localStorage.removeItem("user-auth");
      setToken("");
      setUser({
        name: "",
        email: "",
        role: "",
      });
    }
  };
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="/">
            My Vocabulary
          </a>
          <button className="btn btn-danger" onClick={logout}>
            Log out
          </button>
        </div>
      </nav>
      <div className="container">
        
      </div>
    </>
  );
};

export default Home;
