// pages/_error.js
function ErrorPage({ statusCode }: any) {
    return (
        <div>
            <p>An error occurred with status code: {statusCode}</p>
        </div>
    );
}

ErrorPage.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;
