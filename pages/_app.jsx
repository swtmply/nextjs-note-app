import Layout from "../components/Layout";
import "../styles/note.css";
import { UserProvider } from "../contexts/User";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
