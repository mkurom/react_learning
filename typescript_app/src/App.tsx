import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from 'react-query'

import { Button } from '@mui/material';

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
    // 取得したデータをrepoDataをkey、res.json()をvalueに保存する
    const { isLoading, isError, error, data } = useQuery('repoData', () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res => {
        console.log('call api');
        return res.json();
      }
      ),
      {
        // falseだと、queryFnが実行されない
        enabled: false,
        initialData: {
          name: 'initial data name'
        }
      }
    )

    console.log('render app');
    console.log(data);

    // 何もなければ、空配列が取得できる
    console.log('noData');
    console.log(queryClient.getQueriesData('noData'));

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
        <Button
          onClick={
            () => {
              console.log('change state');
              // キャッシュに直接書き込む
              queryClient.setQueryData(['repoData'], {
                name: 'new user',
                description: 'new description',
              });

              // noDataをkeyにして、{note: 'no data Description',}をvalueにセットする
              queryClient.setQueryData(['noData'], {
                note: 'no data Description',
              });
            }
          }
        >
          更新ボタン
        </Button>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}
