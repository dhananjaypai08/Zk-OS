import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ZKOSDashboard from '~~/components/ZkOSDashboard';

const client = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/90589/zk-os/version/latest',
    cache: new InMemoryCache(),
});

const ZkOSNetwork =() => {
    <ApolloProvider client={client}>
      <ZKOSDashboard />
    </ApolloProvider>
}

export default ZkOSNetwork;