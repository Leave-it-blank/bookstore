// pages/404.js

import Link from 'next/link';

function RETURNSERVERERROR() {
    return (
        <div className="min-h-screen flex items-center justify-center  ">
            <div className="text-center">
                <h1 className="text-6xl font-semibold text-gray-800 mb-4">500 - Server Error</h1>
                <p className="text-xl text-gray-600 mb-4">{`The page you're looking for does not exist.`}</p>
                <Link href="/">
                    <span className="text-blue-500 hover:underline">Go back to the homepage</span>
                </Link>
            </div>
        </div>
    );
}

export default RETURNSERVERERROR;
