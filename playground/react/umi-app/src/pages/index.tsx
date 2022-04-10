import styles from './index.less';
import {request} from 'umi'
import { useEffect } from 'react';

export default function IndexPage() {
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
