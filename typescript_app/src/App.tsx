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
    const { isLoading, isError, error, data } = useQuery('repoData', () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res => {
        console.log('call api');
        return res.json();
      }
      ),
      {
        // falseだと、queryFnが実行されない
        enabled: false,
        // initialData: {
        //   name: 'initial data name'
        // }
      }
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

    if (isError) {
      return (
        <>
          'An error has occurred: ' + error.message
        </>
      )
    }

    if (!data) {
      return (
        <>
          none data
        </>
      )
    }

    // initialDateが設定されているとき、dataがnullなので、nameの箇所にinitial data nameが表示される
    return (
      <div>
        <h1>{data.name ?? 'none name'}</h1>
        <p>{data?.description ?? 'none description'}</p>
        <p>subscribers <strong>👀 {data?.subscribers_count ?? 'none subscribers_count'}</strong>{' '}</p>
        <p>stargazers<strong>✨ {data?.stargazers_count ?? 'stargazers_count'}</strong>{' '}</p>
        <p>forks<strong>🍴 {data?.forks_count ?? 'forks_count'}</strong></p>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}
