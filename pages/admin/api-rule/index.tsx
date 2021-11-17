import { useApiRuleHook } from "../../../common/api-rule-hook";
import { LphPage } from "../../../common/page-utils"
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout"

function ApiRulePage() {

    const apiRuleHook = useApiRuleHook();

    return (
        <h1>Api rule page</h1>
    )
}

export default LphPage(ApiRulePage, AdminLayout);