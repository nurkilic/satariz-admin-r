import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {ToolbarWrapper} from '../../../_metronic/layout/components/toolbar'
import {Content} from '../../../_metronic/layout/components/content'
import {TITLE} from "../../helpers/HelmetHelpers"
const DashboardPage = () => (
    <>
        <ToolbarWrapper/>
        <Content>

        </Content>
    </>
)

const DashboardWrapper = () => {
    return (
        <>
            <TITLE title={'İstatistikler'}/>
            <PageTitle breadcrumbs={[]}>İstatistikler</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {DashboardWrapper}
