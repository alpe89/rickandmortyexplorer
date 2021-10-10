import { ErrorBoundary } from "react-error-boundary";
import { Layout } from "./layout";
import { Results } from "./results";
import { GenericError } from "./error";

export const App = () => {
    return (
        <Layout>
            <ErrorBoundary FallbackComponent={GenericError}>
                <Results />
            </ErrorBoundary>
        </Layout>
    );
};
