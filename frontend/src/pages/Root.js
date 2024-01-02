import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from "../../src/components/MainNavigation";
import { useEffect } from 'react';
import { getTokenDuration } from '../utils/auth';

export const RootLayout = () => {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        const tokenDuration = getTokenDuration();

        if (token === 'EXPIRED') {
            submit(null, {action: '/logout', method: 'post'});

            return;
        }

        setTimeout(()=> {
            submit(null, {action: '/logout', method: 'post'});
        }, tokenDuration)
    }, [token, submit])

    return <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
    </>
}