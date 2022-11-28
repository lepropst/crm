import axios from 'axios';
import { NextPageContext,NextPage } from 'next';
import {base_url,base_config} from '../utilities';
interface Props {
  lists?: string[];
}



const Page: NextPage<Props> = ({lists} ) =>{
    return <div>
        <h1>Todo Lists</h1>

    </div>
}
Page.getInitialProps = async ({ req }) => {
    const tmp= await axios.get(base_url+"/unendlich/lists", base_config);
    const lists = tmp.data;
  return { lists}
}


export default Page;