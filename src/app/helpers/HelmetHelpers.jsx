import Helmet from "react-helmet";

export const TITLE = ({title = 'Satarız'}) => {
    return <Helmet>
        <title>{title} - Satarız</title>
    </Helmet>
}