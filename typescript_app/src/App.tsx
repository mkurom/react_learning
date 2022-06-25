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

type RepoDataType = {
  name: string
  description: string
  subscribers_count: string
  stargazers_count: string
  forks_count: string
}

export default function App() {

  const Example = () => {
    // 取得したデータをrepoDataをkey、res.json()をvalueに保存する
    const { isLoading, isError, error, data } = useQuery<RepoDataType>('repoData', () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res => {
        console.log('call api');
        return res.json();
      }
      ),
      {
        // falseだと、queryFnが実行されない
        enabled: false,
        initialData: {
          name: 'initial data name',
          description: 'none description',
          subscribers_count: 'none subscribers_count',
          stargazers_count: 'none stargazers_count',
          forks_count: 'none forks_count',
        }
      }
    )

    console.log('render app');
    console.log(data);

    // 何もなければ、空配列が取得できる
    console.log('new Data');
    console.log(queryClient.getQueriesData('newData'));

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

    queryClient.getQueriesData<Map<String, String>>('newData').map((value) => {
      // 更新ボタンでセットしたnewDataが確認できる
      console.log('newData');
      console.log(value);

    });

    // initialDateが設定されているとき、dataがnullなので、nameの箇所にinitial data nameが表示される
    return (
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <p>subscribers <strong>👀 {data.subscribers_count}</strong>{' '}</p>
        <p>stargazers<strong>✨ {data.stargazers_count}</strong>{' '}</p>
        <p>forks<strong>🍴 {data.forks_count}</strong></p>
        <Button
          onClick={
            () => {
              console.log('change state');
              // キャッシュに直接書き込む
              // コメントアウトしておくと、状態が変化しないので、再描画されない
              queryClient.setQueryData(['repoData'], {
                name: 'new user',
                description: 'new description',
              });

              // noDataをkeyにして、{note: 'no data Description',}をvalueにセットする
              queryClient.setQueryData(['newData'], {
                note: 'new data Description',
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
