import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    },
  },
});

export default function App() {

  const Example = () => {
    const { isLoading, error, data } = useQuery('repoData', () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res => {
        console.log('call api');
        return res.json();
      }
      )
    )

    console.log('build app');
    console.log(data);

    if (isLoading) {
      return (
        <>
          'Loading...'
        </>
      )
    }

    if (error) {
      return (
        <>
          'An error has occurred: ' + error.message
        </>
      )
    }

    return (
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <p>subscribers <strong>👀 {data.subscribers_count}</strong>{' '}</p>
        <p>stargazers<strong>✨ {data.stargazers_count}</strong>{' '}</p>
        <p>forks<strong>🍴 {data.forks_count}</strong></p>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}
