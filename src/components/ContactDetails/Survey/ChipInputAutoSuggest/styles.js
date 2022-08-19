import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        position: "relative"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        zIndex: 1
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none"
    },
    textField: {
        width: "100%"
    }
}));