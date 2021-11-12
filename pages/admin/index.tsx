import { LphPage } from "../../common/page-utils"
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";

function DashBoardPage() {
    return (
        <h1>Dashboard</h1>
    )
}

export default LphPage(DashBoardPage, AdminLayout);