import axios from "axios";
import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  return currentUser ? (<h1>You are sign in</h1>) : (<h1>You are NOT sign in</h1>)
};

Landing.getInitialProps = async (context) => {
  //window only exist in browser, so if window is undefined, we are on server
  //request should be made to ingress-nginx (service name + namespace name...)
  console.log('Landing page');
  const { data } = await buildClient(context).get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  })
  return data;
};

export default Landing;
  