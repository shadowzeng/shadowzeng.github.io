import styles from './index.less';
import {request} from 'umi'
import { useEffect, useReducer } from 'react';

export default function IndexPage() {
  const [] = useReducer()
  useEffect(() => {
    request("http://yapi.smart-xwork.cn/mock/147168/user/list").then(response => {
      console.log(response)
    })
  });

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
