import React from 'react';
import PageLayout from '../components/PageLayout';
import '../components/styles/nprogress.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

NProgress.configure({
	showSpinner: false,
	easing: 'ease',
	speed: 500,
});

Router.events.on('routeChangeStart', () => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});
Router.events.on('routeChangeError', () => {
	NProgress.done();
});

const _app = ({ Component, pageProps, apollo }) => (
	<ApolloProvider client={apollo}>
		<CartStateProvider>
			<PageLayout>
				<Component {...pageProps} />
			</PageLayout>
		</CartStateProvider>
	</ApolloProvider>
);

_app.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return { pageProps };
};

export default withData(_app);
