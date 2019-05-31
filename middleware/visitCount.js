/**
 * Created by Administrator on 2018/12/6.
 */
 import axios from 'axios';
export default function (context) {
    axios.get(context.store.state.url.setVisitCount);
}

