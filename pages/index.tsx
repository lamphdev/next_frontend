import { useAuth } from "../common/auth-provider";
import { LphPage } from "../common/page-utils"

function Home() {

  const { userInfo } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <h2>{JSON.stringify(userInfo)}</h2>
    </div>
  )
}

export default LphPage(Home);
